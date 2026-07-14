import Section from "./Section";
import { CERTIFICATIONS } from "@/lib/content";

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="05." title="Certifications">
      <ul className="grid gap-6 sm:grid-cols-2">
        {CERTIFICATIONS.map((cert) => (
          <li
            key={`${cert.name}-${cert.issuer}`}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <p className="font-mono text-xs text-accent-2">{cert.year}</p>
            <h3 className="mt-2 font-bold">
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent-2"
                >
                  {cert.name} <span aria-hidden>↗</span>
                </a>
              ) : (
                cert.name
              )}
            </h3>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
