# Solidaris — Portfolio Use Case Reference

> Working reference for creating a public-facing portfolio case study in Cursor.
>
> Project period: October 2025–October 2026  
> Status: Ongoing at the time of writing  
> Organisation: Solidaris  
> Delivery context: Cegeka consultancy assignment  
> Role: UX/UI consultant with UX architecture, UX engineering, design-system and prototyping responsibilities  
> Products and systems covered: iCRM, iShare, iGED, the shared application shell, and Plectrum  

## How to use this document

This is a detailed source document, not final portfolio copy. It collects the project narrative, design reasoning, product-specific approaches, constraints, decisions and reusable themes that can be turned into a shorter case study.

When producing the public portfolio page:

- keep the project story focused on the approach and the quality of the reasoning;
- do not invent quantitative outcomes;
- describe the project as ongoing until October 2026;
- distinguish shipped work, validated prototypes and future recommendations;
- avoid exposing real affiliate data, internal identifiers or confidential operational rules;
- replace internal screenshots with anonymised or recreated visuals if public disclosure has not been approved;
- present Plectrum as the shared design-system foundation, not as a standalone business application;
- describe iCRM, iShare and iGED according to their distinct responsibilities;
- avoid implying that I redesigned every part of iGED if the available evidence only demonstrates cross-product integration and document-status work.

---

# 1. Project summary

Solidaris operates an ecosystem of internal applications used by employees to understand an affiliate's situation, follow contacts and requests, consult documents, and navigate complex healthcare and insurance processes.

The assignment was not simply a visual refresh. It involved modernising legacy enterprise interfaces while improving the experience across several connected tools. Each product had its own history, vocabulary and operational constraints, but employees often needed to move between them to understand one affiliate case.

My approach was therefore to work at two levels at the same time:

1. Improve the usability of each application according to its real purpose and user workflow.
2. Establish shared interaction patterns, navigation principles and UI foundations that could make the wider Solidaris ecosystem feel coherent.

The central design challenge was to reduce the mental effort required to reconstruct an affiliate's situation from fragmented information. Instead of asking users to interpret isolated tickets, documents, statuses and system events, I aimed to help each interface communicate:

- what is happening;
- what happened most recently;
- what requires attention;
- what the user can do next;
- where the source information comes from;
- which specialist application should be opened for deeper processing.

This led to a consistent experience principle:

> Solidaris employees should be able to understand the state and history of an affiliate case quickly, without needing to mentally assemble the story from several disconnected screens.

---

# 2. My role and positioning

I worked as the only Cegeka consultant embedded in the Solidaris context. I did not operate as part of a daily team of other Cegeka consultants. My collaboration and learning therefore happened mainly with the client-side product, business and technical stakeholders, supplemented by my own research and occasional contact with Cegeka colleagues.

My contribution sat between product design, UX architecture and UX engineering. I was not only producing screens. I was also:

- analysing existing workflows and legacy interfaces;
- translating business documentation into clearer interaction models;
- identifying information-architecture and navigation problems;
- challenging ambiguous actions, labels and system behaviours;
- designing flows, wireframes and high-fidelity prototypes;
- preparing and iterating user-testing scenarios;
- comparing alternative interaction patterns through task-based evaluation;
- defining reusable patterns across applications;
- aligning application designs with the shared shell;
- applying Plectrum, the Solidaris design system based on PrimeNG;
- considering component behaviour, implementation feasibility and Angular delivery;
- improving the bridge between design decisions and front-end implementation;
- helping move the work from isolated UI delivery toward a more systematic UX architecture.

This position was valuable because many of the problems crossed product boundaries. A document could be received or processed in iGED, surfaced through iShare, referenced in iCRM and accessed through a shared application shell. Solving only the visual layer of one screen would not solve the user's end-to-end problem.

---

# 3. The ecosystem challenge

## 3.1 Fragmented tools, connected work

The products have different responsibilities:

- **iCRM** supports the overall affiliate relationship, contacts, tickets, operational requests, proactive signals and a 360-degree view.
- **iShare** supports document and process consultation for a specific affiliate. It helps an employee understand the status and progression of documents and related business journeys.
- **iGED** is part of the document-management and processing landscape. It is a source or destination for document information and operational treatment.
- **Plectrum** provides the shared design-system foundation and is based on PrimeNG.
- **The application shell** provides cross-application navigation and a common frame for the ecosystem.

The employee's task rarely respects these product boundaries. A person answering an affiliate may need to understand a contact in iCRM, verify a document or its workflow through iShare, then open the source in iGED, IRIS or another specialist system.

The design therefore had to preserve each application's responsibility while making movement and context across the ecosystem understandable.

## 3.2 Legacy complexity

The existing products contained familiar enterprise-application problems:

