import { coachingProcess, faqItems } from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CtaButton } from "@/components/ui/cta-button";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-card py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase tracking-tight md:text-5xl">
            Coaching, answered.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            How it works
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coachingProcess.map((step) => (
              <li
                key={step.step}
                className="rounded-xl border border-border bg-background p-5"
              >
                <span className="font-display text-2xl font-bold text-accent/80">
                  {step.step}
                </span>
                <p className="mt-2 font-semibold text-foreground">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <div className="mt-16 divide-y divide-border rounded-2xl border border-border bg-background">
          {faqItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={(i % 4) * 0.05}>
              <details className="group px-5 py-4 sm:px-6 sm:py-5">
                <summary className="cursor-pointer list-none text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span
                      className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaButton href="#contact" variant="primary" size="md">
            Still have questions? Enquire
          </CtaButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
