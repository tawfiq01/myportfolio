import { cache } from "react";
import { prisma } from "./db";
import {
  ABOUT,
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCES,
  HERO,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  type Certification,
  type Experience,
  type NavLink,
  type Project,
  type SkillGroup,
} from "./content";
import { SOCIAL } from "./site";

export type GalleryImage = {
  title: string;
  imageUrl: string;
};

export type ThemeSettings = {
  accent: string;
  background: string;
  themeToggle: boolean;
};

export const DEFAULT_THEME: ThemeSettings = {
  accent: "#455ce9",
  background: "#1c1d20",
  themeToggle: false,
};

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

// Hex-validated so values are safe to interpolate into an inline <style>.
export const getThemeSettings = cache(async (): Promise<ThemeSettings> => {
  if (!prisma) return DEFAULT_THEME;
  try {
    const row = await prisma.themeSettings.findUnique({ where: { id: "singleton" } });
    if (!row) return DEFAULT_THEME;
    return {
      accent: HEX_RE.test(row.accent) ? row.accent : DEFAULT_THEME.accent,
      background: HEX_RE.test(row.background) ? row.background : DEFAULT_THEME.background,
      themeToggle: row.themeToggle,
    };
  } catch (error) {
    console.error("Database query failed, serving default theme:", error);
    return DEFAULT_THEME;
  }
});

export type SiteContent = {
  heroGreeting: string;
  heroHeadline: string;
  heroTagline: string;
  heroIntro: string;
  location: string;
  aboutParagraphs: string[];
  contactBlurb: string;
  contactCtaLabel: string;
  email: string;
  github: string;
  linkedin: string;
};

// Static fallback assembled from the original lib/content.ts constants.
export const FALLBACK_SITE_CONTENT: SiteContent = {
  heroGreeting: HERO.greeting,
  heroHeadline: HERO.headline,
  heroTagline: HERO.tagline,
  heroIntro: HERO.intro,
  location: "Located in Bangladesh",
  aboutParagraphs: ABOUT.paragraphs,
  contactBlurb: CONTACT.blurb,
  contactCtaLabel: CONTACT.ctaLabel,
  email: SOCIAL.email,
  github: SOCIAL.github,
  linkedin: SOCIAL.linkedin,
};

// cache() dedupes the singleton lookup across the components that need it
// within a single render.
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!prisma) return FALLBACK_SITE_CONTENT;
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: "singleton" } });
    return row ?? FALLBACK_SITE_CONTENT;
  } catch (error) {
    console.error("Database query failed, serving static content:", error);
    return FALLBACK_SITE_CONTENT;
  }
});

// Each query reads from the database when it's configured and has rows,
// otherwise serves the static placeholders from lib/content.ts. The DB is
// the source of truth once seeded; the fallback keeps builds and previews
// working with no DATABASE_URL and survives transient DB outages.

async function fromDb<T>(query: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  if (!prisma) return fallback;
  try {
    const rows = await query();
    return rows.length > 0 ? rows : fallback;
  } catch (error) {
    console.error("Database query failed, serving static content:", error);
    return fallback;
  }
}

export function getProjects(): Promise<Project[]> {
  return fromDb(
    async () =>
      (await prisma!.project.findMany({ orderBy: { sortOrder: "asc" } })).map((row) => ({
        name: row.name,
        description: row.description,
        tech: row.tech,
        href: row.href,
        imageUrl: row.imageUrl,
        highlight: row.highlight,
      })),
    PROJECTS,
  );
}

// Visible menu items, in order. Falls back to the static NAV_LINKS.
export function getMenuItems(): Promise<NavLink[]> {
  return fromDb(
    async () =>
      (await prisma!.menuItem.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } })).map(
        (row) => ({ href: row.href, label: row.label }),
      ),
    NAV_LINKS,
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!prisma) return [];
  try {
    return (await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } })).map((row) => ({
      title: row.title,
      imageUrl: row.imageUrl,
    }));
  } catch (error) {
    console.error("Database query failed, gallery hidden:", error);
    return [];
  }
}

export function getExperiences(): Promise<Experience[]> {
  return fromDb(
    async () =>
      (await prisma!.experience.findMany({ orderBy: { sortOrder: "asc" } })).map((row) => ({
        role: row.role,
        company: row.company,
        companyUrl: row.companyUrl,
        start: row.start,
        end: row.end,
        summary: row.summary,
        highlights: row.highlights,
      })),
    EXPERIENCES,
  );
}

export function getSkillGroups(): Promise<SkillGroup[]> {
  return fromDb(
    async () =>
      (await prisma!.skillGroup.findMany({ orderBy: { sortOrder: "asc" } })).map((row) => ({
        label: row.label,
        items: row.items,
      })),
    SKILL_GROUPS,
  );
}

export function getCertifications(): Promise<Certification[]> {
  return fromDb(
    async () =>
      (await prisma!.certification.findMany({ orderBy: { sortOrder: "asc" } })).map((row) => ({
        name: row.name,
        issuer: row.issuer,
        year: row.year,
        href: row.href,
      })),
    CERTIFICATIONS,
  );
}