- dense screens with many visually equal regions;
- weak hierarchy between primary and secondary information;
- long labels and titles that became truncated;
- unclear status semantics;
- overlapping concepts such as tickets, TDMs, notes, documents and system events;
- important workflow information hidden inside panels;
- actions whose labels did not explain their real consequence;
- application-level navigation that could conflict with the future global shell;
- interfaces organised around system structures rather than user questions;
- fragmented histories that required users to open multiple objects to understand what happened.

The goal was not to remove necessary complexity. Healthcare and insurance work is inherently detailed. The goal was to make the complexity legible and to reveal it progressively.

## 3.3 Expert users and operational speed

These interfaces are used in repetitive, information-heavy work. Expert users value density, speed and familiar structures. A visually dramatic redesign could easily reduce productivity.

My approach was therefore intentionally measured:

- preserve efficient and familiar master-detail interaction where it worked;
- be more innovative in summaries, histories, overlays and information hierarchy;
- introduce new patterns through prototypes and user tests;
- optimise for scanning and decision-making rather than visual novelty;
- keep expert codes available while adding human-readable explanations;
- use progressive disclosure instead of hiding information permanently.

---

# 4. Overall design approach

## 4.1 Start from the user's question, not the existing screen

For every interface, I first reframed the page around the question the employee was trying to answer.

Examples:

- iCRM: “What happened in this affiliate's case, what is the latest action, and what needs attention?”
- iShare: “After opening this affiliate, what is the state of the documents and process, and how can I explain it?”
- iGED integration: “Where is the document in its lifecycle, and where can I access or process the source?”
- Proactivity: “Why has this signal appeared, what should I verify, and which result should I record?”
- System notifications: “What did Solidaris send automatically, when, through which channel, and was it delivered?”

This prevented the redesign from becoming a component-for-component translation of the legacy UI.

## 4.2 Reconstruct the information model

Before designing layouts, I separated the objects and their relationships:

- affiliate;
- contact;
- ticket;
- TDM or operational request;
- note;
- document;
- workflow step;
- status;
- proactive signal;
- notification;
- appointment;
- source system;
- user action;
- system event.

This was essential because several screens were visually mixing objects with different meanings. For example, a notification is evidence that a system message was sent; it is not a ticket that the employee must process. A proactive signal is something to qualify; a simple “mark as treated” flag would lose the business value contained in the result.

## 4.3 Build a hierarchy for rapid comprehension

Across the products, I used a layered structure:

1. **Context** — which affiliate, case, ticket or document am I looking at?
2. **Summary** — what is the current state?
3. **Attention** — what is blocked, late, incomplete or unusual?
4. **Recent activity** — what happened last?
5. **Detail** — what evidence and metadata support that conclusion?
6. **Action** — what can or should the employee do next?
7. **Source** — where can the employee open the authoritative system?

This structure became the basis for case summaries, ticket lists, timelines, drawers and workflow views.

## 4.4 Preserve source-system boundaries

iCRM should connect and orient, but it should not pretend to replace every specialist tool. The experience can surface document states, notification details or related events while still providing clear links to iGED, iShare, D360, IRIS, CICS or other authoritative sources when deeper action is required.

This helped avoid two opposite problems:

- forcing users to jump between tools for every small piece of information;
- recreating specialist functionality in the wrong application.

## 4.5 Prototype before committing

I used working prototypes to explore the interaction, not only static mockups. This made it possible to test:

- how users scan a dense affiliate dossier;
- whether they understand the latest activity;
- whether status and alerts are visible;
- how they move between related tickets;
- whether they understand document journeys;
- whether buttons and navigation controls are discoverable;
- whether a horizontal or vertical workflow representation better matches the task.

The prototype also supported more credible conversations with stakeholders and developers because it demonstrated intended behaviour, state changes and responsive relationships.

## 4.6 Validate with tasks, not preference alone

My user-testing approach combined realistic scenarios with short evaluation questions.

Instead of asking only “Which version do you prefer?”, I used tasks such as:

- identify the current state of a primary request;
- find the step requiring attention;
- locate the reception date of a medical certificate;
- navigate to the next workflow step;
- identify the latest action on a ticket;
- explain the situation as if speaking to an affiliate.

For each scenario I observed:

- task completion without help;
- completion with help;
- errors and misinterpretations;
- hesitation;
- navigation path;
- visibility of actions;
- time or relative effort;
- user comments and confidence.

I complemented this with five-point ratings for:

- task ease;
- clarity of the information;
- visibility of status;
- understanding of what to do next;
- confidence in the information;
- readability;
- navigation;
- usefulness in daily work.

The ratings provided comparison signals, while observation and the users' explanations provided the actual design insight.

---

# 5. iCRM approach

## 5.1 Product purpose

