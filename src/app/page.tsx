import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-cta";
import { HeroSection } from "@/components/sections/hero";
import { AthleteStatsSection } from "@/components/sections/athlete-stats";
import { JourneySection } from "@/components/sections/journey";
import { InstagramFeedSection } from "@/components/sections/instagram-feed";
import { CoachingServicesSection } from "@/components/sections/coaching-services";
import { CoachingCtaBand } from "@/components/sections/coaching-cta-band";
import { MethodologySection } from "@/components/sections/methodology";
import { ResultsSection } from "@/components/sections/results";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { loadSiteInstagramContext } from "@/lib/load-instagram";

export default async function Home() {
  const { feed, profile, heroImage } = await loadSiteInstagramContext();

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip pb-24 lg:pb-0">
        <HeroSection featuredImage={heroImage} />
        <AthleteStatsSection instagramFeed={feed} />
        <JourneySection instagramFeed={feed} />
        <InstagramFeedSection media={feed} profile={profile} />
        <CoachingServicesSection />
        <MethodologySection />
        <CoachingCtaBand />
        <ResultsSection />
        <AboutSection profileImageUrl={profile?.profileImageUrlLarge} />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
