# 03 — App Architecture

## Phase 1 architecture

```text
Frontend Dashboard
  ↓
Demo Dataset Loader
  ↓
Mock Analysis Engine
  ↓
Mutation Ranking Module
  ↓
Drug Repurposing Ranking Module
  ↓
Explainability Module
  ↓
Report Preview
```

## Intended future architecture

```text
Secure Data Ingestion
  ↓
Bioinformatics Preprocessing
  ↓
Classical AI Mutation Engine
  ↓
Knowledge Graph / Drug Target Database
  ↓
Hybrid Quantum-Classical Ranking Module
  ↓
Explainability + Audit Layer
  ↓
Research Dashboard + API
```

## Components

### 1. Data ingestion layer
Phase 1:
- Accept CSV-like mock data.
- Provide demo dataset selector.

Future:
- VCF support
- FASTQ/BAM not required at first; usually upstream sequencing pipelines already produce variant calls.
- De-identification controls
- Data validation schema

### 2. Bioinformatics preprocessing layer
Phase 1:
- Mock preprocessing status cards.

Future:
- Variant annotation
- Gene normalization
- Cancer-type mapping
- Pathway mapping
- Evidence database linkage

### 3. Classical AI mutation engine
Phase 1:
- Deterministic score using evidence level, pathway relevance, mutation type, and cancer context.

Future:
- Machine learning model trained on curated mutation-drug associations.
- Graph neural networks or other models for mutation-pathway-drug relationships.
- Model calibration and retrospective validation.

### 4. Hybrid quantum/quantum-inspired module
Phase 1:
- Represent as a “compatibility ranking layer” in the UI.
- Use mock score contribution.
- Label honestly as prototype simulation.

Future:
- Compare hybrid quantum-classical algorithms against classical ML baselines.
- Use quantum simulator/cloud backend for limited benchmarking.
- Report only validated improvements.

### 5. Drug-repurposing engine
Phase 1:
- Match mutation/pathway to mock drug-target data.

Future:
- Integrate curated public/partner databases.
- Use drug-target graphs.
- Incorporate drug indication, safety profile, target mechanism, resistance context, and evidence level.

### 6. Explainability layer
Phase 1:
- Show reason cards and evidence badges.

Future:
- Audit trail
- Model versioning
- Dataset provenance
- Evidence citations
- Confidence calibration

## Data flow for demo

```text
User clicks “Load demo dataset”
→ App loads demo-mutations.json and demo-drugs.json
→ mock-analysis.ts calculates mutation and drug scores
→ Results page renders ranked tables/cards
→ User clicks candidate drug
→ EvidencePanel shows rationale
→ Report page summarizes findings
```

## TypeScript types to create

```ts
export type MutationRecord = {
  id: string;
  gene: string;
  mutation: string;
  cancerType: string;
  pathway: string;
  mutationCategory: 'driver' | 'tumor_suppressor' | 'dna_repair' | 'unknown';
  evidenceLevel: 'Strong' | 'Moderate' | 'Emerging' | 'Exploratory';
  relevanceScore: number;
  interpretation: string;
};

export type DrugCandidate = {
  id: string;
  drugName: string;
  drugClass: string;
  target: string;
  matchedGeneOrPathway: string;
  evidenceLevel: 'Strong' | 'Moderate' | 'Emerging' | 'Exploratory';
  aiScore: number;
  quantumInspiredScore: number;
  finalScore: number;
  rationale: string;
  limitation: string;
};
```