iCRM is the relationship and case-understanding layer. It brings together contacts, tickets, operational requests, notes, proactive signals, notifications and links to specialist tools.

The redesign objective was to make an affiliate dossier tell a coherent story. Front-office and back-office employees should be able to understand the situation rapidly and share a common view of what happened.

## 5.2 Main UX problem

The legacy ticket area tried to show too much inside large cards:

- contact or ticket type;
- long business title;
- status;
- date;
- indicators;
- related TDMs;
- ticket identifier;
- implied history.

Long titles were truncated, cards consumed substantial vertical space, and the latest action was not immediately visible. A compact timeline was also explored, but a detailed card-based timeline inside a narrow column displayed even less useful content.

This led to an important design conclusion:

> The problem was not typography or card size. The underlying representation model needed to change.

## 5.3 From ticket cards to a work-oriented inbox

I explored three patterns:

1. A dense, conservative ticket list.
2. A business inbox oriented around the latest action.
3. A hybrid master list with an inline activity summary.

The strongest direction was a structured list that retained the ticket or business subject as the main identifier while exposing the latest action as a strong secondary element.

A typical item hierarchy became:

1. Business subject or ticket topic.
2. Latest action and its date.
3. Short activity summary.
4. Status, alerts, notes and related TDM indicators.
5. Ticket identifier as secondary metadata.

This avoided making generic activities such as “Outgoing email” or “Incoming call” the only dominant title, since many tickets can share the same activity type.

The result was closer to a professional inbox:

- dense enough for daily work;
- easy to scan;
- ordered by recent activity;
- clear about which ticket is active;
- able to expose delays and alerts without opening every item.

## 5.4 Keeping master-detail interaction

I deliberately preserved the familiar list-left/detail-right model for operational work. Expert users benefit from selecting items quickly while keeping context visible.

More disruptive representations were reserved for:

- a full-width history;
- a secondary timeline view;
- drawers and overlays;
- expanded ticket detail;
- summaries that help users orient themselves.

This balanced innovation with operational continuity.

## 5.5 Timeline as a history, not a compressed ticket list

The timeline was reframed as a way to read the affiliate dossier chronologically rather than as a space-saving replacement for tickets.

The proposed timeline can combine:

- incoming and outgoing calls;
- incoming and outgoing mail;
- face-to-face contacts;
- tickets and TDM events;
- notes;
- documents and iGED/iShare updates;
- system notifications;
- appointments;
- proactive signals;
- front-office and back-office actions.

Events are grouped chronologically and can be filtered by subject, channel, type, period, status or actor.

Each event follows a stable structure:

- event type;
- short title;
- date and time;
- status;
- concise description;
- actor or source;
- related object;
- action to inspect the detail or open the source tool.

The timeline is not necessarily the default work view. It is a complementary “history of the dossier” that helps users reconstruct complex cases.

## 5.6 Related and grouped tickets

Users can lose visibility when tickets are grouped or merged. I explored explicit navigation between related tickets inside the detail area.

Rather than using generic “Ticket 1 / Ticket 2” controls without context, the preferred model identifies them as **Related tickets** and uses short but meaningful labels such as a channel, ticket type or reference.

The design also considers scale:

- segmented navigation for a small number of related tickets;
- a dropdown or dedicated list when several tickets are linked;
- synchronisation between the selected ticket in the detail and the item visible in the master list.

## 5.7 Affiliate status and expert codes

The affiliate summary includes information such as:

- DMG state;
- insurability;
- CT1/CT2 codes;
- contribution state;
- the date until which the affiliate is in order.

An important UX principle was to preserve expert codes when they are useful to experienced employees while adding readable interpretation.

For example, a code such as `121 / 121` should not be presented as a self-explanatory status. The interface can retain the code as a professional reference and supplement it with the corresponding human-readable meaning.

This creates a bridge between:

- experienced users who rely on compact codes;
- occasional or newer users who need an explanation;
- stakeholders who require traceability to the original business data.

## 5.8 Proactivity

The existing proactivity content appeared as a large coloured block inside the ticket area. This mixed two distinct concepts:

- following a contact or ticket;
- responding to a business signal associated with the affiliate.

I moved the concept toward a dedicated drawer that acts as a rapid decision panel.

The drawer is structured around:

1. A compact affiliate-status summary.
2. Active proactive signals.
3. The reason each signal exists.
4. The business context supporting it.
5. The expected action.
6. A result to record.
7. History and related links.

Examples of proactive signal types included:

- incoming or outgoing membership changes;
- mixed-couple situations;
- dependant titularisation;
- no active DMG;
- not in order;
- BIM;
- additional-cover situations;
- transition to invalidity.

### Reframing the action

A generic **Process** button was too ambiguous. It could mean open, acknowledge, qualify, close or launch another action.

