import Section from "./Section";
import Reveal from "./Reveal";
import { getSkillGroups } from "@/lib/queries";

export default async function Skills() {
  const SKILL_GROUPS = await getSkillGroups();
  return (
    <Section id="skills" eyebrow="02" title="Skills">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 100}>
            <div className="group">
              <p className="text-sm text-paper-muted transition-colors duration-300 group-hover:text-accent">
                0{i + 1}
              </p>
              <div className="mt-4 h-px bg-paper-border transition-colors duration-300 group-hover:bg-accent" />
              <h3 className="mt-6 text-xl font-medium">{group.label}</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-paper-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
