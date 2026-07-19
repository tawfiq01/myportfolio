import Magnetic from "./Magnetic";
import Orbs from "./Orbs";
import Reveal from "./Reveal";
import { getSiteContent } from "@/lib/queries";

export default async function About() {
  const site = await getSiteContent();

  return (
    <section id="about" className="relative isolate scroll-mt-24 bg-background text-foreground">
      <Orbs
        opacity={0.22}
        orbs={[
          {
            className:
              "orb-b right-[-14%] top-[-18%] h-[28rem] w-[28rem] [filter:blur(90px)_hue-rotate(40deg)]",
            mix: 45,
          },
          { className: "orb-c bottom-[-22%] left-[-10%] h-[24rem] w-[24rem]", mix: 45 },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-40">
        <div className="grid items-start gap-14 sm:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <p className="text-2xl font-light leading-snug sm:text-4xl">{site.heroIntro}</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
              {site.aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={250} className="mt-16 flex justify-center sm:justify-end sm:pr-24">
          <Magnetic>
            <a
              href="#experience"
              className="fill-hover flex h-40 w-40 items-center justify-center rounded-full border border-foreground/20 text-sm sm:h-44 sm:w-44"
            >
              <span>My journey</span>
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
