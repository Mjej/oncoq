# Phase 2 Copilot / Codex Prompts

## Prompt 1 — Data model and scoring engine

```md
Act as a senior TypeScript engineer and bioinformatics product prototyper.

Build the Phase 2 local data and scoring layer for OncoQ.tech.

Create clean TypeScript types for:
- Cohort
- MutationRecord
- DrugHypothesis
- EvidenceProvenance

Create local mock data for a Lung adenocarcinoma demo cohort with:
- 48 samples
- genes: EGFR, TP53, KRAS, BRCA1, ALK
- variants: EGFR L858R, TP53 R175H, KRAS G12D, BRCA1 truncating variant, ALK rearrangement signal

Create deterministic scoring functions:
- computeMutationRelevanceScore
- computeSimulatedHybridScore
- computeDrugHypothesisScore
- rankMutations
- rankDrugHypotheses

Important:
- Scores are prototype relevance scores only.
- Do not call them clinical confidence or treatment scores.
- Add comments explaining the scoring is local deterministic demo logic.
- No backend or API keys.
```

## Prompt 2 — Dashboard upgrade

```md
Act as a senior UI/UX designer and React frontend engineer.

Upgrade the OncoQ.tech dashboard into a premium biotech SaaS interface.

Add:
- Hero headline: “From cancer mutation data to drug-repurposing shortlist, faster.”
- Subheadline explaining research-use oncology analytics.
- Run Demo Analysis CTA.
- View Workflow CTA.
- Demo dataset card.
- Research-use boundary card.
- Mutation ranking card.
- Hybrid score card.
- Report readiness card.
- Genomic Intelligence Canvas component.

Genomic Intelligence Canvas requirements:
- Use SVG/CSS/React only if possible.
- Show DNA helix or molecular network.
- Add floating mutation nodes: EGFR L858R, TP53 R175H, KRAS G12D, BRCA1, ALK.
- Use soft teal/cyan glow.
- Use subtle animation only.
- Make it feel like oncology genomics research, not patient monitoring.

Color palette:
- #0B4F4A primary
- #7FA99B secondary
- #2BB3A3 accent
- #F4F8F7 background
- #17202A text

Keep the UI accessible, clean, and pitch-demo ready.
```

## Prompt 3 — Results and explainability

```md
Act as a senior biotech SaaS frontend engineer.

Upgrade the Results page for OncoQ.tech.

Add a research-use alert at the top:
“These ranked outputs are research hypotheses, not treatment recommendations. Expert review and retrospective validation are required.”

Create two sections:

1. Mutation relevance ranking table
Columns:
- Rank
- Gene
- Variant
- Pathway
- Evidence category
- Prototype relevance score
- Interpretation
- Limitation
- Next validation step

2. Drug-repurposing hypothesis shortlist
Each candidate card should show:
- Candidate class
- Target/pathway
- Matched mutation signal
- Prototype compatibility score
- Why ranked
- Evidence category
- Limitation
- Next validation step

Add an Explainability Panel on the right. Clicking a candidate updates the panel.

Avoid clinical recommendation language.
Do not say “recommended treatment”.
Say “research hypothesis” or “candidate class for expert review”.
```

## Prompt 4 — Report page

```md
Act as a senior product engineer building an exportable research report preview.

Upgrade the OncoQ.tech Report page.

Create a structured report preview with:
- Dataset summary
- Top mutation relevance signals
- Top drug-repurposing hypotheses
- Evidence provenance table
- Recommended validation steps
- Research-use disclaimer

Add buttons:
- Export Preview
- Copy Summary
- Back to Results

The report should read like a concise research-use evidence package for lab discussion, not a clinical report.

Use careful wording:
- “ranked research hypotheses”
- “requires expert review”
- “requires retrospective validation”
- “not for clinical diagnosis or treatment recommendation”
```

## Prompt 5 — Architecture and validation pages

```md
Act as a senior solution architect for a biotech AI SaaS product.

Upgrade the Architecture page and add a Validation Plan page for OncoQ.tech.

Architecture page:
Show two lanes:

Lane A: Phase 2 demo architecture
Local demo JSON → Preprocessing helper → Deterministic ranking logic → UI explanation cards → Report preview

Lane B: Future validated architecture
De-identified genomic datasets → Bioinformatics preprocessing → AI mutation engine → Hybrid quantum/classical ranking → Evidence knowledgebase → Research report/API

Add a risk-control module:
- research-use boundary
- audit trail
- model versioning
- source provenance
- de-identification
- role-based access future plan

Validation Plan page:
Sections:
- Retrospective benchmark plan
- Classical AI baseline comparison
- Expert review workflow
- Data privacy and de-identification
- Success metrics

Success metrics:
- top-k ranking agreement
- time-to-shortlist reduction
- expert usefulness rating
- evidence provenance completeness
- pilot conversion
```

## Prompt 6 — Final safety and wording audit

```md
Act as a regulatory-aware medical AI copy auditor.

Review the entire OncoQ.tech codebase and UI copy.

Find and replace any risky wording that implies:
- diagnosis
- clinical recommendation
- treatment prescription
- patient-specific medical advice
- validated medical device
- proven quantum superiority

Replace with safer research-use wording:
- research-use decision support
- ranked hypothesis
- candidate class
- expert review required
- retrospective validation required
- prototype relevance score
- simulated hybrid compatibility layer
- benchmark against classical baselines

Return a list of changes made and any remaining risky phrases.
```
