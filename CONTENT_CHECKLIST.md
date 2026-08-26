# Content Checklist — Evidence and Assets Needed

> Working checklist from the transformation brief (section 21). Items marked
> `[EVIDENCE NEEDED]` marks private verification work. Unresolved claims stay
> out of polished public copy; the live site uses bounded qualitative wording
> and separates evidence class from delivery state.

## Metrics currently qualified on the site

- [ ] **Bridgestone "60% faster development"** — `[EVIDENCE NEEDED: explain the baseline, activity measured and source of the 60% figure]`. Until then the site says "the team reported markedly faster development".
- [ ] **Bridgestone "40+ components"** — confirm the component/guideline count from the Storybook or Figma inventory (currently published as "reported").
- [ ] **Trasis "85% task success"** — `[EVIDENCE NEEDED: participant count, test tasks, baseline and calculation]`. Published as "reported" with a methodology note.
- [ ] **Trasis "3x faster prototyping"** — `[EVIDENCE NEEDED: compared with what, over which period]`. Published as "reported".
- [ ] **Sopra "40% faster prototyping" / "30% cost reduction"** — `[EVIDENCE NEEDED: how measured, baseline]`. Published as qualitative ("the design team reported faster prototyping").
- [ ] **Base "75% layout speed" / "95% cross-browser"** — `[EVIDENCE NEEDED: source]`. Removed from the case; qualitative statements used instead.
- [ ] **"15 years" experience** — verified against career data (start Oct 2010). Re-verify yearly.

## Solidaris

- [x] **Inherited context separated (Aug 2026)**: PrimeNG, the original Plectrum layer, product roadmaps and the wider consolidation direction are not attributed to Daniel.
- [x] **Public AI wording downgraded (Aug 2026)**: contracts, rules and the multi-role workflow are presented as OUTPUT / Strategic proposal, not as an AI-ready, deterministic or adopted system.
- [x] **Unsupported public metrics removed (Aug 2026)**: no 170+, seven-agent outcome, two-app adoption or 10+ estate claim remains in visible Solidaris copy.
- [x] **Ongoing/departure frame added (Aug 2026)**: the assignment is shown as October 2025–October 2026 with the wider programme, handoff and ownership still open.
- [x] **Evidence classes added to the UI (Aug 2026)**: OUTPUT, VALIDATED, IN PROGRESS and OUTCOME are independent of lifecycle labels.
- [x] Anonymised/recreated portfolio visuals use fictional data and carry explicit evidence and delivery labels.
- [ ] [EVIDENCE NEEDED] Exact iGED and iShare build, merge, test, deployment and production states.
- [ ] [EVIDENCE NEEDED] Exact technical meaning of each product using Plectrum.
- [ ] [EVIDENCE NEEDED] What existed in Zeroheight versus Storybook, current publication state and independent users.
- [ ] [EVIDENCE NEEDED] Inspectable contract/rule/skill files plus one traceable agent execution, failure and correction.
- [ ] [EVIDENCE NEEDED] Timeline of the Figma fork, core-team outreach, restructuring, repository creation, later collaboration and planned departure.
- [ ] [EVIDENCE NEEDED] User-test participant profiles/counts, scenarios, findings and design changes for each round.
- [ ] [EVIDENCE NEEDED] iCRM readiness criteria and approver; do not call it implemented.
- [ ] [EVIDENCE NEEDED] Exact inherited Plectrum baseline, fork authorisation, delta, divergence controls and upstream state.
- [ ] [EVIDENCE NEEDED] Names and lifecycle states of each custom component.
- [ ] [EVIDENCE NEEDED] Token inventory, source of truth and whether synchronisation is manual, documented, proposed or implemented.
- [ ] [EVIDENCE NEEDED] Concrete later governance participation, without attributing the independent restructuring to Daniel.
- [ ] [EVIDENCE NEEDED] Final handoff package, accepted owner, remaining dependencies and post-departure measures.
- [ ] Exact official role title and direct product scope.
- [ ] Publication approval for the names, screenshots, code, Storybook, tokens, contracts and organisational details.

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
