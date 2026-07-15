import Section from "./Section";
import Reveal from "./Reveal";
import { EXPERIENCES } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="01" title="Experience">
      <ol>
        {EXPERIENCES.map((job) => (
          <li key={`${job.company}-${job.start}`} className="group border-b border-paper-border pb-12 pt-2">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-3xl font-light transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                  {job.role}
                </h3>
                <p className="text-sm text-paper-muted">
                  {job.start} — {job.end ?? "Present"}
                </p>
              </div>
              <p className="mt-3 text-paper-muted">
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 transition-colors hover:text-paper-fg hover:underline"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </p>
              <p className="mt-6 max-w-2xl text-paper-muted">{job.summary}</p>
              <ul className="mt-5 max-w-2xl space-y-2.5 text-sm text-paper-muted">
                {job.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
