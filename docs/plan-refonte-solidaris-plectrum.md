# Plan de refonte du case study Solidaris / Plectrum

Date : 4 octobre 2026. Statut : exécution en cours sur `codex/solidaris-plectrum-case-study`. Le texte public est en anglais ; ce plan de travail reste en français.

**Avancement au 5 octobre.** Registre des preuves et première rédaction des huit chapitres réalisés ; trois diagrammes intégrés (modèle global, contrats/index, tokens) ; estimation de lecture ajoutée aux cinq études. La capture affichée de contribution provient de la release 2.1.0 ; le token finder est une prévisualisation locale, clairement légendée, après retrait de la colonne Figma trompeuse. Deux vidéos Playwright sont intégrées : recherche dans le catalogue Storybook (chapitre 04) et dashboard Demo → Reported (chapitre 07), avec posters, lecture volontaire et résumés HTML. Le vrai parcours `/plectrum` dans un éditeur reste à capter ; la vidéo Storybook ne prétend pas le remplacer. Restent notamment : quatrième diagramme de gouvernance, preuve de consommateur installé, revue des autres captures historiques si réutilisées, extraction HTML/prérendu, validation des liens et revue finale. [Guide de tournage](./solidaris-video-capture-guide.md).

## 1. Objectif et direction éditoriale

Faire de Solidaris le case study principal pour des postes de Staff Design Systems Engineer / Design Engineer : montrer comment Daniel a conçu et implémenté un système permettant aux équipes et aux agents IA de travailler à partir des mêmes contrats, de livrer avec des contrôles explicites et de faire remonter des signaux utiles au Core.

La différence doit être comprise dans les vingt premières secondes. Le lecteur doit ensuite pouvoir examiner les décisions, les compromis et les preuves sans parcourir toute la documentation Plectrum.

**Thèse du récit :** j’ai relié les fondations, la connaissance du système, l’assistance IA, la contribution, la distribution et les retours d’usage dans une architecture cohérente. Storybook en est l’interface de référence pour les humains ; le catalogue versionné et les contrats rendent ces mêmes règles exploitables par les agents et les outils.

Le niveau Staff doit ressortir des décisions : frontières de responsabilité, autonomie des équipes, gestion des versions, qualité vérifiable, boucle de retour et capacité de transmission. Éviter les déclarations « Staff-level » dans la page et les promesses de productivité non mesurées.

### Périmètre et attribution

- Daniel a confirmé avoir mené et implémenté lui-même le travail d’ingénierie du système : architecture, repository, Storybook, toutes les fondations, CSS, metadata, deux flux Figma/repository, pipelines, CI, agent et stratégies associées.
- Distinguer cette responsabilité de l’existant : PrimeNG et le kit Plectrum initial étaient déjà choisis. Ne pas attribuer à Daniel l’origine de PrimeNG ou de toute la bibliothèque visuelle héritée.
- La recherche UX et le product design restent présents, environ 10–15 % du récit. Ils expliquent les besoins, les décisions de composition et les critères que l’agent et les contrats doivent préserver.
- Ne pas réécrire rétrospectivement toute la recherche produit comme une validation de l’agent. Les participants, tâches et résultats de ces deux activités sont différents.
- La conversation liée indique une fin de mission le **8 octobre 2026**. Figer les preuves disponibles avant cette date ; l’absence de données d’adoption ultérieures ne doit pas bloquer la publication du case study.
- Le portfolio porte le récit professionnel. Le Storybook client reste un outil de consommation/contribution ; les documents de maintenance et de transmission peuvent vivre dans le repository ou la plateforme interne retenue.

### Périmètre de la future exécution

Refondre le récit Solidaris, ses diagrammes, preuves et métadonnées ; ajouter une estimation de lecture commune aux cinq case studies. Les changements Plectrum, la reconstruction du CV et la publication du portfolio ne sont pas déclenchés par ce plan.

## 2. Sources examinées et état de référence

Les chemins préfixés `P/` désignent `C:/Projects/portfolio/`. Ceux préfixés `S/` désignent `C:/Projects/solidaris-nx/`. Ces préfixes sont des repères documentaires, pas des chemins à copier dans les imports.

| Source | État consulté | Utilisation et limites |
| --- | --- | --- |
| Portfolio local | Commit `a80d230` ; récits, template commun, diagrammes et SEO | Base de cohérence visuelle et éditoriale. Le récit Solidaris reflète encore plusieurs états de septembre. |
| Plectrum local | Commit `f59d9c3`, 4 octobre, ajout du dashboard Core | Inspection des sources, sans modification du dépôt. Le checkout contient aussi des modifications locales : un fichier présent n’est pas nécessairement une preuve publiée. |
| Release GitHub | `plectrum-v2.1.0-devkit-0.7.2`, publiée le 4 octobre ; manifeste lu via GitHub CLI | Existence de la release, packages, contrats et documentation associés. Révision publiée `d9728941ea4e9971bcdb160760716d8d53bd7375`. |
| Conversation « Évaluer le Storybook pour un poste » | `codex://threads/01a103be-171e-7923-86af-7d6367ad259d` | La revue a finalement conclu à un entretien Staff en Design Systems Engineering, en distinguant architecture et impact externe non encore établi. Elle rapporte aussi un smoke test d’installation depuis le registre. |
| Site public | URLs Storybook et dashboard identifiées | L’outil web n’a pas pu charger leur contenu pendant cette préparation. La vérification visuelle du déploiement reste dans le lot de captures. |

