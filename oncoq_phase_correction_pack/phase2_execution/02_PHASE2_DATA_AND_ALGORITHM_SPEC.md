# Phase 2 Data + Algorithm Spec

## Purpose

This file defines the Phase 2 mock data model and transparent scoring logic.

The algorithm must be deterministic, explainable, and clearly labelled as prototype logic.

## Data entities

### Cohort

```ts
export type Cohort = {
  id: string;
  name: string;
  cancerType: string;
  sampleCount: number;
  dataType: "de_identified_genomic_dataset";
  createdAt: string;
  notes: string;
};
```

### MutationRecord

```ts
export type MutationRecord = {
  id: string;
  cohortId: string;
  gene: string;
  variant: string;
  pathway: string;
  cancerRelevance: "high" | "medium" | "emerging" | "exploratory";
  evidenceCategory: "Strong" | "Moderate" | "Emerging" | "Exploratory";
  baseRelevanceScore: number;
  interpretation: string;
  limitation: string;
  nextValidationStep: string;
};
```

### DrugHypothesis

```ts
export type DrugHypothesis = {
  id: string;
  candidateClass: string;
  target: string;
  pathway: string;
  matchedGene: string;
  matchedVariant: string;
  evidenceCategory: "Strong" | "Moderate" | "Emerging" | "Exploratory";
  targetMatchScore: number;
  pathwayMatchScore: number;
  simulatedHybridScore: number;
  compositePriorityScore: number;
  whyRanked: string;
  limitation: string;
  nextValidationStep: string;
};
```

### EvidenceProvenance

```ts
export type EvidenceProvenance = {
  id: string;
  layer: "gene_pathway" | "drug_target" | "hybrid_ranking" | "validation";
  phase2Source: string;
  futureSourcePlan: string;
  limitation: string;
};
```

## Mock gene/pathway mapping

```ts
export const genePathwayMap = {
  EGFR: "EGFR/ERBB signalling",
  TP53: "p53 tumour suppressor pathway",
  KRAS: "RAS/MAPK signalling",
  BRCA1: "Homologous recombination DNA repair",
  ALK: "ALK tyrosine kinase signalling"
};
```

## Mock drug-class mapping

```ts
export const drugClassMap = [
  {
    candidateClass: "EGFR inhibitor class",
    target: "EGFR",
    pathway: "EGFR/ERBB signalling"
  },
  {
    candidateClass: "MEK pathway inhibitor class",
    target: "MEK/RAS-MAPK pathway",
    pathway: "RAS/MAPK signalling"
  },
  {
    candidateClass: "PARP inhibitor class",
    target: "PARP / DNA repair vulnerability",
    pathway: "Homologous recombination DNA repair"
  },
  {
    candidateClass: "ALK inhibitor class",
    target: "ALK",
    pathway: "ALK tyrosine kinase signalling"
  },
  {
    candidateClass: "p53 pathway reactivation research compounds",
    target: "p53 pathway",
    pathway: "p53 tumour suppressor pathway"
  }
];
```

## Scoring logic

### Important warning

All scores are prototype relevance scores for demo purposes.

They are not clinical validity scores, not treatment scores, and not diagnostic probabilities.

### Mutation relevance score

Suggested deterministic formula:

```ts
mutationRelevanceScore =
  baseRelevanceScore
  + evidenceWeight
  + pathwayImportanceWeight;
```

Where:

```ts
const evidenceWeights = {
  Strong: 8,
  Moderate: 4,
  Emerging: 2,
  Exploratory: 0
};

const pathwayImportanceWeights = {
  "EGFR/ERBB signalling": 4,
  "p53 tumour suppressor pathway": 3,
  "RAS/MAPK signalling": 3,
  "Homologous recombination DNA repair": 2,
  "ALK tyrosine kinase signalling": 2
};
```

Clamp final score between 0 and 100.

### Drug hypothesis score

Suggested deterministic formula:

```ts
compositePriorityScore = Math.round(
  targetMatchScore * 0.35 +
  pathwayMatchScore * 0.30 +
  simulatedHybridScore * 0.20 +
  evidenceWeightNormalized * 0.15
);
```

### Evidence weight normalized

```ts
const evidenceWeightNormalized = {
  Strong: 95,
  Moderate: 80,
  Emerging: 68,
  Exploratory: 55
};
```

## Simulated hybrid score

The simulated hybrid score should be described as:

```txt
A deterministic compatibility score used to represent the future hybrid AI-quantum ranking layer. In Phase 2, it does not run on a quantum backend and must be benchmarked against classical baselines before any performance claims.
```

Example function:

```ts
function computeSimulatedHybridScore(mutationScore: number, pathwayMatchScore: number, evidenceCategory: EvidenceCategory) {
  const evidenceBoost = evidenceWeightNormalized[evidenceCategory] * 0.1;
  return Math.round(Math.min(100, mutationScore * 0.45 + pathwayMatchScore * 0.45 + evidenceBoost));
}
```

## Explainability output

Each candidate must produce:

1. Matched gene.
2. Matched variant.
3. Matched pathway.
4. Evidence category.
5. Prototype scores.
6. Why ranked.
7. Limitation.
8. Next validation step.

## Example explanation

```txt
EGFR inhibitor class is ranked highly because the demo cohort contains an EGFR L858R signal mapped to EGFR/ERBB signalling, and the candidate class targets the same oncogenic pathway. This is a research hypothesis only and requires expert review, retrospective validation, and evidence provenance review before any real-world interpretation.
```

## CSV upload schema

Minimum columns:

```csv
sample_id,gene,variant,cancer_type,pathway,evidence_category
S001,EGFR,L858R,Lung adenocarcinoma,EGFR/ERBB signalling,Strong
S002,TP53,R175H,Lung adenocarcinoma,p53 tumour suppressor pathway,Strong
```

## Input validation

Phase 2 should validate:

- Required columns exist.
- Gene is non-empty.
- Variant is non-empty.
- Evidence category is valid.
- Dataset contains no obvious patient name/email/phone fields.

If potential identifiable fields appear, show warning:

```txt
This prototype is for de-identified research data only. Please remove patient-identifying information before analysis.
```
