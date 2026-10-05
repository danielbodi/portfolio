# Downloadable CV

Edit `content.json`, then run `python scripts/build_cv.py` with ReportLab installed. The default output is `public/cv/daniel-bodi-gil-cv.pdf`, which all existing CV download buttons use. Arial is loaded from `C:/Windows/Fonts`; `--font-dir` can point to another directory containing the same font files.

For review before replacing the public download:

```powershell
python scripts/build_cv.py --output output/pdf/daniel-bodi-gil-cv.pdf
pdftoppm -scale-to 1600 -png output/pdf/daniel-bodi-gil-cv.pdf tmp/pdfs/cv
```

Inspect both rendered pages for clipping, spacing and readable typography. Check extracted text, link annotations and the two-page count, then copy the reviewed file to the public path and rebuild the website.

September 2026 update: Solidaris ownership follows Daniel's explicit confirmation that he led and implemented the entire system engineering effort himself. Both token directions are implemented; this does not assert that the reverse Figma API flow has been activated. The Solidaris assignment ends in October 2026. Prior Solidaris token counts, research participant counts and production-adoption claims were replaced with the current confirmed scope. Earlier employment dates, education, languages and qualified team-reported results were retained from the previous CV.

October 2026 update: the Solidaris entry now follows the reworked case study. It covers the /plectrum agent and versioned MCP, Contract-Driven Development, the governance redesigned after stakeholder feedback (local team delivery, with Core finding shared candidates from usage reports), the developer toolkit, telemetry and the Core dashboard, and the 2.1.0 / toolkit 0.7.2 release. The assignment ends on 8 October 2026.

October 2026 repositioning: headline moved to Design Engineer & Design System Lead. Client engagements are listed as Cegeka clients under one employer note, matching LinkedIn. Scope figures confirmed by Daniel: Plectrum built for 100+ Solidaris developers, piloted with 3 teams on 2 prototype apps; FleetBridge system adopted by 15+ developers across several European countries. Component counts come from the two Storybook indexes (Plectrum ~34 components and 19 foundation pages; FleetBridge 40+ components). Hedging parentheses were reduced to a single "estimated" or "reported".
