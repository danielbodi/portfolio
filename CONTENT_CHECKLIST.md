# Content Checklist — Evidence and Assets Needed

> Working checklist from the transformation brief (section 21). Items marked
> `[EVIDENCE NEEDED]` are claims currently published with a "reported"
> qualifier or replaced by qualitative statements. Nothing on the live site
> should be upgraded to a hard number until its item here is resolved.

## Metrics currently qualified on the site

- [ ] **Bridgestone "60% faster development"** — `[EVIDENCE NEEDED: explain the baseline, activity measured and source of the 60% figure]`. Until then the site says "the team reported markedly faster development".
- [ ] **Bridgestone "40+ components"** — confirm the component/guideline count from the Storybook or Figma inventory (currently published as "reported").
- [ ] **Trasis "85% task success"** — `[EVIDENCE NEEDED: participant count, test tasks, baseline and calculation]`. Published as "reported" with a methodology note.
- [ ] **Trasis "3x faster prototyping"** — `[EVIDENCE NEEDED: compared with what, over which period]`. Published as "reported".
- [ ] **Sopra "40% faster prototyping" / "30% cost reduction"** — `[EVIDENCE NEEDED: how measured, baseline]`. Published as qualitative ("the design team reported faster prototyping").
- [ ] **Base "75% layout speed" / "95% cross-browser"** — `[EVIDENCE NEEDED: source]`. Removed from the case; qualitative statements used instead.
- [ ] **"15 years" experience** — verified against career data (start Oct 2010). Re-verify yearly.

## Solidaris

- [x] **AI-governance claim scoped (Aug 2026)**: "AI-assisted development lands on-system by default" describes Daniel's own agent workflow; the client developer teams have **not yet adopted** the governance layer. Site copy updated accordingly. When the dev teams adopt it, that becomes a new verified outcome — capture the date and any drift evidence.
- [x] **Decisions locked before arrival confirmed (Aug 2026)**: the stack (Angular, PrimeNG, monorepo), the product roadmap and the existence of the design system all predated the engagement; nothing proposed has been rejected so far. Constraints section reflects this.
- [ ] Influence evidence to strengthen over time: designers and managers currently rely on Daniel's vision as the only UX-engineering/design-systems specialist — collect concrete examples (decisions deferred, plans adopted) as they occur.
- [x] Approved anonymised screenshots — real captures added (iShare coded mockup: dossier + journey panel; iGED first draft; iCRM Figma prototype: inbox + timeline; all fictional data). Remaining schematics: token architecture, contracts index, agent workflow.
- [ ] Confirm shipped vs. validated-prototype vs. concept status per workstream (iCRM inbox, timeline, drawers, iShare journey).
- [ ] **Exact application-estate count** — currently published as "10+" estimated: two apps (iCRM, iShare) personally redesigned; more than ten further internal apps awaiting Plectrum. Confirm the inventory when it can be published.
- [ ] User-test participant count, scenarios and findings for each iShare round.
- [ ] Exact scope of direct iGED work (site currently claims cross-product integration only).
- [ ] Exact official role title on the assignment.
- [ ] Stakeholder approval to name Solidaris, Plectrum, iCRM, iShare, iGED publicly.
- [ ] Outcome data once available (post Oct 2026).

## Bridgestone

- [ ] Component inventory export (Figma/Storybook) for the artefact gallery.
- [ ] Visuals for the CSS-as-SSOT story (suggested in the case-study appendix):
  - [ ] the color palette story with light/dark swatches and search,
  - [ ] the animation playground with its three generated code outputs,
  - [ ] a screen recording of the sticky-column shadow driven by `scroll()`,
  - [ ] the borders configurator,
  - [ ] the ITCSS folder tree.
- [ ] **Storybook pipeline screen recording** — save as `public/videos/bs-storybook-pipeline.mp4`
      (1080p+, H.264 MP4, ideally < 20 MB total, no audio needed; the site's video embed is ready,
      captions carry the narration). Shot list:
  1. Palette page: search a color, click-to-copy the `var(--color--…)` reference (~10s)
  2. The money shot: add a token in the SCSS settings file → Storybook shows the new swatch/doc row (~10s)
  3. Animation composer: pick an animation, show generated SCSS + live keyframes (~8s)
  4. Dark-mode toggle on a worksheet story (~5s)
  5. Vehicle list: sticky-column shadow reacting to scroll (~5s)
- [ ] PR/design-QA workflow evidence (anonymised screenshot or diagram).
- [x] **App/team adoption confirmed (Aug 2026)**: two applications, each with its own dedicated team, later merged into one back-office app. Site copy updated (outcomes, system).
- [x] **Coaching scope confirmed (Aug 2026)**: the five front-end developers (CSS architecture, BEM, via pairing and PR review) plus the two designers who joined (Figma branching and review workflows).
- [x] **Governance honesty recorded (Aug 2026)**: contribution guides existed but few external contributions came — the system was mostly maintained by Daniel. Reflection updated; do not claim a thriving contribution model.
- [ ] Exact team composition over time and design-team growth timeline.
- [ ] Confirm FleetBridge product name may be used publicly.

## Trasis

- [ ] Participant count and test scenarios.
- [ ] Prototype captures or recordings.
- [ ] Safety-claim wording approval (current copy avoids patient-safety claims).
- [ ] Final shipped product visuals confirmation.

## Sopra Banking

- [ ] Evidence behind speed/cost figures.
- [ ] CSS/grid code examples safe to publish.
- [ ] Coaching or documentation artefacts.

## Base

- [ ] Code or component examples safe to publish.
- [ ] Product screenshots approval (current ones assumed safe).

## General

- [x] **Positioning descriptor softened (Aug 2026)**: "Staff Product Design" → "Senior Product Design" on the homepage/hero; staff-leaning scope is carried by case evidence (multi-product standards at Solidaris, funding/process influence at Bridgestone) rather than a title claim. Revisit if multi-team adoption evidence lands.
- [ ] Approved portrait photo.
- [ ] **Two role-specific, ATS-readable CVs**: `Daniel-Bodi-Gil-Staff-Product-Designer.pdf` and `Daniel-Bodi-Gil-Design-Systems-UX-Engineer.pdf` in `public/cv/`. The site now links the single ATS-friendly `daniel-bodi-gil-cv.pdf`; role-specific download slots activate automatically once `contact.roleCvs` in `src/content/site.ts` is filled.
- [x] **Trasis end date conflict**: resolved — site aligned to the CV (2019–2021).
- [ ] LinkedIn URL (not currently linked on the site — add to `src/content/site.ts` when confirmed).
- [ ] GitHub or polished code sample (only if it represents current quality).
- [ ] Client-logo usage permissions (Solidaris, Bridgestone, Trasis, Sopra, Base).
- [ ] Testimonials — only if authentic and approved.
- [ ] Social preview image: a real product composition to replace the generated `public/og-image.svg`/`og-image.png`.
- [ ] Languages spoken — the About page currently omits languages until confirmed.
