# Portfolio Transformation Brief for Cursor

> Use this document as the strategic and implementation reference for redesigning Daniel Bodi Gil's portfolio.
>
> Primary objective: make the portfolio competitive for selective Staff Product Designer, Staff/Lead Design Systems, Design Engineer and UX Engineer roles at product-led technology companies such as Miro, Ashby, Linear, Vercel, Stripe, Figma, GitLab, Shopify and similar organisations.
>
> Portfolio URL: `https://danielbodigil.com/`
>
> This is not a request for a cosmetic reskin. The work is a repositioning, content-architecture and evidence-design project.

---

# 1. Instructions for Cursor

Before changing code:

1. Inspect the complete repository.
2. Identify the framework, routing, content source, styling architecture, reusable components, animation approach, analytics, SEO setup and deployment process.
3. List every existing portfolio route and case study.
4. Identify which text and project data are hard-coded and which are data-driven.
5. Preserve working functionality and the strongest parts of the existing visual identity.
6. Create a concise implementation plan before large structural changes.
7. Implement changes incrementally and verify every route after each phase.

Do not:

- invent projects, responsibilities, technologies, metrics or testimonials;
- claim that Daniel shipped production code when the evidence only shows design guidance or implementation collaboration;
- claim expertise in React, WebGL, Canvas, multiplayer systems, AI product design or motion unless supporting work is provided;
- imply direct reports or formal people-management responsibility without evidence;
- turn the portfolio into a generic agency template;
- make every role title equally prominent;
- add decorative animation that slows access to the work;
- hide case-study content behind excessive interaction;
- replace concrete evidence with broad statements such as “passionate about design”;
- use client-confidential screenshots or personal data;
- present unvalidated recommendations as shipped outcomes.

When a required fact is missing, use an explicit content marker:

```text
[EVIDENCE NEEDED: describe the missing proof]
```

Do not silently fill the gap.

---

# 2. Why the portfolio needs to change

Daniel's experience is stronger than the signal currently produced by the portfolio.

The existing portfolio communicates:

> An experienced UI/UX designer who understands front-end development and design systems.

The new portfolio must communicate:

> A staff-level product and systems practitioner who can frame complex problems, define coherent interaction models, create scalable design foundations, work directly with engineering and raise the quality of what teams ship.

The problem is not a lack of experience. The current presentation makes recruiters work too hard to discover the strongest evidence.

The prior audit identified the following weaknesses:

- “UI Designer / Developer” undersells the seniority and specialisation.
- The homepage is atmospheric and text-heavy before it shows real work.
- Strong design-system and engineering evidence is buried in long case studies.
- The visual presentation is polished, but product craft is not demonstrated early enough.
- Case studies narrate the process before stating ownership, outcomes and decisions.
- Design and engineering breadth is described but not sufficiently shown.
- Autonomy and end-to-end ownership are not explicit enough.
- Strong signals such as Storybook, tokens, CSS architecture, PR reviews, component libraries and developer coaching appear too late.
- Older projects receive almost the same weight as the strongest recent work.
- Repeated generic “See this case study” controls weaken accessibility and specificity.
- Several impact claims need clearer methodology or qualification.
- The tone can become too casual for staff-level applications.
- The existing CV linked from the portfolio may have a weak ATS text layer and is positioned too broadly.

The redesign must optimise for three reading depths:

### Ten-second scan

A recruiter should understand:

- Daniel's senior positioning;
- his distinctive overlap of product design, design systems and implementation;
- the kind of problems he solves;
- three credible proof points;
- which flagship case to open.

### Two-minute evaluation

A hiring manager should be able to identify:

- scope and ownership;
- product and systems thinking;
- design craft;
- engineering fluency;
- business or user outcomes;
- staff-level influence;
- relevance to the open role.

### Deep case-study review

A design or engineering panel should find:

- problem framing;
- constraints and ambiguity;
- strategic decisions;
- interaction and visual craft;
- research and iteration;
- system artefacts;
- technical implementation or collaboration;
- trade-offs;
- impact evidence;
- reflection and lessons.

---

# 3. Positioning strategy

## 3.1 One core identity

Do not present Daniel as several unrelated candidates.

Use one unifying position:

> Staff-level product designer and design systems practitioner who bridges product strategy, complex UX and front-end implementation.

Recommended visible descriptor:

```text
Staff Product Designer · Design Systems & UX Engineering
```

Recommended hero idea:

```text
I design the systems behind complex products—and help teams ship them.
```

