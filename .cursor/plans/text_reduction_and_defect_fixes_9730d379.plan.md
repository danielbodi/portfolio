---
name: Text reduction and defect fixes
overview: Cut the first-pass text load (home, Approach, About, case prose), make case pages artefact-first by adding visuals to decision blocks, fix the three approved defects, and prepare video-embed infrastructure plus a shot list for the Storybook recording that you will record.
todos:
  - id: solidaris-reframe
    content: Reframe Solidaris card and case to lead with the AI-ready design system
    status: completed
  - id: decision-visuals
    content: Add visual field to Decision type, render thumbnails in DecisionBlock, populate across three cases
    status: completed
  - id: fix-decision-html
    content: Render decision fields as HTML so <code> tags stop showing literally
    status: completed
  - id: trim-home
    content: Shorten homeArtefacts captions, scope-only CareerStrip, fix section gap
    status: completed
  - id: trim-approach
    content: Cut Approach to 2 tightened practice bullets per capability
    status: completed
  - id: trim-about
    content: Condense About narrative sections ~40%
    status: completed
  - id: trim-cases
    content: Trim framing and systemEvidence prose, cap craft captions in all three flagship cases
    status: completed
  - id: fix-nav-laptop
    content: Fix nav overlap at 1024-1280px (breadcrumb, button labels, shrink behavior)
    status: completed
  - id: gate-gradient-controls
    content: Hide Gradient Controls panel in production builds
    status: completed
  - id: video-figure
    content: Add videoSrc support to ArtefactFigure and shot list to CONTENT_CHECKLIST
    status: completed
  - id: verify
    content: Production build and browser pass at 1440/1024/390
    status: completed
isProject: false
---

# Reduce Text Load + Artefact-First Cases + Pending Fixes

## Who does the screen recording

You record it — the Bridgestone Storybook is internal and my tools can only capture stills, not video. I build the embed component and a precise shot list (below); once you drop an `.mp4` into `public/videos/`, I wire it into the Bridgestone case.

## 1. Decision blocks get visuals (biggest rhythm fix)

- Add optional `visual?: { src: string; alt: string }` to `Decision` in [src/content/types.ts](src/content/types.ts).
- Render it in [src/ui/components/evidence/DecisionBlock.tsx](src/ui/components/evidence/DecisionBlock.tsx) as a compact thumbnail column beside the text (stacks below on mobile), so each decision reads text + proof instead of six text rows.
- Populate from existing assets:
  - Solidaris: inbox → `icrm-inbox.png`, journey → `ishare-journey.png`, PrimeNG bridge → `token-architecture.svg`, AI consumers → `ai-agent-workflow.svg`
  - Bridgestone: CSS-as-SSOT → `bs_desktop_storybook-home.png`, BEM API → `bs_storybook tag anatomy.png`, modern CSS → `bs_desktop_vehicle-list-dark.png`, mandate → `bs_design-approach.png`
  - Trasis: realistic device → `trasis-qc1-real-parts-ui.png`, kit reuse → `trasis-qc1-homepage.png`, visual impairment → `trasis-qc1-spots--results.png`
  - Decisions without a matching asset get no visual (no filler).

## 2. Solidaris reframe — AI-ready design system first

The case currently leads with cross-product UX; reorder it so Plectrum's AI-ready design system is the headline and the UX work is the grounding evidence. UX research/testing content stays — staff-level reviewers still need user outcomes — and [rolePaths.ts](src/content/rolePaths.ts) keeps the staff-product-design path UX-emphasised while design-engineering leads with the system.

- **Card** ([cards.ts](src/content/caseStudies/cards.ts)):
  - title: "Solidaris: An AI-Ready Design System for a Healthcare Application Ecosystem"
  - problem: "Two teams ship daily with AI coding assistants on one design system — documentation written only for humans meant every AI-generated pull request eroded consistency."
  - roleShort: "UX/UI Consultant · Design Systems · AI-Ready Governance"
  - tags: AI-ready design system · Design tokens · Cross-product UX
  - outcome: "A machine-readable design system — contracts, rules and a 7-role agent workflow — consumed by two production apps, plus a shared case-reading model across iCRM, iShare and iGED (ongoing)."
  - ctaLabel: "Read the Solidaris AI-ready design-system case study"; thumbnail stays (real product shot carries credibility)
