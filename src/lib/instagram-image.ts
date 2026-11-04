const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; ManthanPortfolioBot/1.0; +https://manthantiwari.com)",
  Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
};

export async function fetchCdnImageAsDataUrl(
  url: string,
): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const mime = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}
