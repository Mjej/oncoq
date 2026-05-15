# 00 — Master Context for AI Coding Tools

## Project name
BioQuantum Oncology

## One-line pitch
A hybrid AI-quantum research analytics platform that helps oncology R&D teams analyse mutation data and rank drug-repurposing hypotheses faster.

## What we are building in Phase 1
A hackathon-grade prototype/dashboard that demonstrates the end-to-end research workflow:

```text
Mutation dataset upload
→ AI mutation pattern analysis
→ Risk/relevance scoring
→ Drug-target matching
→ Hybrid quantum-inspired ranking
→ Explainable research report
```

## First customer
Primary Phase 1 customer segment:
- Oncology research labs
- Cancer genomics units
- Bioinformatics service providers
- Biotech/pharma oncology R&D teams

Do not position the first customer as individual cancer patients or hospital treatment teams.

## Core user persona
**Dr. Aisha Tan, Bioinformatics Lead at a cancer research lab**

Pain points:
- Receives large mutation datasets from sequencing workflows.
- Needs to prioritise biologically meaningful mutations.
- Needs faster drug-repurposing hypotheses for internal R&D projects.
- Must show evidence trails to principal investigators and collaborators.

Success criteria:
- Upload de-identified mutation dataset.
- See ranked mutation signals.
- See top candidate drugs and pathways.
- Understand why each result was ranked.
- Export a report for lab discussion.

## Product boundary
This is a **research-use decision-support platform**, not a diagnostic or treatment recommendation tool.

Allowed Phase 1 wording:
- “research hypothesis”
- “ranked candidate”
- “evidence score”
- “non-diagnostic research-use output”
- “retrospective validation required”

Avoid wording:
- “diagnoses cancer”
- “tells doctors what drug to prescribe”
- “predicts patient survival”
- “clinically approved”
- “guaranteed quantum advantage”

## Scientific logic in simple terms
Cancer often involves genetic mutations that change how cells grow, repair DNA, avoid death, invade tissue, or resist treatment. Oncology researchers use sequencing data to identify mutations, compare them with known cancer pathways, and study whether existing drugs might be useful in new cancer contexts.

The platform combines:
1. **Bioinformatics preprocessing** — standardises mutation input.
2. **AI mutation analysis** — ranks mutations by relevance using known features such as gene, mutation type, pathway, evidence level, and cancer context.
3. **Drug-target graph matching** — connects mutations/pathways to existing approved or investigational drugs.
4. **Quantum-inspired ranking layer** — represents a future hybrid AI-quantum module for complex compatibility ranking and is benchmarked against classical AI baselines.
5. **Explainability layer** — shows why each drug/mutation was ranked.

## Phase 1 technical principle
Build a convincing demo first. Use deterministic mock scoring and transparent formulas before adding real machine learning.

## Core demo promise
A researcher can go from a mutation profile to a ranked research shortlist in under 2 minutes.
