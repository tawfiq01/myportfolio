import Section from "./Section";
import { SOCIAL } from "@/lib/site";
import { PROJECTS } from "@/lib/content";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="04." title="Case studies">
      <div className="space-y-6">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className={`group rounded-2xl border bg-card p-8 transition-all hover:-translate-y-1 ${
              project.highlight ? "border-accent/40" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors group-hover:text-accent-2"
                  >
                    {project.name} <span aria-hidden>↗</span>
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              {project.highlight && (
                <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs text-accent">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-3 max-w-2xl text-muted">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-accent-2">
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        More on{" "}
        <a href={SOCIAL.github} target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}
