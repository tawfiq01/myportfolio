import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="01." title="About me">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-muted">
          <p>
            I&apos;m a software developer from Bangladesh who enjoys turning ideas into products
            people actually use. My current focus is mobile-first development — building smooth,
            reliable apps with React Native and Expo, backed by Supabase and PostgreSQL.
          </p>
          <p>
            Right now I&apos;m building <span className="text-foreground">RideTrack</span>, a
            Strava-style community app for bike and car enthusiasts: live GPS activity tracking,
            route maps, social feeds, clubs and events.
          </p>
          {/* TODO: Replace with your own story — education, experience, what drives you. */}
          <p>
            When I&apos;m not coding, I&apos;m exploring new tools in the React ecosystem and
            sharpening my product-design eye.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl border border-border bg-card p-1">
            {/* TODO: Drop your photo at public/me.jpg and swap this block for an <Image>. */}
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20 font-mono text-5xl font-bold text-gradient">
              TI
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