Recommended supporting sentence:

```text
I turn complex workflows into clear product experiences, reusable design foundations and implementation-ready UI across Figma, Storybook and front-end systems.
```

This framing is broad enough to support Staff Product Designer and Design Systems/UX Engineering applications, but focused enough to feel intentional.

## 3.2 Avoid title inflation

Do not use “Staff” as a claim that Daniel has already held an official Staff title unless verified. The portfolio may state that it is aimed at staff-level scope, or use the role descriptor when applying, but the experience pages must demonstrate the level through evidence.

Where safer, use:

```text
Product Designer · Design Systems & UX Engineering
```

Then let the work show staff-level qualities:

- broad scope;
- ambiguity management;
- cross-team leverage;
- strategic direction;
- quality standards;
- mentoring;
- system ownership;
- measurable outcomes.

## 3.3 Role-specific entry points

The main homepage must tell one coherent story. Add two optional role-specific paths that reuse the same verified evidence:

```text
/staff-product-design
/design-engineering
```

These routes may be lightweight landing pages or curated filters. They must not duplicate the entire site.

### Staff Product Design path

Lead with:

- complex product strategy;
- end-to-end case ownership;
- information architecture;
- user research;
- interaction models;
- stakeholder influence;
- cross-product coherence;
- mentoring and raising design quality;
- user and business impact.

Recommended featured order:

1. Solidaris
2. Trasis
3. Bridgestone

### Design Engineering / Design Systems path

Lead with:

- Figma-to-code systems;
- component libraries;
- Storybook;
- tokens;
- PrimeNG/Angular;
- CSS architecture;
- reusable patterns;
- implementation reviews;
- documentation and governance;
- AI-ready design-system thinking.

Recommended featured order:

1. Bridgestone
2. Solidaris/Plectrum
3. Trasis or Sopra Banking

Do not create separate facts for the two paths. Change emphasis, ordering and summary copy only.

---

# 4. Hiring signals the portfolio must satisfy

## 4.1 Selective Staff Product Designer signal

The portfolio must demonstrate:

- ownership of complex, ambiguous initiatives;
- the ability to define a direction rather than only respond to requirements;
- a clear connection between user needs, product strategy and business value;
- strong interaction and visual craft;
- cross-functional leadership with product and engineering;
- influence beyond one screen or feature;
- mentoring, standards or practice-building;
- evidence-based iteration;
- the ability to communicate a compelling product vision;
- outcomes, learning and trade-offs.

For Miro-like Staff Product Designer roles, prioritise evidence of:

- a strategic North Star;
- end-to-end initiative leadership;
- comfort with ambiguity;
- B2B or enterprise product complexity;
- high-quality prototyping;
- close work with engineering on technical constraints;
- design-system and internal-tool contribution;
- autonomous ownership;
- user and business impact;
- future-facing thinking, including honest AI-related exploration where supported.

## 4.2 Selective Design Engineer signal

The portfolio must demonstrate:

- genuine excellence in design and engineering, not a designer who only makes prototypes;
- product UI designed and implemented or followed through production;
- reusable components and system-level contributions;
- visual craft: typography, spacing, alignment, colour, contrast and states;
- interaction polish and, where supported, motion;
- technical judgement and front-end architecture;
- documentation and tooling;
- evidence of use by real teams or users;
- iteration from feedback;
- autonomy and project completion.

For Ashby-like Design Engineer roles, the reviewer must quickly find:

- examples where Daniel both designed and coded;
- shipped code used by real users;
- a major design-system contribution;
- product features iterated through feedback;
- end-to-end autonomy;
- refined visual design;
- implementation details, not only Figma output.

For Miro-like Staff Design Engineer roles, the reviewer should also find:

- components, tokens, patterns and tooling;
- design-system governance;
- organisation-level leverage;
- written guidance and teaching;
- strong product judgement;
- high standards of visual and interaction craft.

Miro currently emphasises React/TypeScript, WebGL/Canvas/SVG, motion and real-time multiplayer systems for its Staff Design Engineer role. Daniel's portfolio must not pretend to cover these if it does not. Instead:

- make Angular/TypeScript and enterprise design-system depth unmistakable;
- show transferable component and architecture thinking;
- add real React or spatial-computing evidence only after Daniel creates it;
- list these as honest development gaps, not hidden weaknesses.

## 4.3 Design Systems Lead/Engineer signal

The portfolio must demonstrate:

