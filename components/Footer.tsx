import LocalTime from "./LocalTime";
import { SITE_NAME } from "@/lib/site";
import { getSiteContent } from "@/lib/queries";

export default async function Footer() {
  const site = await getSiteContent();

  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-6 py-10 sm:px-10">
        <div className="flex gap-12 text-sm">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Version</p>
            <p>2026 © Edition</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Local time</p>
            <LocalTime />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Socials</p>
          <div className="flex gap-6 text-sm">
            <a href={site.github} target="_blank" rel="noreferrer" className="nav-link">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="nav-link">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="nav-link">
              Email
            </a>
          </div>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-muted">Designed &amp; built by {SITE_NAME}</p>
    </footer>
  );
}
