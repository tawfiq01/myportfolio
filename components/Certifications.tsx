import Section from "./Section";
import Reveal from "./Reveal";
import { CERTIFICATIONS } from "@/lib/content";

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="04" title="Certifications">
      <ul>
        {CERTIFICATIONS.map((cert) => (
          <li
            key={`${cert.name}-${cert.issuer}`}
            className="group border-b border-paper-border first:border-t"
          >
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-3 py-8">
                <div>
                  <h3 className="text-xl font-medium transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">
                    {cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {cert.name} <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-paper-muted">{cert.issuer}</p>
                </div>
                <p className="text-sm text-paper-muted">{cert.year}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
