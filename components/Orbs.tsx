type Orb = {
  /** position / size / extra-filter utility classes */
  className: string;
  /** accent strength for color-mix, in percent */
  mix: number;
};

type Props = {
  orbs: Orb[];
  /** overrides the theme default (0.35 dark / 0.22 light) */
  opacity?: number;
};

// Blurred accent glows behind a section's content. Rendered at -z-10, so the
// section itself must be `relative isolate` for the orbs to sit between the
// section background and its content.
export default function Orbs({ orbs, opacity }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={
        opacity !== undefined
          ? ({ "--orb-opacity": opacity } as React.CSSProperties)
          : undefined
      }
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`orb ${orb.className}`}
          style={{ background: `color-mix(in srgb, var(--accent) ${orb.mix}%, transparent)` }}
        />
      ))}
    </div>
  );
}