- system strategy, not just a component inventory;
- foundations, tokens, components and patterns;
- the relationship between Figma and code;
- adoption and governance;
- documentation;
- contribution models;
- developer experience;
- versioning or migration thinking;
- accessibility standards;
- quality assurance;
- measurable team leverage;
- how the system supports product outcomes.

## 4.4 UX Engineer signal

The portfolio must demonstrate:

- deep understanding of users and workflows;
- information architecture;
- interactive prototyping;
- front-end feasibility;
- state modelling;
- responsive behaviour;
- accessibility;
- design-to-development collaboration;
- implementation quality;
- the ability to resolve details between design and production.

---

# 5. Site information architecture

Use a simple primary navigation:

```text
Work
Approach
About
CV
Contact
```

Recommended routes:

```text
/
/work
/work/solidaris
/work/bridgestone
/work/trasis
/work/sopra-banking
/work/base
/approach
/about
/staff-product-design
/design-engineering
```

Do not overload the top navigation with skill categories.

## Homepage section order

1. Hero with immediate proof.
2. Proof bar.
3. Featured Solidaris case.
4. Featured Bridgestone case.
5. Featured Trasis case.
6. “How I create leverage” capabilities.
7. Selected system and implementation artefacts.
8. Short career progression.
9. About/working style.
10. Contact and CV.

## Work index

Organise projects by relevance rather than chronology.

### Flagship

- Solidaris
- Bridgestone
- Trasis

### Supporting evidence

- Sopra Banking
- Base

Older work should not compete visually with the flagship cases. It can appear in a compact “Earlier foundations” section.

---

# 6. Homepage requirements

## 6.1 Hero

The first viewport must include real evidence, not only biography.

Suggested structure:

```text
Eyebrow:
Staff Product Design · Design Systems · UX Engineering

H1:
I design the systems behind complex products—and help teams ship them.

Supporting copy:
I turn complex workflows into clear product experiences, reusable design foundations and implementation-ready UI across Figma, Storybook and front-end systems.

Primary CTA:
View selected work

Secondary CTA:
Download CV

Context link:
Currently modernising Solidaris's internal product ecosystem.
```

Place a strong, legible product or design-system visual in the hero:

- an anonymised Solidaris ecosystem or interface composition;
- a Bridgestone component/system composition;
- a split Figma/Storybook/product visual;
- an intentionally assembled proof image showing product, system and implementation.

Do not use an abstract purple composition as the only hero visual.

## 6.2 Proof bar

Use three or four concise proof points. Verify every number.

Example:

```text
15 years across product design and front-end UI
40+ reusable components delivered
Figma, Storybook, Angular and TypeScript
Complex B2B, healthcare, mobility and banking products
```

If “15 years” or “40+ components” cannot be confirmed from source material, replace with a non-numeric statement.

## 6.3 Featured work cards

Every card must expose:

- project name;
- one-line problem;
- Daniel's role;
- two or three capability tags;
- one verified outcome;
- a meaningful preview;
- a project-specific accessible link.

Example:

```text
Solidaris
Making complex affiliate cases understandable across a connected healthcare application ecosystem.

Role:
UX/UI Consultant · UX Architecture · Design Systems

Evidence:
Cross-product navigation, case histories, workflow redesign, user testing, PrimeNG/Plectrum patterns

CTA:
Read the Solidaris ecosystem case study
```

Do not use repeated link labels such as “See this case study.”

## 6.4 Capability section

Title:

```text
How I create leverage
```

Use three connected capabilities:

### Product direction

```text
I frame complex workflows, align user and business needs, and turn ambiguity into a coherent product direction.
```

### Systems

```text
I translate recurring product decisions into foundations, components, patterns and documentation that teams can reuse.
```

### Delivery

```text
I work close to implementation through prototypes, front-end architecture, Storybook, design QA and code-level collaboration.
```

Support each capability with links to relevant case-study sections.

## 6.5 Artefact gallery

Add a compact, high-quality gallery of concrete artefacts:

- component anatomy;
- tokens;
- Storybook documentation;
- accessibility states;
- workflow model;
- prototype interaction;
- before/after comparison;
- Figma-to-code mapping;
- pull-request or design-QA workflow;
- design-system registry or contract example.

Every artefact needs a caption explaining:

- what it is;
- why it mattered;
- Daniel's contribution;
- whether it was shipped, tested or proposed.

## 6.6 Career section

Replace the long autobiographical career narrative with a compact progression:

