"use client";

import { useSyncExternalStore } from "react";

// Sun/moon toggle. Dark is the default; "light" is stored in localStorage and
// re-applied before paint by the inline script in app/page.tsx. The theme
// lives on <html data-theme>, observed here so every toggle instance
// (header + mobile) stays in sync.

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): "dark" | "light" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark");

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-foreground/60"
    >
      {theme === "light" ? (
        // moon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        // sun
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
