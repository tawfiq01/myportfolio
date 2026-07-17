import { getSiteContent } from "@/lib/queries";

export default async function Hero() {
  const site = await getSiteContent();
  const name = site.heroHeadline.replace(/\.\s*$/, "");

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-background pt-28 text-foreground"
    >
      <div className="relative flex-1">
        {/* Location badge */}
        <div className="absolute left-0 top-1/3 hidden items-center gap-1 rounded-r-full bg-accent py-2 pl-6 pr-2 text-white sm:flex">
          <p className="pr-3 text-sm leading-tight">
            Located
            <br />
            in Bangladesh
          </p>
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
        </div>

        {/* Role block */}
        <div className="mt-16 max-w-sm px-6 sm:absolute sm:right-16 sm:top-1/4 sm:mt-0 sm:px-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mb-8 h-7 w-7 rotate-45"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <p className="text-sm text-muted">{site.heroGreeting}</p>
          <p className="mt-3 text-2xl font-light leading-snug sm:text-3xl">{site.heroTagline}</p>
          <a
            href="#projects"
            className="mt-5 inline-block text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            See my case studies ↓
          </a>
        </div>
      </div>

      {/* Giant static name */}
      <h1 className="select-none px-6 pb-10 text-[12.5vw] font-medium leading-[0.95] tracking-tight sm:px-10 sm:text-[8.5vw]">
        {name}
      </h1>
    </section>
  );
}
