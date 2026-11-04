import Link from "next/link";
import Image from "next/image";
import type { InstagramMediaItem } from "@/lib/instagram";
import { siteConfig } from "@/data/site";

type InstagramMediaGridProps = {
  media: InstagramMediaItem[];
  className?: string;
};

export function InstagramMediaGrid({ media, className }: InstagramMediaGridProps) {
  const handle = siteConfig.instagramHandle;

  if (!media.length) return null;

  return (
    <ul
      className={
        className ??
        "mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 md:grid-cols-3 lg:gap-4"
      }
    >
      {media.map((item) => (
        <li key={item.id} className="min-w-0">
          <Link
            href={item.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-lg border border-border bg-card sm:rounded-xl"
          >
            <Image
              src={item.mediaUrl}
              alt={
                item.caption?.slice(0, 120) ||
                `Instagram post by @${handle}`
              }
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              unoptimized
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-active:bg-black/20 sm:group-hover:bg-black/30" />
            {item.mediaType === "VIDEO" && (
              <span className="absolute right-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] uppercase tracking-widest sm:right-2 sm:top-2 sm:text-[10px]">
                Reel
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
