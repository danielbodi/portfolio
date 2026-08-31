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

/** What kind of proof a claim provides. This is separate from delivery state. */
export type EvidenceClass = 'OUTPUT' | 'VALIDATED' | 'IN PROGRESS' | 'OUTCOME';

/** Supporting labels for inherited context and unresolved private evidence work. */
export type EvidenceMarker = 'CONTEXT' | 'NEEDS VERIFICATION' | 'UNKNOWN';

/** Confidence qualifier for metrics. "reported" = stated but baseline not published. */
export type Confidence = 'verified' | 'reported' | 'estimated';

/** Ownership verbs allowed by the brief (section 7.4 / 13). */
export type OwnershipVerb =
  | 'Inherited'
  | 'Led'
  | 'Designed'
  | 'Implemented'
  | 'Documented'
  | 'Tested'
  | 'Facilitated'
  | 'Influenced'
  | 'In progress'
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
  /** The proof category. Kept separate from lifecycle state. */
  evidenceClass?: EvidenceClass;
  /** Scope, source or limitation that keeps the claim appropriately bounded. */
  evidenceNote?: string;
  state: DeliveryState;
  technicalNote?: string;
}

export interface EvidenceClaim {
  id: string;
  evidenceClass: EvidenceClass;
  claim: string;
  source: string;
  scope: string;
  confidence: Confidence | 'unknown';
  attribution: string;
  limitation?: string;
  deliveryState?: DeliveryState;
}

export interface ChronologyItem {
  period: string;
  title: string;
  description: string;
  label: EvidenceClass | EvidenceMarker;
}

export interface RecruiterSummaryContent {
  challenge: string;
  ownership: string[];
  /** Legacy summary fields retained for cases not yet migrated to the evidence taxonomy. */
  changed?: string[];
  evidence?: string[];
  /** Evidence-first summary used when claim classes need to be explicit. */
  evidenceClaims?: EvidenceClaim[];
}

export interface ProseSection {
  heading: string;
  /** Paragraphs; may contain limited inline HTML (<strong>, <code>). */
  paragraphs: string[];
}

export type SystemEvidenceVisual =
  | {
      kind: 'image';
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      kind: 'code';
      code: string;
      language?: string;
      label?: string;
      caption?: string;
    };

export interface SystemEvidenceSection extends ProseSection {
  visual?: SystemEvidenceVisual;
}

export interface CaseCard {
  slug: string;
  company: string;
  /** Problem- or change-oriented case title. */
  title: string;
  /** Short name for navigation/breadcrumbs. */
  shortTitle: string;
  tier: 'flagship' | 'supporting';
  period: string;
  /** One-line problem statement. */
  problem: string;
  /**
   * Short forms for the scannable /work index rows. Compressions of `title`
   * and `problem` — never a different claim. Both fall back to the long form,
   * which stays authoritative for home cards and SEO titles.
   */
  indexTitle?: string;
  indexProblem?: string;
  roleShort: string;
  tags: string[];
  /** One verified evidence point; use an outcome only when one exists. */
  evidence: string;
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

/** Constraints that materially shaped the work — never used as excuses. */
export interface ConstraintItem {
  /** The constraint itself, stated plainly. */
  constraint: string;
  /** What was still changed given the constraint. */
  soWhat: string;
}

/** How the organisation worked differently afterwards. */
export interface Influence {
  /** Who was aligned onto shared standards or direction. */
  aligned: string[];
  /** Who had to be convinced, and of what. */
  convinced: string[];
  /** What changed in how people worked. */
  changed: string[];
}

export interface CaseStudy {
  card: CaseCard;
  seo: {
    title: string;
    description: string;
  };
  /** The single most important thing that changed. One sentence, ~20 words. */
  impactStatement: string;
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
  recruiterSummary: RecruiterSummaryContent;
  framing: ProseSection;
  chronology?: {
    heading: string;
    intro: string;
    items: ChronologyItem[];
  };
  ownership: OwnershipGroup[];
  constraints: {
    items: ConstraintItem[];
    /** What remained out of reach, stated plainly. */
    limitedBy?: string;
  };
  decisions: Decision[];
  influence: Influence;
  craft: {
    intro: string;
    artefacts: Artefact[];
  };
  systemEvidence?: SystemEvidenceSection[];
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
  /** Replaces outcome-shaped copy when a project needs an explicit evidence ledger. */
  evidenceStatus?: {
    intro: string;
    claims: EvidenceClaim[];
    measurementNote?: string;
  };
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
