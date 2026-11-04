import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { siteConfig } from "@/data/site";
import { loadInstagramFeed, loadInstagramProfile, pickHeroImage } from "@/lib/load-instagram";
import { siteUrl } from "@/lib/site-url";
import { JsonLdScripts } from "@/components/seo/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseTitle = "Manthan Tiwari | Powerlifting Champion & Strength Coach";
const baseDescription =
  "Train with Manthan Tiwari, three-time Delhi State Powerlifting Champion and strength coach. Online powerlifting, bodybuilding, and personalized strength coaching.";

export async function generateMetadata(): Promise<Metadata> {
  const [feed, profile] = await Promise.all([
    loadInstagramFeed(),
    loadInstagramProfile(),
  ]);
  const hero = pickHeroImage(feed, profile);
  const iconUrl =
    profile?.profileImageUrlLarge ?? profile?.profileImageUrl ?? undefined;
  const ogImage = hero?.src ?? iconUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: baseTitle,
    description: baseDescription,
    icons: iconUrl
      ? {
          icon: [{ url: iconUrl, sizes: "any" }],
          apple: [{ url: iconUrl, sizes: "180x180" }],
        }
      : undefined,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      type: "website",
      locale: "en_IN",
      images: ogImage ? [{ url: ogImage, alt: hero?.alt ?? siteConfig.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: baseDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <JsonLdScripts />
        {children}
      </body>
    </html>
  );
}
