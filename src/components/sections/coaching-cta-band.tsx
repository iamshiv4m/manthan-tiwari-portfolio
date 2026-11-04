import { whatsappUrl } from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CtaButton } from "@/components/ui/cta-button";

export function CoachingCtaBand() {
  return (
    <section className="border-t border-border bg-accent/5 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-start gap-8 rounded-2xl border border-accent/20 bg-card/80 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Start today
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              Ready for a plan built around you?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Tell Manthan your goal — competition, strength, or physique — and
              get a clear next step within 24 hours.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[280px]">
            <CtaButton href="#contact" variant="primary" fullWidth size="lg">
              Send enquiry
            </CtaButton>
            <CtaButton
              href={whatsappUrl}
              variant="whatsapp"
              fullWidth
              size="md"
            >
              Message on WhatsApp
            </CtaButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
