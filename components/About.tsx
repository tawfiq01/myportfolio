import Section from "./Section";
import { ABOUT } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" eyebrow="01." title="About me">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-muted">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
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
