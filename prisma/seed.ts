// Seeds the database with the placeholder content from lib/content.ts.
// Runs during Vercel builds (see vercel.json). Each table is guarded
// independently — a table is only seeded when it's empty, so deploys never
// clobber live edits, while newly added tables still get their first rows.
// Force a full re-seed with FORCE_SEED=1 (Messages untouched).
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ABOUT, CERTIFICATIONS, CONTACT, EXPERIENCES, HERO, NAV_LINKS, PROJECTS, SKILL_GROUPS } from "../lib/content.ts";
import { SOCIAL } from "../lib/site.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const force = Boolean(process.env.FORCE_SEED);

async function main() {
  const seeded: string[] = [];

  if (force || (await prisma.project.count()) === 0) {
    await prisma.project.deleteMany();
    await prisma.project.createMany({ data: PROJECTS.map((p, i) => ({ ...p, sortOrder: i })) });
    seeded.push("projects");
  }

  if (force || (await prisma.experience.count()) === 0) {
    await prisma.experience.deleteMany();
    await prisma.experience.createMany({ data: EXPERIENCES.map((e, i) => ({ ...e, sortOrder: i })) });
    seeded.push("experiences");
  }

  if (force || (await prisma.skillGroup.count()) === 0) {
    await prisma.skillGroup.deleteMany();
    await prisma.skillGroup.createMany({ data: SKILL_GROUPS.map((s, i) => ({ ...s, sortOrder: i })) });
    seeded.push("skillGroups");
  }

  if (force || (await prisma.certification.count()) === 0) {
    await prisma.certification.deleteMany();
    await prisma.certification.createMany({ data: CERTIFICATIONS.map((c, i) => ({ ...c, sortOrder: i })) });
    seeded.push("certifications");
  }

  if (force || (await prisma.menuItem.count()) === 0) {
    await prisma.menuItem.deleteMany();
    // NAV_LINKS with Gallery slotted in just before Contact.
    const links = NAV_LINKS.flatMap((link) =>
      link.href === "#contact" ? [{ href: "#gallery", label: "Gallery" }, link] : [link],
    );
    await prisma.menuItem.createMany({
      data: links.map((link, i) => ({ label: link.label, href: link.href, sortOrder: i, visible: true })),
    });
    seeded.push("menuItems");
  }

  const siteContent = {
    heroGreeting: HERO.greeting,
    heroHeadline: HERO.headline,
    heroTagline: HERO.tagline,
    heroIntro: HERO.intro,
    location: "Located in Bangladesh",
    aboutParagraphs: ABOUT.paragraphs as string[],
    contactBlurb: CONTACT.blurb,
    contactCtaLabel: CONTACT.ctaLabel,
    email: SOCIAL.email,
    github: SOCIAL.github,
    linkedin: SOCIAL.linkedin,
  };
  const existingSite = await prisma.siteContent.findUnique({ where: { id: "singleton" } });
  if (force || !existingSite) {
    await prisma.siteContent.upsert({
      where: { id: "singleton" },
      update: siteContent,
      create: { id: "singleton", ...siteContent },
    });
    seeded.push("siteContent");
  }

  console.log(seeded.length ? `Seeded: ${seeded.join(", ")}` : "Seed skipped: all tables already have data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
