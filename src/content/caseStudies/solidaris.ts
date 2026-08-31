import { CaseStudy, EvidenceClaim } from '../types';
import { solidarisCard } from './cards';

const researchOutput: EvidenceClaim = {
  id: 'solidaris-research-output',
  evidenceClass: 'OUTPUT',
  claim:
    'Research activities and product prototypes were produced for the iCRM and iShare workstreams, alongside a first iGED interface draft.',
  source: 'August 2026 project account and the anonymised portfolio artefacts shown on this page.',
  scope: 'Product-local research, interaction design and prototype outputs.',
  confidence: 'reported',
  attribution: 'Daniel\u2019s reported work; inherited PrimeNG/Plectrum foundations are excluded.',
  limitation:
    'Participant counts, direct iGED scope and exact build, merge or deployment states are not public.',
  deliveryState: 'Ongoing'
};

const systemOutput: EvidenceClaim = {
  id: 'solidaris-system-output',
  evidenceClass: 'OUTPUT',
  claim:
    'A product-local Figma fork, a small custom component set, repository and Storybook work, ITCSS/BEMIT structure, token-governance material and AI-oriented workflow files were created.',
  source: 'August 2026 project account and schematic portfolio artefacts.',
  scope: 'Working-layer outputs created around three product workstreams.',
  confidence: 'reported',
  attribution: 'Daniel\u2019s additions around an inherited PrimeNG/Plectrum baseline.',
  limitation:
    'Official source-of-truth status, upstream acceptance, independent use and adoption are not claimed.',
  deliveryState: 'Ongoing'
};

const validationBoundary: EvidenceClaim = {
  id: 'solidaris-validation-boundary',
  evidenceClass: 'VALIDATED',
  claim:
    'The project account records a first round of scenario-based iShare prototype testing and a second round prepared around comprehension, navigation and trust.',
  source: 'Solidaris product-domain reference supplied with this update.',
  scope: 'Prototype-level research activity and direction only.',
  confidence: 'reported',
  attribution: 'Daniel designed the prototype comparisons and test framework.',
  limitation:
    'Participant profiles, sample size, scores, final approval and production effects are not published.',
  deliveryState: 'Tested concept'
};

const handoffState: EvidenceClaim = {
  id: 'solidaris-handoff-state',
  evidenceClass: 'IN PROGRESS',
  claim:
    'The wider programme, final documentation, contribution path, next ownership and post-departure measurement remained open at the evidence snapshot.',
  source: 'August 2026 project account.',
  scope: 'Assignment handoff planned for October 2026.',
  confidence: 'reported',
  attribution: 'Programme state, not an outcome attributed to Daniel.',
  limitation:
    'The final handoff recipient and durable adoption were not yet established.',
  deliveryState: 'Ongoing'
};

const contributionOutcome: EvidenceClaim = {
  id: 'solidaris-contribution-outcome',
  evidenceClass: 'OUTCOME',
  claim:
    'By the August 2026 snapshot, I had moved from working outside the core design-system team to contributing actively to shared design-system work.',
  source: 'August 2026 project account.',
  scope: 'My participation in the shared design-system collaboration.',
  confidence: 'reported',
  attribution:
    'A reported change following direct outreach and continued product and system contribution; I do not attribute the wider core-team restructuring to my work.',
  limitation:
    'Formal decision rights, upstream acceptance of every local artefact and durable post-departure governance are not claimed.',
  deliveryState: 'Ongoing'
};

