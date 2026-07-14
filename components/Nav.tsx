"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-gradient">{"<TI />"}</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm text-muted sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-border/60 px-6 py-4 text-sm text-muted sm:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 transition-colors hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
