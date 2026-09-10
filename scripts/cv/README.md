# Downloadable CV

Edit `content.json`, then run `python scripts/build_cv.py` with ReportLab installed. The default output is `public/cv/daniel-bodi-gil-cv.pdf`, which all existing CV download buttons use. Arial is loaded from `C:/Windows/Fonts`; `--font-dir` can point to another directory containing the same font files.

For review before replacing the public download:

```powershell
python scripts/build_cv.py --output output/pdf/daniel-bodi-gil-cv.pdf
pdftoppm -scale-to 1600 -png output/pdf/daniel-bodi-gil-cv.pdf tmp/pdfs/cv
```

Inspect both rendered pages for clipping, spacing and readable typography. Check extracted text, link annotations and the two-page count, then copy the reviewed file to the public path and rebuild the website.

September 2026 update: Solidaris ownership follows Daniel's explicit confirmation that he led and implemented the entire system engineering effort himself. Both token directions are implemented; this does not assert that the reverse Figma API flow has been activated. The Solidaris assignment ends in October 2026. Prior Solidaris token counts, research participant counts and production-adoption claims were replaced with the current confirmed scope. Earlier employment dates, education, languages and qualified team-reported results were retained from the previous CV.
