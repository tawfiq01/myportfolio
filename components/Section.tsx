import Reveal from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

// Section shell for the light "work" zone: small uppercase label row with a
// divider, content beneath. Colors assume a `bg-paper text-paper-fg` ancestor.
export default function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-paper-border pb-6 text-paper-muted">
            <p className="text-xs uppercase tracking-[0.25em]">{title}</p>
            <span className="text-xs">/{eyebrow}</span>
          </div>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
