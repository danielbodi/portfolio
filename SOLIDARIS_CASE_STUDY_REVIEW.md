# Solidaris case study — review and rewrite

Reviewed 10 September 2026 against the deployed Plectrum Storybook, the portfolio source and existing media, and the referenced “Storybook Audit Plan” conversation. The conversation’s audit attachments were not available; its messages were readable.

## Assessment

The work supports a strong Staff-level design-system engineering narrative: architecture across design and code, developer experience, governance, deliberate reuse, influence across teams and preparation for continued ownership. The old case study obscured that evidence behind product screens, a local-fork story and obsolete “proposed/manual” labels.

The rewrite makes those decisions inspectable. It does not certify a job level from a catalogue alone. The remaining evidence gap is independent use and organisational effect: who adopted the work, which decisions were accepted, and whether another maintainer can operate it. These are stronger additions than more component screenshots or unsubstantiated productivity percentages.

## What changed

| Area | Earlier presentation | Implemented revision |
| --- | --- | --- |
| Opening | Product dossier, with Storybook buried later | Live Storybook hero; architecture, engineering and product scope stated immediately |
| Reading order | Context → three products → system → agents | Context → Storybook → architecture → ownership/releases → contracts/AI → product examples → handoff |
| Token architecture | Three generic tiers and a manual-sync caveat | Actual Figma import, staging, review, generated CSS, code-owned tokens and consumer boundary |
| Governance | Small local fork and informal influence | Core/application ownership, proposal triage, promotion and release strategy |
| AI | Large role-delegation diagram | Metadata shared by people and agents, generated index, focused context and deterministic checks |
| Media | Product screenshots and abstract diagrams | Actual catalogue captures, responsive diagrams, an 11-second real foundation recording and retained product evidence |
| Navigation | Long chapter headings in the sidebar | Compact, descriptive labels and direct links to supporting Storybook pages |
| Handoff | General future-work note | Planned split between consumer reference and team operating documentation |

Cards, SEO, the design-engineering entry point, homepage system evidence and Approach copy were updated to match. Existing product deep links remain valid.

## Evidence that changes the narrative

- **The catalogue is deployed.** Its introduction separates installation, component discovery, token selection and contribution. Calling Storybook a future deliverable understates the present work. [Introduction](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/introduction--docs)
- **Inbound token sync has a published promotion record.** The September 7 record supports a working inbound transport. It does not establish a fully automated round trip. [Sync status](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/docs-token-pipeline-sync-status--docs)
- **Reverse automation has a concrete dependency.** The project documents a Figma API licensing constraint, a manual proposal route and two options under consideration. This is a useful architecture trade-off to explain. [Figma sync](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/docs-token-pipeline-figma-sync--docs)
- **Packages remain pre-release.** Current consumption is through packed tarballs; the configured release workflow is not proof that registry publication or independent upgrades have occurred. [Consumer setup](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/get-started-use-plectrum-in-an-app--docs)
- **Ownership appears in the product.** Component status distinguishes Core from application-owned work, while contribution documentation explains triage and promotion. [Contribute](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/get-started-contribute--docs)
- **AI strategy includes enforceable contracts.** Typed metadata, a generated index and documented checks are more substantive than agent role names. MCP discovery and the separate story test runner have different responsibilities. [AI strategy](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/?path=/docs/docs-ai-strategy--docs)

Public documentation was inspected, but private CI and package workflows were not independently executed. Daniel explicitly confirmed that he led and implemented all the system work himself: both Figma–repository flows, CSS and metadata sources of truth, CI gates, Storybook and every foundation. The copy now states that ownership directly. Team adoption remains a separate question.

## Copy and media decisions

- Lead with a decision and its consequence, then expose the implementation detail that supports it. Keep inherited PrimeNG and Plectrum ownership distinct from the author’s additions.
- Keep the original product work as a source of requirements: case comprehension in iShare, density and reading order in iCRM, and a bounded iGED draft.
- The original iCRM capture contains large cards. Its former “dense subject-first list” description was inaccurate. The revised caption identifies it as the prototype informing the subsequent direction. Add a genuine later screenshot when available; do not fabricate a before/after comparison.
- Use actual Storybook captures for the hero, token finder, Form Field, status index and sync record. Captures are dated in the narrative or provenance notes. They show the observed deployment, not an invented interface.
- The new typography recording uses the deployed playground: enter French text and an amount, filter heading roles, change the sample and restore the results. The previews were checked to update. It is approximately 11 seconds, silent, 274 KB, with a poster, controls, a descriptive caption and the existing reduced-motion playback behaviour.
- The architecture and contract diagrams are responsive HTML/CSS, with readable text at mobile widths. The handoff diagram is explicitly labelled planned.
- Existing unrelated portfolio videos were not repurposed as Solidaris evidence. Redundant legacy product shots and the full agent diagram remain available in the repository but are not all repeated on the revised page.

## What would strengthen the Staff case next

1. **One accepted architectural decision:** the alternatives considered, your recommendation, the reviewers involved and what was accepted. The Figma transport or component-promotion policy would be strong candidates.
2. **One independent consumer:** a named team or anonymised application, its installed package version and a concrete change it completed using Plectrum.
3. **One completed handoff exercise:** the receiving maintainer changes a component, interprets a check failure and guides an application upgrade. Record assistance needed and ownership acceptance.
4. **One product decision backed by research:** participant/task context, observed confusion, the resulting design change and a correctly matched screenshot. Keep prototype findings separate from production results.
5. **One measured operational effect, if available:** duplicated component removed, upgrade completed, onboarding task completed or recurring clarification avoided. State the baseline, observation window and attribution; do not retrofit a percentage.

These are follow-up evidence opportunities. Daniel has confirmed sole leadership and implementation and that his Solidaris assignment ends in October 2026. The implementation and authorship of both token directions are established by that clarification; the reverse API transport remains parked in the reviewed deployment.

## Handoff positioning

Storybook remains a customer-facing consumer catalogue. Keep installation, live foundations, component usage, API, states and the route to propose changes there. Move broader operating procedures, decision history and handoff records to Confluence or the chosen team documentation platform. Keep a single maintained copy of each explanation and link across surfaces. The migration and acceptance are still planned.

## Validation

- Production build passed.
- Desktop (1440 px) and mobile (390 px) rendered without browser errors, missing images or horizontal overflow.
- Image expansion opened and closed with Escape; the product deep link reached its intended scroll position.
- Linked Storybook page identifiers were checked against the deployed index; source pages were rendered and read.
- The typography sample changed across the live role previews. The encoded recording was visually inspected.
- ESLint passed for all 13 changed/new source files.
- TypeScript reports 37 diagnostics in both the original HEAD baseline and the changed tree, with no new diagnostics introduced. The repository-wide TypeScript check therefore remains failing for existing issues.

Local implementation only; the portfolio has not been deployed by this task.
