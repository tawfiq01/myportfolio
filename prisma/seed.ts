// Seeds the database with the current placeholder content from lib/content.ts.
// Runs during Vercel builds (see vercel.json) — the guard below makes it a
// no-op once any content exists, so deploys never clobber live edits.
// Force a re-seed with FORCE_SEED=1 (wipes and re-inserts; Messages untouched).
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CERTIFICATIONS, EXPERIENCES, PROJECTS, SKILL_GROUPS } from "../lib/content.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing =
    (await prisma.project.count()) +
    (await prisma.experience.count()) +
    (await prisma.skillGroup.count()) +
    (await prisma.certification.count());
  if (existing > 0 && !process.env.FORCE_SEED) {
    console.log(`Seed skipped: ${existing} content rows already present.`);
    return;
  }

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: PROJECTS.map((p, i) => ({ ...p, sortOrder: i })),
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: EXPERIENCES.map((e, i) => ({ ...e, sortOrder: i })),
  });

  await prisma.skillGroup.deleteMany();
  await prisma.skillGroup.createMany({
    data: SKILL_GROUPS.map((s, i) => ({ ...s, sortOrder: i })),
  });

  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: CERTIFICATIONS.map((c, i) => ({ ...c, sortOrder: i })),
  });

  const counts = {
    projects: await prisma.project.count(),
    experiences: await prisma.experience.count(),
    skillGroups: await prisma.skillGroup.count(),
    certifications: await prisma.certification.count(),
  };
  console.log("Seeded:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
