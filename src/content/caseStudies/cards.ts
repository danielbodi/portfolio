import { CaseCard } from '../types';

/**
 * Card-level facts for every case study. Listings, featured sections and
 * role-specific paths all read from here so each fact exists exactly once.
 */

export const solidarisCard: CaseCard = {
  slug: 'solidaris',
  company: 'Solidaris',
  title: 'Solidaris: Connecting Fragmented Product Delivery to a Shared Design-System Direction',
  shortTitle: 'Solidaris',
  tier: 'flagship',
  period: 'Oct 2025 – Oct 2026 · ongoing programme',
  problem:
    'Regional products were expected to converge while product teams and central design-system governance still operated separately. The work needed to support local delivery without creating another shadow system.',
  roleShort: 'Product design · UX architecture · Design-system contribution',
  tags: ['Cross-product UX', 'Influence without authority', 'Design-system governance'],
  evidence:
    'I started outside the core decision loop and later contributed directly to the renewed collaboration. Product prototypes, a local Plectrum bridge and ongoing handoff evidence show the path; long-term adoption remains unmeasured.',
  thumbnail: '/screenshots/solidaris-thumbnail.png',
  logo: '/company-logos/Logomark.svg',
  logoInvert: true,
  ctaLabel: 'Read how local delivery connected to the shared system direction',
  deliveryState: 'Ongoing'
};

export const bridgestoneCard: CaseCard = {
  slug: 'bridgestone',
  company: 'Bridgestone',
  title: 'Bridgestone: Building Shared UI Foundations Without an Initial Design-System Mandate',
  shortTitle: 'Bridgestone',
  tier: 'flagship',
  period: '2019 – 2025',
  problem:
    'FleetBridge was being built by a distributed team without shared UI foundations or dedicated system time. Late UI review protected quality, but became a delivery bottleneck.',
  roleShort: 'Product design · UX engineering · UI foundations and enablement',
  tags: ['Product patterns', 'Storybook', 'UX engineering'],
  evidence:
    'Reusable foundations, product patterns, Storybook, CSS utilities, onboarding and Figma branching were delivered through live product work. Stakeholders later allocated dedicated design-system time.',
  thumbnail: '/screenshots/bs-thumbnail.png',
  logo: '/company-logos/Bridgestone logo.png',
  ctaLabel: 'Read the Bridgestone UI foundations case study',
  deliveryState: 'In production'
};

export const trasisCard: CaseCard = {
  slug: 'trasis',
  company: 'Trasis',
  title: 'Trasis QC1: Designing a Safety-Critical Interface for Radiopharmaceutical Quality Control',
  shortTitle: 'Trasis QC1',
  tier: 'flagship',
  period: '2019 – 2021',
  problem:
    'Lab technicians needed to schedule and read radiopharmaceutical quality-control tests on a new device without ambiguity in a high-consequence workflow.',
  roleShort: 'Product Designer · UX Engineering',
  tags: ['Safety-critical UX', 'Prototyping', 'User testing'],
  evidence:
    'A shipped QC1 interface with device-realistic visualisations and task-based prototype testing; participant counts and task-level results were not preserved.',
  thumbnail: '/screenshots/trasis-thumbnail.png',
  logo: '/company-logos/trasis logo.png',
  ctaLabel: 'Read the Trasis QC1 case study',
  deliveryState: 'Shipped'
};

export const sopraBankingCard: CaseCard = {
  slug: 'sopra-banking',
  company: 'Sopra Banking',
  title: 'Sopra Banking: Modernising CSS Architecture and Design Workflows for Enterprise Banking Software',
  shortTitle: 'Sopra Banking',
  tier: 'supporting',
  period: '2018',
  problem:
    'A junior front-end team was accumulating technical debt on float-based CSS, with a PDF style guide instead of scalable design foundations.',
  roleShort: 'Senior UI/UX Designer',
  tags: ['BEM', 'CSS architecture', 'Coaching'],
  evidence:
    'BEM structure, a custom Flexbox grid and atomic components adopted by the team; the design team reported faster prototyping.',
  thumbnail: '/screenshots/sbs-thumbnail.png',
  logo: '/company-logos/sopra logo.png',
  ctaLabel: 'Read the Sopra Banking case study',
  deliveryState: 'Shipped'
};

export const baseCard: CaseCard = {
  slug: 'base',
  company: 'Base',
  title: 'Base: Building Front-End Foundations for High-Traffic Telecom Experiences',
  shortTitle: 'Base',
  tier: 'supporting',
  period: '2016 – 2018',
  problem:
    'High-traffic telecom websites needed pixel-accurate, cross-browser UI components that content authors could assemble in Adobe Experience Manager.',
  roleShort: 'UI Developer',
  tags: ['AEM', 'AngularJS', 'Cross-browser'],
  evidence:
    'A custom Flexbox/BEM grid with legacy-browser fallbacks and an npm auto-reload workflow that removed compile cycles from front-end changes.',
  thumbnail: '/screenshots/base-thumbnail.png',
  logo: '/company-logos/base logo.png',
  ctaLabel: 'Read the Base front-end case study',
  deliveryState: 'Shipped'
};

export const allCards: CaseCard[] = [
  bridgestoneCard,
  solidarisCard,
  trasisCard,
  sopraBankingCard,
  baseCard
];

export const flagshipCards = allCards.filter((c) => c.tier === 'flagship');
export const supportingCards = allCards.filter((c) => c.tier === 'supporting');

export function cardBySlug(slug: string): CaseCard | undefined {
  return allCards.find((c) => c.slug === slug);
}