Références : [release 2.1.0 / devkit 0.7.2](https://github.com/solidaris-danielbodigil/solidaris-plectrum/releases/tag/plectrum-v2.1.0-devkit-0.7.2), [Storybook de cette release](https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/), [dashboard Core](https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/).

Le manifeste confirme `pds-ui`, `pds-plectrum`, `pds-styles` en `2.1.0`, le toolkit `pds-devkit` en `0.7.2`, les plages de compatibilité et le snapshot de contrats avec checksum. La publication utilise GitHub Packages ; l’installation des packages privés nécessite un accès autorisé. Un recruteur doit comprendre les preuves publiques sans cet accès.

### Inventaire des preuves

| Sujet | Sources principales dans `S/` | Affirmation possible | Limite à conserver |
| --- | --- | --- | --- |
| Agent `/plectrum` | `libs/ui/src/docs/use-the-agent.mdx`, `tools/devkit/README.md`, `.ai/agents/` | Conseiller à partir d’un besoin, chercher avant de créer, réutiliser/composer, proposer un composant local, orienter vers les spécialistes. | Une capacité outillée ne prouve pas une adoption quotidienne par une équipe indépendante. |
| Stratégie IA et MCP | `libs/ui/src/docs/ai-strategy.mdx`, `.ai/contracts/process.json`, `tools/devkit/src/mcp.mjs`, `tools/devkit/src/mcp-server.mjs` | Catalogue MCP local lié à la version installée ; compléments PrimeNG, Figma et Storybook ; règles et revue communes aux humains et aux agents. | Connexions, accès Figma et serveurs locaux ont des prérequis. Tous les MCP ne sont pas hors ligne. |
| CDD | `.ai/contracts/README.md`, `.ai/contracts/schema/`, `process.json`, `registry.json`, `workspace.json`, `compatibility.json`, `.ai/contracts/protocols/`, `tools/contracts/` | Contrats structurés, schémas, génération, procédures, contrôles de dérive et distribution portable de la connaissance. | CDD signifie ici **Contract-Driven Development**, à distinguer de Component-Driven Development. Les JSON de cette ligne sont sous `.ai/contracts/`. |
| Gouvernance Core / Teams | `.ai/contracts/registry.json`, `.ai/contracts/process.json`, `.ai/decisions/2026-09-25-pipeline-contracts-and-distribution.md`, `libs/ui/src/docs/get-started-contribute.mdx` | Livraison locale autonome ; décision Core pour le partage ; identités stables, preuves de promotion et frontières de packaging. | Promotion, publication et adoption sont trois événements distincts. Un rôle déclaré dans un JSON ne vaut pas autorisation. |
| Onboarding | `tools/consumers/starter/README.md`, `tools/devkit/README.md`, `tools/devkit/src/bootstrap.mjs`, `libs/ui/src/docs/get-started-consume.mdx` | Starter, bootstrap idempotent, styles ITCSS, Storybook/tests, agents/adaptateurs, hook et CI ; update signalant les conflits. | Installation technique testée et onboarding autonome d’une vraie équipe sont deux preuves différentes. |
| Fondations et CSS | `libs/styles/src/`, `.ai/rules/10-css-ssot.md`, `libs/ui/src/docs/`, pages Foundations | Valeurs inspectables depuis le CSS compilé, tokens sémantiques, playgrounds, API `--pds-*`, séparation layout/composant. | CSS fait référence pour les valeurs rendues ; Figma garde son rôle pour les décisions visuelles. |
| Figma ↔ repository | `libs/ui/src/docs/token-pipeline-figma.mdx`, `.github/workflows/tokens-sync.yml`, `tools/tokens/`, `tools/figma-plugin/` | Import via staging, audit, rapport et PR ; propositions sortantes via agent/MCP ou plugin ; revue designer et publication explicites. | Les scripts REST Variables soumis à Enterprise sont distincts du chemin agent/plugin. Le cycle externe complet demande sa propre preuve. |
| CI et livraison | `.github/workflows/ci.yml`, `tools/packaging/`, `tools/devkit/README.md` | Dérive tokens/contrats, API metadata, docs, candidatures/rapports, tests, Storybook contre packages et application de smoke test. | Distinguer blocage, avertissement et job conditionnel : preset advisory ; Chromatic activé par configuration. |
| Télémétrie de l’agent | `tools/devkit/src/telemetry.mjs`, `libs/ui/src/docs/use-the-agent.mdx`, `.ai/contracts/process.json` | Événements locaux MCP/CLI, recherches vides, IDs de composants, trailers de commits, agrégats par application et fenêtre de temps. | Pas de prompt, code ou nom de fichier source collecté. Collecte locale et partage des rapports ont des réglages distincts. |
| Adoption | `libs/ui/src/storybook/adoption-data.generated.ts`, `.ai/contracts/registry.json`, `docs/handoff/p9-acceptance.md` | Origine, fraîcheur et couverture explicites ; rapports soumis par PR revue. | Snapshot local : trois applications `local-demo`, aucun rapport externe fusionné ; absence de rapport = inconnu, pas zéro usage. |
| Dashboard et recommandations | `.ai/decisions/2026-10-03-core-dashboard.md`, `libs/insights/`, `tools/insights/`, `apps/dashboard/src/app/design-system/` | Faits générés depuis le dépôt, moteur de règles pur, historique si disponible, priorisation explicable pour Core. | Recommandations par règles, pas analyse LLM ; Demo séparé de Reported ; pas un dashboard temps réel. |
| Évaluation de recherche | `tools/devkit/evals/search.json`, `libs/ui/src/storybook/agent-eval.generated.ts` | Non-régression sur des formulations de tâches ; échecs connus visibles. | Snapshot local toolkit 0.7.1 : 16/17, dont un cas connu en échec. Ce n’est ni une réussite utilisateur ni une mesure générale de l’agent. |
| Recherche et produit | `.ai/research/`, `docs/user-testing/ishare-moderated-test-protocol.md`, artefacts du portfolio | Besoins, contraintes métier, états et compositions que le système doit permettre. | Un protocole rédigé ou une session exécutée par un agent ne constitue pas un test utilisateur indépendant. |
| Transmission | `docs/handoff/maintainer-pack.md`, `docs/handoff/p9-acceptance.md`, `docs/handoff/migration-ledger.md`, `docs/handoff/pipeline-recovery.md` | Runbooks, récupération, parcours d’acceptation, séparation documentation consommateur / maintenance. | Plusieurs propriétaires/validations restent non renseignés ; certains paragraphes sont anciens. Documents présents ne signifie pas remise acceptée. |

### Corrections obligatoires du récit actuel

1. Remplacer « packages pre-release » et « first registry publication still to demonstrate » par l’état de publication vérifié et daté.
2. Réviser le retour vers Figma : l’alternative agent/MCP ou plugin existe ; éviter « tout le retour est bloqué par la licence ».
3. Réviser « MCP test tool is not wired » : le contrat expose maintenant `test-run` via l’addon Vitest, comme feedback local ; la CI garde son test runner. Vérifier ce chemin avant de le montrer comme exécuté.
4. Faire apparaître le devkit installé, ses versions et le catalogue MCP, au-delà de l’ancien diagramme de délégation dans le monorepo.
5. Passer des seuls badges Core/Candidate/App au parcours de décision et à ses conséquences sur la livraison.
6. Introduire télémétrie et dashboard avec leur provenance. Ne pas copier les valeurs Demo dans les résultats du projet.
7. Réduire les trois récits produit à une preuve choisie et des références secondaires.
8. Actualiser le handoff selon la date de publication du portfolio : préparation avant le 8 octobre ; ensuite, seulement ce qui a effectivement été transmis et accepté.

## 3. Trois profondeurs de lecture

| Temps disponible | Compréhension attendue | Supports |
| --- | --- | --- |
| 20 secondes | Daniel a mené et implémenté une architecture pour la livraison assistée par IA, au-delà d’un catalogue. | H1, introduction, rôle, état de livraison, aperçu réel de l’agent, trois accès aux preuves. |
| 90 secondes | Contrats, autonomie des équipes, contrôles et retours Core fonctionnent ensemble. | Diagramme global, H2, quatre décisions/compromis, résultats et limite d’adoption. |
| 10–12 minutes | Pourquoi ces frontières techniques et organisationnelles sont pertinentes, et ce qui a été vérifié. | Récit complet, figures ciblées, preuves légendées, deux vidéos facultatives, sources. |

Chaque capacité répond à un problème, montre une décision et conduit à une preuve. Éviter l’inventaire de fonctionnalités et la copie des docs client.

### Proposition de premier écran — copy publique en anglais

Titre de travail :

> Building an AI-first design system teams can own

Introduction proposée :

> I led and implemented Plectrum’s design-system engineering for Solidaris: its Storybook, foundations, token pipelines, contracts, developer toolkit and AI agent. I designed the agent to work from the same versioned component and process contracts as developers, with clear boundaries between local delivery and Core ownership. A separate dashboard brings usage reports and repository signals back to Core. This case follows the decisions behind that architecture, the checks that make it inspectable, and the evidence available at handoff.

Quatre faits maximum, dans le `DefinitionStrip` existant :

- **Role** — Sole lead and implementer · design-system engineering.
- **Scope** — AI-assisted delivery, foundations and contribution architecture.
- **Built on** — Angular, PrimeNG and the existing Plectrum design foundation.
- **Released** — Plectrum 2.1.0 · developer toolkit 0.7.2 · October 2026.

Trois raccourcis : **Agent workflow**, **Contracts & governance**, **Core dashboard**. Conserver les composants de liens existants et la flèche inclinée des liens de source.

Visuel d’ouverture : une capture lisible de l’agent avec recommandation et référence, ou le poster de la première vidéo. Pas de mosaïque de six écrans, de grand bloc de code ou de réponse IA fictive. Si la capture manque, commencer avec le diagramme global ; ne pas bloquer la rédaction.

## 4. Structure du récit : huit chapitres maximum

Suivre les chapitres par les résultats et la réflexion déjà prévus dans le template. Les titres ci-dessous sont des propositions de copy publique.

| N° | Titre / question | Contenu et preuve prioritaires | Budget de prose |
| --- | --- | --- | --- |
| 01 | **Start with the need, then ask Plectrum** — Pourquoi un agent ? | Contexte en 60–80 mots, découverte/composition, ownership, parcours réel. Vidéo A et diagramme global. | 180–210 mots |
| 02 | **One contract, several interfaces** — Comment éviter des vérités parallèles ? | Metadata, schémas, processus, protocoles, index, snapshot installé et MCP. Un changement contractuel et ses sorties. | 180–200 |
| 03 | **Local delivery, deliberate sharing** — Qui décide quoi ? | Autonomie Teams, partage, décision Core, preuves, distribution, migration, identité stable. Diagramme de responsabilités. | 180–200 |
| 04 | **Make the system portable** — Comment commencer et rester à jour ? | Starter, bootstrap, catalogue de la version installée, diagnostic MCP, contrôles locaux, update/conflits. | 140–170 |
| 05 | **Keep design and code connected** — Comment rendre les décisions visuelles utilisables ? | Deux flux Figma/repository, frontières CSS/metadata, tokens sémantiques, ITCSS/BEMIT, foundations. Un besoin produit concret. | 220–250 |
| 06 | **Make quality executable** — Qu’est-ce qui évite de livrer une proposition incorrecte ? | Stories comme spécifications, règles humain/agent, familles de CI, évaluation de recherche et limite connue. | 160–190 |
| 07 | **Turn usage signals into Core decisions** — Comment choisir quoi améliorer ? | Télémétrie locale, agrégats, fraîcheur/couverture, moteur de règles, dashboard séparé de Storybook. Vidéo B. | 220–250 |
| 08 | **Leave a system others can operate** — Qu’est-ce qui reste après mon départ ? | Release, docs par public, runbooks, ownership, acceptation et limites au 8 octobre. | 140–170 |

Avec introduction, résultats et réflexion : environ **1 700–1 900 mots de prose**, puis **2 200–2 500 mots visibles** avec faits, décisions et légendes. Ce sont des plafonds de conception, pas une obligation de remplissage. Au-delà de douze minutes estimées, supprimer répétitions et détails déjà couverts par une source liée.

### 01 — Agent et intention

- Ouvrir sur le besoin humain : retrouver la bonne combinaison, respecter les règles et savoir quand créer localement. Expliquer pourquoi la recherche par nom de composant ne suffit pas.
- Présenter `/plectrum` comme accès à la connaissance et aux procédures ; les décisions importantes restent revues par des personnes.
- Dérouler : besoin → recherche → recommandation avec référence/version → état ou règle à respecter → étape d’implémentation.
- Choisir une tâche de la suite d’évaluation : copier une référence ou gérer une liste vide/en chargement. Le panneau de membre a un échec connu sur `DetailList` au snapshot local : ne pas masquer ce résultat dans le montage.
- Montrer l’alternative en cas de manque : composant local puis éventuelle proposition au Core. Tout besoin produit ne doit pas devenir une demande centrale.
- Laisser les agents spécialistes au second niveau : une phrase et une référence. La valeur principale est le contrat commun et la qualité de la décision, pas le nombre de rôles IA.

### 02 — CDD et connaissance versionnée

Définir Contract-Driven Development une fois, puis utiliser « contracts ». Partir d’un exemple : un fait de composant évolue dans sa metadata ; les vues générées et le catalogue se mettent à jour ; un contrôle détecte une copie incohérente.

Responsabilités à rendre explicites :

- Metadata : identité, usage, API documentée, gouvernance et distribution.
- Schémas : structure autorisée. Protocoles/règles : procédure. `process.json` : commandes, contextes, transitions et contrôles. `registry.json` : équipes et applications.
- Génération : index, documentation dérivée, exports éligibles, catalogue et assets du devkit. Ne pas prétendre que toute la prose MDX est générée.
- Distribution : toolkit versionné, plages de compatibilité, snapshot immuable et docs correspondantes.
- Trois index : inventaire source central, snapshot de release, index runtime Storybook. L’index local d’une application les complète.

Les MCP se comprennent par la question à laquelle ils répondent :

| MCP | Question | Frontière |
| --- | --- | --- |
| Plectrum | Qu’existe-t-il dans la version utilisée et comment travailler avec ? | Catalogue local du package installé, utilisable hors ligne. |
| PrimeNG | Que fournit le contrôle sous-jacent et quelle est son API ? | Documentation fournisseur, accès réseau. |
| Figma | Quelles décisions visuelles et propositions sont disponibles ? | Accès au fichier et permissions ; écritures sur le chemin revu. |
| Storybook | Comment se comporte le composant dans les stories de cette application ? | Instance locale démarrée, previews et feedback de test local. |

Ne pas employer « entraînement du modèle », « RAG » ou « agent autonome » sans implémentation et preuve correspondantes. La valeur démontrée vient des contrats distribués, outils de découverte, règles et procédures.

### 03 — Gouvernance qui permet de livrer

Montrer deux parcours :

1. **Local** : l’équipe réutilise ou crée, documente, teste et livre sans approbation Core systématique.
2. **Partagé** : proposition → décision Core → candidature avec commit/preview/preuves → revue et intégration → release → mise à jour du consommateur et remplacement de la copie locale.

Faire apparaître identité stable et liens de remplacement. Expliquer les frontières concrètes : Candidate exclu des exports runtime Core, styles de preview isolés, patterns applicatifs à leur emplacement explicite. Éviter la liste exhaustive des états du protocole.

Décision centrale : préserver l’autonomie sans laisser « visible dans Storybook » signifier « partagé et supporté par Core ». Montrer où l’ownership change et qui accepte ce changement.

### 04 — Onboarding portable

Raconter le parcours depuis un repository consommateur : accès aux packages → starter → identité d’application → installation/bootstrap → Storybook et agent → première vérification → mise à jour du toolkit.

Nommer les sorties réelles du bootstrap : couches SCSS locales, cibles Angular/Storybook/tests, agents/règles/protocoles, adaptateurs éditeur, hook rapide et job CI. `plectrum update` signale un fichier géré modifié plutôt que de l’écraser.

Compromis : accès au registre, correspondance secrets/branch protections et installation du navigateur de test restent dépendants du contexte d’équipe. `plectrum check --profile ci` vérifie statiquement contrats et fichiers ; il ne remplace pas builds et tests comportementaux.

Preuve : installation des packages publiés dans un consommateur propre avec version et résultat. Ne pas appeler cela « déploiement dans trois équipes ».

### 05 — Fondations et aller-retour Figma

Conserver les points forts : toutes les fondations et playgrounds, CSS compilé inspectable, token finder sémantique, ITCSS/BEMIT et contrat CSS consommable. Relier chaque élément à une responsabilité, sans catalogue exhaustif de couleurs/spacing/typographie.

Le diagramme distingue Figma comme référence visuelle, import/validation, CSS comme référence des valeurs rendues, metadata comme référence des faits de composant et packages consommés par les applications.

Flux entrant : plugin → staging → build/audit → rapport → PR revue → artefacts consommables. Flux sortant : besoin de token côté code → proposition → branche/collection via agent ou plugin → revue designer → merge/publication → retour contrôlé. Ne pas représenter un aller-retour sans intervention humaine.

Intégrer **un encadré produit de 80–100 mots**, inclus dans le budget : contrainte issue d’iSHARE/iCRM → choix de composition → états nécessaires → traduction dans règles/stories/contrats consultables par l’agent. Utiliser une preuve datée ; ne pas inventer une causalité historique si elle n’est pas documentée. iGED reste un lien secondaire si son brouillon n’ajoute pas de décision.

### 06 — Qualité et évaluation

Regrouper les contrôles par problème évité :

- **Cohérence** : dérive tokens, contrats générés, documentation et props Angular.
- **Comportement** : tests unitaires, stories/interactions, accessibilité et navigation.
- **Distribution** : tarballs dans un consommateur séparé, Storybook contre packages, manifeste de release.
- **Contribution** : transitions, preuves/identité, entrées externes JSON validées.

Montrer un exemple « échec → cause compréhensible → correction → passage ». Sans incident historique exploitable, légender explicitement le scénario contrôlé comme démonstration.

L’évaluation de recherche vérifie la qualité du catalogue. Utiliser 16/17 seulement avec version, date, périmètre et échec connu ; recalculer sur le snapshot choisi avant publication. Aucun pourcentage héro présenté comme précision générale de l’IA.

Nommer les limites : job configuré ne signifie pas exécuté ; preset advisory dans la CI principale ; Chromatic conditionnel. Un contrôle a11y automatisé n’est pas une certification d’accessibilité.

### 07 — Télémétrie et décisions Core

Illustrer la boucle avec une décision plausible, légendée comme scénario tant qu’elle n’est pas observée dans une équipe externe : recherches sans résultat ou composants locaux similaires → investigation → décision Core. Pas de promotion automatique.

Séparer quatre preuves :

1. **Repository** : inventaire, historique, versions, pipeline, propositions.
2. **Usage déclaré** : rapports revus, origine, fraîcheur et couverture.
3. **Évaluation contrôlée** : suite de tâches de recherche connue.
4. **Démonstration** : données synthétiques isolées pour montrer vues et règles.

La télémétrie locale enregistre outils, outcomes et IDs, puis agrège sur trente jours. Elle est désactivable. Le partage dépend séparément de `reporting.enabled` et d’un rapport revu. Les trailers de commits signalent une assistance déclarée, pas un gain de temps causal. Ne pas confondre cette instrumentation avec celle des tests UX d’iSHARE.

Expliquer le dashboard séparé : Storybook sert une documentation consommateur versionnée ; Core examine fraîcheur, écarts et suites à donner. Les faits sont générés au build depuis checkout/historique, leur âge est évalué à l’ouverture. Ce n’est pas un flux de production temps réel.

Montrer **Demo / Reported**. Les seeds ne sont ni rapports clients ni adoption vérifiée. Sans couverture fraîche, on ne peut conclure qu’un composant est inutilisé. Le moteur déterministe et inspectable est lui-même un choix d’architecture à valoriser.

### 08 — Transmission et résultats

Terminer sur ce qui permet d’opérer après le départ : release immuable, documentation associée, parcours consommateur, runbooks de récupération, connaissances transférables, responsabilités et validations restantes.

Trois résultats maximum :

- **Released** : packages, toolkit, contrats et documentation de release disponibles et reliés.
- **Implemented** : agent, gouvernance outillée, fondations et dashboard, avec preuves représentatives.
- **Still to validate** : premier parcours autonome d’équipe externe et rapports associés, candidature acceptée de bout en bout, effet sur le travail dans la durée.

La réflexion conserve une décision à refaire, un compromis à changer et un prochain test utile. Les propriétaires ou acceptations non confirmés restent visibles dans le dossier de preuve ; la page en résume la conséquence sans copier tout le registre.

## 5. Diagrammes : quatre maximum, grammaire commune

Réutiliser `P/src/ui/components/story/diagrams/SystemDiagramFrame.tsx` et son registry. Construire en HTML/SVG/CSS avec texte dans le DOM, responsif et accessible. Ne pas placer l’explication uniquement dans une image.

| Diagramme | Placement et contenu | Action envisagée dans `P/` |
| --- | --- | --- |
| Fonctionnement global | Chapitre 01. Besoin → agent + contrats → réutilisation/création locale → contrôles/livraison → rapports → décisions Core → nouvelle version. Revue humaine et reporting optionnel identifiés. | Créer `src/ui/components/story/diagrams/PlectrumOperatingModelDiagram.tsx`. |
| Un contrat, plusieurs interfaces | Chapitre 02. Sources typées → génération/validation → Storybook, CLI, catalogue MCP, snapshot distribué. Connaissance locale installée et compléments externes distincts. | Refaire `ContractsIndexDiagram.tsx` dans le même dossier, conserver son ID si possible. |
| Équipe et Core | Chapitre 03. Deux couloirs et une intervention designer : livraison locale autonome ; passage au partagé avec décision, preuves, intégration, release. | Créer `src/ui/components/story/diagrams/PlectrumGovernanceDiagram.tsx`. |
| Décisions visuelles vers contrat livré | Chapitre 05. Entrée Figma, compilation/CSS, proposition sortante et revue. Fichiers Figma tokens PrimeNG 21 et Custom components distingués. | Actualiser `TokenArchitectureDiagram.tsx` dans le même dossier. |

Cinq à sept étapes principales par figure, labels courts, phrase d’explication, légende, version/provenance. Aucun nombre d’adoption dans les schémas. Garder le violet des relations principales et l’ambre pointillé des revues/limites, toujours accompagnés de texte.

Mobile : étapes verticales, pas de poster technique miniature ni de scroll horizontal obligatoire. Animation facultative ; tout doit rester compréhensible sans mouvement et avec `prefers-reduced-motion`.

Les anciens `P/src/ui/components/story/AgentDelegationWorkflow.tsx` et `P/src/ui/components/story/diagrams/HandoffDiagram.tsx` ne doivent pas ajouter deux figures redondantes. Retirer leur usage sur cette page si couvert, sans supprimer un composant utilisé ailleurs. Le handoff peut être mieux prouvé par un résultat et un document.

## 6. Captures et vidéos

**Deux vidéos courtes sont intégrées.** La découverte Storybook (04) montre le catalogue et la documentation ; le dashboard (07) montre un signal de démonstration, sa source et l’état réellement rapporté. Le véritable parcours agent ci-dessous reste un ajout à enregistrer dans un éditeur autorisé. Une vidéo sur les tokens est facultative. Le texte reste complet sans lecture vidéo.

### Vidéo A — Du besoin à une réponse exploitable · 25–35 secondes

Chapitre 01. Fichiers proposés : `P/public/videos/solidaris-agent-workflow.mp4` et `P/public/screenshots/solidaris/agent-workflow-poster.webp`.

1. 0–4 s : besoin simple dans `/plectrum`, application et version identifiables.
2. 4–14 s : recherche réelle, recommandation avec nom/ID et raison de réutiliser.
3. 14–24 s : inspection du contrat ou ouverture de la story ; une contrainte/état concret visible.
4. 24–35 s : résultat utile, par exemple composition affichée et contrôle exécuté. Si trop de montage est nécessaire, terminer sur la référence vérifiable et montrer le résultat dans une capture suivante.

Ne pas tenter de condenser recherche, génération complète, build, tests, publication et retour d’usage. Signaler les coupes/accélérations éventuelles. Ne pas déduire un temps de développement de la durée du clip.

### Vidéo B — D’un signal à une décision Core · 25–35 secondes

Chapitre 07. Capturé le 5 octobre : `P/public/videos/solidaris-core-insights.mp4` et `P/public/screenshots/solidaris/core-insights-poster.png`.

1. 0–5 s : dashboard, mode **Demo** et avertissement lisibles.
2. 5–15 s : signal choisi, par exemple recherches vides ou similarité de composants locaux, avec provenance.
3. 15–25 s : recommandation, règle/raison et suivi proposé.
4. 25–35 s : mode **Reported**, couverture/missing/freshness ; montrer l’état disponible lors de la capture.

Légende de principe : « Recorded from the Core dashboard using its labelled demo dataset. External adoption reports were not yet available at this snapshot. » L’actualiser si la situation change.

### Vidéo C — Un changement de token traçable · optionnelle, 15–25 secondes

Seulement si elle apporte une décision que diagramme et rapport ne suffisent pas à expliquer. Choisir staging → audit → PR, ou proposition vers Figma avec revue. Ne pas simuler un cycle externe complet non vérifié.

`P/public/videos/solidaris-typography.mp4`, onze secondes, date du 10 septembre. Garder éventuellement cette preuve du playground si elle est représentative, mais elle ne doit plus être la démonstration principale. Éviter de cumuler les deux vidéos prioritaires, la vidéo tokens et la typographie dans le parcours principal.

### Captures fixes

| Priorité | Capture | Intérêt et traitement |
| --- | --- | --- |
| P0 | Réponse agent avec référence/version | Compréhensible avant même la vidéo A ; peut être son poster. |
| P0 | Signal dashboard et sa source | Mode Demo/Reported et fraîcheur ; pas de grand chiffre sans contexte. |
| P0 | Consommateur installé / vérification | Versions et résultat lisibles ; pas cinquante lignes de terminal. |
| P1 | Contrat et sorties | Petit extrait réel et effet doc/catalogue ; argument également en HTML. |
| P1 | Token finder/foundation | Rôle sémantique concret ; recapture si l’ancienne version a changé. |
| P1 | Rapport de sync ou contrôle choisi | Cause/résultat, pas badge vert isolé. |
| P1 | Exemple produit iSHARE/iCRM | Un seul visuel contextualisé ; prototype étiqueté Prototype. |

Les posters couvrent déjà les deux premières preuves. Viser quatre à six captures/posters au total ; ne pas transformer chaque ligne de l’inventaire en écran supplémentaire.

### Capture et présentation

- Enregistrer l’outil réel, sans UI générée ni réponse fictive. Utiliser des données de démonstration ; cadrer hors secrets, identifiants personnels et dossiers de santé réels.
- Pour chaque média : date, source, commit/version, scénario, mode de données, conclusion permise et limite. Identifier les diagrammes redessinés comme tels.
- Recapturer les preuves de septembre devenues contradictoires. Ne pas mélanger preview actuelle et légende de release immuable.
- Poster lisible, contrôles clavier, lecture volontaire et pause disponible. Le mode `playOnScroll: false` a été ajouté à `StoryVideo` pour ces deux clips ; les autres pages gardent leur comportement existant.
- Résumé/transcript HTML de deux à quatre étapes. Avec narration, fournir des sous-titres. Aucune information essentielle ne dépend du son.
- Chargement différé, posters optimisés, `preload="none"` sous la ligne de flottaison ; pas de téléchargement de tous les MP4 au premier affichage.
- Cible indicative : 3–6 Mo par clip de trente secondes si les textes restent lisibles. Vérifier visuellement ; pas de compression qui détruit la preuve ni de lecteur lourd supplémentaire.
- Vérifier à 375 px : capturer une zone utile et permettre l’agrandissement si l’interface complète devient trop petite.
- Ne pas intégrer de gros fichiers masters au bundle public.

## 7. Cohérence et temps de lecture

### Préserver le système visuel existant

- `VisualCaseStudyTemplate`, typographie, fond/couleurs, chapitres numérotés, sommaire et `TextLink`.
- Colonne `max-w-[46rem]` pour titres/texte/décisions, médias à la largeur disponible. Ne pas élargir les paragraphes pour réduire artificiellement la hauteur.
- Première personne, phrases actives, anglais cohérent avec Bridgestone. Définir les acronymes à leur première occurrence.
- `Constraint / Choice / Trade-off` aux quatre décisions importantes : contrats, gouvernance, pipelines, mesure. Pas huit triplets répétant la prose.
- `My part` seulement lorsqu’il précise l’ownership ; pas « I did everything » sous chaque figure.
- Limites à proximité de l’affirmation concernée. Une réserve finale ne corrige pas une donnée Demo présentée comme réelle au début.

### Mesure du contenu actuel

Comptage exploratoire : prose, faits, décisions et légendes avec HTML retiré. Les textes internes des diagrammes, contrôles et liens ne sont pas tous inclus ; comparaison indicative, pas promesse de durée exacte.

| Case study | Chapitres | Mots approximatifs | Arrondi à 220 mots/minute |
| --- | --- | --- | --- |
| Bridgestone | 6 | 1 691 | 8 min |
| Solidaris actuel | 9 | 2 095 | 10 min |
| Trasis | 5 | 590 | 3 min |
| Sopra | 3 | 745 | 4 min |
| Base | 3 | 592 | 3 min |

### Estimation commune aux cinq case studies

1. Créer un helper partagé, fichier proposé `P/src/utils/storyReadingTime.ts`, depuis `VisualStory` et les preuves réellement affichées. Pas cinq valeurs manuelles.
2. Compter titre, introduction, faits, chapitres, décisions, séquences, légendes, résultats, limite et réflexion. Exclure URLs, HTML, code non affiché, navigation répétée et `alt` redondant avec la légende.
3. Pour `system-evidence` et diagrammes, compter les données textuelles affichées lorsqu’elles sont accessibles ; sinon retenir la légende explicative et documenter l’approximation. Ne pas dupliquer tout le contenu des diagrammes uniquement pour le compteur.
4. Règle simple et identique : `max(1, ceil(wordCount / 220))`. Pas d’ajustement arbitraire selon le projet ni de précision à la seconde.
5. Afficher **“About 11 min read”**, valeur calculée, sous l’introduction avant les faits, dans le template commun. Séparer les vidéos : **“2 short demos · 60 sec total”**, avec leurs durées réelles ; ne pas les inclure automatiquement dans la lecture facultative.
6. Vérifier les cinq routes, la discrétion du label et le recalcul après modification du récit. Prévoir histoire courte et média sans légende.

Solidaris vise 10–12 minutes. « Le plus complet » signifie une chaîne de décisions mieux couverte et mieux prouvée, pas un texte beaucoup plus long que les autres.

## 8. Recruteurs et lecture automatisée

Un humain doit comprendre l’intérêt rapidement ; un extracteur doit récupérer le fond sans vidéo ni interaction. Aucun choix éditorial ne garantit le passage d’un filtre de candidature ; certains outils ne visiteront pas le portfolio.

### Contenu explicite

- Utiliser naturellement **Design Systems Engineering**, **AI-assisted development**, **Contract-Driven Development**, **Model Context Protocol**, **governance**, **telemetry**, **Storybook**, **design tokens**, **CI/CD**. Expliquer leur rôle, sans empiler tous les mots-clés dans l’introduction.
- Auteur, rôle, client, dates, contraintes et résultats en texte. « I » pour Daniel ; Core/Teams pour leurs décisions respectives.
- Associer technique et conséquence : version installée pour éviter un conseil incompatible ; contrats pour éviter les copies divergentes ; rapports pour éclairer une décision.
- Ne pas cacher le résumé dans une vidéo, image, canvas, accordéon ou révélation qui dépend du scroll.
- Prévoir une synthèse de trois lignes réutilisable dans carte projet/parcours de rôle et, séparément, CV. Même responsabilité, mêmes dates et résultats.

### Accès technique au récit

Constat local : `P/index.html` contient un root React vide et un JSON-LD `Person`. `P/src/hooks/useSeo.ts` met les métadonnées à jour dans `useEffect`. Pas de prérendu configuré dans `P/vite.config.ts`. Le texte de route dépend donc de JavaScript dans cette configuration.

Travail prévu :

1. Vérifier HTML brut réellement servi pour les cinq routes et rendu sans JavaScript sur l’hébergement cible. Ne pas confondre DOM après rendu et réponse HTTP initiale.
2. Si le récit est absent, ajouter un prérendu à la construction depuis les mêmes données/composants. Pas de copy SEO cachée, de texte parallèle ou de migration complète de framework uniquement pour ce besoin.
3. Produire titre, description, canonical et image sociale par route. Conserver Person ; `CreativeWork` lié à l’auteur est possible si les champs décrivent le contenu visible. Ne pas inventer rôle/résultat dans les données structurées.
4. Vérifier réponses 200, liens profonds, assets, fallback, `P/public/robots.txt`, `P/public/sitemap.xml` et accès direct à chaque page.
5. Un H1 et des H2 ordonnés ; résumés des diagrammes/vidéos en HTML normal ; contenu lisible sans interaction et avec mouvement réduit.

La priorité est la clarté et l’accès HTML. `llms.txt`, des instructions aux agents dans la page ou des mots-clés cachés ne les remplacent pas.

## 9. Carte des changements dans le portfolio

| Fichier / zone dans `P/` | Travail futur |
| --- | --- |
| `src/content/caseStudies/solidarisStory.ts` | Réécriture principale : héros, huit chapitres, sources, médias, résultats et réflexion. |
| `src/content/caseStudies/visualStories.ts` | Types des diagrammes ; évolution minimale du modèle média pour durée, transcript, provenance ou mode de lecture si nécessaire. |
| `src/pages/VisualCaseStudyTemplate.tsx` | Lecture estimée commune ; vidéo volontaire ; nouvelles preuves avec les composants existants. |
| `src/utils/storyReadingTime.ts` — à créer | Extraction/estimation partagée. |
| `src/ui/components/story/diagrams/registry.tsx` et diagrammes | Deux nouvelles figures, actualisation Contracts/Token, grammaire responsive commune. |
| `src/ui/components/story/AgentDelegationWorkflow.tsx`, `src/ui/components/story/diagrams/HandoffDiagram.tsx` | Vérifier les usages avant de retirer leur affichage Solidaris. |
| `src/content/caseStudies/solidaris.ts` | Aligner preuves structurées, anciens textes, SEO et limites ; aucune source de septembre contradictoire. |
| `src/content/caseStudies/cards.ts` | Carte Solidaris : angle agent/contrats/gouvernance, statut, miniature. |
| `src/content/rolePaths.ts`, `src/content/site.ts`, `src/pages/Approach.tsx` | Corriger seulement les résumés/liens Solidaris concernés. |
| `src/hooks/useSeo.ts`, `vite.config.ts`, `index.html`, `package.json` | Accès HTML et métadonnées selon vérification du prérendu. |
| `public/robots.txt`, `public/sitemap.xml` | Vérifier routes et indexation. |
| `public/screenshots/solidaris/`, `public/videos/` | Médias optimisés et remplacement des captures obsolètes. |
| `docs/solidaris-evidence-register.md` — à créer | Registre interne : affirmation, provenance, date, version, statut et limite. |
| `scripts/cv/content.json`, `scripts/build_cv.py`, PDF public | Synchronisation ultérieure du CV si demandée ; pas de reconstruction implicite ici. |

### Conserver les liens déjà utilisés

Inventorier les liens avant de renommer les sections. Ancres existantes : `fragmented-tools`, `storybook`, `shared-contribution`, `governance`, `workflow-experiment`, `ishare`, `icrm`, `iged`, `handoff`.

Garder l’ID si son sens reste juste, sinon placer une ancre de compatibilité et actualiser les liens internes. Les trois IDs produit peuvent rejoindre des repères de l’encadré/galerie produit, sans trois chapitres vides. Vérifier décalage sous le header et clic répété sur la même ancre.

### Nature des preuves

`VisualEvidenceStatus` contient actuellement `Verified`, `Reported`, `Prototype`, `Ongoing`, `Planned`. Une fonctionnalité montrée avec données synthétiques doit être clairement distinguée : ajouter **Demo** au type/badge ou un label de provenance obligatoire et visible. Ne jamais utiliser `Verified` seul pour une métrique issue du seed.

`DeliveryState` décrit le livrable ; `evidenceStatus` décrit la preuve. Une fonction implémentée peut être montrée sur Demo sans que son adoption soit vérifiée.

## 10. Lots exécutables par agents

### Lot A — Figer les faits et choisir les preuves · P0

**Dépendances :** aucune. **Entrées :** ce plan, sources Plectrum, release retenue, conversation de revue.

- Créer le registre : `claimId`, affirmation, source, revision/version, date, nature, limite, destination dans le récit.
- Vérifier versions et docs, conserver le lien immuable. Ne pas actualiser le checkout Plectrum ni ses fichiers générés pour faciliter une capture sans demande distincte.
- Noter les contradictions : maintainer pack ancien sur le bootstrap, références historiques dans P9. Trancher par code et artefacts datés ; ne pas recopier une explication obsolète.
- Choisir un scénario agent fonctionnel ; conserver l’échec connu comme limite.
- Relever adoption et transmission réelles. Ne pas produire un faux rapport externe pour remplir le dashboard.

**Livrable :** registre et sélection des médias. **Acceptation :** aucun chiffre sans source/version ; aucune confusion release/preview/Demo.

### Lot B — Rédiger le récit et ses résumés · P0

**Dépendance :** A. **Fichiers :** story, study, cards, rolePaths et résumés concernés.

- Rédiger en anglais selon les budgets ; vérifier que titre/introduction/H2 racontent déjà la chaîne de décisions.
- Réduire les parcours produit à une preuve et des références ; préserver ce que la recherche démontre réellement.
- Écrire résultats et limites ensemble, sans promesse initiale corrigée seulement à la fin.
- Aucun placeholder, chiffre ou résultat fictif dans la version publiée.

**Acceptation :** ownership compris en vingt secondes ; problème/décision/preuve par chapitre ; lecture complète sans vidéos ; budget respecté.

### Lot C — Produire les quatre diagrammes · P0

**Dépendances :** faits A, structure B. **Fichiers :** diagrammes, registry, types.

- Reprendre les composants visuels existants, labels publics en anglais.
- Montrer versions, revue humaine, frontières de distribution et reporting optionnel.
- Contrôler desktop/mobile, DOM lisible et mouvement réduit.

**Acceptation :** une question par figure ; aucune flèche suggérant promotion/écriture/collecte automatique inexistante ; sens indépendant de la couleur.

### Lot D — Capturer et intégrer les preuves · P0, vidéo tokens P1

**Dépendances :** A et storyboard B. **Fichiers :** médias, registre, références du récit.

- Capturer deux vidéos prioritaires/posters, puis les images fixes nécessaires.
- Enregistrer provenance, durée, limite ; fournir résumé/transcript.
- Revoir les vieilles captures introduction/status/sync/typographie/iCRM. Les anciennes grandes cartes iCRM ne représentent pas la version ultérieure en liste compacte.
- Optimiser ; contrôler pause, clavier, échec de chargement et mobile.

**Acceptation :** vidéos facultatives ; pas d’autoplay simultané ; Demo identifiable ; aucune capture de septembre datée octobre.

### Lot E — Lecture et intégration commune · P0

**Dépendance :** B ; peut avancer pendant C/D. **Fichiers :** template, helper, types média.

- Ajouter l’estimation aux cinq case studies, même règle.
- Adapter le lecteur sans changer silencieusement tous les autres comportements.
- Vérifier liens, ancres et cohérence du template ; préserver les colonnes de texte actuelles.

**Acceptation :** calcul depuis le contenu, aucune valeur manuelle par page, cinq routes vérifiées et médias existants fonctionnels.

### Lot F — Extraction et métadonnées · P0 pour l’accès au récit

**Dépendances :** B/E. **Fichiers :** SEO, build, routes, robots/sitemap si nécessaire.

- Vérifier réponse brute et rendu sans JS d’un build de production.
- Ajouter le prérendu si nécessaire depuis les sources communes ; contrôler hydratation et animations.
- Aligner title/description/canonical/social preview ; vérifier que l’extraction fournit rôle, client, contexte, décisions, résultats et limites.

**Acceptation :** récit récupérable sans vidéo ni scroll JavaScript, pas de copy cachée, routes directes fonctionnelles.

### Lot G — Revue finale · P0

**Dépendances :** B à F.

- Vérifier les assertions contre A ; éliminer les états obsolètes.
- Relire premier écran, titres/figures, récit complet. Le lecteur peut expliquer les choix de Daniel sans réciter une liste de technologies.
- Exécuter `npm run build`, puis contrôles type/lint adaptés. `npm run lint` existe ; ne pas présumer un script de test absent. Distinguer les erreurs préexistantes.
- Vérification ciblée des cas limites du calcul de lecture ; pas de tests qui recopient la prose ni d’infrastructure disproportionnée pour des captures.
- Vérifier cinq pages, ancres, clavier, mobile/desktop, mouvement réduit, vidéos et poids.

**Acceptation :** checklist finale satisfaite, diff reviewable, aucune donnée synthétique présentée comme résultat du projet. La publication n’est pas automatique.

Ordre : **A → B → C/D/E en parallèle → F → G**. Ne pas attendre des métriques externes hypothétiques pour achever récit et diagrammes. Les médias peuvent suivre le premier montage éditorial.

## 11. Preuves à sécuriser avant la fin de mission

Prioriser ce qui devient difficile après les accès : versions/manifests, état des CI, parcours agent/onboarding, dashboard avec provenance, fonctionnement d’un flux de tokens et documents de transmission.

- Préparer les deux vidéos principales avant le 8 octobre si les accès et versions sont disponibles.
- Si une vraie personne peut effectuer une tâche d’onboarding/recherche sans aide, consigner tâche, blocages et assistance reçue. Une session qualitative est utile ; ne pas extrapoler à une population ou un gain de productivité.
- Sans session, publier le périmètre vérifié et la prochaine validation utile. Aucun chiffre d’impact n’est exigé pour terminer la page.
- Identifier ce qui a été remis, à qui et dans quel état. Un propriétaire « unresolved » ne devient pas un transfert confirmé.
- Utiliser les preuves publiques ou extraits autorisés pour le portfolio. Ne pas organiser de collecte personnelle automatique après la mission pour compléter des métriques.

## 12. Critères de réussite finale

- [ ] Premier écran : ownership individuel, stratégie IA et état de livraison.
- [ ] Agent relié au système ; CDD et MCP expliqués simplement.
- [ ] Autonomie locale et décision Core explicites, avec conséquences sur la livraison.
- [ ] Responsabilités distinctes pour CSS, metadata, Figma, index et snapshots.
- [ ] Deux flux de tokens, revues, contrôles et publication correctement distingués.
- [ ] Onboarding consommateur montré avec prérequis et mises à jour.
- [ ] Télémétrie, évaluation, Demo et adoption externe jamais confondues.
- [ ] Dashboard montrant enquête/décision, sans impact imaginaire.
- [ ] Produit/recherche au service d’une décision du système, sans trois récits concurrents.
- [ ] Quatre diagrammes maximum, deux vidéos prioritaires, lecture complète sans vidéo.
- [ ] Cohérence Bridgestone : ton, largeur, figures, liens, légendes et décisions.
- [ ] Estimation calculée au début des cinq case studies.
- [ ] Récit extractible en texte, titres/métadonnées spécifiques, aucun mot-clé caché.
- [ ] Preuves datées et sourcées ; anciens hashes utilisables.
- [ ] Aucun gain/adoption externe sans preuve ; date et état de transmission exacts.

**Résultat attendu :** comprendre rapidement pourquoi Plectrum est un travail d’architecture et de stratégie de design system, puis vérifier cette impression dans des choix, des artefacts et des limites clairement exposés.
