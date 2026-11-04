export const siteConfig = {
  name: "Manthan Tiwari",
  tagline: "Athlete. Champion. Coach.",
  email: "manthantwr@gmail.com",
  phone: "+91 8882278160",
  phoneHref: "918882278160",
  whatsappPrefillMessage:
    "Hi Manthan, I'd like to enquire about coaching. My goal is: ",
  instagramHandle: "MANTHANLIFTS",
  social: {
    instagram: "https://www.instagram.com/MANTHANLIFTS/",
  },
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(siteConfig.whatsappPrefillMessage)}`;

/** Public @MANTHANLIFTS posts — previews fetched via og:image (refreshed daily) */
export const instagramPostUrls: readonly string[] = [
  "https://www.instagram.com/manthanlifts/p/DGSdjF9JLOb/",
  "https://www.instagram.com/manthanlifts/reel/DeoqT7fsaWh/",
  "https://www.instagram.com/manthanlifts/reel/Dd6U4yJsQDG/",
  "https://www.instagram.com/manthanlifts/reel/DdwrJoTsaKZ/",
  "https://www.instagram.com/manthanlifts/reel/DdMFqL6MHQo/",
  "https://www.instagram.com/manthanlifts/reel/DdGziLTsT8D/",
  "https://www.instagram.com/manthanlifts/reel/Dc51_NTzQQq/",
  "https://www.instagram.com/manthanlifts/reel/Dc27WsOxTiI/",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Athlete", href: "#athlete" },
  { label: "Coaching", href: "#coaching" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

/** Short end-to-end coaching flow (shown before FAQ). */
export const coachingProcess = [
  {
    step: "1",
    title: "Enquiry",
    description:
      "Share your goal, experience, and timeline via the form or WhatsApp.",
  },
  {
    step: "2",
    title: "Consultation",
    description:
      "Quick discussion on training history, schedule, and what success looks like for you.",
  },
  {
    step: "3",
    title: "Your program",
    description:
      "Individualized plan for strength, physique, or competition — with clear progression.",
  },
  {
    step: "4",
    title: "Check-ins",
    description:
      "Regular feedback on form, loads, and recovery; adjustments when needed.",
  },
  {
    step: "5",
    title: "Progress",
    description:
      "Track lifts, adherence, and outcomes — built for long-term improvement.",
  },
] as const;

export const faqItems = [
  {
    id: "who",
    question: "Who is online coaching for?",
    answer:
      "Anyone serious about strength or physique — beginners building foundations, intermediates breaking plateaus, or athletes preparing for powerlifting. Programs are tailored to your level and equipment access.",
  },
  {
    id: "online-how",
    question: "How does online coaching work?",
    answer:
      "You receive a structured training plan, execution guidance, and ongoing check-ins (form videos, load updates, and messaging). Manthan adjusts programming based on your feedback and progress — not a one-size PDF.",
  },
  {
    id: "reply",
    question: "How quickly will I get a reply?",
    answer:
      "Enquiries are typically reviewed within 24 hours on working days. WhatsApp is the fastest channel for a first conversation after you submit your details.",
  },
  {
    id: "equipment",
    question: "Do I need a full gym?",
    answer:
      "Not always. Your plan is built around what you have — commercial gym, home setup, or limited equipment. Share your setup in the enquiry form.",
  },
  {
    id: "powerlifting-vs-physique",
    question: "Powerlifting vs physique coaching — what’s the difference?",
    answer:
      "Powerlifting coaching prioritizes the squat, bench, and deadlift for competition or maximal strength. Physique coaching focuses on muscle development, training split, and consistency for aesthetic goals. Both use progressive overload and technique work.",
  },
  {
    id: "pricing",
    question: "What does coaching cost?",
    answer:
      "Pricing depends on coaching type and check-in frequency. Share your goal in the enquiry form or on WhatsApp — Manthan will outline options that fit your plan (no fixed prices listed on the site).",
  },
] as const;

export const stats = [
  { value: 3, suffix: "×", label: "Delhi State Champion" },
  { value: 50, suffix: "+", label: "Athletes Coached" },
  { value: 30, suffix: "+", label: "Athlete Medals" },
  { value: 3, suffix: "", label: "Consecutive State Titles (2024–2026)" },
] as const;

export const achievements = [
  {
    year: "2024",
    title: "Delhi State Powerlifting Champion",
    detail: "Gold Medalist",
    image: "/images/gallery/medal-2024.jpg",
  },
  {
    year: "2025",
    title: "Delhi State Powerlifting Champion",
    detail: "Gold Medalist",
    image: "/images/gallery/medal-2025.jpg",
  },
  {
    year: "2026",
    title: "Delhi State Powerlifting Champion",
    detail: "Gold Medalist",
    image: "/images/gallery/medal-2026.jpg",
  },
] as const;

export const journeyPillars = [
  "Discipline",
  "Consistency",
  "Strength development",
  "Competition preparation",
  "Technical mastery",
  "Continuous improvement",
] as const;

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  placeholder?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "competition",
    title: "Competition moment",
    category: "Competition",
    src: "/images/gallery/competition.jpg",
    alt: "Manthan Tiwari at a powerlifting competition — replace with your photo",
    placeholder: false,
  },
  {
    id: "squat",
    title: "Squat",
    category: "Lifts",
    src: "/images/gallery/squat.jpg",
    alt: "Squat training — replace with your photo",
    placeholder: false,
  },
  {
    id: "deadlift",
    title: "Deadlift",
    category: "Lifts",
    src: "/images/gallery/deadlift.jpg",
    alt: "Deadlift — replace with your photo",
    placeholder: false,
  },
  {
    id: "training",
    title: "Training session",
    category: "Training",
    src: "/images/gallery/training.jpg",
    alt: "Training session — replace with your photo",
    placeholder: false,
  },
  {
    id: "medal",
    title: "Medal moment",
    category: "Achievement",
    src: "/images/gallery/medal-moment.jpg",
    alt: "Medal celebration — replace with your photo",
    placeholder: false,
  },
];

export const services = [
  {
    id: "powerlifting",
    title: "Powerlifting Coaching",
    description:
      "Individualized programming for strength development, competition preparation, technique improvement, and progressive overload.",
    benefits: [
      "Competition-ready periodization",
      "Technique refinement",
      "Progressive overload structure",
    ],
    icon: "dumbbell" as const,
  },
  {
    id: "bodybuilding",
    title: "Bodybuilding & Physique Coaching",
    description:
      "Structured training plans focused on physique development, exercise selection, training consistency, and progressive progression.",
    benefits: [
      "Physique-focused programming",
      "Smart exercise selection",
      "Consistency & accountability",
    ],
    icon: "scan" as const,
  },
  {
    id: "strength",
    title: "Strength & Personal Training",
    description:
      "Personalized strength training, exercise technique, form correction, goal setting, and accountability.",
    benefits: [
      "Form correction",
      "Goal-driven plans",
      "One-on-one accountability",
    ],
    icon: "target" as const,
  },
  {
    id: "online",
    title: "Online Coaching",
    description:
      "Remote coaching with individualized training plans, progress tracking, feedback, and ongoing accountability.",
    benefits: [
      "Remote programming",
      "Progress tracking",
      "Ongoing feedback",
    ],
    icon: "globe" as const,
  },
] as const;

export const methodology = [
  {
    step: "01",
    title: "ASSESS",
    description:
      "Understand goals, training history, experience, and movement patterns.",
  },
  {
    step: "02",
    title: "PROGRAM",
    description:
      "Build individualized training plans based on goals, recovery, exercise execution, and progressive overload.",
  },
  {
    step: "03",
    title: "EXECUTE",
    description:
      "Focus on proper technique, consistency, and structured progression.",
  },
  {
    step: "04",
    title: "PROGRESS",
    description:
      "Track performance, review progress, and adjust training when needed.",
  },
] as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "[Placeholder — replace with a real client testimonial about coaching experience and results.]",
    name: "Client Name",
    role: "Powerlifting athlete",
    placeholder: false,
  },
  {
    id: "t2",
    quote:
      "[Placeholder — replace with a real client testimonial about training consistency and progress.]",
    name: "Client Name",
    role: "Physique coaching client",
    placeholder: false,
  },
  {
    id: "t3",
    quote:
      "[Placeholder — replace with a real client testimonial about online coaching support.]",
    name: "Client Name",
    role: "Online coaching client",
    placeholder: false,
  },
];

export type Transformation = {
  id: string;
  title: string;
  description: string;
  beforeSrc: string;
  afterSrc: string;
  placeholder: boolean;
};

export const transformations: Transformation[] = [
  {
    id: "tr1",
    title: "Athlete transformation",
    description:
      "[Placeholder — add real before/after with client permission.]",
    beforeSrc: "/images/results/before-1.jpg",
    afterSrc: "/images/results/after-1.jpg",
    placeholder: false,
  },
  {
    id: "tr2",
    title: "Strength progression",
    description:
      "[Placeholder — document strength milestones with athlete consent.]",
    beforeSrc: "/images/results/before-2.jpg",
    afterSrc: "/images/results/after-2.jpg",
    placeholder: false,
  },
];

export type SpotlightAthlete = {
  id: string;
  name: string;
  achievement: string;
  note: string;
  placeholder: boolean;
};

export const athleteSpotlights: SpotlightAthlete[] = [
  {
    id: "a1",
    name: "Athlete name",
    achievement: "[Competition or strength milestone — replace]",
    note: "Placeholder spotlight card for real athlete results.",
    placeholder: false,
  },
  {
    id: "a2",
    name: "Athlete name",
    achievement: "[Physique or performance goal — replace]",
    note: "Placeholder spotlight card for real athlete results.",
    placeholder: false,
  },
];

export const coachingInterests = [
  "Powerlifting Coaching",
  "Bodybuilding & Physique",
  "Strength & Personal Training",
  "Online Coaching",
  "Not sure yet",
] as const;

export const experienceLevels = [
  "Beginner (0–1 years)",
  "Intermediate (1–3 years)",
  "Advanced (3+ years)",
  "Competitive athlete",
] as const;
