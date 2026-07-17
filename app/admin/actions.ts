"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { checkPassword, createSession, destroySession, isAuthenticated } from "@/lib/auth";

// ---------- auth ----------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Wrong password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// ---------- shared helpers ----------

async function requireAuthAndDb() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  if (!prisma) throw new Error("Database not connected");
  return prisma;
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optional(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value === "" ? null : value;
}

// Textareas hold one list item per line.
function lines(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function intOr(formData: FormData, key: string, fallback: number): number {
  const parsed = Number.parseInt(text(formData, key), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function revalidateSite(adminPath: string) {
  revalidatePath("/");
  revalidatePath(adminPath);
}

// ---------- projects ----------

export async function saveProject(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const data = {
    name: text(formData, "name"),
    description: text(formData, "description"),
    tech: lines(formData, "tech"),
    href: optional(formData, "href"),
    highlight: formData.get("highlight") === "on",
    sortOrder: intOr(formData, "sortOrder", 0),
  };
  if (id) await db.project.update({ where: { id }, data });
  else await db.project.create({ data });
  revalidateSite("/admin/projects");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) await db.project.delete({ where: { id } });
  revalidateSite("/admin/projects");
}

// ---------- experience ----------

export async function saveExperience(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const data = {
    role: text(formData, "role"),
    company: text(formData, "company"),
    companyUrl: optional(formData, "companyUrl"),
    start: text(formData, "start"),
    end: optional(formData, "end"),
    summary: text(formData, "summary"),
    highlights: lines(formData, "highlights"),
    sortOrder: intOr(formData, "sortOrder", 0),
  };
  if (id) await db.experience.update({ where: { id }, data });
  else await db.experience.create({ data });
  revalidateSite("/admin/experience");
}

export async function deleteExperience(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) await db.experience.delete({ where: { id } });
  revalidateSite("/admin/experience");
}

// ---------- skill groups ----------

export async function saveSkillGroup(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const data = {
    label: text(formData, "label"),
    items: lines(formData, "items"),
    sortOrder: intOr(formData, "sortOrder", 0),
  };
  if (id) await db.skillGroup.update({ where: { id }, data });
  else await db.skillGroup.create({ data });
  revalidateSite("/admin/skills");
}

export async function deleteSkillGroup(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) await db.skillGroup.delete({ where: { id } });
  revalidateSite("/admin/skills");
}

// ---------- certifications ----------

export async function saveCertification(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const data = {
    name: text(formData, "name"),
    issuer: text(formData, "issuer"),
    year: text(formData, "year"),
    href: optional(formData, "href"),
    sortOrder: intOr(formData, "sortOrder", 0),
  };
  if (id) await db.certification.update({ where: { id }, data });
  else await db.certification.create({ data });
  revalidateSite("/admin/certifications");
}

export async function deleteCertification(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) await db.certification.delete({ where: { id } });
  revalidateSite("/admin/certifications");
}

// ---------- site content (hero / about / contact / socials) ----------

export async function saveSiteContent(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const data = {
    heroGreeting: text(formData, "heroGreeting"),
    heroHeadline: text(formData, "heroHeadline"),
    heroTagline: text(formData, "heroTagline"),
    heroIntro: text(formData, "heroIntro"),
    aboutParagraphs: lines(formData, "aboutParagraphs"),
    contactBlurb: text(formData, "contactBlurb"),
    contactCtaLabel: text(formData, "contactCtaLabel"),
    email: text(formData, "email"),
    github: text(formData, "github"),
    linkedin: text(formData, "linkedin"),
  };
  await db.siteContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidateSite("/admin/site");
}
