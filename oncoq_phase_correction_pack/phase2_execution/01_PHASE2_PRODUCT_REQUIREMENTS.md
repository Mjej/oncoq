# Phase 2 Product Requirements Document

## Product name

OncoQ.tech

## Product category

Research-use oncology decision-support analytics platform.

## Target users

### Primary users

- Oncology R&D scientists.
- Bioinformaticians.
- Cancer genomics lab analysts.
- Biotech/pharma translational research teams.
- University cancer research groups.

### Economic buyers

- Research institute directors.
- Genomics service provider leadership.
- Pharma/biotech R&D heads.
- University commercialisation / technology transfer stakeholders.

## Core user problem

Cancer researchers have access to growing genomic mutation datasets, but turning those datasets into prioritised mutation signals and drug-repurposing hypotheses is slow, manual, and fragmented.

## Core product promise

OncoQ.tech helps researchers move from de-identified mutation data to an explainable drug-repurposing research shortlist faster.

## Key user stories

### Dataset ingestion

As a bioinformatician, I want to upload or select a de-identified mutation dataset so that I can run a research analysis without entering patient-identifying information.

Acceptance:

- User can load demo cohort.
- User can upload CSV-like file in Phase 2.
- UI shows expected schema.
- UI warns not to upload identifiable patient data.

### Mutation relevance ranking

As a researcher, I want mutation signals ranked by gene, variant, pathway, and evidence category so that I can identify the most important signals for expert review.

Acceptance:

- Table shows ranked mutation signals.
- Each row shows gene, variant, pathway, evidence category, prototype relevance score, interpretation, limitation, and next validation step.

### Drug-repurposing shortlist

As an oncology R&D scientist, I want drug-target candidate classes ranked by pathway match and evidence score so that I can decide which hypotheses to review first.

Acceptance:

- Top candidates show candidate class, target/pathway, matched mutation, compatibility score, why ranked, limitation, next validation step.
- UI clearly says hypotheses are not treatment recommendations.

### Explainability

As a domain expert, I want to know why a signal or candidate was ranked so that I can judge biological plausibility.

Acceptance:

- Each candidate has an explanation panel.
- Explanation includes matched pathway, evidence category, scoring factors, and limitation.

### Report preview

As a lab lead, I want to export or preview a concise report so that I can discuss the findings with my team.

Acceptance:

- Report preview includes dataset summary, top signals, top candidates, limitations, and validation steps.
- Export button can show a preview/download placeholder in Phase 2.

### Architecture understanding

As a judge or technical evaluator, I want to understand what is real and what is simulated so that I can trust the team’s claims.

Acceptance:

- Architecture page separates Phase 1/2 demo modules from future validated modules.
- Hybrid module is labelled simulated/prototype unless real implementation exists.

## Required pages in Phase 2

1. Dashboard
2. Analysis
3. Results
4. Report
5. Architecture
6. Validation Plan
7. Pilot Model / Commercialisation

## MVP navigation

Sidebar:

- Dashboard
- Analysis
- Results
- Report
- Architecture
- Validation
- Pilot Model

## Core copy

### Main headline

```txt
From cancer mutation data to drug-repurposing shortlist, faster.
```

### Subheadline

```txt
OncoQ.tech helps oncology R&D teams rank mutation relevance signals and repurposable drug hypotheses from de-identified genomic datasets using hybrid AI-quantum analytics.
```

### Research-use disclaimer

```txt
Research-use decision support only. Outputs are ranked investigation hypotheses requiring expert review and retrospective validation. Not for clinical diagnosis or treatment recommendation.
```

## Phase 2 demo dataset

Default demo:

```txt
Lung adenocarcinoma demo cohort
Samples: 48
Genes: EGFR, TP53, KRAS, BRCA1, ALK
```

Demo variants:

- EGFR L858R
- TP53 R175H
- KRAS G12D
- BRCA1 truncating variant
- ALK rearrangement signal

## Phase 2 report output

Report must include:

- Dataset summary.
- Top mutation relevance signals.
- Top drug-repurposing hypotheses.
- Evidence provenance.
- Scoring explanation.
- Limitations.
- Recommended validation steps.
- Research-use disclaimer.
