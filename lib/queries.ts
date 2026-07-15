import { prisma } from "./db";
import {
  CERTIFICATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILL_GROUPS,
  type Certification,
  type Experience,
  type Project,
  type SkillGroup,
} from "./content";

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
