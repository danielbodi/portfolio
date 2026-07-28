# Building an AI-Ready Design System

### Plectrum — a governed, contract-driven design system powering two Angular products

**Role:** Staff Product Designer (design engineering / design systems)
**Stack:** Angular · PrimeNG · SCSS (ITCSS) · Storybook · Figma · MCP · AI agents (Cursor & VS Code Copilot)

---

## TL;DR — for the 30-second reader

I designed and built a design system that is consumable by **both humans and AI agents**. Beyond the classic pillars (token architecture, ITCSS, BEMIT, Storybook), I added a machine-readable layer — component contracts, a generated codebase index, agent protocols, and a 7-role AI agent team — so that any AI coding assistant produces on-system, on-brand, accessible code **by default**, not by luck.

| Pillar | What I shipped |
|---|---|
| **CSS architecture** | 8-layer ITCSS, ~100 SCSS files, one barrel per layer, strict file-naming convention |
| **Token system** | 3-tier tokens (primitive → semantic → component), 170+ Figma variables mapped, single-variable prefix control |
| **BEMIT** | `c-` / `o-` / `u-` / `is-` namespacing, template-first layout objects, zero utility classes in HTML |
| **SSOT** | Monorepo: one `libs/ui`, one `libs/styles`, two apps consuming them — nothing duplicated |
| **AI contracts** | TypeScript metadata schema per component, token contract schema, generated `index.json` codebase map |
| **AI governance** | 9 rule files, 4 skill files, 4 agent protocols, 40-page token governance document |
| **AI agents** | 7 specialized subagents (coordinator + 6 workers) with a parallel orchestration workflow, kept in sync across two editors |
| **MCP integration** | Figma MCP + PrimeNG MCP wired into the workflow — agents query the real UI kit and the real component API before writing code |

---

## 1. Context

Solidaris (a Belgian health insurance fund) runs two Angular applications — **iSHARE** and **iCRM** — that must share one visual language: **Plectrum**, the in-house design system, implemented on top of **PrimeNG** with a **Figma UI Kit** as the design source of truth.

My mandate: make the design system the *single source of truth* in code as well as in Figma — and make it robust enough that AI-assisted development (which the team uses daily) **strengthens** consistency instead of eroding it.

The core insight: **AI assistants are now a primary consumer of your design system.** If your system is only documented for humans, every AI-generated PR is a drift vector. If it's documented *for machines*, every AI-generated PR is an enforcement vector.

---

## 2. The foundation — CSS architecture that machines can reason about

### 2.1 ITCSS: eight layers, deterministic cascade

Everything in `libs/styles/src/`, ordered from lowest to highest specificity. Every file follows the naming convention `_{layer}.{description}.scss`, and every layer exposes a single `_{layer}.core.scss` barrel:

```text
01-settings/    design tokens as CSS custom properties (no CSS output)
02-tools/       mixins, functions, generators (no CSS output)
03-generic/     reset / normalize
04-elements/    bare HTML element defaults
05-objects/     layout patterns              → prefix o-
06-components/  BEM components + PrimeNG wrappers → prefix c-
07-utilities/   single-purpose helpers       → prefix u-
08-trumps/      documented overrides (e.g. Storybook-only)
```

Why this matters for AI: **placement is decidable**. An agent (or a junior dev) never has to guess where a style belongs — the layer, the file name, and the class prefix are all derivable from the rule set. Ambiguity is where drift starts; I removed the ambiguity.

### 2.2 BEMIT: namespaced classes as an API

| Prefix | Meaning | Example |
|---|---|---|
| `o-` | Layout object | `o-flex--col`, `o-layout--overflow-y-auto` |
| `c-` | Component | `c-card__header`, `c-drawer--collapsed` |
| `u-` | Utility | `u-radius-md`, `u-sr-only` |
| `is-` / `has-` | State | `is-active`, `has-error` |

One deliberately strict policy: **no utility classes in HTML templates, ever** — layout is expressed through `o-` object mixes in the template, visual identity through `c-` classes in SCSS. This keeps templates semantic and makes every class name greppable and self-describing:

```html
<!-- Layout via object mixes, identity via the component class -->
<div class="c-card__body o-flex o-flex--col o-layout--overflow-y-auto">
```

### 2.3 Content-first sizing — a rule, not a preference

Components may not carry arbitrary fixed `width`/`height`. Heights emerge from padding + line-height; widths from flex/grid. The only two sanctioned exceptions (icon constraints, structural collapsed states) **require a justification comment in the SCSS**. This single rule eliminated an entire class of "it broke when the text got longer" bugs — and it's written in a protocol file that AI agents load before generating any SCSS.

