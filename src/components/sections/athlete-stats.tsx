import Link from "next/link";
import Image from "next/image";
import { achievements, stats } from "@/data/site";
import type { InstagramMediaItem } from "@/lib/instagram";
import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Spotlight } from "@/components/ui/spotlight";

type AthleteStatsSectionProps = {
  instagramFeed?: InstagramMediaItem[];
};

export function AthleteStatsSection({
  instagramFeed = [],
}: AthleteStatsSectionProps) {
  return (
    <section id="athlete" className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Athlete
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase tracking-tight md:text-5xl">
            Numbers that matter
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <Spotlight className="h-full p-6 md:p-8">
                <p className="font-display text-3xl font-bold text-accent sm:text-4xl md:text-5xl">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm leading-snug text-muted">{stat.label}</p>
              </Spotlight>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-24">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
            The work speaks.
          </h3>
          <p className="mt-3 max-w-2xl text-muted">
            Delhi State Powerlifting Championship titles — on and off the platform.
          </p>
        </ScrollReveal>

        <ol className="relative mt-12 space-y-0 border-l border-border pl-6 sm:pl-8 md:pl-12">
          {achievements.map((item, i) => {
            const ig = instagramFeed.length
              ? instagramFeed[(i + 6) % instagramFeed.length]
              : undefined;
            const src = ig?.mediaUrl ?? item.image;
            const href = ig?.permalink;

            return (
              <li key={item.year} className="relative pb-16 last:pb-0">
                <ScrollReveal delay={i * 0.1}>
                  <span
                    className="absolute -left-[calc(1.5rem+1px)] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background sm:-left-[calc(2rem+1px)] md:-left-[calc(3rem+1px)]"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
                    <div>
                      <p className="font-display text-5xl font-bold text-foreground/20">
                        {item.year}
                      </p>
                      <h4 className="mt-2 text-xl font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-accent">{item.detail}</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                      {href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative block h-full w-full"
                        >
                          <Image
                            src={src}
                            alt={`${item.year} ${item.title}`}
                            fill
                            className="object-cover"
                            sizes="280px"
                            unoptimized={src.startsWith("http")}
                          />
                        </Link>
                      ) : (
                        <Image
                          src={src}
                          alt={`${item.year} ${item.title}`}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