```text
Product and systems leadership
Solidaris / Cegeka

Design system ownership and UX engineering
Bridgestone

Safety-critical product design
Trasis

Front-end architecture and team enablement
Sopra Banking

UI engineering foundations
Base
```

For each entry:

- one line of scope;
- two concrete contributions;
- link to the associated case.

---

# 7. Global case-study template

Every flagship case study must follow the same evidence-first logic, while allowing different content.

## 7.1 Case hero

Required:

- outcome-oriented title;
- one-sentence project summary;
- role;
- period;
- team or collaboration model;
- product context;
- responsibilities;
- tools/stack;
- confidentiality note if needed;
- one strong visual.

Example title format:

```text
[Project]: [Strategic outcome or transformation]
```

Avoid:

```text
My journey at...
How we made everything better...
```

## 7.2 Recruiter summary

Place this directly below the hero:

```text
The challenge
Two or three sentences.

My ownership
Three concise bullets.

What changed
Three concise bullets.

Evidence
Two or three verified outcomes.
```

A recruiter must not need to read the full case to find the role and impact.

## 7.3 Strategic framing

Explain:

- why the problem mattered;
- who experienced it;
- product and business context;
- why the existing approach failed;
- ambiguity or organisational constraints;
- the success criteria.

Do not begin with a chronological diary.

## 7.4 Scope and ownership

Use an explicit ownership map:

```text
I led
I designed
I implemented
I facilitated
I influenced
The team delivered
```

This prevents both underselling and overclaiming.

## 7.5 Key decisions

Select three to five decisions. Each decision should show:

1. The problem or competing goals.
2. The options considered.
3. Evidence used.
4. The chosen direction.
5. Trade-offs.
6. What changed after validation.

Staff-level reviewers care more about decision quality than a list of design activities.

## 7.6 Product craft

Show:

- final interface at useful scale;
- layout and information hierarchy;
- typography and density;
- empty, loading, error and edge states;
- accessibility;
- responsive behaviour where relevant;
- interaction details;
- content decisions;
- motion only where it exists and contributes to meaning.

Do not show only small screenshots inside decorative device frames.

## 7.7 System and engineering evidence

Where relevant, show:

- component states and variants;
- tokens;
- Figma structures;
- Storybook;
- Angular/TypeScript or HTML/CSS excerpts;
- reusable composition patterns;
- technical constraints;
- design-to-code mapping;
- architecture diagram;
- PR or design-QA workflow;
- documentation;
- adoption process.

Use short, curated excerpts. Do not turn the portfolio into raw technical documentation.

## 7.8 Validation and iteration

Include:

- research method;
- participant types and count where permitted;
- task or scenario;
- what was observed;
- what changed;
- the limitations of the research.

Do not present user testing as a ceremonial process step.

## 7.9 Outcomes

Separate:

```text
User outcome
Business or team outcome
System outcome
Learning
```

For every metric, provide a short evidence note:

- how it was measured;
- compared with what;
- over which period;
- whether it is an estimate.

If a number cannot be defended, use a precise qualitative result.

## 7.10 Reflection

End with:

- what Daniel would repeat;
- what he would change;
- remaining constraints;
- next step;
- how the project influenced his systems or product practice.

Avoid generic “I learned the importance of collaboration” conclusions.

---

# 8. Solidaris flagship case

Use the separate source file:

```text
solidaris-portfolio-use-case-reference.md
```

The Solidaris case should become the primary proof for Staff Product Designer and UX Architecture roles.

## Recommended title

```text
Solidaris: Creating a Coherent UX Across a Complex Healthcare Application Ecosystem
```

## Core narrative

The case is not a collection of unrelated screen redesigns. It is a cross-product modernisation initiative spanning:

- iCRM;
- iShare;
- iGED integration;
- the shared application shell;
- Plectrum, the PrimeNG-based design system.

The central problem:

```text
Employees had to reconstruct an affiliate's situation from fragmented tickets, documents, workflows and specialist systems.
```

The design direction:

```text
Make the state, history and next step of an affiliate case understandable without erasing the responsibilities of specialist tools.
```

## Staff Product Designer evidence

Emphasise:

- reframing each application's purpose;
- cross-product information architecture;
- aligning shell and local navigation;
- separating tickets, notifications, proactive signals and documents;
- defining a coherent case-reading model;
- scenario-based user testing;
- strategic trade-offs between overview and detailed work;
- direct client-side stakeholder alignment;
- working autonomously as the only embedded Cegeka consultant.

