"use client";

import { siteConfig, whatsappUrl } from "@/data/site";
import { CtaButton } from "@/components/ui/cta-button";

export function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 p-3 backdrop-blur-md supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <CtaButton
          href={whatsappUrl}
          variant="whatsapp"
          fullWidth
          size="md"
        >
          WhatsApp
        </CtaButton>
        <CtaButton href="#contact" variant="primary" fullWidth size="md">
          Enquire
        </CtaButton>
      </div>
    </div>
  );
}