- **Case page** ([solidaris.ts](src/content/caseStudies/solidaris.ts)):
  - SEO title/description and hero `summary` lead with the machine-readable design system, ecosystem UX second
  - `recruiterSummary`: challenge reframed around AI-drift risk; ownership/changed/evidence bullets reordered system-first
  - `framing`: the "teams use AI assistants daily" paragraph (currently last) becomes the opening; fragmentation becomes product context
  - `decisions` order: AI-as-consumer first, PrimeNG token bridge second, then inbox, signals, journey
  - `craft` order: contracts-index, ai-agent-workflow, token-architecture first, then the product screens; intro adjusted ("the system layer, then the product surfaces it serves")
  - `metrics` order: 170+ variables · 7 agents · 2 apps → 1 system
- **Home** ([site.ts](src/content/site.ts)): hero context link → "Currently building an AI-ready design system at Solidaris"; career strip Solidaris bullets lead with the Plectrum AI layer

## 3. Trim the skim layer

- **Home** ([src/content/site.ts](src/content/site.ts)): shorten all six `homeArtefacts` captions (`what` ≤ ~10 words, `contribution` ≤ ~8; fixes the tall journey card). [CareerStrip.tsx](src/ui/components/home/CareerStrip.tsx): render heading/company/period/scope only — drop the two bullets per role on home (data stays in `site.ts`). Fix the dead vertical gap before "How I create leverage" (section padding).
- **Approach** ([src/pages/Approach.tsx](src/pages/Approach.tsx)): 2 practice bullets per capability instead of 3, each tightened to ~15 words; standards grid and links stay.
- **About** ([src/pages/About.tsx](src/pages/About.tsx)): "How I got here" 3 → 2 paragraphs, "Why the two backgrounds matter" 2 → 1, working-style bullets to clause form. Roughly 40% shorter.
- **Case prose** ([solidaris.ts](src/content/caseStudies/solidaris.ts), [bridgestone.ts](src/content/caseStudies/bridgestone.ts), [trasis.ts](src/content/caseStudies/trasis.ts)): trim `framing` paragraphs ~30%, split/shorten the longest `systemEvidence` paragraphs, cap craft `why` captions at ~2 lines. Recruiter summaries, decisions, validation and outcomes keep their substance.

## 4. The three approved defect fixes (still pending)

- **HTML-as-text bug**: `DecisionBlock` renders `<code>` literally (visible on Bridgestone decisions 02/04/06, Solidaris 04). Render `tension`, `evidence`, `decision`, `tradeOff`, `result` with `dangerouslySetInnerHTML`, consistent with the rest of [CaseStudyTemplate.tsx](src/pages/CaseStudyTemplate.tsx).
- **Laptop nav overlap (~1024–1280px)**: in [Navigation.tsx](src/ui/components/navigation/Navigation.tsx) + [\_navigation.scss](src/ui/styles/06-components/_navigation.scss): hide the `/ Case` breadcrumb below `lg`, shorten button labels below `xl` ("Contact", "CV"), allow the menu to shrink instead of overlapping.
- **Gradient Controls widget**: gate the floating panel behind `import.meta.env.DEV` so production builds never render it (provider stays so your local tweaking keeps working).

## 5. Video infrastructure + your shot list

- Extend `Artefact` with optional `videoSrc?: string`; [ArtefactFigure.tsx](src/ui/components/evidence/ArtefactFigure.tsx) renders a `<video controls preload="metadata" poster={src}>` when present (no autoplay, reduced-motion safe).
- Add the shot list to [CONTENT_CHECKLIST.md](CONTENT_CHECKLIST.md) for you to record (1080p+, H.264 MP4, ideally < 20 MB total, no audio needed):
  1. Palette page: search a color, click-to-copy the `var(--color--…)` reference (~10s)
  2. The money shot: add a token in the SCSS settings file → Storybook shows the new swatch/doc row (~10s)
  3. Animation composer: pick an animation, show generated SCSS + live keyframes (~8s)
  4. Dark-mode toggle on a worksheet story (~5s)
  5. Vehicle list: sticky-column shadow reacting to scroll (~5s)
- Drop the file at `public/videos/bs-storybook-pipeline.mp4` and I add it to the Bridgestone craft section.

## 6. CV served by the portfolio (pending your export)

The site's "Download CV" currently serves the designed one-pager (`public/cv/DBG_CV_2025.pdf`), which parses badly in ATS systems. Once you export the corrected text CV (based on `cv-daniel-bodi-gil.pdf`: remove the empty CERTIFICATIONS heading, align Trasis dates with the site, add the quantified lines), I replace the file in `public/cv/` and update `contact.cv` in [src/content/site.ts](src/content/site.ts).

## 7. Verify

Production build, then a browser pass at 1440 / 1024 / 390 widths over home, one case, Approach, About — checking nav, decision visuals, no rendered HTML tags, no Gradient Controls button in prod build (`npm run build` + `vite preview`).
