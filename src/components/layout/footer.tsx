import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-display text-lg font-bold uppercase tracking-[0.3em]">
            Manthan Tiwari
          </p>
          <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              <a
                href={`https://wa.me/${siteConfig.phoneHref}`}
                className="hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Social
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-accent"
              >
                Instagram · @{siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {year} Manthan Tiwari. All rights reserved.
      </div>
    </footer>
  );
}
