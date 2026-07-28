---
name: Solidaris Case Study Page
overview: Add a new Solidaris case-study page to the portfolio site, consistent with the existing project pages, emphasizing the AI-ready Plectrum design system (contracts, rules/skills, AI agent team, MCP) with a secondary section on the UX approach across iCRM/iShare/iGED.
todos:
  - id: assets
    content: "Create placeholder assets: solidaris screenshots folder with labeled SVG placeholders, thumbnail, logo, and new skill icons (angular, primeng, ai, mcp)"
    status: completed
  - id: page
    content: Create src/pages/SolidarisProject.tsx with concise, accomplishment-first content (AI-ready Plectrum focus + UX approach section)
    status: completed
  - id: wiring
    content: Register route in App.tsx and add Solidaris entries to Projects.tsx, Career.tsx, and sitemap.xml
    status: completed
  - id: verify
    content: Run dev server, verify /projects/solidaris renders, TOC works, listings link, lints pass
    status: completed
isProject: false
---

# Solidaris Case Study Page

## Goal

Create a live, routed case-study page for the Solidaris project, matching the structure of the existing pages (e.g. [src/pages/TraisProject.tsx](src/pages/TraisProject.tsx) rendered through [src/pages/ProjectTemplate.tsx](src/pages/ProjectTemplate.tsx)). Content is concise and accomplishment-first: primary focus on Plectrum and the AI-ready design system (contracts, codebase index, rules/skills/protocols, 7-role agent team, MCP grounding), secondary focus on the UX approach and UI design for iCRM/iShare/iGED.

## Content mapping (sources: PORTFOLIO_USE_CASE.md + solidaris-portfolio-use-case-reference.md)

- **Title / platforms:** "Solidaris — AI-Ready Design System & Enterprise UX", Desktop platform tag. Route `/projects/solidaris`.
- **Project description:** 2-3 sentences — Belgian health insurance fund, ecosystem of Angular apps (iCRM, iShare, iGED) sharing one design system (Plectrum on PrimeNG); mandate to modernise the UX and make the design system a single source of truth for humans _and_ AI agents.
- **My Role:** Sole Cegeka consultant embedded at Solidaris (Oct 2025 - Oct 2026, ongoing) — product design + UX architecture + design engineering; built the AI-ready layer on top of the design system.
- **Team Composition:** 1 UX/UI Designer (me), Product Owners, Business Analysts, Angular Developers (no counts invented).
- **Skills:** design = Figma; dev = Storybook, CSS/SCSS, TS, HTML, Git (existing icons) + new icons for Angular, PrimeNG, AI Agents/Cursor, MCP (simple SVGs added to `public/skill-icons/`).
- **Case Summary (3 challenge/solution cards):**
  1. _AI-assisted development as a drift vector_ → contract-driven design system: `.metadata.ts` component contracts, token contracts, generated `index.json`, 9 rules / 4 skills / 4 protocols, 7-role AI agent team with fan-out/fan-in orchestration, Figma + PrimeNG MCP grounding.
  2. _Two apps, one visual language on a vendor library_ → 3-tier token architecture (170+ Figma variables), 8-layer ITCSS + BEMIT, PrimeNG CSS-variable bridge pattern, single-prefix rebranding, 40-page token governance.
  3. _Fragmented legacy ecosystem, expert users_ → reframed each app around the user's question; iCRM business-inbox ticket list + complementary timeline + proactivity/notification drawers; iShare hybrid horizontal/vertical document journey; task-based user testing; reusable Plectrum patterns.
- **Project Impact (factual, no invented metrics):** e.g. `2 apps · 1 design system`, `170+ Figma variables mapped to code`, `7 specialized AI agents`. No percentages — the reference doc explicitly forbids invented quantitative outcomes.
- **Challenges (3) / Solutions (3-4):** short narrative sections mirroring the case-summary cards, with the AI-ready design system solution getting the most depth (contracts example, agent roles table-as-prose, MCP grounding, scaffolding), then token/vendor architecture, then the UX approach (iCRM inbox, iShare journeys, testing method) kept brief.
- **Project connection:** Solidaris → Bridgestone ("Next Project").
- Mark the project as ongoing; avoid internal identifiers and unverified iGED redesign claims per the reference doc's confidentiality rules.

## Files to create

- `src/pages/SolidarisProject.tsx` — the page, same prop shape as `TraisProject.tsx`.
- `public/screenshots/solidaris/` — placeholder SVG visuals (dark labeled frames) for hero + 4-5 gallery slots (ecosystem map, AI agent workflow, token architecture, iCRM inbox, iShare journey), to be replaced with anonymised visuals later.
- `public/screenshots/solidaris-thumbnail.png` (placeholder) and `public/company-logos/solidaris logo.png` (placeholder) — flagged for you to replace.
- New skill icons in `public/skill-icons/` (angular.svg, primeng.svg, ai.svg, mcp.svg — simple monochrome SVGs).

## Files to modify

- [src/App.tsx](src/App.tsx) — import + `<Route path="/projects/solidaris">` (leaving the in-flight analytics changes untouched).
- [src/ui/components/projects/Projects.tsx](src/ui/components/projects/Projects.tsx) — add Solidaris card at the top (period "Oct 2025 - Now", `caseStudyPath: '/projects/solidaris'`); update Bridgestone's period from "Jul 2019 - Now" so only Solidaris reads as current.
- [src/ui/components/career/Career.tsx](src/ui/components/career/Career.tsx) — add Solidaris as first project under CTG/Cegeka so it shows as "Current Project" (Bridgestone/Trasis shift to "Previous Project").
- [sitemap.xml](sitemap.xml) — add the `/projects/solidaris` URL.

## Verification

Run the dev server, load `/projects/solidaris`, and check the TOC picks up the headings, the listings link correctly, and no lints fail.
