import { SOCIAL } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-grid">
      <div className="glow left-[-10%] top-[10%] h-96 w-96 bg-[var(--accent)]" />
      <div className="glow right-[-5%] bottom-[15%] h-80 w-80 bg-[var(--accent-2)]" />

      <div className="relative mx-auto w-full max-w-5xl px-6 pt-24">
        <p className="animate-rise font-mono text-sm text-accent-2">Hi, my name is</p>
        <h1 className="animate-rise-delay-1 mt-4 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
          Tawfiqul Islam.
          <br />
          <span className="text-gradient">I build apps people move with.</span>
        </h1>
        <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg text-muted">
          Software developer focused on mobile and web — React Native, React, TypeScript and
          Supabase. Currently building{" "}
          <span className="text-foreground">RideTrack</span>, a GPS ride-tracking app for bikers
          and drivers.
        </p>
        <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href={`mailto:${SOCIAL.email}`}
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