The more accurate interaction is to **complete** or **qualify** the signal by recording a meaningful result:

- affiliate informed;
- already covered;
- not interested;
- needs follow-up;
- not relevant;
- refusal;
- another business-specific outcome.

The result is more valuable than a simple “treated” flag because it preserves why and how the signal was resolved.

Similarly, **Postpone** should only be used when the system genuinely creates a future reminder or date. If no such behaviour exists, the interface should not imply it. A more precise label such as **Create a reminder** or **Review later** is preferable after business validation.

This work illustrates a key part of my approach: interaction copy is part of the product model. A button label must communicate the consequence of the action, not merely sound familiar.

## 5.9 System notifications

System notifications were designed as informative evidence, not as processable tickets.

The notification drawer answers:

> What did Solidaris send automatically to this affiliate, when, through which channel, and was it delivered?

Each notification can show:

- channel;
- title;
- date and time;
- business domain;
- delivery status;
- source;
- content preview;
- linked ticket or TDM where relevant.

The available statuses are delivery-oriented, such as sent, failed or unknown. The main action is **View content**, not **Process**.

A side panel or drawer is appropriate because the user may need to consult a notification while keeping the related ticket visible.

## 5.10 iCRM design outcome

The iCRM direction turns a fragmented collection of objects into a structured case-reading experience:

- the latest action is easier to find;
- tickets remain efficient to scan;
- a timeline provides broader historical understanding;
- proactive signals are separated from ordinary tickets;
- system notifications retain their informational meaning;
- expert data is preserved but explained;
- specialist tools remain accessible without being duplicated.

Because the project is ongoing, final performance metrics should only be added after they have been measured and approved.

---

# 6. iShare approach

## 6.1 Product purpose

iShare is not a global task-management dashboard. Its actual usage begins with an affiliate search or with navigation from another application such as D360 or iCRM.

Once an affiliate is open, the employee consults current documents, their details and the related treatment process.

iShare is therefore best understood as:

> A focused consultation and investigation tool that helps an employee read and explain the state of an affiliate dossier.

This clarification changed the redesign direction. The interface did not need a global to-do list. It needed to make the local affiliate situation understandable.

## 6.2 Core UX problem

The existing interface exposed lists and details but required employees to reconstruct the meaning themselves.

Important information could be available but insufficiently prioritised:

- document status;
- reception and treatment dates;
- related workflow;
- current step;
- alerts;
- estimated or expected processing information;
- links to source systems such as IRIS or CICS;
- relationships between documents and business journeys.

The design opportunity was to move from a flat document list toward a coherent reading of the case.

## 6.3 “Understand the dossier in seconds”

The target experience begins with a compact case summary:

- overall state;
- most recent event;
- active or relevant documents;
- any warning or blocking issue;
- current process step.

This summary is not a dashboard for managing all affiliates. It is an orientation layer for the affiliate currently open.

The content below can then be organised into:

- contextualised document groups;
- visible statuses;
- process or workflow representation;
- detailed information on demand;
- links to authoritative systems.

## 6.4 Narrative document structure

Instead of presenting an undifferentiated list, the design groups or orders documents in ways that support interpretation, for example:

- active or in progress;
- completed;
- recent;
- requiring attention.

The objective is not decorative categorisation. It is to make the dossier communicate what changed and what matters.

Selection between the document list and detail area should remain visually explicit through:

- a strong selected state;
- synchronised highlighting;
- clear headings or breadcrumbs;
- stable placement of key metadata;
- visible relation between a document and its workflow.

## 6.5 Making the workflow visible

The workflow is central to understanding a document journey, but it should not be hidden behind secondary interaction.

A typical journey can include:

1. Medical certificate.
2. Information sheets.
3. Calculation.

The employee should be able to identify:

- completed steps;
- current or pending steps;
- the step requiring attention;
- dates and statuses;
- documents related to each step;
- the route to supporting information.

## 6.6 Horizontal versus vertical journey

I evaluated two design models:

### Horizontal, overview-first

This model gives an immediate overview of all steps and their states. It is strong for answering “Where are we in the process?” but becomes constrained when:

- there are more steps;
- labels are long;
- details are extensive;
- navigation controls sit far from the content;
- the layout must scale to narrower widths.

### Vertical, detail-first

This model uses a timeline or accordion structure. It is more natural for:

- reading one step at a time;
- scrolling through detailed content;
- opening and closing sections;
- supporting long journeys;
- showing dates, statuses, warnings and related links.

Its weakness is that the user can lose the overview when an expanded section becomes long.

### Hybrid direction

The strongest direction combines both models:

- a compact horizontal journey summary for orientation;
- a vertical expandable structure for detailed work;
- persistent or clearly visible previous/next navigation.

In simple terms:

- horizontal summary to understand;
- vertical structure to work;
- persistent navigation to move confidently.

