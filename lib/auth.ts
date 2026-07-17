import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

// Single-admin auth. The password lives scrypt-hashed in AdminSettings once
// changed from the admin panel; before that, the ADMIN_PASSWORD env var is
// the bootstrap password. Sessions are HMAC-signed expiry timestamps in an
// HttpOnly cookie; the signing key mixes in the current password material,
// so changing the password invalidates every existing session at once.

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// trim() guards against trailing CR/LF picked up when secrets are piped
// into `vercel env add` from a shell.
function envSecret(): string {
  return (process.env.SESSION_SECRET ?? "").trim();
}

function envPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

type PasswordRecord = { kind: "db"; hash: string } | { kind: "env"; value: string };

async function passwordRecord(): Promise<PasswordRecord | null> {
  if (prisma) {
    try {
      const row = await prisma.adminSettings.findUnique({ where: { id: "singleton" } });
      if (row) return { kind: "db", hash: row.passwordHash };
    } catch (error) {
      console.error("AdminSettings lookup failed, falling back to env password:", error);
    }
  }
  const value = envPassword();
  return value ? { kind: "env", value } : null;
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

async function signingKey(): Promise<string | null> {
  const secret = envSecret();
  if (!secret) return null;
  const record = await passwordRecord();
  if (!record) return null;
  return `${secret}|${record.kind === "db" ? record.hash : record.value}`;
}

function sign(key: string, payload: string): string {
  return createHmac("sha256", key).update(payload).digest("hex");
}

export async function checkPassword(password: string): Promise<boolean> {
  const record = await passwordRecord();
  if (!record) return false;
  return record.kind === "db" ? verifyHash(password, record.hash) : safeEqual(password, record.value);
}

// Stores a new scrypt-hashed password in the database (requires a DB).
export async function setPassword(newPassword: string): Promise<void> {
  if (!prisma) throw new Error("Database not connected");
  const passwordHash = hashPassword(newPassword);
  await prisma.adminSettings.upsert({
    where: { id: "singleton" },
    update: { passwordHash },
    create: { id: "singleton", passwordHash },
  });
}

export async function createSession(): Promise<void> {
  const key = await signingKey();
  if (!key) throw new Error("Auth is not configured (SESSION_SECRET / password missing)");
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const store = await cookies();
  store.set(COOKIE_NAME, `${expiresAt}.${sign(key, expiresAt)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const key = await signingKey();
  if (!key) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;
  const expiresAt = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!safeEqual(signature, sign(key, expiresAt))) return false;
  return Number(expiresAt) > Date.now();
}
