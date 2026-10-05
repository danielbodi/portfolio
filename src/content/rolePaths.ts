import { CaseCard } from './types';
import { solidarisCard, bridgestoneCard, trasisCard, sopraBankingCard } from './caseStudies/cards';

/**
 * Role-specific entry points (brief section 3.3). Same verified evidence,
 * different order and emphasis — no separate facts.
 */

export interface RolePathEntry {
  card: CaseCard;
  /** Role-specific emphasis: which existing evidence to look at first. */
  emphasis: string;
  /** Deep links into existing case sections. */
  links: { label: string; href: string }[];
}

export interface RolePath {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  focusPoints: string[];
  entries: RolePathEntry[];
  cvNote: string;
}

export const designEngineeringPath: RolePath = {
  slug: 'design-engineering',
  title: 'Design Engineering & Design Systems',
  seoTitle: 'Design Engineering & Design Systems — Daniel Bodi Gil',
  seoDescription:
    'Curated design-systems and UX-engineering evidence: tokens, Storybook, ITCSS/BEM architecture, PrimeNG theming and design-to-code workflows.',
  intro:
    'If you are evaluating me for a design engineering or design systems role, start here. Same evidence as the rest of the site, ordered around what these roles need to see first: components and tokens in production, CSS architecture, design-to-code workflows and governance.',
  focusPoints: [
    'Figma-to-code systems: tokens, components, documentation',
    'Storybook as a shared source of truth',
    'ITCSS/BEM CSS architecture and PrimeNG theming strategy',
    'Implementation reviews, coaching and inspectable AI-assisted workflow experiments'
  ],
  entries: [
    {
      card: bridgestoneCard,
      emphasis:
        'The deepest system evidence: CSS as the authoritative source for documented foundations, a parseable BEM grammar, 15 base hues supporting two themes, selected CSSOM-fed Storybook pages and modern CSS in production.',
      links: [
        { label: 'System evidence', href: '/work/bridgestone#shared-source' },
        { label: 'Governance', href: '/work/bridgestone#shared-capability' }
      ]
    },
    {
      card: solidarisCard,
      emphasis:
        'An AI-first design system for 100+ developers, led and built alone: an agent and MCP server, one source of truth for components and tokens, CI gates, and a governance model redesigned after stakeholder pushback.',
      links: [
        { label: 'The agent', href: '/work/solidaris#fragmented-tools' },
        { label: 'Components & tokens', href: '/work/solidaris#workflow-experiment' },
        { label: 'Governance', href: '/work/solidaris#governance' }
      ]
    },
    {
      card: sopraBankingCard,
      emphasis:
        'CSS architecture as enablement: BEM adoption, a custom Flexbox grid replacing float layouts, and coaching that changed how a junior team built UI.',
      links: [{ label: 'System evidence', href: '/work/sopra-banking#system-evidence' }]
    },
    {
      card: trasisCard,
      emphasis:
        'Design and implementation in one pair of hands: device-realistic UI designed and built within an Nx/Angular workspace with ITCSS and BEM.',
      links: [{ label: 'Delivery and handover', href: '/work/trasis#continuity' }]
    }
  ],
  cvNote: 'Design systems and UX engineering CV'
};

export const rolePaths = [designEngineeringPath];