This decision was not made on visual preference alone. The alternatives were prepared for task-based comparison.

## 6.7 User testing

The first round revealed issues such as:

- steps not being prominent enough;
- related information requiring stronger visibility;
- navigation buttons not always being noticed;
- trust and clarity concerns around status, timing or links.

The second round was designed to test:

- comprehension of the global journey;
- visibility of the active step;
- recognition of an alert;
- ease of finding a specific date;
- navigation between steps;
- clarity of details;
- trust in the information;
- usability in everyday work.

The test combined observation with five-point scoring. The scoring was always attached to a concrete scenario so that evaluation reflected use rather than aesthetic preference.

## 6.8 Reusable case-management pattern

The iShare work suggested a broader design-system pattern:

### Case overview pattern

- contextual header;
- current-state summary;
- warnings;
- recent activity;
- grouped items or documents;
- workflow or journey;
- detailed view;
- source links.

This pattern could be reused beyond iShare for other Solidaris administrative and healthcare processes.

## 6.9 iShare design outcome

The redesign direction changes iShare from a document-centred interface into a situation-centred reading experience without turning it into a global task manager.

It helps the employee:

- understand the current affiliate dossier;
- see the relationship between documents and process steps;
- recognise progress, pending work and exceptions;
- locate details without losing context;
- explain the situation more confidently;
- reach the source system when specialist action is required.

---

# 7. iGED approach

## 7.1 Product role in the ecosystem

iGED belongs to the document-management and operational-processing side of the Solidaris ecosystem. In the broader experience, it is an authoritative source or work destination for documents that can be surfaced through iShare or referenced from iCRM.

The available project history supports a cross-product approach to iGED more strongly than a claim of a complete standalone iGED redesign. The public portfolio should preserve that distinction unless additional evidence is added.

## 7.2 Experience objective

The main UX objective around iGED was to make document information usable across the ecosystem without erasing the source-system boundary.

Employees need to know:

- whether a document was received;
- where it is in processing;
- whether it was completed, refused or blocked;
- which business subject it belongs to;
- when the last change happened;
- which tool contains the authoritative detail;
- what they can do from the current application.

## 7.3 Cross-application document states

Document states should use shared semantic patterns across iCRM, iShare and iGED:

- neutral or informational;
- in progress;
- completed;
- attention required;
- blocked or failed;
- unavailable or unknown.

Colour alone should never carry the meaning. Status must also be expressed through text, icons and accessible semantics.

The same status vocabulary should not be applied blindly to every product. A delivery notification, a workflow step and a processed document are different objects. Shared visual semantics should support meaning, not flatten business distinctions.

## 7.4 Context-preserving navigation

When a user opens a document in iGED from another application, the transition should preserve as much context as technically possible:

- affiliate;
- selected document;
- originating case or ticket;
- return path;
- relevant business subject.

This reduces the cost of moving between systems and prevents employees from repeating searches.

## 7.5 iGED design contribution to present publicly

Unless more project material is added, frame the iGED contribution as:

- aligning document statuses and source links across the ecosystem;
- designing how iGED events and document states appear in iCRM and iShare;
- improving continuity between consultation and operational processing;
- applying Plectrum and shared interaction principles where iGED interfaces were in scope;
- preserving the distinction between a 360-degree overview and the specialist document-processing tool.

Do not state that the entire iGED product was redesigned or fully implemented unless that can be verified.

---

# 8. Plectrum and the shared application shell

## 8.1 Plectrum as infrastructure

Plectrum is the Solidaris design-system layer built on PrimeNG. Its role is larger than visual consistency. It provides the shared language needed to modernise multiple applications without creating a new set of disconnected custom interfaces.

The work involved applying Plectrum to product redesigns while also identifying where the system needed reusable product patterns rather than only low-level components.

The distinction is important:

- PrimeNG provides the underlying component implementation.
- Plectrum provides Solidaris styling, conventions and approved usage.
- Product patterns combine components into repeatable solutions for Solidaris workflows.
- Application designs apply those patterns to real user tasks.

## 8.2 Shared shell

The shared shell establishes the ecosystem frame:

- first-level navigation for applications;
- second-level navigation for the current application;
- a shared top bar;
- consistent placement of global controls;
- a predictable boundary between ecosystem navigation and product content.

This required rethinking legacy navigation. Existing sidebars, tabs and headers could no longer all behave as competing top-level structures.

My approach was to assign each navigation element a clear responsibility:

- global shell for movement between applications;
- application navigation for major areas inside one product;
- tabs or segmented controls for local content views;
- steps for business-process progression;
- drawers for contextual detail that should not replace the current page.

This prevents navigation from being determined by visual habit alone.

## 8.3 From components to reusable enterprise patterns

