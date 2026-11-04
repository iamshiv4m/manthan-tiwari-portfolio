"use client";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/site";

type InfiniteMovingCardsProps = {
  items: Testimonial[];
  className?: string;
};

export function InfiniteMovingCards({
  items,
  className,
}: InfiniteMovingCardsProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-4 motion-reduce:flex-wrap motion-reduce:animate-none">
        {doubled.map((item, idx) => (
          <article
            key={`${item.id}-${idx}`}
            className={cn(
              "w-[min(100vw-2rem,380px)] shrink-0 rounded-2xl border border-border bg-card p-6",
              item.placeholder && "border-dashed border-muted/40",
            )}
          >
            {item.placeholder && (
              <span className="mb-3 inline-block text-[10px] font-medium uppercase tracking-widest text-accent">
                Placeholder
              </span>
            )}
            <p className="text-sm leading-relaxed text-muted">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-4 border-t border-border pt-4">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted">{item.role}</p>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
