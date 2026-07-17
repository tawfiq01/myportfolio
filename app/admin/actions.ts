"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del, put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { checkPassword, createSession, destroySession, isAuthenticated, setPassword } from "@/lib/auth";

// ---------- auth ----------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!(await checkPassword(password))) {
    return { error: "Wrong password." };
  }
  await createSession();
  redirect("/admin");
}

export type ChangePasswordState = { error?: string; success?: boolean };

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
  if (!prisma) return { error: "Database not connected — password can't be changed here." };

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!(await checkPassword(current))) return { error: "Current password is wrong." };
  if (next.length < 8) return { error: "New password must be at least 8 characters." };
  if (next !== confirm) return { error: "New passwords don't match." };

  await setPassword(next);
  // Changing the password invalidates all existing sessions (the signing key
  // includes the password hash) — issue a fresh one so you stay logged in.
  await createSession();
  return { success: true };
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

// Uploads a form image to Vercel Blob; returns null when no file was chosen.
async function uploadImage(formData: FormData, key = "image"): Promise<string | null> {
  const file = formData.get(key);
  if (!(file instanceof File) || file.size === 0) return null;
  const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, { access: "public" });
  return blob.url;
}

// Best-effort delete of a blob we own; never fails the mutation.
async function removeBlob(url: string | null | undefined) {
  if (!url || !url.includes("blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch (error) {
    console.error("Blob delete failed:", error);
  }
}

// ---------- projects ----------

export async function saveProject(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const existing = id ? await db.project.findUnique({ where: { id } }) : null;

  const uploaded = await uploadImage(formData);
  const removeImage = formData.get("removeImage") === "on";
  let imageUrl = existing?.imageUrl ?? null;
  if (uploaded) {
    await removeBlob(existing?.imageUrl);
    imageUrl = uploaded;
  } else if (removeImage) {
    await removeBlob(existing?.imageUrl);
    imageUrl = null;
  }

  const data = {
    name: text(formData, "name"),
    description: text(formData, "description"),
    tech: lines(formData, "tech"),
    href: optional(formData, "href"),
    imageUrl,
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
  if (id) {
    const existing = await db.project.findUnique({ where: { id } });
    await db.project.delete({ where: { id } });
    await removeBlob(existing?.imageUrl);
  }
  revalidateSite("/admin/projects");
}

// ---------- gallery ----------

export async function saveGalleryImage(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const uploaded = await uploadImage(formData);
  const base = {
    title: text(formData, "title"),
    sortOrder: intOr(formData, "sortOrder", 0),
  };

  if (id) {
    const existing = await db.galleryImage.findUnique({ where: { id } });
    if (uploaded) await removeBlob(existing?.imageUrl);
    await db.galleryImage.update({
      where: { id },
      data: uploaded ? { ...base, imageUrl: uploaded } : base,
    });
  } else {
    if (!uploaded) throw new Error("An image file is required");
    await db.galleryImage.create({ data: { ...base, imageUrl: uploaded } });
  }
  revalidateSite("/admin/gallery");
}

export async function deleteGalleryImage(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) {
    const existing = await db.galleryImage.findUnique({ where: { id } });
    await db.galleryImage.delete({ where: { id } });
    await removeBlob(existing?.imageUrl);
  }
  revalidateSite("/admin/gallery");
}

// ---------- menu ----------

export async function saveMenuItem(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = optional(formData, "id");
  const data = {
    label: text(formData, "label"),
    href: text(formData, "href"),
    visible: formData.get("visible") === "on",
    sortOrder: intOr(formData, "sortOrder", 0),
  };
  if (id) await db.menuItem.update({ where: { id }, data });
  else await db.menuItem.create({ data });
  revalidateSite("/admin/menu");
}

export async function deleteMenuItem(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const id = text(formData, "id");
  if (id) await db.menuItem.delete({ where: { id } });
  revalidateSite("/admin/menu");
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

// ---------- appearance ----------

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export async function saveTheme(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const reset = formData.get("reset") === "1";
  const accent = text(formData, "accent");
  const background = text(formData, "background");
  const data = reset
    ? { accent: "#455ce9", background: "#1c1d20", themeToggle: formData.get("themeToggle") === "on" }
    : {
        accent: HEX_RE.test(accent) ? accent : "#455ce9",
        background: HEX_RE.test(background) ? background : "#1c1d20",
        themeToggle: formData.get("themeToggle") === "on",
      };
  await db.themeSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidateSite("/admin/appearance");
}

// ---------- site content (hero / about / contact / socials) ----------

export async function saveSiteContent(formData: FormData): Promise<void> {
  const db = await requireAuthAndDb();
  const data = {
    heroGreeting: text(formData, "heroGreeting"),
    heroHeadline: text(formData, "heroHeadline"),
    heroTagline: text(formData, "heroTagline"),
    heroIntro: text(formData, "heroIntro"),
    location: text(formData, "location"),
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
