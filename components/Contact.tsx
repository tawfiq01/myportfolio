import Section from "./Section";
import { SOCIAL } from "@/lib/site";
import { CONTACT } from "@/lib/content";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="06." title="Get in touch">
      <div className="max-w-xl">
        <p className="text-muted">{CONTACT.blurb}</p>
        <a
          href={`mailto:${SOCIAL.email}`}
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          {CONTACT.ctaLabel}
        </a>
        <div className="mt-10 flex gap-6 font-mono text-sm text-muted">
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={`mailto:${SOCIAL.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </Section>
  );
}
