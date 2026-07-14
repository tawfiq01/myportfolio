import Section from "./Section";
import { SKILL_GROUPS } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="03." title="Skills & tools">
      <div className="grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="font-mono text-sm text-accent-2">{group.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
