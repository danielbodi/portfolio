---
name: ATS CV content spec
overview: Exact content and format specification for the new ATS-friendly PDF CV, built from the text CV base and the portfolio's verified facts; I draft the full copy as a file, you export the PDF, then it replaces the designed one-pager served by the site.
todos:
  - id: cv-copy-file
    content: Write final CV copy to cv/daniel-bodi-gil-cv-content.md
    status: pending
  - id: cv-facts
    content: User confirms Trasis end date, Solidaris start, LinkedIn URL, role naming
    status: pending
  - id: cv-parse-check
    content: Parse-check the exported PDF (text order, bullets, dates)
    status: pending
  - id: cv-swap-site
    content: Replace public/cv PDF and update contact.cv in site.ts
    status: pending
isProject: false
---

# New PDF CV — Exact Required Content

Base: `cv-daniel-bodi-gil.pdf` (the text version — it parses cleanly). Target: 2 pages, single column. Every number below already exists on the portfolio, so CV and site cross-check cleanly.

## Format rules (non-negotiable for ATS)

- Single column, no tables, text boxes, icons, photos, or graphics; standard font (Inter/Calibri/Georgia), real bullet characters
- Standard headings: Professional Summary, Core Competencies, Work Experience, Education, Languages
- No street address — city only. No empty sections (delete Certifications)
- Export text-based PDF from Word/Docs (never flattened/print-to-image); filename `daniel-bodi-gil-cv.pdf`

## 1. Header

- **Daniel Bodi Gil**
- Senior Product Designer & UX Engineer — Design Systems
- +32 497 89 75 04 · daniel.bodi.gil@gmail.com · danielbodigil.com · LinkedIn URL · Morlanwelz, Belgium

## 2. Professional summary (4 lines max)

"Product designer and UX engineer with 15 years across interface design and front-end delivery, specialised in design systems for complex enterprise products (healthcare, mobility, banking, telecom). I own the full chain: UX architecture, tokens, component libraries, Storybook documentation and the CSS/Angular implementation they ship in. Recent focus: design systems governed for both humans and AI-assisted development — machine-readable contracts, rules and agent workflows."

## 3. Core competencies (one ATS-keyword block)

Design systems & tokens · Storybook · Figma · UX research & task-based testing · Prototyping · Information architecture · ITCSS/BEM CSS architecture · Angular · PrimeNG theming · Accessibility (WCAG AA) · Design ops & governance · AI-assisted development governance · Design-dev collaboration

## 4. Work experience

**Solidaris (via Cegeka) — UX Engineer / Design System Owner · Oct 2025 – present · Belgium**
Scope line: sole embedded consultant building the AI-ready Plectrum design system and modernising the UX of a healthcare application ecosystem (iCRM, iShare, iGED).

- Built the machine-readable governance layer: component contracts, 9 rules, 4 skills, 4 protocols and a 7-role AI agent workflow, so AI-generated code lands on-system by default
- Mapped 170+ Figma variables into a three-tier token architecture bridging PrimeNG through its CSS variables — vendor upgrades stop breaking the theme
- Two production applications consume the one design system, with drift between Figma and code detectable by script
- Defined a cross-product case-reading model so employees understand an affiliate's case without reassembling it across applications
- Ran scenario-based user testing on competing workflow-journey models; the validated hybrid shipped into the design system as a reusable pattern
- Conducted employee shadowing and card sorting with 20+ users; built high-fidelity coded mockups (iShare, iGED) on the design system itself

**Bridgestone (via CTG/Cegeka) — UX Engineer / Design System Owner · Jun 2019 – Jun 2025 · Belgium**
Scope line: from sole designer to leading design workflows on FleetBridge, a fleet-management platform; built its design system from nothing.

- Made the CSS the single source of truth: tokens written once feed the apps and a self-populating Storybook (39 stories, 51 MDX docs generated from the live CSSOM) — documentation cannot drift
- Architected 254 SCSS files across 8 ITCSS layers with BEM naming, enforced by Stylelint budgets in CI
- Built a browser-derived color system: 15 hand-picked hues expand to ~250 tokens per theme via color-mix(); light and dark themes resolve from one token graph
- Delivered 40+ reusable components and guidelines (design-system backlog count); development cited ~60% faster feature work after adoption (team-reported)
- Grew the design function from 1 to 3 designers; reviewed pull requests and coached developers on CSS architecture
- Won the design-system mandate by demonstration: business formally funded it after seeing the measured difference

**Trasis (via CTG) — Senior UI/UX Designer · 2019 – 2020 · Belgium**
Scope line: end-to-end design of the QC1 radiopharmaceutical quality-control device interface — a safety-critical domain.

- Designed realistic device visualisations (valves, columns, injectors) so the UI matched technicians' physical mental model
- Designed for visual impairment from the start: redundant encodings (pattern, text, hierarchy) beyond colour
- Task-based testing with technicians reported 85% task success; prototyping speed reported ~3× after the design-system approach (both team-reported)
- Set up front-end foundations: Nx/Angular workspace, ITCSS/BEM, Storybook base; coached the internal developer who took over

**Sopra Banking Software — Senior UI/UX Designer · 2018 · Belgium**

- Introduced BEM methodology and replaced Bootstrap 3's float grid with a custom Flexbox grid, cutting UI technical debt
- Initiated the design-system direction (documentation + component library); coached a junior front-end team

**Base — Design is Dead/Emakina — UI Developer · 2016 – 2018 · Belgium**

- Cross-browser, responsive component work for high-traffic telecom sites in Adobe Experience Manager
- Introduced BEM and npm tooling that removed compile cycles from front-end changes

Earlier roles (one line): Front-End Developer, Stepstone (2015) · Web Designer, BTI Belgium (2011–2015) · Web Design Trainer, JL Gestion (2010–2011)

## 5. Education and languages

- BAC Design & Web Development — Format 21, La Louvière (2009–2010); BAC Fine Arts (Drawing) — ESAPV Mons (2005–2008)
- Spanish (native) · French (native/bilingual) · English (fluent) · Dutch, Portuguese (basic)

## 6. Cut from the old CVs

- The entire "Projects" section (duplicates Work Experience; the portfolio carries the deep versions)
- The empty "CERTIFICATIONS" heading
- The street address, the "Hey, I am" intro, the skill-chip walls

## Facts only you can confirm (before export)

- Trasis end date: old CV says 2021, portfolio says 2020 — pick the true one (both artifacts must match)
- Solidaris start: old CV says 09/2025, portfolio says Oct 2025 — align both
- LinkedIn URL to include in the header
- That "UX Engineer / Design System Owner" is defensible as your role naming with Cegeka/clients

## Execution

1. I write the full final copy to `cv/daniel-bodi-gil-cv-content.md` in the repo (ready to paste into your builder)
2. You confirm the three facts, paste, export `daniel-bodi-gil-cv.pdf`
3. I run a parse check on your exported PDF (read it back as text, verify order and bullets survive)
4. I swap it into `public/cv/`, update `contact.cv` in [src/content/site.ts](src/content/site.ts), and remove the old designed PDF from the site
