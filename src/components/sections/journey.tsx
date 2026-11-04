import Link from "next/link";
import Image from "next/image";
import { galleryItems, journeyPillars } from "@/data/site";
import type { InstagramMediaItem } from "@/lib/instagram";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type JourneySectionProps = {
  instagramFeed?: InstagramMediaItem[];
};

function pickFeedPhoto(
  feed: InstagramMediaItem[],
  index: number,
): InstagramMediaItem | undefined {
  if (!feed.length) return undefined;
  return feed[index % feed.length];
}

function GalleryPhoto({
  ig,
  localSrc,
  alt,
  sizes,
  className,
}: {
  ig?: InstagramMediaItem;
  localSrc: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const src = ig?.mediaUrl ?? localSrc;
  const href = ig?.permalink;
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      className={className ?? "object-cover"}
      sizes={sizes}
      unoptimized={src.startsWith("http")}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-full w-full"
      >
        {image}
      </Link>
    );
  }

  return <div className="relative h-full w-full">{image}</div>;
}

export function JourneySection({ instagramFeed = [] }: JourneySectionProps) {
  const featurePhoto = pickFeedPhoto(instagramFeed, 1) ?? pickFeedPhoto(instagramFeed, 0);

  return (
    <section className="border-t border-border bg-card py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Journey
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-tight tracking-tight md:text-5xl">
              More than the medals.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Competition titles are the outcome. The work happens in years of
              disciplined training — refining technique, building capacity, and
              showing up when motivation fades.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {journeyPillars.map((pillar) => (
                <li
                  key={pillar}
                  className="border-l-2 border-accent/60 pl-4 text-sm font-medium uppercase tracking-wide text-foreground"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <GalleryPhoto
                ig={featurePhoto}
                localSrc="/images/gallery/competition.jpg"
                alt="Competition and training — Manthan Tiwari"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => {
            const ig = pickFeedPhoto(instagramFeed, i);
            return (
              <ScrollReveal key={item.id} delay={(i % 3) * 0.08}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                  <GalleryPhoto
                    ig={ig}
                    localSrc={item.src}
                    alt={item.alt}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-xs uppercase tracking-widest text-accent">
                      {item.category}
                    </p>
                    <p className="text-sm font-medium">{item.title}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
