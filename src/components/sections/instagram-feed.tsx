import Link from "next/link";
import { Camera } from "lucide-react";
import type { InstagramMediaItem, InstagramProfileMeta } from "@/lib/instagram";
import { siteConfig } from "@/data/site";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InstagramMediaGrid } from "@/components/instagram/media-grid";

type InstagramFeedSectionProps = {
  media: InstagramMediaItem[];
  profile: InstagramProfileMeta | null;
};

function formatCount(n?: number) {
  if (n === undefined) return null;
  return new Intl.NumberFormat("en-IN").format(n);
}

export function InstagramFeedSection({
  media,
  profile,
}: InstagramFeedSectionProps) {
  const handle = siteConfig.instagramHandle;

  return (
    <section
      id="instagram"
      className="border-t border-border py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent sm:text-xs sm:tracking-[0.35em]">
              Instagram
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-tight tracking-tight sm:mt-4 md:text-5xl">
              On the platform
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              Training, lifts, and coaching — follow{" "}
              <span className="text-foreground">@{handle}</span> for the latest
              posts.
            </p>
            {(profile?.followers || profile?.postsCount) && (
              <ul className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest text-muted sm:text-xs">
                {profile.followers !== undefined && (
                  <li className="rounded-full border border-border px-3 py-1">
                    {formatCount(profile.followers)} followers
                  </li>
                )}
                {profile.postsCount !== undefined && (
                  <li className="rounded-full border border-border px-3 py-1">
                    {formatCount(profile.postsCount)} posts
                  </li>
                )}
              </ul>
            )}
          </div>
          <Link
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent sm:w-auto sm:py-2.5 sm:text-xs sm:tracking-[0.15em]"
          >
            <Camera className="h-4 w-4" aria-hidden />
            Follow @{handle}
          </Link>
        </ScrollReveal>

        {media.length > 0 ? (
          <InstagramMediaGrid media={media} />
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-6 sm:mt-12 sm:p-10">
            <p className="text-sm text-muted">
              Instagram previews could not be loaded.{" "}
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Open @{handle}
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
