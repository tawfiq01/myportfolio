import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Minimal single-admin auth: ADMIN_PASSWORD grants a session, sessions are
// HMAC-signed expiry timestamps in an HttpOnly cookie (SESSION_SECRET).
// No accounts, no database — right-sized for a one-owner portfolio.

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// trim() guards against trailing CR/LF picked up when secrets are piped
// into `vercel env add` from a shell.
function secret(): string {
  return (process.env.SESSION_SECRET ?? "").trim();
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function checkPassword(password: string): boolean {
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (!expected || !secret()) return false;
  return safeEqual(password, expected);
}

export async function createSession(): Promise<void> {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const store = await cookies();
  store.set(COOKIE_NAME, `${expiresAt}.${sign(expiresAt)}`, {
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
  if (!secret()) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;
  const expiresAt = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!safeEqual(signature, sign(expiresAt))) return false;
  return Number(expiresAt) > Date.now();
}
