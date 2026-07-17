"use client";

import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/content";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

type Props = {
  links: NavLink[];
  socials: { github: string; linkedin: string; email: string };
  showThemeToggle?: boolean;
};

export default function Nav({ links, socials, showThemeToggle = false }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Top header — scrolls away with the hero, like the reference site. */}
      <header className="absolute inset-x-0 top-0 z-40 text-foreground">
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
          <a href="#top" className="text-sm">
            © Code by Tawfiqul
          </a>
          <ul className="hidden items-center gap-9 text-sm sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
            {showThemeToggle && (
              <li>
                <ThemeToggle />
              </li>
            )}
          </ul>
          {showThemeToggle && (
            <span className="sm:hidden">
              <ThemeToggle />
            </span>
          )}
        </nav>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in drawer — same menu content as the header. */}
      <aside
        id="menu-drawer"
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-md bg-drawer text-foreground transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-[calc(100%+100px)]"
        }`}
      >
        {/* Curved left edge */}
        <svg
          aria-hidden
          className="absolute left-0 top-0 h-full w-[100px] -translate-x-[99px] fill-drawer"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M100 0 L100 100 Q -20 50 100 0" />
        </svg>

        <div className="flex h-full flex-col justify-between px-10 py-16 sm:px-14 sm:py-20">
          <div>
            <p className="border-b border-foreground/20 pb-6 text-xs uppercase tracking-[0.25em] text-muted">
              Navigation
            </p>
            <ul className="mt-10 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="group flex items-center gap-4 text-4xl font-light sm:text-5xl"
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 scale-0 rounded-full bg-foreground transition-transform duration-200 group-hover:scale-100"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Socials</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              <a href={socials.github} target="_blank" rel="noreferrer" className="nav-link">
                GitHub
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="nav-link">
                LinkedIn
              </a>
              <a href={`mailto:${socials.email}`} className="nav-link">
                Email
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Round menu button — always on mobile, after the hero on desktop. */}
      <div
        className={`fixed right-5 top-5 z-50 transition-[transform,opacity] duration-300 ${
          open || scrolled ? "" : "sm:pointer-events-none sm:scale-0 sm:opacity-0"
        }`}
      >
        <Magnetic>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-14 w-14 flex-col items-center justify-center gap-1.5 rounded-full shadow-lg transition-colors duration-300 sm:h-16 sm:w-16 ${
              open ? "bg-drawer" : "bg-accent"
            }`}
          >
            <span
              aria-hidden
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </Magnetic>
      </div>
    </>
  );
}