---

## 3. Token architecture — three tiers, one prefix variable, one bridge

### 3.1 Primitive → semantic → component

```css
:root {
  /* 1 — primitive: what the value is */
  --pds-color-primary-500: #527191;

  /* 2 — semantic: what the value means */
  --pds-color-brand: var(--pds-color-primary-500);

  /* 3 — component/vendor bridge: where the value is applied */
  --p-button-primary-background: var(--pds-color-brand);
}
```

Components are forbidden from touching primitives directly — they consume semantic tokens only. 170+ Figma variables (color, typography, spacing, radius) are mapped 1:1 into the settings layer, each file header citing the exact Figma collection it mirrors.

### 3.2 The whole prefix is one variable

Every token is emitted through SCSS interpolation from a single setting:

```scss
// libs/styles/src/01-settings/_settings.prefix.scss
$pds-prefix: 'PDS' !default;

// every settings file
:root {
  --#{$pds-prefix}-color-brand: var(--#{$pds-prefix}-color-primary-500);
}
```

Rebranding or white-labelling the entire token system is a one-line change. Hardcoding `--pds-` anywhere is an audit **error**, caught by protocol.

### 3.3 Taming the vendor: the PrimeNG bridge pattern

Instead of fighting PrimeNG with selector overrides and `!important`, all vendor theming happens by **mapping PrimeNG's own CSS variables to our semantic tokens**, scoped by BEM wrapper, in a dedicated settings file per PrimeNG component:

```scss
// 01-settings/_settings.form-field.scss — the only place --p-* is allowed
.c-form-field {
  --p-inputtext-border-color: var(--pds-color-field-border);

  &--invalid {
    --p-inputtext-border-color: var(--pds-color-field-border-invalid);
  }
}
```

The PrimeNG TypeScript preset stays a thin adapter (`providePlectrum()`); design decisions live in CSS where designers can read them. Result: PrimeNG upgrades don't shatter the theme, because we never depend on its internal DOM.

---

## 4. The differentiator — making the system AI-ready

This is the layer most design systems don't have. I treated AI agents as first-class consumers of the design system and built a **contract-driven development (CDD)** layer for them in `.ai/`.

### 4.1 Component contracts — machine-readable metadata

Every component in `libs/ui` ships with a colocated `.metadata.ts` conforming to a shared TypeScript schema. It encodes what documentation usually leaves implicit: when to use the component, when *not* to, which tokens it consumes, and hints that help an AI pick the right component for an intent:

```typescript
export const EmptyStateMetadata: ComponentMetadata = {
  component: { name: 'EmptyState', category: 'molecules', bemBlock: 'c-empty-state',
               itcssLayer: '06-components', /* … */ },
  usage: {
    antiPatterns: [{
      scenario: 'Actionable error recovery flow',
      reason: 'The component is descriptive, not interactive.',
      alternative: 'Use a dedicated error banner or recovery screen.',
    }],
  },
  accessibility: { wcagLevel: 'AA' },
  tokens: { consumed: ['--pds-color-text', '--pds-color-text-muted', /* … */] },
  aiHints: {
    context: 'Use as a reusable placeholder wrapper for empty pages and detail panels.',
    keywords: ['empty state', 'placeholder', 'no results'],
  },
};
```

A parallel `TokenContract` schema does the same for tokens — layer, Figma variable, PrimeNG mapping, consumers, change-risk level, deprecation path — enabling scripted drift detection between Figma, code and docs.

### 4.2 The codebase index — a map agents load first

`npm run generate-index` regenerates `.ai/contracts/index.json`: the full workspace map (apps, libs, token architecture, every component with its category, BEM block, PrimeNG base and dependencies). An agent starting a task loads one JSON file and knows **what exists and where**, instead of grepping and hallucinating.

### 4.3 Rules, skills, protocols — a knowledge base with a loading order

```text
.ai/
├── rules/       9 files — constraints that must never be violated
│                (architecture/SSOT, tokens, Storybook, PrimeNG-first,
│                 BEMIT, accessibility, version control, styling policy)
├── skills/      4 files — how to do things right (DS workflow, SCSS
│                 architecture, component workflow, token checklist)
├── contracts/
│   ├── schema/     TypeScript contracts (component + token)
│   ├── protocols/  component-creation, token-audit, query-protocol,
│   │               ready-to-use AI prompt templates
│   └── index.json  generated codebase map
└── DESIGN_TOKENS_GOVERNANCE.md   the governance constitution
```