The product work identified reusable patterns such as:

- affiliate header;
- case summary;
- latest-activity summary;
- rich master list;
- status badge with accessible semantics;
- workflow journey;
- document tracking;
- related-object navigation;
- proactive-signal drawer;
- system-notification drawer;
- chronological case history;
- source-system link;
- empty, unavailable and error states.

These patterns create more value than wrapping every PrimeNG primitive, because they encode the way Solidaris work is actually performed.

## 8.4 PrimeNG strategy

The preferred architecture is selective rather than wrapping every PrimeNG component.

### Direct use

Simple primitives can remain direct PrimeNG components when Plectrum tokens, guidance and linting provide sufficient control.

### Thin façade

A wrapper is useful when Solidaris needs:

- a smaller approved API;
- standard variants;
- default accessibility behaviour;
- analytics or testing hooks;
- stable styling hooks;
- restrictions on unsafe combinations.

### Composed product pattern

A dedicated Plectrum component or pattern is most valuable for:

- page headers;
- case summaries;
- data-table shells;
- filter bars;
- confirmation flows;
- document journeys;
- affiliate status;
- complex drawers.

This tiered approach avoids creating a maintenance bottleneck every time PrimeNG changes.

## 8.5 AI-ready design-system thinking

The project also informed a forward-looking model for making the design system usable by both people and AI-assisted development tools.

The system should have:

- human-readable documentation and examples;
- a registry of approved components;
- machine-readable component contracts;
- token and semantic mappings;
- accessibility rules;
- allowed and forbidden usage;
- composition guidance;
- a generated index of real codebase usage;
- linting and CI enforcement.

A useful separation is:

- PrimeNG documentation or MCP for upstream library truth;
- Plectrum metadata for Solidaris decisions;
- a repository index for actual implementation;
- automated checks for enforcement.

Contracts should not only describe component properties. They should also express:

- purpose;
- when to use and not use a pattern;
- accessibility expectations;
- allowed composition;
- semantic status behaviour;
- deprecated usage;
- examples and anti-patterns.

This is relevant to the portfolio because it demonstrates that the work extended beyond screen design into scalable UX and implementation architecture.

---

# 9. Accessibility and content principles

Accessibility was treated as an interaction and information concern, not as a final visual audit.

Key principles include:

- never use colour as the only status indicator;
- provide readable labels alongside business codes;
- make focus, selection and active states visible;
- ensure icon-only actions have accessible names;
- use appropriate keyboard behaviour for drawers, tabs, segmented controls, accordions and menus;
- avoid ambiguous action labels;
- support zoom and dense-content readability;
- retain sufficient contrast for statuses and secondary text;
- make loading, empty, unavailable and error states explicit;
- keep alerts noticeable without making every state visually alarming;
- use a stable reading and heading hierarchy;
- avoid hiding essential information behind hover alone.

Content design was used to clarify the system model:

- **View content** for an informational notification;
- **Complete** or **Qualify** for recording a proactive result;
- **Create a reminder** only if a reminder is actually created;
- **Related tickets** for navigation between connected objects;
- human-readable interpretations alongside codes such as CT1/CT2.

---

# 10. Collaboration and decision-making

Because I was the only Cegeka consultant embedded in the Solidaris environment, I had to create alignment directly with client-side stakeholders.

My collaboration approach included:

- using prototypes to make abstract decisions concrete;
- translating business documents into flows and screen behaviour;
- separating confirmed business rules from UX hypotheses;
- identifying questions that required business validation;
- presenting alternatives with explicit trade-offs;
- involving users through scenario-based testing;
- keeping technical feasibility visible in design decisions;
- documenting reusable patterns rather than solving the same problem differently in each app.

Examples of trade-off discussions included:

- overview versus detail in workflow navigation;
- dense operational lists versus visually rich cards;
- timeline as a default view versus a complementary history;
- expert codes versus readable explanations;
- showing cross-system information versus duplicating specialist functionality;
- direct PrimeNG usage versus wrappers and composed Plectrum patterns.

---

# 11. Evidence and outcomes

## 11.1 Evidence already supported by the project history

- Existing iCRM ticket cards and narrow timelines were challenged through alternative representations.
- A richer, latest-activity-oriented ticket list was explored and refined.
- Related-ticket navigation was designed to reduce loss of visibility in grouped cases.
- Affiliate status concepts were made more readable without removing expert codes.
- Proactive signals were separated from ordinary ticket content and reframed around meaningful result capture.
- System notifications were distinguished from processable tickets.
- iShare was correctly reframed as affiliate-focused consultation rather than global task management.
- Horizontal and vertical journey models were compared.
- A second round of iShare testing was prepared with scenarios, observation criteria and five-point evaluation.
- Cross-application patterns were identified for the shared shell and Plectrum.
- A selective PrimeNG governance strategy was considered instead of wrapping every component.

