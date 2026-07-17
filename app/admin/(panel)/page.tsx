import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, DbNotice, PageHeader } from "@/components/admin/ui";

export default async function AdminDashboard() {
  let counts: { label: string; href: string; count: number | null }[] = [
    { label: "Experience", href: "/admin/experience", count: null },
    { label: "Skill groups", href: "/admin/skills", count: null },
    { label: "Case studies", href: "/admin/projects", count: null },
    { label: "Certifications", href: "/admin/certifications", count: null },
  ];

  if (prisma) {
    try {
      const [experiences, skills, projects, certifications] = await Promise.all([
        prisma.experience.count(),
        prisma.skillGroup.count(),
        prisma.project.count(),
        prisma.certification.count(),
      ]);
      counts = [
        { label: "Experience", href: "/admin/experience", count: experiences },
        { label: "Skill groups", href: "/admin/skills", count: skills },
        { label: "Case studies", href: "/admin/projects", count: projects },
        { label: "Certifications", href: "/admin/certifications", count: certifications },
      ];
    } catch {
      // fall through with null counts — DbNotice explains
    }
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        hint="Changes go live within seconds of saving — no redeploy needed."
      />
      <DbNotice connected={Boolean(prisma)} />
      <div className="grid grid-cols-2 gap-4">
        {counts.map((item) => (
          <Link key={item.href} href={item.href} className="transition-transform hover:-translate-y-0.5">
            <Card>
              <p className="text-4xl font-light">{item.count ?? "—"}</p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/admin/site" className="block transition-transform hover:-translate-y-0.5">
          <Card>
            <p className="text-sm font-medium">Site content</p>
            <p className="mt-1 text-sm text-muted">
              Hero headline, tagline, about paragraphs, contact blurb, social links.
            </p>
          </Card>
        </Link>
      </div>
    </>
  );
}
