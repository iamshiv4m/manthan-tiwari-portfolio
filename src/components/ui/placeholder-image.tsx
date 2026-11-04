"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

type PlaceholderImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  label?: string;
  /** Skip network request — show styled placeholder until real asset exists */
  placeholderOnly?: boolean;
};

export function PlaceholderImage({
  src,
  alt,
  className,
  fill,
  priority,
  sizes,
  label = "Replace image",
  placeholderOnly = false,
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);

  if (placeholderOnly || failed) {
    return (
      <div
        className={cn(
          "relative flex items-end bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4",
          fill && "absolute inset-0",
          className,
        )}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(200,255,0,0.25), transparent 50%)",
          }}
        />
        <span className="relative z-10 text-[10px] font-medium uppercase tracking-widest text-muted">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