## 11.2 Outcomes that can be stated carefully

The work created:

- clearer design direction for complex affiliate dossiers;
- prototypes that made business and interaction decisions testable;
- a more coherent model for tickets, histories, documents, notifications and proactive signals;
- reusable patterns that can extend across several Solidaris products;
- a stronger bridge between product UX, the application shell and Plectrum;
- a scalable foundation for continued implementation and validation.

## 11.3 Outcomes that must not be invented

Do not claim the following without additional data:

- a specific percentage reduction in task time;
- a quantified reduction in errors;
- a measured increase in adoption;
- a system-wide accessibility certification;
- full implementation across all applications;
- complete redesign ownership of iGED;
- final post-launch satisfaction results;
- revenue or cost savings.

If test scores, implementation status or stakeholder-approved metrics become available, add them later with a date and source.

---

# 12. What this project demonstrates

This case study should position me as someone who can work beyond isolated UI production.

It demonstrates:

- **Enterprise UX:** making complex healthcare and insurance workflows understandable without oversimplifying them.
- **UX architecture:** defining relationships between applications, navigation levels, objects, histories and source systems.
- **Product thinking:** reframing screens around the employee's actual question and task.
- **Research and validation:** using realistic scenarios, observation and structured ratings to evaluate alternatives.
- **Interaction design:** choosing appropriate models for lists, timelines, workflows, drawers and related objects.
- **Content design:** using precise labels to clarify business consequences.
- **Design systems:** turning recurring solutions into reusable Plectrum patterns.
- **UX engineering:** designing with PrimeNG, Angular, component behaviour and implementation constraints in mind.
- **Accessibility:** incorporating semantic states, readable labels, keyboard behaviour and non-colour cues.
- **Stakeholder influence:** making trade-offs visible and guiding user-centred decisions in a complex client environment.
- **Systems thinking:** improving individual products while building coherence across the wider ecosystem.

---

# 13. Suggested public case-study structure

## Hero

**Title**  
Making complex affiliate services easier to understand across the Solidaris application ecosystem

**Subtitle**  
A cross-product UX modernisation covering iCRM, iShare, iGED integration, a shared application shell and the Plectrum design system.

**Metadata**

- Role: UX/UI Consultant, UX Architect and UX Engineer
- Period: October 2025–October 2026
- Context: Cegeka for Solidaris
- Scope: Enterprise UX, information architecture, prototyping, user testing, design systems and front-end alignment

## Chapter 1 — The challenge

Explain how employees had to reconstruct one affiliate's situation across tickets, documents, workflows and specialist systems.

Suggested message:

> The complexity was not contained inside a single interface. It existed in the gaps between applications, objects and business processes.

## Chapter 2 — My approach

Show the process:

1. Understand products and business documentation.
2. Reframe each application around its core user question.
3. Map objects and cross-system relationships.
4. Prototype high-risk interaction decisions.
5. Test with realistic scenarios.
6. Turn validated solutions into shared patterns.

## Chapter 3 — iCRM

Focus on:

- ticket-list redesign;
- latest action;
- complementary timeline;
- related tickets;
- proactive-signal drawer;
- system notifications;
- expert codes and affiliate status.

## Chapter 4 — iShare

Focus on:

- reframing the product as consultation and investigation;
- dossier summary;
- document and workflow relationship;
- horizontal versus vertical journey;
- hybrid pattern;
- two rounds of testing.

## Chapter 5 — iGED and ecosystem continuity

Focus on:

- document states across applications;
- source-system links;
- preserving context;
- overview versus specialist processing.

## Chapter 6 — Plectrum and the shell

Focus on:

- navigation responsibilities;
- reusable enterprise patterns;
- PrimeNG-based implementation;
- selective wrappers;
- design-system governance;
- AI-ready documentation and contracts.

## Chapter 7 — Impact and reflection

Since the work is ongoing, describe the value created so far and the next validation steps.

Suggested reflection:

> The most important shift was moving from application-by-application UI redesign to a shared model for understanding an affiliate case. The shell and design system provided consistency, but the real coherence came from aligning statuses, histories, workflows and source-system transitions around the user's task.

---

# 14. Suggested concise portfolio narrative

Solidaris employees work across several specialised applications to understand and support an affiliate. Contacts, tickets, documents, workflows and system events can be distributed between iCRM, iShare, iGED and other operational tools. My assignment was to modernise these experiences while helping create a more coherent ecosystem through a shared application shell and the Plectrum design system.

I began by reframing each product around its real job. iCRM needed to tell the history of an affiliate relationship and make the latest action visible. iShare was not a global task manager; it was a consultation tool that needed to explain the state of documents and related processes for one affiliate. iGED remained the operational source for document processing, so cross-application views had to provide useful context without duplicating specialist functionality.

