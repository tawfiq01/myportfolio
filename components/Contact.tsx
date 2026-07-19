import Magnetic from "./Magnetic";
import Orbs from "./Orbs";
import Reveal from "./Reveal";
import { getSiteContent } from "@/lib/queries";

export default async function Contact() {
  const site = await getSiteContent();

  return (
    <section id="contact" className="relative isolate scroll-mt-24 bg-background text-foreground">
      <Orbs
        opacity={0.26}
        orbs={[
          { className: "orb-a left-[-10%] top-[18%] h-[30rem] w-[30rem]", mix: 50 },
          {
            className:
              "orb-c right-[-8%] bottom-[-15%] h-[26rem] w-[26rem] [filter:blur(90px)_hue-rotate(45deg)]",
            mix: 45,
          },
        ]}
      />
      {/* Light section curving away into the dark footer.
          overflow-hidden: the 120%-wide curve must not widen the page layout. */}
      <div aria-hidden className="overflow-hidden">
        <div className="-ml-[10%] h-16 w-[120%] rounded-b-[100%] bg-paper sm:h-24" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:px-10 sm:pt-36">
        <Reveal>
          <h2 className="text-5xl font-light leading-tight sm:text-7xl">
            Let&apos;s work
            <br />
            together
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mt-16 sm:mt-24">
            <div className="h-px w-full bg-foreground/20" />
            <Magnetic className="absolute right-2 top-0 -translate-y-1/2 sm:right-[12%]">
              <a
                href={`mailto:${site.email}`}
                className="fill-hover flex h-32 w-32 items-center justify-center rounded-full bg-accent text-center text-sm text-white [--fill:var(--accent-deep)] sm:h-44 sm:w-44 sm:text-base"
              >
                <span>{site.contactCtaLabel}</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-28 max-w-md text-sm leading-relaxed text-muted sm:mt-36 sm:text-base">
            {site.contactBlurb}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="fill-hover inline-block rounded-full border border-foreground/20 px-8 py-4 text-sm"
            >
              <span>{site.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
