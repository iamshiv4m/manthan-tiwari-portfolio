import { coachingProcess, faqItems, siteConfig } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

export function JsonLdScripts() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Powerlifting Coach & Strength Coach",
    description:
      "Three-time Delhi State Powerlifting Champion offering online powerlifting, physique, and strength coaching.",
    url: siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.social.instagram],
    knowsAbout: [
      "Powerlifting",
      "Strength training",
      "Bodybuilding",
      "Online coaching",
    ],
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Online Coaching`,
    description:
      "Online powerlifting, bodybuilding, and personalized strength coaching.",
    url: siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [siteConfig.social.instagram],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How coaching with Manthan Tiwari works",
    description: "From enquiry to individualized programming and progress tracking.",
    step: coachingProcess.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    potentialAction: {
      "@type": "ContactAction",
      target: `${siteUrl}/#contact`,
      name: "Coaching enquiry",
    },
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [person, professionalService, faqPage, howTo, webSite],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