For iCRM, I challenged large ticket cards and a space-heavy timeline with a denser business-inbox pattern. The ticket subject remains the primary identifier, while the latest action, status, alerts and related requests become easier to scan. I also separated proactive signals and system notifications from ordinary tickets, because they require different user decisions and status models.

For iShare, I designed the experience around rapid dossier comprehension. I explored horizontal and vertical process journeys, then prepared task-based tests to compare overview, detail readability, alert visibility and navigation. The resulting direction combines a compact journey summary with a scalable vertical detail structure.

Across the work, I translated recurring solutions into reusable Plectrum patterns: affiliate headers, case summaries, status semantics, master-detail lists, workflow journeys, histories and contextual drawers. This connected product design with Angular and PrimeNG implementation while creating a foundation for greater consistency across the Solidaris ecosystem.

---

# 15. Visuals to prepare

The final case study would benefit from anonymised or recreated visuals showing:

1. A simplified ecosystem map:
   - shared shell;
   - iCRM;
   - iShare;
   - iGED;
   - specialist source systems;
   - Plectrum underneath.

2. Before/after iCRM ticket area:
   - large legacy card;
   - rich list or business-inbox item;
   - visible latest activity.

3. iCRM interaction model:
   - master ticket list;
   - selected detail;
   - related tickets;
   - timeline as secondary history.

4. Proactivity drawer:
   - affiliate status summary;
   - reason for signal;
   - expected action;
   - result capture.

5. System-notification drawer:
   - channel;
   - delivery status;
   - content;
   - related object.

6. iShare information architecture:
   - affiliate context;
   - dossier summary;
   - document groups;
   - workflow;
   - detail and source links.

7. iShare A/B comparison:
   - horizontal overview-first journey;
   - vertical detail-first journey;
   - hybrid conclusion.

8. User-testing framework:
   - scenario;
   - observed behaviour;
   - five-point evaluation;
   - design iteration.

9. Plectrum pattern map:
   - PrimeNG primitives;
   - Plectrum foundations;
   - reusable product patterns;
   - application screens.

10. Cross-app navigation:
    - global application level;
    - local application level;
    - content tabs;
    - workflow steps.

---

# 16. Confidentiality and accuracy checklist

Before publishing:

- confirm whether the Solidaris name and product names may be shown;
- confirm whether Plectrum may be named publicly;
- remove real affiliate names, national numbers, phone numbers and email addresses;
- remove real ticket and document identifiers;
- replace screenshots containing production data;
- avoid exposing sensitive healthcare or insurance rules;
- verify which designs were implemented, tested, approved or only proposed;
- label prototype concepts accurately;
- add quantitative results only when they can be sourced;
- verify the exact official title of my role;
- verify whether “October 2025–October 2026” is the correct presentation of the project dates;
- confirm the precise scope of direct iGED work.

---

# 17. Open items to enrich later

The following information was not fully established in the available chat history:

- exact number and roles of user-test participants;
- final scores from each iShare testing round;
- which iCRM and iShare concepts have been implemented in production;
- specific development handoff process and engineering team composition;
- measurable before/after task times;
- precise accessibility audit results;
- full scope of direct iGED interface changes;
- final approved scope of Plectrum contributions;
- stakeholder quotes or testimonials;
- exact tools used for design and prototyping;
- final project outcome after October 2026.

These gaps should be completed with real project evidence rather than assumptions.

---

# 18. Glossary

**Affiliate**  
A Solidaris member whose situation, contacts, documents and healthcare or insurance processes are being consulted.

**iCRM**  
The relationship and case-understanding application bringing together affiliate contacts, tickets, operational requests, notes, proactive signals and related system information.

**iShare**  
An affiliate-focused document and process consultation application used to understand current documents, details, statuses and related journeys.

**iGED**  
A document-management and operational-processing system within the wider Solidaris ecosystem.

**Plectrum**  
The Solidaris design-system layer based on PrimeNG.

**Application shell**  
The shared frame that provides global application navigation, current-application navigation and a common top bar.

**PrimeNG**  
The Angular UI component library used as the implementation foundation for Plectrum.

**TDM**  
An internal operational or business request associated with a ticket or affiliate case. Keep the exact expanded name internal unless officially confirmed for public use.

**DMG**  
A healthcare-related business status displayed in the affiliate context. Spell out the term in public copy only after confirming the preferred Solidaris wording.

**CT1 / CT2**  
Professional insurability codes used by employees. The interface should preserve them while providing readable interpretation.

**Proactivity**  
A business signal detected for an affiliate that may require the employee to verify a situation and record a result.

**System notification**  
An automatically generated message such as an email or SMS. In iCRM it is primarily evidence for consultation, not a ticket to process.

