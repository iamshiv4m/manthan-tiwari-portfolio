import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

const highlights = [
  "Three-time Delhi State Powerlifting Champion",
  "2 years of coaching experience",
  "50+ athletes coached",
  "Strength and physique development",
  "Individualized training plans",
] as const;

type AboutSectionProps = {
  profileImageUrl?: string;
};

export function AboutSection({ profileImageUrl }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="border-t border-border bg-card py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border">
              {profileImageUrl ? (
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-full w-full"
                >
                  <Image
                    src={profileImageUrl}
                    alt={`${siteConfig.name} — profile photo from Instagram`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    unoptimized
                  />
                </Link>
              ) : (
                <PlaceholderImage
                  src="/images/about.jpg"
                  alt="Manthan Tiwari — coach and athlete portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  label="About photo"
                  placeholderOnly
                />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              About
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase tracking-tight md:text-5xl">
              Coaching built on experience.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Manthan Tiwari is a competitive powerlifter and strength and physique
              coach with two years of online coaching experience. Having coached
              more than 50 athletes across powerlifting and bodybuilding, he
              combines competitive experience with individualized programming,
              technical coaching, progressive overload, and athlete accountability.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">{siteConfig.tagline}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
