/**
 * Content schema for the portfolio.
 *
 * Single source of truth for facts: listings, featured cards, role paths and
 * case-study pages all read from these types. Facts exist once — role paths
 * only re-order and re-emphasise (see portfolio-transformation-brief section 3.3).
 */

/** Delivery state labels allowed on visuals and claims (brief section 13). */
export type DeliveryState =
  | 'Shipped'
  | 'In production'
  | 'Validated prototype'
  | 'Tested concept'
  | 'Concept'
  | 'Strategic proposal'
  | 'Ongoing';

/** Confidence qualifier for metrics. "reported" = stated but baseline not published. */
export type Confidence = 'verified' | 'reported' | 'estimated';

/** Ownership verbs allowed by the brief (section 7.4 / 13). */
export type OwnershipVerb =
  | 'Led'
  | 'Designed'
  | 'Implemented'
  | 'Documented'
  | 'Tested'
  | 'Facilitated'
  | 'Influenced'
  | 'Team outcome';

export interface Metric {
  value: string;
  label: string;
  confidence: Confidence;
  /** How it was measured / compared with what. Required for any number. */
  evidenceNote?: string;
}

export interface OutcomeItem {
  /** May contain limited inline HTML (<strong>). */
  text: string;
  evidenceNote?: string;
}

export interface OwnershipGroup {
  verb: OwnershipVerb;
  items: string[];
}

export interface Decision {
  id: string;
  title: string;
  tension: string;
  alternatives: string[];
  evidence: string;
  decision: string;
  tradeOff: string;
  result: string;
  resultState?: DeliveryState;
  /** Optional supporting visual rendered beside the decision text. */
  visual?: { src: string; alt: string };
}

export interface Artefact {
  src: string;
  alt: string;
  /**
   * Optional video demo; when set, `src` becomes the poster frame.
   * Rendered with controls only — never autoplayed (reduced-motion safe).
   */
  videoSrc?: string;
  /** What the artefact is. */
  what: string;
  /** Why it mattered. */
  why?: string;
  /** Daniel's contribution. */
  contribution?: string;
  state: DeliveryState;
  technicalNote?: string;
}

export interface ProseSection {
  heading: string;
  /** Paragraphs; may contain limited inline HTML (<strong>, <code>). */
  paragraphs: string[];
}

export interface CaseCard {
  slug: string;
  company: string;
  /** Outcome-oriented case title. */
  title: string;
  /** Short name for navigation/breadcrumbs. */
  shortTitle: string;
  tier: 'flagship' | 'supporting';
  period: string;
  /** One-line problem statement. */
  problem: string;
  roleShort: string;
  tags: string[];
  /** One outcome, qualified where needed. */
  outcome: string;
  thumbnail: string;
  logo: string;
  /**
   * Force the logo to pure white on dark tiles (brightness-0 + invert).
   * Use when the source mark is coloured or soft and needs contrast.
   */
  logoInvert?: boolean;
  /** Project-specific accessible CTA label. */
  ctaLabel: string;
  deliveryState: DeliveryState;
}

export interface CaseStudy {
  card: CaseCard;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    /** One-sentence project summary. */
    summary: string;
    role: string;
    period: string;
    /** Team / collaboration model. */
    team: string;
    /** Product context. */
    context: string;
    stack: string[];
    confidentialityNote?: string;
    image: Artefact;
  };
  recruiterSummary: {
    challenge: string;
    ownership: string[];
    changed: string[];
    evidence: string[];
  };
  framing: ProseSection;
  ownership: OwnershipGroup[];
  decisions: Decision[];
  craft: {
    intro: string;
    artefacts: Artefact[];
  };
  systemEvidence?: ProseSection[];
  validation?: {
    method: string[];
    observed: string[];
    changed: string[];
    limitations: string;
  };
  outcomes: {
    user: OutcomeItem[];
    team: OutcomeItem[];
    system: OutcomeItem[];
    learning: string[];
  };
  metrics?: Metric[];
  reflection: {
    repeat: string[];
    change: string[];
    next?: string;
  };
  connection?: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };
}
