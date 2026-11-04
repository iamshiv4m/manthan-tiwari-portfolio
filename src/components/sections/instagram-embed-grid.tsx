"use client";

import { useEffect } from "react";

type InstagramEmbedGridProps = {
  urls: readonly string[];
};

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramEmbedGrid({ urls }: InstagramEmbedGridProps) {
  useEffect(() => {
    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, [urls]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {urls.map((url) => (
        <blockquote
          key={url}
          className="instagram-media mx-auto max-w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#0c0c0c",
            border: 0,
            borderRadius: 12,
            margin: 0,
            maxWidth: 540,
            minWidth: 280,
            padding: 0,
            width: "100%",
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View post on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}
