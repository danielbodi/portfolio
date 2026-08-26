import { CaseCard } from '../types';

/**
 * Card-level facts for every case study. Listings, featured sections and
 * role-specific paths all read from here so each fact exists exactly once.
 */

export const solidarisCard: CaseCard = {
  slug: 'solidaris',
  company: 'Solidaris',
  title: 'Solidaris: Extending an Inherited PrimeNG/Plectrum Foundation Across Three Product Workstreams',
  shortTitle: 'Solidaris',
  tier: 'flagship',
  period: 'Oct 2025 – Oct 2026 · ongoing programme',
  problem:
    'Three healthcare product workstreams needed a coherent UX and implementation path while PrimeNG, Plectrum and the wider programme were already in motion.',
  roleShort: 'Consulting scope · Product design · UX architecture · Design-system contribution',
  tags: ['Enterprise UX', 'Inherited design system', 'Design-to-code'],
  evidence:
    'Research, product prototypes, a product-local Figma fork and repository/Storybook outputs — with delivery, adoption and handoff still explicitly bounded.',
  thumbnail: '/screenshots/solidaris-thumbnail.png',
  logo: '/company-logos/Logomark.svg',
  logoInvert: true,
  ctaLabel: 'Read the Solidaris product and systems case study',
  deliveryState: 'Ongoing'
};

export const bridgestoneCard: CaseCard = {
  slug: 'bridgestone',
  company: 'Bridgestone',
  title: 'Bridgestone: Making UI Quality Scale Beyond the Designer',
  shortTitle: 'Bridgestone',
  tier: 'flagship',
  period: '2019 – 2025',
  problem:
    'FleetBridge was shipping across several applications without shared product rules or an initial design-system mandate; late UI review could not become the permanent quality model.',
  roleShort: 'Product Designer · UX Engineering · Design-System Enablement',
  tags: ['Influence without authority', 'Product patterns', 'Storybook', 'Design governance'],
  evidence:
    'Live product patterns helped unlock dedicated system time; coaching, Storybook and explicit governance moved UI decisions earlier than pull-request review.',
  thumbnail: '/screenshots/bs-thumbnail.png',
  logo: '/company-logos/Bridgestone logo.png',
  ctaLabel: 'Read how FleetBridge moved from UI bottleneck to shared system',
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
    'Device-realistic visualisations and validated task flows; testing reported high task success (methodology documented in the case).',
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
  solidarisCard,
  bridgestoneCard,
  trasisCard,
  sopraBankingCard,
  baseCard
];

export const flagshipCards = allCards.filter((c) => c.tier === 'flagship');
export const supportingCards = allCards.filter((c) => c.tier === 'supporting');

export function cardBySlug(slug: string): CaseCard | undefined {
  return allCards.find((c) => c.slug === slug);
}
