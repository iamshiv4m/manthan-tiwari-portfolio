import { Dumbbell, Globe, Scan, Target } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { services } from "@/data/site";

const icons = {
  dumbbell: Dumbbell,
  scan: Scan,
  target: Target,
  globe: Globe,
} as const;

export function CoachingServicesSection() {
  return (
    <section id="coaching" className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Coaching
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
            Your goals.
            <br />
            My game plan.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <ScrollReveal key={service.id} delay={i * 0.08}>
                <Spotlight className="flex h-full flex-col p-8">
                  <Icon className="h-8 w-8 text-accent" aria-hidden />
                  <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <CtaButton
                    href="#contact"
                    variant="outline"
                    fullWidth
                    className="mt-8"
                  >
                    Enquire about this
                  </CtaButton>
                </Spotlight>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
