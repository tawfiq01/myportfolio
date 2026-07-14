import Section from "./Section";
import { EXPERIENCES } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02." title="Where I've worked">
      <ol className="relative space-y-12 border-l border-border pl-8">
        {EXPERIENCES.map((job) => (
          <li key={`${job.company}-${job.start}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
            />
            <p className="font-mono text-xs text-accent-2">
              {job.start} — {job.end ?? "Present"}
            </p>
            <h3 className="mt-2 text-xl font-bold">
              {job.role}{" "}
              <span className="text-muted">
                @{" "}
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent-2"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
            </h3>
            <p className="mt-3 max-w-2xl text-muted">{job.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {job.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-accent">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
