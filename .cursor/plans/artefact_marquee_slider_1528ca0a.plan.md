---
name: Artefact marquee slider
overview: Rework the homepage "Artefacts, not adjectives" section into a full-viewport-width double-row marquee, with the two rows auto-scrolling in opposite directions, matching the reference video.
todos:
  - id: marquee-styles
    content: Add _artefact-marquee.scss (full-bleed breakout, opposite-direction loop, hover pause, reduced-motion fallback) and register it in main.scss
    status: completed
  - id: gallery-component
    content: Rework ArtefactGallery.tsx into the double-row marquee with duplicated aria-hidden track copies
    status: completed
  - id: verify
    content: Browser-check the homepage marquee at desktop and mobile widths
    status: completed
isProject: false
---

# Artefact gallery → double-row marquee

## What the reference shows (video, ~9–12s)

Wide cards arranged in two horizontal rows that bleed past both viewport edges and drift slowly sideways. I'll reproduce that with the existing five artefact cards: row 1 scrolls left, row 2 scrolls right, full-bleed, looping seamlessly.

## Changes

### 1. `src/ui/components/home/ArtefactGallery.tsx`

- Keep the heading + intro inside the current `mx-auto max-w-6xl` container (aligned with the rest of the page).
- Replace the 3-column grid with a marquee block below the heading:
  - Two rows. Row A renders `homeArtefacts` in order; row B renders them in reverse so the same card isn't stacked above itself.
  - Each row renders its card list twice (second copy `aria-hidden`) inside a `width: max-content` flex track — the standard `translateX(-50%)` loop.
  - Cards keep the existing `ArtefactFigure` (evidence/state tags stay — they're the point of this section), with a fixed slide width (`w-[22rem] md:w-[26rem]`, `flex-none`) so rows form strips.
- The section keeps `overflow` clipped so no horizontal scrollbar appears.

### 2. New `src/ui/styles/06-components/_artefact-marquee.scss` (+ `@use` in `main.scss`)

- `.artefact-marquee`: full-bleed breakout from the 75rem shell — `width: 100vw; margin-left: calc(50% - 50vw); overflow: hidden;` (home has no TOC rail, so the shell column is viewport-centred and the calc holds).
- `.artefact-marquee__track`: `display: flex; gap: 1.5rem; width: max-content;` + `animation: artefact-marquee 60s linear infinite`.
- Second row: `animation-direction: reverse` and a slightly different duration (~52s) so the rows don't feel mechanically locked.
- `:hover` / `:focus-within` on a row → `animation-play-state: paused` (cards contain `ExpandableImage` buttons, so pausing keeps them usable).
- `@media (prefers-reduced-motion: reduce)`: no animation; rows become `overflow-x: auto` scrollable strips with the duplicate copy hidden (`display: none`).

## Verification

Browser pass on `https://localhost:5173/`: full-bleed edges at 1440 and 390, opposite directions, hover pause, image expand still works, no horizontal page scrollbar.
