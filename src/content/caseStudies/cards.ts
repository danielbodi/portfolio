import { CaseCard } from "../types";

/**
 * Card-level facts for every case study. Listings, featured sections and
 * role-specific paths all read from here so each fact exists exactly once.
 */

export const solidarisCard: CaseCard = {
  slug: "solidaris",
  company: "Solidaris",
  title: "Building an AI-first design system teams can own",
  shortTitle: "Solidaris",
  tier: "flagship",
  period: "Oct 2025 – Oct 2026",
  problem:
    "Application teams needed a reliable way to discover, use and extend an inherited design foundation across products.",
  indexTitle: "An agent, contracts and a path to shared ownership",
  indexProblem:
    "An inherited UI kit needed versioned contracts, an installed agent, clear governance and evidence for Core decisions.",
  roleShort: "Sole design-system engineering lead · Product design",
  tags: [
    "Agent & developer experience",
    "Contracts & token architecture",
    "Governance & Core insights",
  ],
  evidence:
    "I led and implemented Plectrum’s agent, contracts, Storybook, token flows, foundations, CI and Core dashboard. UI packages 2.1.0 and toolkit 0.7.2 were published on 4 October 2026.",
  thumbnail: "/screenshots/solidaris/storybook-token-finder-local-2026-10-04.png",
  logo: "/company-logos/Logomark.svg",
  logoInvert: true,
  ctaLabel: "Explore the Plectrum agent and architecture",
  deliveryState: "Ongoing",
};

export const bridgestoneCard: CaseCard = {
  slug: "bridgestone",
  company: "Bridgestone",
  title: "Building shared UI foundations without a mandate",
  shortTitle: "Bridgestone",
  tier: "flagship",
  period: "2019 – 2025",
  problem:
    "FleetBridge had no UI library and no foundation; the team chose to build every component itself, and dedicated design-system resources were refused.",
  indexTitle: "Shared UI without a mandate",
  indexProblem:
    "Every component built from scratch, and no resources for the system.",
  roleShort: "Product design · UX engineering · UI foundations and enablement",
  tags: ["Product patterns", "Storybook", "UX engineering"],
  evidence:
    "Design input moved into implementation, and stakeholders funded system work once shared patterns shipped.",
  thumbnail: "/screenshots/bs-thumbnail.png",
  logo: "/company-logos/Bridgestone logo.png",
  ctaLabel: "Read the Bridgestone UI foundations case study",
  deliveryState: "In production",
};

export const trasisCard: CaseCard = {
  slug: "trasis",
  company: "Trasis",
  title: "Making safety-critical quality control visible",
  shortTitle: "Trasis QC1",
  tier: "flagship",
  period: "2019 – 2021",
  problem:
    "Technicians needed to operate a new radiopharmaceutical quality-control device without ambiguity.",
  indexTitle: "Safety-critical QC interface",
  indexProblem:
    "Technicians had to run radiopharmaceutical QC without ambiguity.",
  roleShort: "Product Designer · UX Engineering",
  tags: ["Safety-critical UX", "Prototyping", "User testing"],
  evidence:
    "The QC1 interface shipped after repeated task-based prototypes, with front-end foundations transferred to the internal team.",
  thumbnail: "/screenshots/trasis-thumbnail.png",
  logo: "/company-logos/trasis logo.png",
  ctaLabel: "Read the Trasis QC1 case study",
  deliveryState: "Shipped",
};

export const sopraBankingCard: CaseCard = {
  slug: "sopra-banking",
  company: "Sopra Banking",
  title:
    "Sopra Banking: Modernising CSS Architecture and Design Workflows for Enterprise Banking Software",
  shortTitle: "Sopra Banking",
  tier: "supporting",
  period: "2018",
  problem:
    "A junior front-end team was accumulating technical debt on float-based CSS, with a PDF style guide instead of scalable design foundations.",
  indexTitle: "Modernising CSS architecture and design workflows",
  indexProblem:
    "Float-based CSS debt and a PDF style guide instead of foundations.",
  roleShort: "Senior UI/UX Designer",
  tags: ["BEM", "CSS architecture", "Coaching"],
  evidence:
    "BEM structure, a custom Flexbox grid and atomic components adopted by the team; the design team reported faster prototyping.",
  thumbnail: "/screenshots/sbs-thumbnail.png",
  logo: "/company-logos/sopra logo.png",
  ctaLabel: "Read the Sopra Banking case study",
  deliveryState: "Shipped",
};

export const baseCard: CaseCard = {
  slug: "base",
  company: "Base",
  title:
    "Base: Building Front-End Foundations for High-Traffic Telecom Experiences",
  shortTitle: "Base",
  tier: "supporting",
  period: "2016 – 2018",
  problem:
    "High-traffic telecom websites needed pixel-accurate, cross-browser UI components that content authors could assemble in Adobe Experience Manager.",
  indexTitle: "Front-end foundations for high-traffic telecom",
  indexProblem:
    "Cross-browser telecom UI that content authors could assemble in AEM.",
  roleShort: "UI Developer",
  tags: ["AEM", "AngularJS", "Cross-browser"],
  evidence:
    "A custom Flexbox/BEM grid with legacy-browser fallbacks and an npm auto-reload workflow that removed compile cycles from front-end changes.",
  thumbnail: "/screenshots/base-thumbnail.png",
  logo: "/company-logos/base logo.png",
  ctaLabel: "Read the Base front-end case study",
  deliveryState: "Shipped",
};

export const allCards: CaseCard[] = [
  bridgestoneCard,
  solidarisCard,
  trasisCard,
  sopraBankingCard,
  baseCard,
];

export const flagshipCards = allCards.filter((c) => c.tier === "flagship");

export const supportingCards = allCards.filter((c) => c.tier === "supporting");

export function cardBySlug(slug: string): CaseCard | undefined {
  return allCards.find((c) => c.slug === slug);
}
