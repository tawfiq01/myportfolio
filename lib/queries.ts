import { cache } from "react";
import { prisma } from "./db";
import {
  ABOUT,
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCES,
  HERO,
  PROJECTS,
  SKILL_GROUPS,
  type Certification,
  type Experience,
  type Project,
  type SkillGroup,
} from "./content";
import { SOCIAL } from "./site";

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
        highlight: row.highlight,
      })),
    PROJECTS,
  );
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
