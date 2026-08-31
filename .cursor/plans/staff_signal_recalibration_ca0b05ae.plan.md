---
name: Staff signal recalibration
overview: "Act on the case-study audit: reclaim active voice and lead with the action in the case copy, cut hedging to a calibrated level, surface the live token demo above the fold, and fix the shell squeeze that affects every laptop-width viewport."
todos:
  - id: voice
    content: Apply the five statement rewrites and convert every outcomes[].text from passive to active across all five stories in visualStories.ts
    status: completed
  - id: facts
    content: Swap the Bridgestone 'Effect on delivery' fact for the two countable cells, move the soft claim into outcomes, and rename Solidaris 'Evidence window' to 'Period'
    status: completed
  - id: hedges
    content: Cut myPart lines from 29 to ~10 and explicit negations from 20 to ~6, widen the redundant state-tag suppression in VisualCaseStudyTemplate, and move the Evidence boundary panel off amber
    status: completed
  - id: demo
    content: Add the jumpTo strip to VisualStory and the template, add an id to the DemoFrame heading, move the live demo to the head of Bridgestone chapter 05 media, and retarget the Systems capability link
    status: completed
  - id: shell
    content: "Fix the shell squeeze in App.tsx: pad the centring row, reduce the rail column to 14rem + 3rem, and raise the rail gate from lg to xl"
    status: completed
  - id: index
    content: Add period, roleShort and the one-line evidence to the WorkCard index variant
    status: completed
  - id: small
    content: Replace the Solidaris clip placeholder with its still, add a visual to Bridgestone chapter 02, fix the Trasis myPart asymmetry, promote the stronger H1, and drop the level word from the descriptor and hero verb
    status: completed
  - id: verify
    content: Run tsc --noEmit and do a browser pass over /work and the five case pages at 1280, 1440 and 390
    status: completed
isProject: false
---

# Staff signal recalibration

Nine actions from the audit in [case-study-audit](C:\Users\Kanar.cursor\projects\c-Projects-portfolio\canvases\case-study-audit.canvas.tsx). Trasis depth is deferred by your choice. Almost all of the content work lands in one file, [src/content/caseStudies/visualStories.ts](src/content/caseStudies/visualStories.ts).

## A. Voice and sentence order

Apply the seven rewrites from the canvas to [visualStories.ts](src/content/caseStudies/visualStories.ts):

- All five `statement` fields: move the action into the first clause, keep the constraint as sentence two, end on the result. No new claims, same word count.
- Every `outcomes[].text` across the five stories: convert passive to active. `'…were delivered.'` becomes `'I delivered the reusable product patterns, the production CSS foundation, and the Storybook pages generated from it.'`
- `reflection` and `decision` strips stay untouched — they already read correctly.

One fact I need from you rather than inventing: the Trasis rewrite says "delay the release of a dose". If those doses are administered to patients, say so — it is the highest-stakes fact on the site and currently absent.

## B. Facts strips

- `bridgestoneVisualStory.facts`: replace `Effect on delivery / 'Less rework, fewer inconsistencies and defects'` with two countable cells — `Foundation / '8 ITCSS layers · 15 base hues · 2 themes'` and `Documentation / '39 Storybook stories · 51 MDX pages, generated from production CSS'`. The soft claim moves into `outcomes`, where it is already badged `Reported`. Drop `Storybook / 'Adopted as the team's shared source of truth'` since the new Documentation cell supersedes it.
- `solidarisVisualStory.facts`: rename `Evidence window` to `Period`, value `'Oct 2025 – Oct 2026 · handoff planned'`.

## C. Hedge reduction

Targets from the audit inventory:

