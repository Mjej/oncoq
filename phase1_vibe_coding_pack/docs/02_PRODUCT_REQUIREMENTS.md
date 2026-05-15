# 02 — Product Requirements Document

## Product summary
BioQuantum Oncology is a research-use software platform that helps oncology R&D teams analyse mutation datasets and rank drug-repurposing hypotheses.

## Problem
Cancer genomics teams generate and receive increasingly complex mutation data. The bottleneck is not sequencing alone; the bottleneck is turning mutation data into interpretable research decisions: which mutations matter, what pathways are affected, and which existing drugs may be worth investigating.

## Target user
Bioinformatics lead, cancer researcher, computational biologist, pharma translational oncology scientist.

## Jobs to be done
1. Upload or select a mutation dataset.
2. Understand which mutations are most relevant.
3. Identify candidate drugs linked to mutated genes/pathways.
4. See evidence and confidence levels.
5. Export a report for internal research discussion.

## Functional requirements

### FR1 — Dataset input
The system must allow the user to select a demo dataset or upload a CSV/VCF-like file.

Phase 1 implementation:
- Use demo dataset first.
- Add upload UI even if parsing is mocked.

### FR2 — Mutation ranking
The system must display mutations ranked by research relevance.

Fields:
- Gene
- Mutation
- Cancer type
- Pathway
- Mutation category
- Evidence level
- AI confidence score
- Research interpretation

### FR3 — Drug-repurposing ranking
The system must display candidate drugs ranked by potential relevance.

Fields:
- Rank
- Drug name
- Drug class
- Target gene/pathway
- Matched mutation/pathway
- Evidence level
- Confidence score
- Research rationale
- Limitation

### FR4 — Explainability
The system must explain why a mutation or drug was ranked.

Minimum explanation factors:
- Mutation-gene relevance
- Pathway relevance
- Drug-target relationship
- Evidence source category
- Confidence and uncertainty

### FR5 — Research report
The system must generate a report preview with:
- Dataset summary
- Top mutation findings
- Top drug hypotheses
- Evidence notes
- Disclaimer
- Next validation steps

## Non-functional requirements

### NFR1 — Safety
Must show research-use-only disclaimer on results and report pages.

### NFR2 — Performance
Demo flow should load instantly using local mock data.

### NFR3 — Trust
Every score must have an explanation. Do not show unexplained “magic AI” results.

### NFR4 — Usability
The demo must be understandable to a non-technical judge in under 60 seconds.

## Out of scope for Phase 1
- Real medical diagnosis
- Treatment prescription
- Real quantum execution
- Live clinical datasets
- Patient-facing app
- Regulatory certification

## Success metrics for hackathon demo
- Judges understand the problem in 30 seconds.
- Judges understand the workflow in 60 seconds.
- Prototype looks like a real B2B SaaS product.
- Q&A can defend why this starts as research-use, not clinical diagnosis.
