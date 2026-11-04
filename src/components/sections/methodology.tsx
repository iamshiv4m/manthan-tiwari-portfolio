import { methodology } from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function MethodologySection() {
  return (
    <section className="border-t border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Methodology
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Train with purpose.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {methodology.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1}>
              <article className="group relative h-full rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent/40">
                <span className="font-display text-4xl font-bold text-foreground/10 transition-colors group-hover:text-accent/30">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-wide text-accent">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                {i < methodology.length - 1 && (
                  <span
                    className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-border lg:block"
                    aria-hidden
                  />
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