export const solidarisStudy: CaseStudy = {
  card: solidarisCard,

  seo: {
    title:
      'Solidaris \u2014 Connecting Fragmented Product Delivery to a Shared Design System | Daniel Bodi Gil',
    description:
      'An ongoing healthcare product-and-systems assignment showing the move from outside the core design-system loop to active contribution, with adoption and handoff limits kept explicit.'
  },

  impactStatement:
    'I started outside the central design-system decisions and worked my way into them, by connecting three converging products to the shared direction and building the repository this work did not have.',

  hero: {
    summary:
      'An ongoing UX modernisation across fragmented healthcare tools, combining product research, interaction design, reusable patterns and a design-to-code working layer.',
    role:
      'Consulting scope \u2014 product design, UX architecture, UX engineering and design-system contribution. Official assignment title not published.',
    period: 'October 2025 \u2013 October 2026 \u00b7 wider programme ongoing',
    team:
      'Cegeka consultant embedded client-side, collaborating with product managers, business analysts, engineers and a separately evolving core design team.',
    context:
      'Internal healthcare operations across regional and product boundaries. PrimeNG, Plectrum and the wider consolidation direction predated the assignment.',
    stack: [
      'Figma',
      'Angular',
      'PrimeNG',
      'Plectrum',
      'Storybook',
      'SCSS \u00b7 ITCSS/BEMIT',
      'AI-assisted workflow experiment'
    ],
    confidentialityNote:
      'The visuals are anonymised or recreated with fictional affiliate data. This case does not claim production deployment, organisation-wide adoption or measurable impact where those states are not evidenced.',
    image: {
      src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
      alt: 'Anonymised iShare affiliate dossier prototype with affiliate context, document tracking and a workflow journey',
      what: 'The iShare affiliate dossier prototype.',
      why:
        'It explores one reading surface for affiliate context, documents, status and workflow without duplicating specialist processing tools.',
      contribution: 'Designed the dossier model, information hierarchy and journey treatment.',
      evidenceClass: 'OUTPUT',
      evidenceNote:
        'The portfolio does not present this artefact as a shipped product or as evidence of a user outcome.',
      state: 'Ongoing'
    }
  },

  recruiterSummary: {
    challenge:
      'The work started inside fragmented products and governance, with PrimeNG and Plectrum already selected and the programme still evolving. Employees also had to reconstruct a case from tickets, documents, workflows and specialist systems.',
    ownership: [
      'Research, UX direction and prototypes across the iCRM and iShare workstreams',
      'Product-local design-system additions and reusable enterprise patterns',
      'Repository, Storybook and documentation outputs intended to improve design-to-code continuity',
      'Direct outreach and later contribution to the renewed core design-system collaboration'
    ],
    evidenceClaims: [researchOutput, contributionOutcome, handoffState]
  },

  framing: {
    heading: 'Working inside an inherited system',
    paragraphs: [
      'PrimeNG and the original Plectrum layer predated my assignment. I worked within those constraints across iCRM, iShare and a reported iGED scope, helping employees read one affiliate story across fragmented tickets, documents, workflows and source systems.',
      'With limited initial access to the core design-system team, I created a product-local bridge through research, prototypes, a Figma fork and reported repository/Storybook work. This remained an ongoing, divergence-prone working layer: the page presents it as output and prototype evidence, not proof of adoption or impact.'
    ]
  },

  chronology: {
    heading: 'How the work evolved',
    intro:
      'This chronology separates inherited context from my outputs and from work that was still open. Organisational events are not presented as outcomes caused by me.',
    items: [
      {
        period: 'Starting point',
        title: 'Fixed foundations and fragmented workstreams',
        description:
          'PrimeNG, the initial Plectrum layer, product roadmaps and the wider consolidation direction already existed. The products and regions still had different needs and ways of working.',
        label: 'CONTEXT'
      },
      {
        period: 'Product delivery',
        title: 'Product research and a local design-system bridge',
        description:
          'I combined shadowing, workshops and prototype testing with a product-local Figma fork, custom components and reported repository/Storybook work. The fork unblocked delivery while keeping its divergence risk visible.',
        label: 'OUTPUT'
      },
      {
        period: 'Later collaboration',
        title: 'From outside the core team to active contribution',
        description:
          'After reaching out directly and continuing to contribute product and system work, I moved from working outside the core design-system group to contributing actively to shared work. The wider restructuring and formal governance decisions were not caused or owned by me.',
        label: 'OUTCOME'
      },
      {
        period: 'Planned October 2026 handoff',
        title: 'A useful foundation, with ownership still to resolve',
        description:
          'Documentation, contribution rules, next ownership, exact delivery states and post-departure measures still needed to be confirmed before the assignment ended.',
        label: 'IN PROGRESS'
      }
    ]
  },

  ownership: [
    {
      verb: 'Inherited',
      items: [
        'PrimeNG as the component foundation and the original Plectrum layer',
        'The wider Shell/consolidation direction and existing product roadmaps',
        'Organisational restructuring of the core design team'
      ]
    },
    {
      verb: 'Led',
      items: [
        'Product research and UX direction across the iCRM and iShare workstreams',
        'Reframing the interfaces around case comprehension rather than legacy screen structures',
        'Prototype-led conversations about high-risk interaction decisions'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'iCRM ticket inbox, complementary history view and related-object patterns',
        'iShare dossier summary and horizontal/vertical workflow explorations',
        'Readable status semantics and contextual actions for dense expert workflows'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'Reported product-local repository and Storybook work',
        'ITCSS/BEMIT structure and a small custom component set',
        'Token-governance, contract and AI-oriented workflow artefacts'
      ]
    },
    {
      verb: 'Tested',
      items: [
        'Scenario-based prototype testing described in the project account',
        'Comparison of overview-first and detail-first iShare journey models'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'Recommended Plectrum for the local product workstreams',
        'Reached out directly to the core design team and offered system-level contribution',
        'Made product and implementation trade-offs concrete through working artefacts'
      ]
    },
  ],

  constraints: {
    items: [
      {
        constraint:
          'The inherited foundation and initially limited contribution path constrained system-level decisions.',
        soWhat:
          'I created a product-local bridge, contacted the core team directly and kept the divergence risk explicit.'
      },
      {
        constraint:
          'Expert users needed density, codes and operational speed rather than a visually dramatic simplification.',
        soWhat:
          'The designs preserved expert information while adding hierarchy, readable interpretations and progressive disclosure.'
      }
    ],
    limitedBy:
      'My engagement is scheduled to end in October 2026 while the wider programme continues. Exact build states, upstream acceptance, independent use and final handoff ownership were not yet established; post-departure adoption, maintenance and product impact fall outside this case’s evidence window unless later evidence is added.'
  },

  decisions: [
    {
      id: 'decision-inbox',
      title: 'Keep expert density, change the ticket representation',
      tension:
        'Large ticket cards exposed many fields but hid the latest activity and consumed too much vertical space. A narrow timeline lost the business subject that users recognised.',
      alternatives: [
        'Keep the existing card structure and tune typography',
        'Use a chronological timeline as the primary view',
        'Use a dense master list with the business subject first and latest activity second'
      ],
      evidence:
        'The supplied interaction analysis and iCRM prototypes show repeated generic activities, truncated subjects and the need to keep master-detail speed.',
      decision:
        'Explore a <strong>work-oriented inbox</strong>: subject as the primary identifier, recent activity as secondary evidence, with status, alerts and related requests visible before opening the detail.',
      tradeOff:
        'Less visual richness per row, while the timeline becomes a complementary history view rather than the default.',
      result:
        'A high-fidelity product direction and reusable list pattern; implementation and user outcome are not claimed.',
      resultState: 'Concept',
      visual: {
        src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'iCRM ticket inbox concept with a dense master list and selected request detail'
      }
    },
    {
      id: 'decision-signals',
      title: 'Give each business object the action it actually needs',
      tension:
        'Tickets, proactive signals and system notifications appeared close together even though one is worked, one is qualified and one is consulted.',
      alternatives: [
        'Keep every object inline in the ticket area',
        'Create separate destinations for every object type',
        'Use contextual drawers with object-specific language and actions'
      ],
      evidence:
        'The product-domain reference distinguishes their business consequences: a notification records delivery, while a proactive signal needs a meaningful result.',
      decision:
        'Explore dedicated contextual drawers and precise action language: qualify a signal, view a notification, work a ticket.',
      tradeOff:
        'Adds a contextual navigation layer and leaves the final business taxonomy dependent on stakeholder confirmation.',
      result:
        'A clearer interaction model represented in concept artefacts, not a shipped behaviour.',
      resultState: 'Concept'
    },
    {
      id: 'decision-journey',
      title: 'Combine workflow overview with expandable detail',
      tension:
        'A horizontal journey made the overall state easy to scan; a vertical journey gave each step room for dates, alerts, documents and actions.',
      alternatives: [
        'Horizontal, overview-first journey',
        'Vertical, detail-first journey',
        'A compact summary paired with expandable detail'
      ],
      evidence:
        'The project account records a first scenario-based test round and a second round prepared around active-step visibility, alert recognition, navigation and trust.',
      decision:
        'Develop the hybrid direction: a compact journey summary for orientation and a vertical structure for detailed work.',
      tradeOff:
        'Two representations of the same process must remain synchronised and accessible.',
      result:
        'A tested concept and prototype direction. Participant counts, scores and final approval are not published.',
      resultState: 'Tested concept',
      visual: {
        src: '/screenshots/solidaris/ishare-journey.png',
        alt: 'iShare workflow concept with a horizontal summary above expandable step detail'
      }
    }
  ],

  influence: {
    aligned: [
      'Product work around a shared vocabulary: case summary, master list, journey, status and contextual drawer',
      'Overview screens with links back to authoritative specialist tools rather than duplicated processing logic'
    ],
    convinced: [
      'Recommended using the inherited Plectrum direction for the local product work',
      'Advocated for a contribution path between product-specific needs and the core design-system work'
    ],
    changed: [
      'My role moved from working outside the core design-system group to active contribution in shared work; formal governance ownership remained with the programme',
      'Concrete prototypes and system artefacts made product and implementation questions inspectable',
      'Durable reuse by other teams and post-departure ownership remained to be measured'
    ]
  },

  craft: {
    intro:
      'These anonymised or recreated artefacts show the product reasoning and working layer. Each one separates evidence class from delivery state; none is used as shorthand for adoption or impact.',
    artefacts: [
      {
        src: '/screenshots/solidaris/icrm-timeline.png',
        alt: 'iCRM chronological history concept beside a selected request detail',
        what: 'A complementary dossier history.',
        why: 'Uses chronology where it adds context without asking generic activities to identify a ticket.',
        contribution: 'Designed the inbox/history relationship.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Concept artefact; final business validation is not published.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/iged-draft.png',
        alt: 'First iGED interface draft with filters and a dense document list',
        what: 'A first iGED interface draft.',
        why: 'Explores dense document processing on the same visual foundation.',
        contribution: 'Produced the draft shown; broader iGED ownership is not claimed.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Direct iGED scope, merge and deployment state still require confirmation.',
        state: 'Concept'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'Inherited foundation versus local additions',
      paragraphs: [
        '<strong>PrimeNG and the original Plectrum layer were inherited.</strong> The supplied account attributes the product-local Figma fork, a small custom component set, repository/Storybook work and ITCSS/BEMIT structure to my assignment.',
        'The exact upstream status matters: a fork can unblock delivery, but it can also create a shadow system. The portfolio therefore does not claim that the fork or custom components became the official shared source.'
      ],
      visual: {
        kind: 'image',
        src: '/screenshots/solidaris/token-architecture.svg',
        alt: 'Proposed primitive, semantic and component token tiers with a PrimeNG bridge',
        caption:
          'A proposed mapping between product variables, semantic decisions and the inherited PrimeNG/Plectrum foundation; automated synchronisation is not claimed.'
      }
    },
    {
      heading: 'Reusable enterprise patterns',
      paragraphs: [
        'The product work identified recurring solutions such as affiliate context, case summaries, rich master lists, status semantics, workflow journeys, related-object navigation and contextual drawers.',
        'The design principle was selective: use PrimeNG primitives directly when the inherited system is sufficient; add a thin facade or composed product pattern only when a recurring business or accessibility need justifies it.'
      ]
    },
    {
      heading: 'Machine-readable contracts',
      paragraphs: [
        'Contract schemas and working rules documented intended component use, token boundaries and accessibility expectations.',
        'These files are outputs. Independent execution, repeatability and team adoption are not established.'
      ],
      visual: {
        kind: 'image',
        src: '/screenshots/solidaris/contracts-index.svg',
        alt: 'AI-oriented component contracts, rules and knowledge-base structure',
        caption:
          'The structure makes design-to-code constraints inspectable; it does not prove reliable autonomous execution.'
      }
    },
    {
      heading: 'A proposed multi-role workflow',
      paragraphs: [
        'A documented workflow assigned research, architecture, implementation and review responsibilities across specialised roles.',
        'The diagram proves the workflow definition, not production-grade operation or adoption.'
      ],
      visual: {
        kind: 'image',
        src: '/screenshots/solidaris/ai-agent-workflow.svg',
        alt: 'Proposed multi-role workflow for research, architecture, implementation and review',
        caption:
          'A strategic proposal for AI-assisted work, with explicit review boundaries and no adoption claim.'
      }
    }
  ],

  validation: {
    method: [
      'Reported shadowing and workshops to understand product purpose and operational context',
      'Scenario-based prototype tasks rather than preference-only questions',
      'Observation paired with five-point ratings tied to concrete comprehension and navigation tasks'
    ],
    observed: [
      'The first iShare round reportedly found that workflow steps needed more prominence',
      'Related information and alerts needed stronger visibility',
      'Previous/next navigation was not always noticed'
    ],
    changed: [
      'The journey direction gave the active step and alerts stronger emphasis',
      'Navigation remained visible between steps',
      'A second round was prepared around comprehension, navigation and trust'
    ],
    limitations:
      'Participant count, participant profiles, per-round scores, approver, final delivery state and production outcomes are not published. The findings remain prototype-level evidence from the supplied project account.'
  },

  outcomes: {
    user: [],
    team: [],
    system: [],
    learning: [
      'In inherited systems, authorship has to be explicit: extending a foundation is different from creating it.',
      'A product-local fork can create momentum and risk at the same time; upstream ownership is part of the design.',
      'In expert tools, the goal is not to remove complexity but to make it legible and progressively available.',
      'AI-oriented documentation is an output until real execution, maintenance and independent use show an outcome.'
    ]
  },

  evidenceStatus: {
    intro:
      'The evidence includes concrete work, prototype-level validation and one bounded organisational outcome: my move into active contribution with the shared design-system group. Delivery, adoption and handoff claims remain separate.',
    claims: [
      researchOutput,
      systemOutput,
      validationBoundary,
      contributionOutcome,
      handoffState
    ],
    measurementNote:
      'Exact build states, upstream acceptance, independent use, handoff acceptance and post-departure effects. No quantified user, adoption or business-performance outcome is claimed at the August 2026 snapshot.'
  },

  reflection: {
    repeat: [
      'Start from each product\u2019s real user question before translating legacy screens.',
      'Prototype high-risk representations and workflows early.',
      'Turn recurring product needs into named patterns while keeping inherited and local ownership visible.'
    ],
    change: [
      'Secure a documented contribution path to the core system before creating a product-local fork.',
      'Record participant profiles, decision approvals and artefact delivery states as the work happens.',
      'Define the handoff owner and adoption measures earlier so durable value can be evaluated before departure.'
    ],
    next:
      'Before the planned October 2026 handoff: confirm the exact state of every artefact, document divergence and contribution rules, name future owners and agree which outcomes will be measured after departure.'
  },

  connection: {
    title: 'The production system evidence behind this approach',
    description:
      'The <strong>Bridgestone</strong> case shows the longer-running design-system and front-end work where production state and team use are better established.',
    buttonText: 'Read the Bridgestone case',
    href: '/work/bridgestone'
  }
};
