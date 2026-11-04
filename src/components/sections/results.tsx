import Image from "next/image";
import {
  athleteSpotlights,
  testimonials,
  transformations,
} from "@/data/site";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Spotlight } from "@/components/ui/spotlight";

export function ResultsSection() {
  return (
    <section id="results" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Results
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            The athletes. The results.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Training progress and athlete stories — add verified client results
            when ready.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {transformations.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <Spotlight className="p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-muted">
                      Before
                    </p>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
                      <Image
                        src={item.beforeSrc}
                        alt={`Before — ${item.title}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-muted">
                      After
                    </p>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
                      <Image
                        src={item.afterSrc}
                        alt={`After — ${item.title}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  </div>
                </div>
              </Spotlight>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            Athlete spotlights
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {athleteSpotlights.map((athlete) => (
              <article
                key={athlete.id}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-medium">{athlete.name}</p>
                <p className="mt-1 text-sm text-accent">{athlete.achievement}</p>
                <p className="mt-3 text-sm text-muted">{athlete.note}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-20">
          <ScrollReveal>
            <h3 className="text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </h3>
          </ScrollReveal>
          <div className="mt-8">
            <InfiniteMovingCards items={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
