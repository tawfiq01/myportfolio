import Section from "./Section";
import Reveal from "./Reveal";
import { SKILL_GROUPS } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02" title="Skills">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 100}>
            <p className="text-sm text-paper-muted">0{i + 1}</p>
            <div className="mt-4 h-px bg-paper-border" />
            <h3 className="mt-6 text-xl font-medium">{group.label}</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-paper-muted">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
