import { CaseCard } from '../types';

/**
 * Card-level facts for every case study. Listings, featured sections and
 * role-specific paths all read from here so each fact exists exactly once.
 */

export const solidarisCard: CaseCard = {
  slug: 'solidaris',
  company: 'Solidaris',
  title: 'Solidaris: An AI-Ready Design System for a Healthcare Application Ecosystem',
  shortTitle: 'Solidaris',
  tier: 'flagship',
  period: 'Oct 2025 – present',
  problem:
    'Two teams ship daily with AI coding assistants on one design system — documentation written only for humans meant every AI-generated pull request eroded consistency.',
  roleShort: 'UX/UI Consultant · Design Systems · AI-Ready Governance',
  tags: ['AI-ready design system', 'Design tokens', 'Cross-product UX'],
  outcome:
    'Plectrum made machine-readable — component contracts, a rule set and a seven-role agent workflow — behind two redesigned apps, with 10+ more of the estate queued (ongoing).',
  thumbnail: '/screenshots/solidaris-thumbnail.png',
  logo: '/company-logos/Logomark.svg',
  logoInvert: true,
  ctaLabel: 'Read the Solidaris AI-ready design-system case study',
  deliveryState: 'Ongoing'
};

export const bridgestoneCard: CaseCard = {
  slug: 'bridgestone',
  company: 'Bridgestone',
  title: 'Bridgestone: CSS as the Single Source of Truth for a Fleet Platform\u2019s Design System',
  shortTitle: 'Bridgestone',
  tier: 'flagship',
  period: '2019 – 2025',
  problem:
    'FleetBridge was being built feature by feature with no design system — and design systems usually die of token duplication or documentation that drifts from production.',
  roleShort: 'Product Designer · Design Systems & UX Engineering',
  tags: ['CSS as SSOT', 'Self-updating Storybook', 'ITCSS/BEM', 'Modern CSS'],
  outcome:
    'Tokens written once in CSS feed the apps and a self-populating Storybook: 254 SCSS files, ~250 color tokens per theme derived from 15 base colors, documentation that cannot drift.',
  thumbnail: '/screenshots/bs-thumbnail.png',
  logo: '/company-logos/Bridgestone logo.png',
  ctaLabel: 'Read the Bridgestone design system case study',
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
  outcome:
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
  outcome:
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
  outcome:
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
