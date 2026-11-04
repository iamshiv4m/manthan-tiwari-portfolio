"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CtaButton } from "@/components/ui/cta-button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SplitText } from "@/components/ui/split-text";
import type { FeaturedHeroImage } from "@/lib/load-instagram";

type HeroSectionProps = {
  featuredImage?: FeaturedHeroImage;
};

export function HeroSection({ featuredImage }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-background pt-20 sm:pt-24"
    >
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
      <BackgroundBeams />

      <div className="relative mx-auto grid max-w-7xl min-h-[calc(100dvh-5rem)] grid-cols-1 items-center gap-8 px-4 pb-20 sm:gap-10 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-16">
        <div className="z-10 order-2 flex min-w-0 flex-col justify-center lg:order-1">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-accent sm:mb-4 sm:text-xs sm:tracking-[0.35em]">
            Manthan Tiwari
          </p>
          <SplitText
            text={"BUILT BY\nIRON.\nDEFINED BY\nDISCIPLINE."}
            className="font-display text-[clamp(2rem,10vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-foreground break-words"
          />
          <p className="mt-4 max-w-md text-xs font-medium uppercase tracking-[0.12em] text-muted sm:mt-6 sm:text-sm sm:tracking-widest md:text-base">
            From the platform to your personal best.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            Three-time Delhi State Powerlifting Champion. Strength and physique
            coach helping athletes build strength, improve performance, and
            transform their training.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch sm:gap-4">
            <CtaButton
              href="#contact"
              variant="primary"
              fullWidth
              size="lg"
            >
              Start coaching
            </CtaButton>
            <CtaButton href="#athlete" variant="secondary" fullWidth size="lg">
              Athlete journey
            </CtaButton>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-full max-h-[52vh] min-h-[240px] sm:max-h-[60vh] lg:order-2 lg:max-h-none lg:min-h-[320px]">
          <div
            className="absolute -inset-2 rounded-3xl bg-accent/10 blur-2xl sm:-inset-4 sm:blur-3xl"
            aria-hidden
          />
          <div className="relative h-full overflow-hidden rounded-xl border border-border sm:rounded-2xl">
            {featuredImage ? (
              <>
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                {featuredImage.href && (
                  <Link
                    href={featuredImage.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-accent backdrop-blur-sm sm:bottom-4 sm:right-4 sm:text-[10px]"
                  >
                    @MANTHANLIFTS
                  </Link>
                )}
              </>
            ) : (
              <PlaceholderImage
                src="/images/hero.jpg"
                alt="Manthan Tiwari powerlifting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                label="Hero photo"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <a
        href="#athlete"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-accent sm:bottom-8 sm:flex"
        aria-label="Scroll to athlete section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
