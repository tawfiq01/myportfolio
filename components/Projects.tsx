import Section from "./Section";
import { SOCIAL } from "@/lib/site";

type Project = {
  name: string;
  description: string;
  tech: string[];
  href: string | null;
  highlight: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "RideTrack",
    description:
      "A Strava-style community app for bike and car enthusiasts. Live GPS activity recording with real-time distance/speed stats and route drawing on a map, activity feed, profiles, vehicles and clubs — built mobile-first with a web preview.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "react-native-maps", "Leaflet"],
    href: "https://github.com/tawfiq01/ridetrack",
    highlight: true,
  },
  // TODO: Add more of your projects below — 2–4 strong ones beat a long list.
  {
    name: "Your next project",
    description:
      "Placeholder — describe a project you're proud of: the problem, what you built, and the result.",
    tech: ["—"],
    href: null,
    highlight: false,
  },
];

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03." title="Projects">
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
