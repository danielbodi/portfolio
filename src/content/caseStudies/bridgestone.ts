import { CaseStudy } from '../types';
import { bridgestoneCard } from './cards';

export const bridgestoneStudy: CaseStudy = {
  card: bridgestoneCard,

  seo: {
    title: 'Bridgestone — CSS as the Single Source of Truth | Daniel Bodi Gil',
    description:
      'A design system where the CSS is the single source of truth: BEMIT architecture, a browser-computed color system, and a Storybook that documents itself by parsing the live CSSOM — built for FleetBridge, Bridgestone\u2019s fleet platform.'
  },

  hero: {
    summary:
      'Six years turning a component-less back office into a governed UI foundation — and then making the CSS itself the single source of truth: tokens written once, a palette the browser derives, and a Storybook that documents itself by reading the live stylesheets. Documentation cannot drift from production, because it is generated from production.',
    role: 'Product designer and UX engineer — design-system architecture, CSS/SCSS system design, Storybook design and implementation. Joined as the sole designer; led the design workflow of a three-designer team.',
    period: '2019 – 2025 · via CTG/Cegeka',
    team: '3 UI/UX designers (grown from 1), 5 front-end and 4 back-end developers, a tester, an architect and a scrum master.',
    context:
      'FleetBridge — Bridgestone\u2019s fleet and tyre operation management platform. An Angular/Nx monorepo where several applications share one visual language across two themes.',
    stack: ['Figma', 'Storybook', 'Angular · Nx', 'SCSS · ITCSS/BEM', 'TypeScript', 'Chromatic'],
    image: {
      src: '/screenshots/bs/bs_desktop_storybook-home.png',
      alt: 'Bridgestone design system documentation home in Storybook',
      what: 'Storybook: the design system\u2019s living documentation — fed by the CSS itself.',
      why: 'Foundations pages self-populate from the stylesheets: swatches, docs tables and playgrounds read the live CSSOM instead of hand-typed values.',
      contribution: 'I proposed it, structured it, built the CSS-to-Storybook pipeline and managed its dedicated backlog.',
      state: 'In production'
    }
  },

  recruiterSummary: {
    challenge:
      'The platform started without a design system — no time or resources planned for one — and design systems usually die of token duplication or stale documentation. The foundation had to be systematic, and it had to maintain itself.',
    ownership: [
      'Architected the styles library: 254 SCSS files across 8 ITCSS layers, with a BEM grammar strict enough to be machine-readable',
      'Built the color system (15 hand-picked hues; the browser derives the rest via color-mix) and the CSS-to-TypeScript-to-Storybook pipeline',
      'Ran Storybook (39 stories, 51 MDX docs), reviewed pull requests, coached developers'
    ],
    changed: [
      'Design tokens exist exactly once, in CSS — apps, utilities and documentation update from the same commit',
      'Storybook foundations self-populate from the live CSSOM: add a token in SCSS, it appears in the docs',
      'Modern CSS replaced JavaScript: scroll-driven table shadows, style-query dark mode, browser-computed palettes'
    ],
    evidence: [
      '254 SCSS files, ~250 color tokens per theme resolved from 15 hand-picked base colors',
      '39 story files + 51 MDX docs, self-populating; a11y checks and Chromatic visual regression on every story',
      '2 full themes from one token graph, consumed by web and tablet apps in the monorepo'
    ]
  },

  framing: {
    heading: 'Why this mattered',
    paragraphs: [
      'Bridgestone was building FleetBridge, a platform for fleets, vehicles and tyre operations. I joined as the sole designer <strong>after the backlog was defined</strong> — prototypes due immediately, no design system planned, <strong>no mandate</strong> to build one. It had to be built opportunistically and adopted because it made everyone faster.',
      'The deeper risk is the one that kills most design systems: <strong>duplication</strong> (tokens in Figma, in CSS, in a Storybook config, in developer heads — until one copy lies) or <strong>static documentation</strong> nobody trusts.',
      'FleetBridge is a multi-app Nx monorepo with two themes; a hand-maintained token catalogue would never survive delivery pressure. So one early decision shaped everything: <strong>write every foundation exactly once — in CSS — and make everything else read from it.</strong>'
    ]
  },

  ownership: [
    {
      verb: 'Led',
      items: [
        'The design-system strategy and the case for formally funding it',
        'The Storybook information architecture, backlog and contribution guides',
        'Figma branching and review workflows as the design team grew to three'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'The component library and guidelines, from foundations to complex worksheet flows',
        'Light and dark theming resolved from a single token graph',
        'Vehicle, contract and inspection interfaces for desktop and tablet'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'The 8-layer ITCSS architecture with BEM namespaces, enforced by Stylelint budgets in CI',
        'The color system: 15 base hues, color-mix() shade ramps, one mixin deriving each hue\u2019s semantic family',
        'The CSSOM parsers (getColors, getAnimations, keyframe harvesting) that feed Storybook and the product runtime'
      ]
    },
    {
      verb: 'Documented',
      items: [
        'Foundations as interactive playgrounds: searchable palettes, an animation composer, elevation and border configurators',
        '8 MDX contribution guides inside Storybook (how to write stories, docs structure, Figma embeds)'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'Code quality through pull-request reviews focused on design consistency',
        'Developer CSS practices through hands-on coaching',
        'Designer involvement in business workshops and user-testing sessions'
      ]
    },
    {
      verb: 'Team outcome',
      items: [
        'Platform features shipped by the full cross-functional team',
        'The adapted "reverse double diamond" process, shaped with the other designers'
      ]
    }
  ],

  decisions: [
    {
      id: 'decision-css-ssot',
      title: 'Make the CSS itself the single source of truth',
      tension:
        'Tokens usually live in a JSON file, a Figma export or Storybook constants — each copy a chance to drift. On a multi-app monorepo with two themes, every duplicated value is a future lie in the documentation.',
      alternatives: [
        'A JSON token pipeline with build-time codegen',
        'Figma as the token source, exported to code',
        'CSS custom properties as the only token store — everything else reads from the live CSSOM'
      ],
      evidence:
        'Every duplication point observed in practice eventually desynchronised; the one artefact that is always true is the CSS the product actually ships.',
      decision:
        'Design tokens live once, as CSS custom properties, in one SCSS file per foundation. A small set of TypeScript functions treats the browser\u2019s CSSOM as a queryable database and feeds Storybook — swatches, docs tables and playgrounds self-populate. Add a token in SCSS and it appears in the docs; rename it and the docs update.',
      tradeOff:
        'The nomenclature must be strict enough to parse, and the parsers are custom code to own — the grammar becomes a real API you cannot casually break.',
      result:
        'One file per foundation is the entire token maintenance surface. Documentation cannot drift from production because it is generated from production CSS.',
      resultState: 'In production',
      visual: {
        src: '/screenshots/bs/bs_desktop_storybook-home.png',
        alt: 'Storybook documentation home, self-populated from the live CSS'
      }
    },
    {
      id: 'decision-nomenclature',
      title: 'Treat the BEM nomenclature as a machine-readable API',
      tension:
        'Naming conventions are usually hygiene for humans. To let code parse the design system, the names themselves had to carry structure — reliably, across hundreds of tokens and generated classes.',
      alternatives: [
        'Loose, human-oriented naming with a separate token manifest',
        'A strict BEM grammar applied to custom property names, parseable by regex'
      ],
      evidence:
        'BEM\u2019s __ and -- separators give every token a coordinate system: a five-level color grammar (palette → theme → generic → component → interaction state), the same pattern for animation, typography and spacing.',
      decision:
        'Names like <code>--color--component--button__background-primary</code> are the parser\u2019s schema. The TypeScript layer validates tokens against the grammar and folds them into the exact tree the Storybook pages render. Typography doesn\u2019t list its classes — it discovers them, classifying 144 generated <code>.typo__</code> classes into generic and semantic tabs by pattern.',
      tradeOff:
        'Verbose names, and zero tolerance for ad-hoc naming — every exception would break a parser.',
      result:
        'One naming convention, one parser pattern, every foundation self-documenting — colors, animation, typography, spacing and grid.',
      resultState: 'In production',
      visual: {
        src: '/screenshots/bs/bs_storybook tag anatomy.png',
        alt: 'Generated Storybook anatomy documentation for the Tag component'
      }
    },
    {
      id: 'decision-color-mix',
      title: 'Hand-pick 15 colors, let the browser compute the rest',
      tension:
        'Two full themes and multiple environments need hundreds of color tokens — but hand-maintaining a 300-row palette guarantees drift, and Sass build-time functions bake values that can\u2019t re-derive at runtime.',
      alternatives: [
        'A hand-maintained token spreadsheet per theme',
        'Sass darken()/lighten() at build time',
        'Runtime derivation with color-mix(): shade ramps stored as composable mix fragments'
      ],
      evidence:
        'Shades are relationships, not colors: the entire neutral scale is one near-black, one off-white and nineteen percentages. A single colorScheme() mixin composes base × ramp into each hue\u2019s semantic family per theme.',
      decision:
        '15 base hues are essentially the only hand-picked colors in the system. Roughly 165 semantic tokens across both themes derive from them in the browser — dark mode maintains no parallel palette, it re-mixes the same bases deeper into the ramp; environment themes recolor by pointing one token at a palette color.',
      tradeOff:
        'Requires trusting modern CSS in production, and TypeScript utilities that can parse color-mix() expressions back to RGB when palette math is needed.',
      result:
        'A palette change is one file: apps, both themes, environment builds, Storybook swatches and even runtime-generated avatar colors re-derive from the same commit.',
      resultState: 'In production'
    },
    {
      id: 'decision-modern-css',
      title: 'Use the modern CSS platform to delete JavaScript',
      tension:
        'Scroll-aware table shadows, theme switching and shade generation are traditionally JavaScript problems — event listeners, theme classes, build scripts — all of them jank-prone or drift-prone.',
      alternatives: [
        'Scroll listeners writing inline styles; a JS theme service; build-time shade scripts',
        'Declarative platform CSS: scroll-driven animations, :has(), container style queries'
      ],
      evidence:
        'The sticky-column shadow is the classic case: a scroll listener runs on the main thread and janks; <code>animation-timeline: scroll()</code> makes the scroll position itself the timeline scrubber, off the main thread, with zero listeners.',
      decision:
        'Table shadows run on scroll-driven animations with <code>:has()</code> selecting "the last sticky column"; dark mode is a single <code>--dark-mode</code> custom property consumed through a container style query — no theme-class cascade, no JS theme logic; reduced motion is a system default where animation collapses to ~0ms except an allowlist that communicates state (spinners, skeletons slow down instead of disappearing).',
      tradeOff:
        'A newer browser baseline, and platform features the team had to learn to read.',
      result:
        'Scroll listeners, theme-switching logic and shade-generation scripts became declarative CSS — measurably less JavaScript to maintain.',
      resultState: 'In production',
      visual: {
        src: '/screenshots/bs/bs_desktop_vehicle-list-dark.png',
        alt: 'Vehicle list in dark theme with CSS-driven sticky-column shadows'
      }
    },
    {
      id: 'decision-demonstration',
      title: 'Win the design-system mandate by demonstration, not request',
      tension:
        'The business had allocated zero time or resources for a design system, and asking for them without proof would have failed.',
      alternatives: [
        'Formally request budget up front',
        'Build the system invisibly and hope it gets noticed',
        'Show the measurable difference between working with and without it'
      ],
      evidence:
        'Side-by-side demonstrations: delivery speed and consistency with system components versus one-off design and build. On the design side, starting from a customised Ant Design kit in Figma bought the time to prove it.',
      decision:
        'Build opportunistically, then show the difference explicitly to the business.',
      tradeOff: 'Slower early system growth than a mandated project would have allowed.',
      result:
        'The business formally invested time and resources in the design system after seeing the comparison.',
      resultState: 'Shipped',
      visual: {
        src: '/screenshots/bs/bs_design-approach.png',
        alt: 'The adapted design process shaped with the design team'
      }
    },
    {
      id: 'decision-design-qa',
      title: 'Put the designer inside the development workflow',
      tension:
        'Custom components were being implemented by developers who had never built from custom designs; inconsistencies surfaced only after merge.',
      alternatives: [
        'Post-release design audits',
        'More detailed specs and hoping for the best',
        'Design participation in pull-request reviews, plus enforcement the CI can run'
      ],
      evidence:
        'Recurring CSS and layout issues traced to methodology, not skill — structure and naming were the gaps.',
      decision:
        'I reviewed pull requests for design consistency and coached developers directly on CSS and HTML. The architecture polices itself in CI: Stylelint budgets ban <code>!important</code> and IDs, cap specificity at 0,6,3 and nesting at 5 — the ITCSS triangle is enforced, not just documented.',
      tradeOff:
        'Ongoing designer time in code review — recovered many times over in avoided rework.',
      result:
        'Inconsistencies caught before merge, developer autonomy on custom work grew, and specificity wars became structurally impossible.',
      resultState: 'Shipped'
    }
  ],

  craft: {
    intro:
      'Production interfaces built on the component library — dense operational data, light and dark themes resolved from the same token graph, desktop and tablet. All screens shown are in production.',
    artefacts: [
      {
        src: '/screenshots/bs/bs_desktop_vehicle-list-dark.png',
        alt: 'Vehicle list view in dark theme with filtering and sorting',
        what: 'Vehicle management list: filtering, sorting and dense scanning.',
        why: 'Fleet operators work through large vehicle sets; the table patterns had to make density readable — including scroll-position-aware sticky-column shadows driven by pure CSS.',
        contribution: 'Designed the list patterns and their component states; built the scroll-driven shadow behaviour.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_desktop_ws-light.png',
        alt: 'Vehicle worksheet interface in light theme showing maintenance details',
        what: 'Worksheet flow, light theme.',
        why: 'The worksheet is the platform\u2019s densest surface — maintenance details, statuses and actions in one working view.',
        contribution: 'Designed the flow and the composite components it exercises.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_desktop_ws-dark.png',
        alt: 'Vehicle worksheet interface in dark theme',
        what: 'The same worksheet in dark theme.',
        why: 'Dark mode is one custom property, not a parallel stylesheet: tokens re-mix the same base colors deeper into the shade ramps, so the themes cannot drift.',
        contribution: 'Built the style-query theming approach — no theme-class cascade, no JS theme logic.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_desktop_settings-light.png',
        alt: 'Settings panel in light theme with custom form controls',
        what: 'Settings with custom form controls.',
        why: 'Form patterns — validation, states, structure — are where design systems earn or lose developer trust.',
        contribution: 'Designed the form component set and documented its usage.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_tablet_ws-light.png',
        alt: 'Tablet layout of the worksheet interface in light theme',
        what: 'Worksheet on tablet.',
        why: 'Field usage demanded responsive behaviour from the same components — the .o-flex object system with responsive suffixes, not a parallel tablet design.',
        contribution: 'Defined the responsive component behaviour.',
        state: 'In production'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'BEMIT: eight layers, enforced by budgets',
      paragraphs: [
        'The shared styles library — <strong>254 SCSS files</strong> — is an ITCSS "inverted triangle": settings and tools emit no CSS, then generic, elements, objects, components, utilities and trumps, ordered from lowest to highest specificity. The cascade is architectural, not accidental.',
        '<strong>Utilities default to SCSS placeholders, not classes</strong>: roughly 300 generated elevation, border and shadow utilities cost zero bytes unless a component <code>@extend</code>s them. Stylelint budgets in CI keep the triangle healthy — no <code>!important</code>, no IDs, specificity capped at 0,6,3.'
      ]
    },
    {
      heading: 'A color system the browser derives',
      paragraphs: [
        'Fifteen base hues are the only hand-picked colors in the system. Shade ramps are <strong>composable color-mix() fragments</strong> — shades are relationships, not values — and one <code>colorScheme()</code> mixin composes base × ramp into each hue\u2019s semantic family per theme: <strong>≈165 tokens nobody wrote and nobody can get out of sync</strong>.',
        'Derivation stays in runtime CSS: change one base color and everything re-derives live. Dark mode keeps no parallel palette — it re-mixes the same bases inside a <code>@container root style(--dark-mode: 1)</code> query — and each environment recolors by pointing one token at a palette color.'
      ]
    },
    {
      heading: 'The pipeline: CSS → TypeScript → Storybook',
      paragraphs: [
        'A small set of TypeScript functions treats the browser\u2019s CSSOM as a queryable database: <code>getColors()</code> validates every custom property against the naming grammar and folds tokens into the exact tree the docs render; <code>getAnimations()</code> reads real <code>@keyframes</code> live from the stylesheets. Typography and spacing pages <em>discover</em> their classes by pattern rather than listing them.',
        'The foundations are <strong>playgrounds, not posters</strong>: a searchable palette with click-to-copy <code>var(--color--…)</code> references in both themes, an animation composer that outputs the SCSS call and live keyframes, elevation and border configurators. Search → preview → click → paste.'
      ]
    },
    {
      heading: 'The product runtime consumes the same truth',
      paragraphs: [
        'The parsers aren\u2019t Storybook-only. Avatar colors are <strong>snapped to the nearest design-system color</strong> (Redmean perceptual distance) against a palette parsed from the CSS at runtime — a palette change re-brands avatar generation automatically, with text contrast resolved from the background\u2019s lightness in both themes.',
        'Motion accessibility is a system default: under <code>prefers-reduced-motion</code>, animation collapses to ~0ms except an allowlist that communicates state — spinners and skeletons slow down instead of disappearing.'
      ]
    },
    {
      heading: 'Governance: a design system with internal users',
      paragraphs: [
        'Storybook ships its own onboarding — 8 MDX guides — with an information architecture curated for two audiences: designers land on interactive foundations, developers on API tables. <strong>Figma is linked, not duplicated</strong>; code remains the truth for values.',
        'Quality gates run on every story: the a11y addon, Chromatic visual regression with TurboSnap, and the Stylelint budgets in CI. Even Storybook\u2019s own chrome consumes the system\u2019s tokens — the documentation site is itself a design-system consumer, dark mode included.'
      ]
    }
  ],

  validation: {
    method: [
      'Designers embedded in business workshops and user-testing sessions (a change I requested and got)',
      'Post-release feedback loops run by the business, feeding design iterations',
      'Prototype walkthroughs with stakeholders before development; Chromatic visual regression and a11y checks on every story'
    ],
    observed: [
      'Feedback arriving only post-development caused reactive redesigns of already-built features',
      'Requirements defined without design input missed workflow-level problems',
      '"Which grey is this?" and "which class do I use?" questions consumed design and dev time in Slack'
    ],
    changed: [
      'The process was reshaped ("reverse double diamond") so design joined at the requirements stage',
      'Iteration cycles moved earlier: prototype → business approval → development, with feedback folded back into the system',
      'Search-and-copy foundations pages absorbed the token questions — the docs became part of the daily workflow'
    ],
    limitations:
      'User research stayed constrained by budget and business-driven requirements; no formal usability metrics were collected. The improvement evidence is process-level and team-reported rather than experimentally measured.'
  },

  outcomes: {
    user: [
      {
        text: 'Internal teams work in a consistent interface across vehicle, contract and inspection modules — in light or dark theme — instead of feature-by-feature variation.'
      },
      {
        text: 'Dense operational data presented through consistent, scannable table and form patterns, with scroll-aware affordances that run off the main thread.'
      }
    ],
    team: [
      {
        text: 'One file per foundation is the entire token maintenance surface: a palette change, a new easing curve or a spacing step is a single-file PR — apps, utilities and documentation update from the same commit.'
      },
      {
        text: 'The foundations became a daily tool: designers stopped asking "which grey is this?", developers stopped hardcoding hex — search, click, copy, paste.'
      },
      {
        text: 'Development reported markedly faster feature work after the component library and Storybook were adopted.',
        evidenceNote:
          'The team cited a ~60% improvement; the baseline and measurement method were not formally documented, so treat it as a team-reported estimate (see content checklist).'
      },
      {
        text: 'The design function scaled from one to three designers on workflows I established.'
      }
    ],
    system: [
      {
        text: 'Nothing is hardcoded twice: no token appears in a TS config, a Storybook constant or a docs page by hand — every value shown anywhere is read from the live CSS.',
        evidenceNote: 'Verifiable in the codebase: CSSOM parsers in the shared util library feed both Storybook and the product runtime.'
      },
      {
        text: 'Two full themes resolve from one token graph, consumed by multiple applications in the monorepo — with brand-consistent runtime color generation (avatars) as a free side effect.'
      },
      {
        text: 'Modern CSS replaced JavaScript in measurable places: scroll listeners for table shadows, theme-switching logic, shade-generation scripts and animation utility bookkeeping all became declarative CSS.'
      }
    ],
    learning: [
      'Documentation generated from production cannot lie — the only sustainable design-system docs are the ones nobody has to maintain.',
      'A naming convention strict enough to parse is an API: the grammar did more for consistency than any review checklist.',
      'Demonstration beats persuasion: the business funded the design system after seeing the difference, not after hearing about it.'
    ]
  },

  metrics: [
    {
      value: '254',
      label: 'SCSS files in one shared styles library, 8 ITCSS layers',
      confidence: 'verified',
      evidenceNote: 'Count from the libs/styles source tree in the FleetBridge monorepo.'
    },
    {
      value: '15 → ~250',
      label: 'hand-picked base colors deriving the full token set per theme',
      confidence: 'verified',
      evidenceNote:
        'Base hues in the settings file; ~250 color tokens per theme resolved via color-mix() ramps and the colorScheme() mixin — ≈165 derived tokens are never written by hand.'
    },
    {
      value: '39 + 51',
      label: 'story files + MDX docs, self-populating from the live CSS',
      confidence: 'verified',
      evidenceNote: 'Storybook workspace count; foundations pages are generated by CSSOM parsers, not hand-typed.'
    },
    {
      value: '2 themes',
      label: 'light and dark from one token graph — no parallel palette',
      confidence: 'verified',
      evidenceNote: 'Dark mode re-mixes the same base colors via a container style query on a single --dark-mode property.'
    },
    {
      value: '40+',
      label: 'components and guidelines documented',
      confidence: 'reported',
      evidenceNote: 'Count from the design-system backlog and Storybook inventory; export pending.'
    },
    {
      value: '~60%',
      label: 'faster development reported after adoption',
      confidence: 'reported',
      evidenceNote:
        'Team-reported estimate comparing feature work before and after the component library; baseline and method not formally documented.'
    }
  ],

  reflection: {
    repeat: [
      'CSS as the single source of truth, with documentation generated from it — the drift problem disappears structurally instead of procedurally.',
      'Designing the nomenclature as an API before writing the parsers; the strict grammar paid for itself many times over.',
      'Pull-request review as design QA, backed by lint budgets the CI enforces without me.'
    ],
    change: [
      'Negotiate design-system time into the initial backlog rather than building the case retroactively.',
      'Define measurement from day one — the strongest business outcomes here are team-reported because no baseline was ever captured.'
    ],
    next:
      'The internal team continues Storybook and system development on these foundations; suggested next artefacts for this page: the palette story with light/dark search, the animation composer\u2019s three generated outputs, and a recording of the scroll-driven sticky-column shadow (see content checklist).'
  },

  connection: {
    title: 'Product craft under harder constraints',
    description:
      'Before Bridgestone, the same designer-engineer combination shipped a <strong>safety-critical device interface</strong> at Trasis — where ambiguity was not an option.',
    buttonText: 'Read the Trasis QC1 case',
    href: '/work/trasis'
  }
};