## Design Systems/UX Engineering evidence

Emphasise:

- Plectrum and PrimeNG;
- reusable case-management patterns;
- shared status semantics;
- application-shell navigation rules;
- selective wrapper strategy;
- composed enterprise patterns;
- accessibility and implementation constraints;
- AI-ready registry, metadata and governance thinking as future direction.

## Visuals required

- ecosystem diagram;
- iCRM before/after information model;
- business-inbox ticket pattern;
- proactivity drawer;
- notification drawer;
- iShare horizontal/vertical workflow comparison;
- hybrid workflow direction;
- user-testing framework;
- Plectrum pattern hierarchy.

Clearly label visuals:

```text
Shipped
Validated prototype
Concept
Future recommendation
```

Do not mix these states.

---

# 9. Bridgestone flagship case

## Recommended title

```text
Bridgestone: Building a Design System and Front-End UI Foundation for a Fleet Management Platform
```

## Why it matters

This is the strongest current proof for:

- Design Engineer;
- UX Engineer;
- Design Systems Engineer;
- Design Systems Lead.

## Evidence to surface immediately

Based on the existing portfolio audit:

- 40+ components;
- Figma and Storybook;
- design tokens;
- CSS utilities;
- ITCSS/BEM architecture;
- PR review;
- developer coaching;
- shared UI language;
- reported 60% faster development.

Every figure must be verified and explained.

## Required visual evidence

- system before/after;
- component inventory with meaningful grouping;
- one component anatomy;
- responsive or interactive states;
- Figma/Storybook parity;
- token architecture;
- CSS architecture;
- documentation example;
- implementation review workflow;
- final product UI.

## Ownership language

Use specific verbs only where accurate:

```text
Defined
Built
Implemented
Documented
Reviewed
Introduced
Standardised
Coached
Measured
```

Replace vague phrases such as:

```text
Worked with...
Helped with...
Facilitated good collaboration...
Fostered positive relationships...
```

## Outcome qualification

If the “60% faster development” figure is retained, add:

```text
[EVIDENCE NEEDED: explain the baseline, activity measured and source of the 60% figure]
```

---

# 10. Trasis flagship case

## Recommended title

```text
Trasis QC1: Designing a Safety-Critical Interface for Radiopharmaceutical Quality Control
```

## Why it matters

This is strong evidence for:

- Staff/Senior Product Designer;
- UX Engineer;
- product craft under technical constraints;
- research and validation;
- high-consequence workflow design.

## Narrative focus

Show:

- the operational workflow;
- why mistakes or ambiguity mattered;
- the technical and regulatory constraints;
- how the information architecture was simplified;
- visual and interaction decisions;
- prototype and validation method;
- how the design changed after feedback;
- how implementation feasibility influenced the solution.

## Evidence currently referenced

- reported 85% task success;
- reported 3× faster prototyping;
- stakeholder buy-in.

Qualify each claim. Add:

```text
[EVIDENCE NEEDED: participant count, test tasks, baseline and calculation]
```

Avoid dramatic patient-safety claims unless the relationship can be accurately and responsibly explained.

## Required visuals

- original workflow;
- redesigned flow;
- before/after screen;
- high-fidelity UI detail;
- component or state model;
- usability-test scenario and iteration;
- technical constraint and resulting decision.

---

# 11. Supporting cases

## Sopra Banking

Reframe as:

```text
Modernising CSS Architecture and Design Workflows for Enterprise Banking Software
```

Use it to prove:

- BEM;
- CSS and layout architecture;
- faster prototyping;
- developer coaching;
- process improvement;
- enterprise constraints.

Do not lead with an unfinished design-system promise. Focus on the foundation and changes that were actually delivered.

Qualify existing claims such as:

- 40% faster prototyping;
- 30% cost reduction.

## Base

Use as a short technical origin story:

```text
Building Front-End Foundations for High-Traffic Telecom Experiences
```

Use it to prove:

- UI development foundations;
- AEM;
- AngularJS;
- LESS;
- cross-browser work;
- implementation discipline.

This case should be shorter and visually less prominent than recent work.

Avoid nostalgic or overly casual framing such as “even IE8” unless used sparingly in a secondary caption.

---

# 12. Visual design direction

The current purple visual identity can remain recognisable, but it should become more product-led.

## Keep

- distinctive personality;
- confident colour;
- clean type;
- crafted transitions;
- a human voice.

## Change

