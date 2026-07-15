import Section from "./Section";
import Reveal from "./Reveal";
import { SOCIAL } from "@/lib/site";
import { getProjects } from "@/lib/queries";

export default async function Projects() {
  const PROJECTS = await getProjects();
  return (
    <Section id="projects" eyebrow="03" title="Case studies">
      <ul className="dim-list">
        {PROJECTS.map((project) => (
          <li key={project.name} className="group border-b border-paper-border first:border-t">
            <Reveal>
              <div className="flex flex-col gap-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-light transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper-muted">{project.description}</p>
                </div>
                <div className="shrink-0 text-sm text-paper-muted sm:max-w-[220px] sm:text-right">
                  <ul className="space-y-1">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-paper-fg underline-offset-4 hover:underline"
                    >
                      View <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={100}>
        <p className="mt-10 text-sm text-paper-muted">
          More on{" "}
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noreferrer"
            className="text-paper-fg underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
