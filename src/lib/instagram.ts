import { siteConfig } from "@/data/site";

export type InstagramMediaItem = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  permalink: string;
  thumbnailUrl?: string;
  timestamp: string;
};

type GraphMediaNode = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
};

type GraphMediaResponse = {
  data?: GraphMediaNode[];
  error?: { message: string; type: string };
};

const FIELDS =
  "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; ManthanPortfolioBot/1.0; +https://manthantiwari.com)",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "en-US,en;q=0.9",
};

function decodeHtmlAttr(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#064;/g, "@")
    .replace(/&#x2022;/g, "·");
}

/** Request a larger profile photo when OG returns 150×150. */
export function upscaleInstagramCdnUrl(url: string, target = 640): string {
  return url
    .replace(/s150x150/g, `s${target}x${target}`)
    .replace(/s640x640/g, `s${target}x${target}`)
    .replace(
      /stp=dst-jpg_s150x150_tt6/g,
      `stp=dst-jpg_e35_s${target}x${target}_tt6`,
    );
}

export type InstagramProfileMeta = {
  displayName: string;
  profileImageUrl: string;
  profileImageUrlLarge: string;
  followers?: number;
  following?: number;
  postsCount?: number;
};

function parseInstagramOgStats(description: string) {
  const match = description.match(
    /([\d,]+)\s+Followers,\s+([\d,]+)\s+Following,\s+([\d,]+)\s+Posts/i,
  );
  if (!match) return {};
  const toNum = (s: string) => parseInt(s.replace(/,/g, ""), 10);
  return {
    followers: toNum(match[1]),
    following: toNum(match[2]),
    postsCount: toNum(match[3]),
  };
}

function parseDisplayNameFromOgTitle(title: string) {
  const cleaned = decodeHtmlAttr(title);
  const beforeParen = cleaned.split("(")[0]?.trim() ?? cleaned;
  return beforeParen.replace(/\s·.*$/, "").trim();
}

async function fetchOgMetaFromUrl(pageUrl: string) {
  try {
    const res = await fetch(pageUrl, {
      headers: FETCH_HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const imageMatch = html.match(/property="og:image" content="([^"]+)"/);
    const descMatch = html.match(/property="og:description" content="([^"]+)"/);
    const titleMatch = html.match(/property="og:title" content="([^"]+)"/);
    if (!imageMatch?.[1]) return null;
    return {
      mediaUrl: decodeHtmlAttr(imageMatch[1]),
      caption: descMatch?.[1] ? decodeHtmlAttr(descMatch[1]) : undefined,
      title: titleMatch?.[1] ? decodeHtmlAttr(titleMatch[1]) : undefined,
    };
  } catch {
    return null;
  }
}

async function fetchOgFromUrl(pageUrl: string) {
  const meta = await fetchOgMetaFromUrl(pageUrl);
  if (!meta) return null;
  return { mediaUrl: meta.mediaUrl, caption: meta.caption };
}

export async function fetchInstagramProfile(
  profileUrl: string,
): Promise<InstagramProfileMeta | null> {
  const meta = await fetchOgMetaFromUrl(profileUrl);
  if (!meta?.mediaUrl) return null;

  const stats = meta.caption ? parseInstagramOgStats(meta.caption) : {};
  const profileImageUrl = meta.mediaUrl;
  const profileImageUrlLarge =
    upscaleInstagramCdnUrl(profileImageUrl, 640) || profileImageUrl;

  return {
    displayName: meta.title
      ? parseDisplayNameFromOgTitle(meta.title)
      : siteConfig.name,
    profileImageUrl,
    profileImageUrlLarge,
    ...stats,
  };
}

async function fetchGraphInstagramMedia(
  limit: number,
): Promise<InstagramMediaItem[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) return null;

  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", String(limit));

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as GraphMediaResponse;
    if (json.error || !json.data?.length) return null;

    return json.data
      .filter((item) => item.media_url || item.thumbnail_url)
      .map((item) => ({
        id: item.id,
        caption: item.caption,
        mediaType: item.media_type as InstagramMediaItem["mediaType"],
        mediaUrl: item.media_url ?? item.thumbnail_url ?? "",
        permalink: item.permalink,
        thumbnailUrl: item.thumbnail_url,
        timestamp: item.timestamp,
      }));
  } catch {
    return null;
  }
}

/** Fetches preview images from public post/reel pages (og:image). */
export async function fetchInstagramFromPermalinks(
  permalinks: readonly string[],
  limit = 9,
): Promise<InstagramMediaItem[]> {
  const urls = permalinks.slice(0, limit);
  const results = await Promise.all(
    urls.map(async (permalink) => {
      const og = await fetchOgFromUrl(permalink);
      if (!og) return null;
      const slug = permalink.split("/").filter(Boolean).pop() ?? permalink;
      const isReel = permalink.includes("/reel/");
      const item: InstagramMediaItem = {
        id: `ig-${slug}`,
        caption: og.caption,
        mediaType: isReel ? "VIDEO" : "IMAGE",
        mediaUrl: og.mediaUrl,
        permalink,
        timestamp: "",
      };
      return item;
    }),
  );
  return results.filter((item): item is InstagramMediaItem => item !== null);
}

export async function fetchInstagramProfileImage(
  profileUrl: string,
): Promise<string | null> {
  const profile = await fetchInstagramProfile(profileUrl);
  return profile?.profileImageUrlLarge ?? profile?.profileImageUrl ?? null;
}

/** Graph API → public permalink previews → null */
export async function getInstagramFeed(
  permalinks: readonly string[],
  limit = 9,
): Promise<InstagramMediaItem[]> {
  const fromGraph = await fetchGraphInstagramMedia(limit);
  if (fromGraph?.length) return fromGraph.slice(0, limit);

  if (permalinks.length === 0) return [];

  return fetchInstagramFromPermalinks(permalinks, limit);
}

export async function fetchInstagramMedia(
  limit = 6,
): Promise<InstagramMediaItem[] | null> {
  const fromGraph = await fetchGraphInstagramMedia(limit);
  return fromGraph;
}