- reduce large decorative surfaces with no evidence;
- use more neutral space around product imagery;
- show interface work at a readable scale;
- use purple as a controlled accent rather than an atmospheric layer everywhere;
- prioritise typography, grid, density and product composition;
- make screenshots, components and diagrams the visual centre;
- ensure the work feels credible for both design and engineering reviewers.

## Visual craft checklist

- deliberate type scale;
- consistent line length;
- stable spacing rhythm;
- accessible contrast;
- clear link and focus states;
- precise alignment;
- consistent card ratios;
- legible captions;
- no tiny screenshots;
- no gratuitous glass effects;
- no excessive rounded containers;
- no generic gradient blobs competing with the work.

## Motion

Use motion to communicate:

- route transition;
- state change;
- component behaviour;
- workflow progression;
- relationship between design and implementation.

Do not add motion only to appear more like a Design Engineer portfolio. Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 13. Evidence design

The portfolio should make proof scannable.

Create reusable evidence components:

## Outcome metric

Fields:

- value;
- label;
- evidence note;
- confidence level;
- source or method.

## Ownership badge

Allowed labels:

```text
Led
Designed
Implemented
Documented
Tested
Influenced
Team outcome
```

## Delivery state

Allowed labels:

```text
Shipped
In production
Validated prototype
Tested concept
Strategic proposal
Ongoing
```

## Artefact caption

Fields:

- artefact name;
- problem addressed;
- Daniel's contribution;
- project state;
- optional technical detail.

## Decision block

Fields:

- tension;
- alternatives;
- evidence;
- decision;
- trade-off;
- result.

These components should make credibility visible without forcing the reader through paragraphs.

---

# 14. Content and writing rules

## Voice

Use:

- direct;
- calm;
- specific;
- senior;
- reflective;
- technically credible;
- human without being jokey.

Avoid:

- “passionate” as a substitute for proof;
- “pixel-perfect” unless discussing a defined quality process;
- “revolutionised”;
- “seamless”;
- “intuitive” without validation;
- “collaborated” without explaining the contribution;
- “I was responsible for” repeated everywhere;
- “spoiler alert”;
- jokes about throwing laptops;
- excessive rhetorical questions;
- inflated superlatives.

## Writing pattern

Prefer:

```text
I reframed iShare from a task-management problem into an affiliate-case comprehension problem, then tested two workflow models against realistic scenarios.
```

Over:

```text
I collaborated with stakeholders to create an intuitive and seamless new experience.
```

## Claim rules

Every important claim must answer at least one of:

- What changed?
- For whom?
- Compared with what?
- How was it measured?
- What did Daniel personally do?
- Was it shipped?

---

# 15. About page

The About page should not repeat the homepage.

Recommended structure:

1. Current professional focus.
2. Career progression from front-end UI to product and systems leadership.
3. How the technical and design backgrounds reinforce each other.
4. Working style and values.
5. Languages and location.
6. Short personal dimension.
7. CV and contact.

Suggested opening:

```text
I have spent around 15 years working in the space between interface design and front-end delivery. I started by building UI, moved deeper into product and user experience, and increasingly focused on the systems, patterns and decisions that help teams ship coherent products at scale.
```

Verify the exact number of years.

Do not include a full street address. Use:

```text
Morlanwelz, Belgium · Europe/Brussels
```

---

# 16. CV integration

Provide two role-specific CV downloads:

```text
Daniel-Bodi-Gil-Staff-Product-Designer.pdf
Daniel-Bodi-Gil-Design-Systems-UX-Engineer.pdf
```

The site must explain the difference subtly, for example:

```text
Product design CV
Design systems and UX engineering CV
```

Requirements:

- ATS-readable text layer;
- selectable text;
- one or two pages;
- no full address;
- clear role-specific headline;
- strongest evidence near the top;
- fewer decorative skill blocks;
- concrete shipped outcomes;
- verified metrics;
- portfolio and LinkedIn links;
- GitHub only if it contains polished relevant work.

Do not generate or rewrite the CV inside the portfolio project unless the source content has been approved separately.

---

# 17. Accessibility requirements

Meet WCAG 2.2 AA as the baseline target.

Required:

- semantic landmarks;
- logical heading order;
- keyboard-accessible navigation;
- visible focus;
- meaningful project-specific link text;
- alt text that explains the informational purpose of visuals;
- captions for video or motion evidence;
- no colour-only status communication;
- reduced-motion support;
- sufficient contrast;
- accessible dialog/drawer behaviour;
- skip link;
- touch targets of adequate size;
- no hover-only essential content;
- accessible route-change announcements if needed;
- valid labels and names for all controls.

