import Section from "./Section";
import { SOCIAL } from "@/lib/site";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="04." title="Get in touch">
      <div className="max-w-xl">
        <p className="text-muted">
          Whether you have a project in mind, a role to fill, or just want to say hi — my inbox is
          open.
        </p>
        <a
          href={`mailto:${SOCIAL.email}`}
          className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Say hello
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
