import { cache } from "react";
import {
  fetchInstagramProfile,
  getInstagramFeed,
  type InstagramMediaItem,
  type InstagramProfileMeta,
} from "@/lib/instagram";
import { instagramPostUrls, siteConfig } from "@/data/site";

export const loadInstagramFeed = cache(async () =>
  getInstagramFeed(instagramPostUrls, 9),
);

export const loadInstagramProfile = cache(async () =>
  fetchInstagramProfile(siteConfig.social.instagram),
);

export type FeaturedHeroImage = {
  src: string;
  alt: string;
  href?: string;
};

/** Prefer a still photo post over reels; fall back to profile picture. */
export function pickHeroImage(
  feed: InstagramMediaItem[],
  profile: InstagramProfileMeta | null,
): FeaturedHeroImage | undefined {
  const photoPost =
    feed.find((item) => item.mediaType === "IMAGE") ??
    feed.find((item) => item.permalink.includes("/p/")) ??
    feed[0];

  if (photoPost?.mediaUrl) {
    return {
      src: photoPost.mediaUrl,
      alt:
        photoPost.caption?.slice(0, 160) ||
        `${siteConfig.name} — training photo from Instagram`,
      href: photoPost.permalink,
    };
  }

  const profilePic =
    profile?.profileImageUrlLarge ?? profile?.profileImageUrl;
  if (profilePic) {
    return {
      src: profilePic,
      alt: `${profile?.displayName ?? siteConfig.name} — profile photo`,
      href: siteConfig.social.instagram,
    };
  }

  return undefined;
}

export async function loadFeaturedHeroImage(): Promise<
  FeaturedHeroImage | undefined
> {
  const [feed, profile] = await Promise.all([
    loadInstagramFeed(),
    loadInstagramProfile(),
  ]);
  return pickHeroImage(feed, profile);
}

export async function loadSiteInstagramContext() {
  const [feed, profile] = await Promise.all([
    loadInstagramFeed(),
    loadInstagramProfile(),
  ]);
  return {
    feed,
    profile,
    heroImage: pickHeroImage(feed, profile),
  };
}
