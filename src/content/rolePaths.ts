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

export const staffProductDesignPath: RolePath = {
  slug: 'staff-product-design',
  title: 'Staff Product Design',
  seoTitle: 'Staff Product Design — Daniel Bodi Gil',
  seoDescription:
    'Curated product design evidence: complex ecosystem UX at Solidaris, safety-critical design at Trasis and design-system leadership at Bridgestone.',
  intro:
    'If you are evaluating me for a staff-level product design role, start here. The same case studies as the rest of the site, ordered around problem framing in ambiguity, ownership, decision quality and clearly bounded evidence.',
  focusPoints: [
    'Ownership of complex, ambiguous initiatives',
    'Information architecture across connected products',
    'Scenario-based user testing and evidence-based iteration',
    'Stakeholder alignment as an embedded, autonomous consultant'
  ],
  entries: [
    {
      card: solidarisCard,
      emphasis:
        'Ongoing product and systems work under inherited constraints: research, case-reading models, interaction trade-offs and a handoff whose limits are made explicit.',
      links: [
        { label: 'Product tension', href: '/work/solidaris#fragmented-tools' },
        { label: 'Influence path', href: '/work/solidaris#shared-contribution' }
      ]
    },
    {
      card: trasisCard,
      emphasis:
        'Product craft under constraints: a high-consequence workflow made unambiguous, validated with task-based testing and iterated from observation.',
      links: [
        { label: 'Physical model', href: '/work/trasis#physical-model' },
        { label: 'Validation evidence', href: '/work/trasis#status-results' }
      ]
    },
    {
      card: bridgestoneCard,
      emphasis:
        'Influence beyond the screen: a refused design-system request turned into a funded initiative, then quality raised through reviews, documentation and coaching.',
      links: [
        { label: 'Influence', href: '/work/bridgestone#make-value-visible' },
        { label: 'Outcomes', href: '/work/bridgestone#outcomes' }
      ]
    }
  ],
  cvNote: 'Product design CV'
};

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
        'A fixed PrimeNG/Plectrum baseline extended through product research, a bounded local fork and the first repository these applications had — then a route back into the core team’s decisions.',
      links: [
        { label: 'System bridge', href: '/work/solidaris#shared-contribution' },
        { label: 'Workflow experiment', href: '/work/solidaris#workflow-experiment' },
        { label: 'Tested journey', href: '/work/solidaris#ishare' }
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

export const rolePaths = [staffProductDesignPath, designEngineeringPath];
