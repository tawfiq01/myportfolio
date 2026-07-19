import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { getGalleryImages } from "@/lib/queries";

export default async function Gallery() {
  const images = await getGalleryImages();
  if (images.length === 0) return null;

  return (
    <Section id="gallery" eyebrow="04" title="Gallery">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((image, i) => (
          <Reveal key={image.imageUrl} delay={(i % 3) * 100}>
            <figure className="group relative overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.imageUrl}
                  alt={image.title || "Gallery image"}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {image.title && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.title}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
