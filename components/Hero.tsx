import { getSiteContent } from "@/lib/queries";

export default async function Hero() {
  const site = await getSiteContent();
  const name = site.heroHeadline.replace(/\.\s*$/, "");

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[var(--hero)] pt-20 text-foreground"
    >
      {/* Soft light wash to keep the landing airier than the sections below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--hero-glow)_0%,transparent_55%)]"
      />

      {/* Location badge */}
      <div className="absolute right-0 top-28 hidden items-center gap-1 rounded-l-full bg-accent py-2 pl-2 pr-6 text-white sm:flex">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-background">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-spin-slow h-5 w-5"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <path d="M3 12h18" />
          </svg>
        </span>
        <p className="max-w-[9rem] pl-3 text-sm leading-tight">{site.location}</p>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-sm uppercase tracking-[0.25em] text-muted">{site.heroGreeting}</p>
        <h1 className="mt-5 text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
          {name}
        </h1>
        <p className="mt-7 max-w-xl text-xl font-light leading-snug text-foreground/80 sm:text-2xl">
          {site.heroTagline}
        </p>
        <a
          href="#projects"
          className="mt-9 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          See my case studies
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4 rotate-45"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      {/* Mouse-shaped scroll cue — click glides down to the next section */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-foreground"
      >
        <span className="flex h-12 w-7 justify-center rounded-full border border-current pt-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="scroll-cue h-3.5 w-3.5 text-accent"
            aria-hidden
          >
            <path d="M12 4v14m0 0-5-5m5 5 5-5" />
          </svg>
        </span>
      </a>
    </section>
  );
}