- `myPart` 29 to about 10. Keep on Solidaris iGED and anything genuinely team-owned; drop where the case already states end-to-end ownership (all of Trasis, Bridgestone chapters 03 and 06).
- Explicit negations 20 to about 6. Reword `'wider ownership is not claimed'` to a positive bound: `'the first draft shown here is mine'`. Keep one negation per `boundary`.
- `state` tags: 32 today, most duplicating the adjacent `evidenceStatus`. [VisualCaseStudyTemplate.tsx:93](src/pages/VisualCaseStudyTemplate.tsx) already suppresses exact string matches; widen that to suppress the redundant pairs (`Verified`+`Shipped`, `Verified`+`In production`, `Prototype`+`Concept`) so only genuinely additive tags render.
- The `Evidence boundary` panel at [VisualCaseStudyTemplate.tsx:432](src/pages/VisualCaseStudyTemplate.tsx) moves off amber onto the neutral `border-gray-700/60 bg-gray-900/20` used by the decision strip. Amber is the alert colour and currently outweighs the outcomes above it.

## D. Surface the live demo

Revised from the audit: the `HeroSpecimen` on the home page is strong as it stands, so it is not being replaced. Three cheaper moves instead.

- Add an optional `jumpTo?: { label: string; href: string }[]` to `VisualStory` and render it as a compact row under the facts strip in [VisualCaseStudyTemplate.tsx](src/pages/VisualCaseStudyTemplate.tsx). Bridgestone gets `Live · the token pipeline runs in this page`.
- Add an `id` to the demo heading in [DemoFrame.tsx:65](src/ui/components/demos/DemoFrame.tsx) as the anchor target. Safe: [TableOfContents.tsx:43](src/ui/components/table-of-contents/TableOfContents.tsx) only collects `h2[id]`, so an `h3` id will not enter the rail.
- Move `{ kind: 'live-demo' }` to the head of the chapter 05 `media` array, ahead of the three `system-evidence` excerpts, and retarget the Systems capability link in [site.ts:170](src/content/site.ts) at the demo anchor.

## E. Shell layout

Measured on `/work/bridgestone` with the rail present:

- 1280px: article left 24px, width 881px, rail 15px from the right edge
- 1440px: article left 24px, width 1041px
- 1920px: article left 209px, width 1152px, correctly centred

The design width is only reached above roughly 1490px, because `SHELL_MAX_WIDTH` 75rem plus an 80px gap plus a 16rem rail needs about 1550px of viewport. Every common laptop falls below that, and the outer margin collapses to 24px.

In [App.tsx:251](src/App.tsx):

- Add horizontal padding to the centring flex row so the group can never touch the viewport edge.
- Reduce the reserved rail column from `16rem` + `5rem` margin to `14rem` + `3rem`.
- Raise the rail gate from `lg` to `xl`; at 1024px a reserved 336px column leaves the article at 664px, and the mobile TOC already covers that range.

Result: the article shrinks gracefully but stays symmetrically framed from 1280 up, and reaches full width around 1490.

## F. /work index rows

The `index` variant in [WorkCard.tsx:41](src/ui/components/work/WorkCard.tsx) shows title, one problem line and three tags. The home teaser shows more for the same case. Add the `period` + `roleShort` meta line and the one-line `evidence` — all three fields already exist on the card objects in [cards.ts](src/content/caseStudies/cards.ts), so this is presentation only.

## G. Small fixes

- Replace the `clip-placeholder` in Solidaris chapter 02 with the `ishare-affiliate-dossier.png` still it already posters, and drop the `clip-placeholder` branch from the template if nothing else uses it.
- Add one visual to Bridgestone chapter 02 (`media: []` today) — the chapter carrying the refusal-to-funding arc.
- Trasis chapter 01: `myPart` on the first figure only. Make the row symmetric, most likely by removing it under C.
- Promote the stronger SEO phrasing: the tab reads "Without an Initial Mandate", the H1 reads "through live product work".
- [site.ts:11](src/content/site.ts): drop the level word from `descriptor` in favour of scope, and change `hero.title` "help teams ship them" to a verb that does not read as supporting.

## Verification

`npx tsc --noEmit`, then a browser pass over `/work` and the five case pages at 1280, 1440 and 390, checking the jump strip, the demo anchor, the rail, and that no case lost its boundary statement.
