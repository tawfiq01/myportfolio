import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "../actions";

// Auth depends on the request cookie — never prerender admin pages
// (a build-time prerender would bake the logged-out redirect for everyone).
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/site", label: "Site content" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Case studies" },
  { href: "/admin/certifications", label: "Certifications" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <aside className="sticky top-0 flex h-svh w-56 shrink-0 flex-col justify-between border-r border-white/10 p-6 max-sm:hidden">
        <div>
          <p className="text-sm font-medium">
            <span className="text-accent">●</span> Portfolio CMS
          </p>
          <nav className="mt-8 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3">
          <a
            href="/"
            target="_blank"
            className="block px-3 text-sm text-muted transition-colors hover:text-foreground"
          >
            View site ↗
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-full border border-white/15 px-4 py-2 text-sm text-muted transition-colors hover:border-white/40 hover:text-foreground"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-white/10 px-4 py-3 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 px-4 py-1.5 text-xs text-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