Fix the repeated “See this case study” issue. Each accessible name must include the project.

---

# 18. Performance and technical quality

The portfolio itself is evidence of craft.

Targets:

- Lighthouse Performance: 90+ on representative mobile hardware;
- Accessibility: 100 or no known critical issues;
- Best Practices: 95+;
- SEO: 95+;
- no avoidable cumulative layout shift;
- responsive images;
- lazy-load content below the fold;
- prefetch only high-intent routes;
- minimise animation and bundle cost;
- use real text rather than text embedded in images;
- support direct linking to every case and major section;
- preserve the expected content on refresh;
- no empty project shell during route transitions;
- useful error and 404 pages.

Do not chase a score at the expense of product-image quality. Use appropriate modern image formats and sizes.

---

# 19. SEO and social presentation

Every page requires:

- unique title;
- unique meta description;
- canonical URL;
- Open Graph title, description and image;
- Twitter/X card metadata;
- meaningful structured data where appropriate;
- sitemap;
- robots file;
- correct language metadata.

Homepage title example:

```text
Daniel Bodi Gil — Product Design, Design Systems & UX Engineering
```

Homepage description example:

```text
Portfolio of Daniel Bodi Gil, a product designer and UX engineer specialising in complex enterprise products, design systems, Figma, Storybook and front-end UI architecture.
```

Do not optimise copy around a list of every possible role title.

---

# 20. Analytics and evaluation

Track only useful, privacy-conscious events:

- case-study opened;
- role-specific path selected;
- CV downloaded by variant;
- contact initiated;
- external GitHub or LinkedIn link opened;
- case-study completion depth;
- recruiter-summary interaction if applicable.

Do not add invasive analytics.

After launch, evaluate:

- which case is opened first;
- which CV version is downloaded;
- recruiter or hiring-manager feedback;
- interview conversion by role;
- where readers leave long case studies;
- whether the first-screen positioning is understood in five-second tests.

---

# 21. Content inventory needed from Daniel

Cursor should create a visible checklist or content file for missing assets.

## Solidaris

- approved anonymised screenshots;
- shipped versus concept status;
- participant count and test findings;
- direct iGED scope;
- exact role title;
- stakeholder approval for product names;
- eventual outcome data.

## Bridgestone

- component inventory;
- Storybook captures;
- token examples;
- CSS architecture;
- PR/design-QA evidence;
- explanation of 60% improvement;
- exact ownership and team composition.

## Trasis

- participant count;
- test scenarios;
- measurement behind 85% success;
- prototype evidence;
- safety-claim wording approval;
- final product visuals.

## Sopra Banking

- evidence behind speed and cost figures;
- CSS/grid examples;
- coaching or documentation artefacts.

## Base

- code or component examples safe to publish;
- product screenshots;
- precise contribution and outcomes.

## General

- approved portrait;
- updated CVs;
- LinkedIn;
- GitHub or code sample;
- current role and availability;
- contact method;
- exact years of experience;
- client-logo permissions;
- testimonials, only if authentic and approved.

---

# 22. Gap strategy for target companies

The portfolio must be honest about what Daniel already proves and what still requires new evidence.

## Strong existing signals

- complex enterprise product UX;
- design systems;
- Figma and Storybook;
- Angular and front-end UI;
- PrimeNG;
- tokens;
- CSS architecture;
- information architecture;
- prototyping;
- user testing;
- design/development collaboration;
- documentation;
- cross-application patterns;
- autonomous consulting responsibility.

## Signals that need stronger presentation

- refined visual craft;
- code personally shipped;
- end-to-end feature ownership;
- scale of real users;
- business impact;
- mentoring impact;
- system adoption;
- implementation details;
- interaction polish.

## Signals that may require new work

- React at advanced production level;
- WebGL/Canvas/SVG systems;
- real-time multiplayer interaction;
- advanced product motion;
- AI-native product feature design;
- high-scale consumer or PLG experimentation;
- Staff/Principal scope explicitly recognised by an organisation.

Do not solve these gaps through copy. Solve them through real projects, open-source experiments or future work, then add the evidence.

Recommended optional portfolio lab:

```text
/lab
```

Use it only for polished, real experiments such as:

- a React/TypeScript component system;
- an accessible spatial/canvas interaction;
- a motion and interaction study;
- an AI-assisted design-system registry;
- a Figma-to-code contract prototype.

