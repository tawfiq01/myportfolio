const GREETINGS = ["Hello", "Bonjour", "Ciao", "Olà", "おはよう", "Hallo", "Hola", "স্বাগতম"];

// Multilingual greeting overlay shown on load, then lifted away with a curved
// edge. The whole timeline is CSS keyframes (see globals.css), so this stays a
// server component and never causes hydration work.
export default function Preloader() {
  return (
    <div aria-hidden className="preloader fixed inset-0 z-[60] flex items-center justify-center bg-drawer">
      <div className="relative h-12 w-full">
        {GREETINGS.map((greeting, i) => (
          <span
            key={greeting}
            style={{ animationDelay: `${0.25 + i * 0.2}s` }}
            className={`preloader-word absolute inset-0 flex items-center justify-center gap-3 text-3xl text-foreground sm:text-4xl ${
              i === GREETINGS.length - 1 ? "is-last" : ""
            }`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            {greeting}
          </span>
        ))}
      </div>
    </div>
  );
}
