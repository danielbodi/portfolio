# Solidaris / Plectrum — video capture guide

Capture short, silent demonstrations that reveal a decision the prose and still images cannot. The public case study stays complete without playback. Record real product UI; label cuts and data mode. Public copy, on-screen callouts and captions stay in English.

**Captured and integrated on 5 October 2026:** two reproducible browser walkthroughs, made with `scripts/capture-solidaris-browser.cjs` (Playwright/Edge recording, then FFmpeg H.264 export). The 27-second Storybook clip in chapter 04 searches for “side panel” and opens Drawer usage guidance; it is a catalogue demonstration, **not** the agent demonstration described below. The 28-second dashboard clip in chapter 07 opens a Demo recommendation and its evidence, then switches to Reported (0/3 application reports). Both have PNG posters, visible play controls, user-initiated playback and HTML step summaries. The dashboard is left fully framed to keep provenance readable; the Storybook clip has a smoothly eased, modest zoom. Neither recording has audio, fictional assistant output or customer usage evidence.

## 1. Agent: a need becomes a grounded recommendation

**Completed:** 30 seconds, chapter 01. Files: `public/videos/solidaris-agent-workflow.mp4` and `public/screenshots/solidaris/agent-workflow-poster.webp`. Daniel recorded the genuine Plectrum custom agent in VS Code on 5 October 2026. The installed toolkit is 0.7.2, the consumer runtime is 2.1.0, and the scenario uses a fictional employee document list. The recording was made at 526 × 1372; the public edit preserves that native portrait frame, removes its audio track, the MCP startup prompt (0–3.5 s) and two idle waits (original ranges 5–29 s and 43–61 s). No agent answer was rewritten or recreated. The clip shows catalogue-grounded advice, not an implemented UI, a passed check or independent adoption.

**Prepare:** an authorised, disposable Angular consumer with Plectrum runtime **2.1.0** and toolkit **0.7.2** installed; Cursor with the Plectrum agent or VS Code/Copilot with Plectrum selected; access to the versioned Storybook. Confirm the installed versions on screen. Use fictional employee-document data. Close unrelated windows and hide registry credentials, tokens, paths containing personal names and internal tickets. Do not record a healthcare record.

**Prompt to try before recording:** `/plectrum I am building an employee document list. Which existing components and states should I use for loading, empty and error? Give the component IDs and the documentation or checks I should follow.` The published [agent guide](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/?path=/docs/start-here-use-the-agent--docs) describes Empty State and Skeleton Slot for this task. Keep the prompt only if the real answer is grounded in the installed catalogue. If it misses, record a different verified task or show the miss as a limitation; do not script a fake reply.

**Earlier rehearsal on 5 October 2026 (not final footage):** VS Code's CLI needs the lowercase custom-mode identifier `plectrum`; `-m Plectrum` silently selected the generic agent. In the older iCRM consumer, the real Plectrum mode loaded, but its first read-only answer incorrectly said dependencies were absent. The installed `@solidaris-danielbodigil/pds-devkit` was present at **0.4.1**; its read-only catalogue returned `plectrum:empty-state` and `plectrum:skeleton-slot`. Copilot's file search had omitted `node_modules`. A second run executed the catalogue commands, but stalled while reading a terminal-output file. Neither rehearsal appears in the public clip. The final recording above uses a consumer with installed toolkit 0.7.2 and a completed answer.

| Time | Show | Proof viewers should take away |
| --- | --- | --- |
| 0–1.5 s | Task-oriented prompt in the real editor. | The request starts from a product need, not a component name. |
| 1.5–15.5 s | Installed 0.7.2 version check and local catalogue reads. | The answer is grounded in the consumer's installed contract. |
| 15.5–30 s | Recommendations, the explicit error-recovery limitation and matching versioned Storybook URLs. | A reader can verify the component IDs and see where the agent declines to invent one. |

The poster should freeze on the grounded recommendation **with an ID and source visible**. If the response takes longer than the clip, use an honest cut labelled “Waiting removed”; the elapsed recording is not a productivity metric. Do not claim a generated component, test or deployment unless shown.

## 2. Dashboard: a signal leads to a Core question

**Completed:** 28 seconds, chapter 07. Files: `public/videos/solidaris-core-insights.mp4` and `public/screenshots/solidaris/core-insights-poster.png`.

Use the [public dashboard](https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/#/design-system/overview). The checked 4 October build shows runtime 2.1.0, toolkit 0.7.2 and source revision `d972894`. In **Demo**, repository component usage is scanned, but agent counts and local components are invented. In **Reported**, no application has submitted a usage report: **0/3 reporting**, and external Core coverage is **unknown**. These are source states, not outcomes to infer from the clip.

| Time | Show | Proof viewers should take away |
| --- | --- | --- |
| 0–5 s | Version line, **Demo** selector and the yellow data warning. | The numbers are explicitly illustrative. |
| 5–15 s | **Agent & MCP**: the “38% of iSHARE component searches find nothing” demo signal; open **Details** if useful. | The dashboard can surface a question with provenance. |
| 15–24 s | The recommendation: ask what the team sought because query text is not recorded. | A rule proposes investigation, not an automatic governance verdict. |
| 24–35 s | Switch to **Reported** and show **0/3** and **Unknown until an external application reports**. | Real external adoption is still unmeasured. |

Keep the Demo banner visible while a synthetic number is on screen. For the poster, choose the Demo recommendation with its **Demo** tag and warning, or the Reported state with the 0/3 and unknown fields. The case study already has a dated Reported still. English caption: “Recorded from the Core dashboard using its labelled demo dataset. No external application usage report had been received in the 4 October 2026 snapshot.” Update this if the source changes.

## Capture and handoff

- For browser walkthroughs, record a 16:9 region with text legible at the exported size. The automated recordings use a 1600 × 900 viewport, exported at 1280 × 720 and 25 fps. The agent clip keeps the source's 526 × 1372 portrait frame at native reading width. Browser zoom is fine if it preserves the complete warning and version. Move the pointer deliberately; leave each proof frame readable for at least two seconds. Avoid slow pans, parallax and decorative transitions.
- Capture the original recording first. Then trim pauses and, only if needed, make one or two labelled cuts. No voice-over is necessary. If voice is added, supply English captions. Show no secrets, actual personal data or fabricated assistant output.
- Export H.264 MP4 without an audio track if silent, with a legible poster (PNG or WebP). Aim for roughly **3–6 MB per 30-second clip**, but preserve text readability. Keep the high-quality master outside the public bundle.
- For each final file, note date, source URL/revision, runtime/toolkit version, scenario, data mode, edit/cut notes and what it **does not** prove. Add a 2–4-step HTML text summary next to the video in the case study.
- Before adding the files to the page, change the case-study video player to **user-initiated playback** with pause and keyboard controls; the current shared player autoplays and loops on intersection. Keep its existing behavior for other case studies unless they are reviewed too. Test mobile, reduced motion, failed loading and poster legibility.

The agent recording was supplied from Daniel’s editor. Its portrait source is shown at native reading width in the case study, with a full-size link for small screens. Future re-recordings should keep the installed version and cited documentation visible and should not claim independent adoption from a successful lookup alone.