The **query protocol** even defines the context-loading order and anti-drift tripwires ("if you see a hardcoded hex → replace with a token; if a component lacks `.metadata.ts` → flag it, don't silently proceed"). Nested `AGENTS.md` files inside the libs redirect any AI touching those folders back to the relevant rules — governance travels with the code.

### 4.4 A seven-role AI agent team

I designed a multi-agent workflow mirroring a real design-system team, defined **twice in parallel** — `.cursor/agents/` for Cursor and `.github/agents/` for VS Code Copilot — and kept in sync:

| Agent | Role |
|---|---|
| **Solidaris** (coordinator) | Orchestrates everything; never writes code itself |
| **UX Researcher** | Inspects Figma nodes via MCP, extracts tokens/states/spacing, writes a design brief |
| **Architect** | Read-only SSOT/ITCSS enforcement, checks the index for duplicates |
| **UX Engineer** | Authors tokens, BEMIT SCSS, PrimeNG bridges, Storybook stories |
| **Frontend Dev** | Angular implementation: signals, OnPush, ARIA, barrel exports |
| **Tester** | Story coverage, unit tests, WCAG 2.1 AA audit |
| **Token Auditor** | Read-only: prefix compliance, semantic coverage, PrimeNG sync, Figma drift |

The coordinator runs a **fan-out/fan-in pipeline** — research and architecture in parallel, then engineering, then implementation, then QA in parallel:

```text
Step 1 (parallel):  UX Researcher + Architect
Step 2:             UX Engineer        (tokens, SCSS, stories)
Step 3:             Frontend Dev       (Angular component)
Step 4 (parallel):  Tester + Token Auditor
Step 5:             Consolidated summary → human review
```

Two MCP servers make the agents *grounded* rather than generative: **Figma MCP** (the Plectrum UI Kit is queried for real token values, not guessed) and **PrimeNG MCP** (the component API is verified before anything custom is written). Rule one of the workflow: *never build what PrimeNG or the kit already provides.*

### 4.5 Scaffolding that enforces the contract

`npm run pds:component` scaffolds a new component with **every governance artifact included**: the Angular files, the colocated `.stories.ts`, the `.metadata.ts` contract, the `_components.{name}.scss` in the right ITCSS layer, and the barrel export — then `generate-index` refreshes the map. The correct path is also the laziest path.

---

## 5. Governance — tokens as a managed product

The 40-page `DESIGN_TOKENS_GOVERNANCE.md` treats tokens like an API with an SLA:

- **Clear source responsibilities** — Figma decides visual intent; the repository decides implementation; Storybook validates; the design-system owner arbitrates. *No token reaches production just because it changed in Figma.*
- **Change-risk classification** — low / medium / high, each with its required review depth (a focus-ring or text-color change demands design + technical review + Storybook validation + migration notes).
- **Deprecation policy** — tokens are never hard-deleted: deprecate with a comment, provide a replacement, migrate progressively, remove in a later release.
- **Accessibility gates** — any change to text, surface, border, focus-ring or status tokens triggers a WCAG AA contrast review; the token audit protocol computes contrast ratios across all text/surface pairs.
- **A 12-point review checklist** applied to every token PR.

Storybook (with the a11y addon) is the validation layer: every component ships with colocated stories covering default, hover, disabled, loading, error and empty states — *"no component is done without a passing story"* is a hard rule, not a guideline.

---

## 6. Outcomes

- **Two production apps, one visual language** — zero duplicated components or token definitions between iSHARE and iCRM.
- **AI output that lands on-system** — agents propose semantic tokens, correct ITCSS placement and BEMIT naming on the first pass, because the rules are in their context, not in a wiki nobody loads.
- **Auditable design decisions** — every token traces to a Figma variable; every component declares its token diet; drift is detectable by script rather than by eye.
- **Vendor resilience** — PrimeNG restyling is done entirely through CSS-variable bridges; upgrades don't break the theme.
- **Onboarding by protocol** — a new developer (or a new AI model) follows the same decision trees and ships consistent work from day one.

---

## 7. What this case study demonstrates

**As a designer:** systems thinking, token taxonomy design, Figma-as-SSOT discipline, accessibility-first governance, design/dev handoff engineered as a process rather than a ritual.

**As an engineer:** ITCSS/BEMIT at production scale, CSS custom property architecture, vendor theming strategy, monorepo SSOT boundaries, TypeScript schema design, tooling (generators, index generation).

**As an AI practitioner:** contract-driven development for LLM consumers, multi-agent orchestration design, MCP integration for grounded generation, prompt/rule/skill/protocol architecture, drift-prevention as a system property.

> The design systems that survive the AI era won't be the prettiest ones — they'll be the ones that machines can't misuse. That's what I build.
