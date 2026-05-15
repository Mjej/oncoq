# 07 — Copilot / Codex / ChatGPT Prompt Pack

## How to use
Paste these prompts into VS Code Copilot Chat, Codex, or ChatGPT while coding. Use one prompt at a time. Do not ask the AI to build everything in one prompt.

---

## Prompt 1 — Create app skeleton

```text
You are my senior full-stack engineer for a hackathon prototype.

Build a Next.js + TypeScript + Tailwind app called BioQuantum Oncology.

Create a clean biotech SaaS dashboard prototype with routes:
- /
- /dashboard
- /analysis
- /results
- /report
- /architecture

Use local mock data only. No backend, no database, no auth.

Design style:
- premium clinical SaaS
- soft white background
- green/blue accents
- glassmorphism cards
- rounded panels
- clear research-use disclaimer

The product is a research-use oncology analytics platform, not a diagnostic tool.

Create reusable components:
- AppShell
- MetricCard
- UploadCard
- MutationTable
- DrugRankingCard
- EvidencePanel
- ConfidenceBadge
- ReportPreview
- ArchitectureFlow

Return code changes file by file.
```

---

## Prompt 2 — Create TypeScript types and mock analysis logic

```text
Create TypeScript types and mock scoring logic for a research-use oncology mutation and drug-repurposing dashboard.

Types needed:
- MutationRecord
- DrugCandidate
- AnalysisSummary
- EvidenceLevel

Create a mock scoring function:
- evidenceLevel weight: Strong 95, Moderate 80, Emerging 65, Exploratory 50
- final drug score = aiScore * 0.65 + quantumInspiredScore * 0.20 + evidenceWeight * 0.15

Important:
- Do not claim clinical validation.
- Add comments explaining that this is deterministic mock scoring for a hackathon prototype.
- Include a research-use disclaimer constant.
```

---

## Prompt 3 — Build dashboard screen

```text
Build the dashboard page for BioQuantum Oncology.

Content:
Hero title: From mutation data to drug-repurposing shortlist — faster.
Subtitle: BioQuantum Oncology helps oncology R&D teams rank mutation-risk signals and repurposable drug hypotheses from de-identified genomic datasets.

Add CTA buttons:
- Run Demo Analysis
- View Architecture

Add metric cards:
- Mutation ranking
- Drug repurposing shortlist
- Hybrid AI-quantum workflow
- Explainable research report

Add a visible research-use-only disclaimer card.

Use clean, responsive Tailwind design. Keep it premium and clear.
```

---

## Prompt 4 — Build upload/analysis page

```text
Build the analysis page.

It should show:
- Upload dataset card
- Demo dataset button
- Dataset summary after demo dataset is selected
- Analysis goal checklist
- Progress workflow with 6 steps:
  1. Standardising mutation fields
  2. Mapping genes to cancer pathways
  3. Ranking mutation relevance
  4. Matching drug-target relationships
  5. Running hybrid ranking layer
  6. Building explainable report

When user clicks Run Demo Analysis, navigate to /results.

Use mock data; do not implement real genomic parsing yet.
```

---

## Prompt 5 — Build results page

```text
Build the results page.

Show:
- Summary cards: dataset, top mutation, top drug hypothesis, average confidence
- Ranked mutation table using demo mutation data
- Top 5 drug-repurposing candidate cards
- EvidencePanel that opens when a drug card is selected
- Research-use-only disclaimer

Important wording:
Use “drug-repurposing hypothesis” and “candidate for research investigation”.
Do not use “recommended treatment”.
```

---

## Prompt 6 — Build report preview

```text
Build the report page.

Create a report preview with:
- Project title
- Dataset summary
- Top mutation findings
- Top drug-repurposing hypotheses
- Evidence notes
- Limitations
- Recommended next validation steps
- Research-use-only disclaimer

Add a disabled/placeholder button: Export PDF Report.
Add note: Export function planned for Phase 2.
```

---

## Prompt 7 — Build architecture screen

```text
Build an architecture page that explains how the UM IP is applied.

Show a horizontal or vertical flow diagram:
Genomic dataset → Classical preprocessing → AI mutation engine → Drug-target knowledge layer → Hybrid quantum-classical ranking → Explainable research report

Add a short explanation under each step.

Make it understandable to business judges, not only engineers.
```

---

## Prompt 8 — Audit for medical safety wording

```text
Audit the entire codebase for unsafe medical claims.

Replace wording like:
- diagnosis
- treatment recommendation
- patient risk prediction
- clinically proven
- guaranteed drug response

With safer wording:
- research-use analysis
- drug-repurposing hypothesis
- candidate for investigation
- mutation relevance signal
- requires retrospective validation and expert review

Add research-use-only disclaimer on all pages where results are shown.
```

---

## Prompt 9 — Polish UI before pitch

```text
Polish the UI for a 5-minute hackathon pitch.

Goals:
- Make the dashboard look premium and credible.
- Improve spacing, typography, and card hierarchy.
- Add subtle loading/progress states.
- Make top findings easy to read from a projector.
- Make the demo flow obvious: Dashboard → Analysis → Results → Report.

Do not add complex backend features. Prioritize reliability and presentation.
```
