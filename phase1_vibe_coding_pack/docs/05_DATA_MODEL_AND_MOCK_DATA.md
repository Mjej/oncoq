# 05 — Data Model and Mock Data

## Phase 1 mock data principle
Use realistic biological terminology, but avoid claiming real clinical outcomes.

## Mutation fields

| Field | Meaning |
|---|---|
| gene | Gene symbol, e.g. EGFR, TP53, KRAS |
| mutation | Variant/mutation label, e.g. L858R, G12D |
| cancerType | Cancer context for analysis |
| pathway | Biological pathway linked to the mutation |
| mutationCategory | Driver, tumour suppressor, DNA repair, unknown |
| evidenceLevel | Strength of research evidence |
| relevanceScore | Mock AI relevance score from 0–100 |
| interpretation | Human-readable explanation |

## Drug fields

| Field | Meaning |
|---|---|
| drugName | Candidate existing drug or drug class |
| drugClass | Targeted therapy, PARP inhibitor, MEK inhibitor, etc. |
| target | Gene, protein, or pathway target |
| matchedGeneOrPathway | Mutation/pathway detected in dataset |
| evidenceLevel | Strength of supporting evidence |
| aiScore | Classical AI score |
| quantumInspiredScore | Prototype compatibility score |
| finalScore | Weighted ranking score |
| rationale | Why it is suggested for research investigation |
| limitation | Why it is not a treatment recommendation |

## Suggested mock scoring formula

```ts
finalScore =
  aiScore * 0.65 +
  quantumInspiredScore * 0.20 +
  evidenceWeight * 0.15;
```

Evidence weights:
- Strong = 95
- Moderate = 80
- Emerging = 65
- Exploratory = 50

## Important note
In the UI, describe this as a prototype ranking formula. Do not imply that the formula is clinically validated.