Clearly label personal experiments. Do not mix them with client production work.

---

# 23. Implementation phases

## Phase 1 — Signal correction

- replace weak positioning;
- rebuild the hero;
- add immediate proof;
- reorder projects;
- fix project-specific accessible links;
- add recruiter summaries to flagship cases;
- add role-specific CV links;
- fix route and direct-link issues.

## Phase 2 — Flagship content

- publish Solidaris case;
- restructure Bridgestone;
- restructure Trasis;
- add ownership and delivery-state labels;
- add evidence notes to metrics;
- improve product visuals.

## Phase 3 — Systems and engineering proof

- add artefact gallery;
- add Storybook, token and code evidence;
- show design-to-code workflow;
- add Plectrum/PrimeNG system story;
- add architecture diagrams where useful.

## Phase 4 — Role paths

- create Staff Product Design route;
- create Design Engineering route;
- curate evidence order and copy;
- add role-specific SEO metadata.

## Phase 5 — Quality

- accessibility audit;
- performance optimisation;
- responsive QA;
- route and browser testing;
- English copy review;
- analytics;
- five-second recruiter test.

---

# 24. Definition of done

The transformation is complete only when:

- the homepage communicates the positioning within one viewport;
- real work appears above the fold;
- the three flagship cases lead with ownership and outcomes;
- Solidaris is presented as a coherent ecosystem case;
- Bridgestone visibly demonstrates design-system and engineering work;
- Trasis visibly demonstrates product craft and validation;
- every major metric includes evidence or is removed;
- shipped, tested and proposed work are clearly distinguished;
- the portfolio shows both product decisions and implementation evidence;
- project links have meaningful accessible names;
- older work is secondary;
- two role-specific evidence paths exist without fragmenting the identity;
- the CV links are role-specific and ATS-friendly;
- all routes work on direct load and refresh;
- the site meets accessibility and performance targets;
- no confidential information is exposed;
- no unsupported technology or responsibility is claimed;
- a recruiter can identify Daniel's role, scope and differentiator in ten seconds;
- a Staff Product Design reviewer can find strategy, ambiguity, influence and outcomes;
- a Design Engineering reviewer can find visual craft, code-facing proof, system architecture and delivery.

---

# 25. Final editorial north star

The portfolio should leave the reader with this conclusion:

> Daniel is not a designer who occasionally speaks with developers, and he is not a front-end specialist who only implements finished screens. He works across product direction, interaction architecture, design systems and implementation to help teams make complex software clearer, more coherent and easier to ship.

Every page, case study, visual and line of copy should strengthen that conclusion.

---

# 26. External role benchmarks

These links were reviewed in July 2026. Job descriptions can change or close. Use them as evidence of the hiring bar, not as permanent content to publish on the portfolio.

## Ashby

- Design Engineer: `https://jobs.ashbyhq.com/ashby/fd86edd7-3af0-4977-a61a-215212c296fa`
- Staff Product Designer: `https://jobs.ashbyhq.com/ashby/2373fcd5-144b-4d66-a98b-dd0efb4eb9d1`

Signals extracted:

- genuine strength in both design and code;
- shipped work used by real users;
- major design-system contributions for Staff Design Engineering;
- iteration through user feedback;
- autonomy without heavy process;
- high visual and implementation quality;
- designers who improve the decisions made by the wider product team.

## Miro

- Design team: `https://miro.com/careers/teams/design/`
- Product team: `https://miro.com/careers/teams/product/`
- Staff Product Designer, Prototypes: `https://miro.com/careers/vacancy/8460216002/?gh_jid=8460216002`
- Staff Design Engineer: `https://miro.com/careers/vacancy/7850199002/?gh_jid=7850199002`

Signals extracted:

- strategic initiatives and organisation-level impact;
- customer understanding and cross-functional delivery;
- accessibility responsibility;
- autonomous ownership in ambiguous environments;
- North Star thinking and future-facing product direction;
- AI-native product and design-system thinking;
- systems that raise quality and speed for other teams;
- components, tokens, patterns, tooling, governance and teaching;
- exceptional visual craft and build quality;
- React/TypeScript, motion, graphics and spatial technology for the currently advertised Staff Design Engineer role.

## Interpretation rule

Do not copy job-description phrases into the portfolio. Use the benchmarks to decide which verified project evidence to surface.

The portfolio should demonstrate:

```text
Evidence of the capability
```

not:

```text
A claim that Daniel has the capability
```
