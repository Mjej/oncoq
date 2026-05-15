# Phase 2 Validation + Evidence Strategy

## Why this matters

Judges may challenge the scientific and technical credibility of the platform.

The strongest defence is not to claim that the system is already clinically validated.

The strongest defence is to show a realistic validation path.

## Validation positioning

Use this statement:

```txt
Phase 2 is a research-use prototype. It generates ranked hypotheses from de-identified mutation datasets. Before clinical or commercial expansion, we will validate ranking quality against retrospective datasets, curated knowledgebases, expert review, and classical AI baselines.
```

## What to validate

### 1. Mutation relevance ranking

Question:

```txt
Does the system rank biologically important mutation signals higher than less relevant signals?
```

Metrics:

- Top-k ranking agreement.
- Expert agreement rating.
- Pathway mapping accuracy.
- Evidence category consistency.

### 2. Drug-repurposing hypothesis ranking

Question:

```txt
Does the system produce plausible drug-target candidate classes for expert review?
```

Metrics:

- Known pathway match agreement.
- Drug-target evidence match.
- Expert usefulness score.
- False-positive review rate.

### 3. Hybrid ranking module

Question:

```txt
Does the hybrid AI-quantum ranking layer improve prioritisation compared with classical baselines?
```

Metrics:

- Ranking agreement improvement.
- Top-10 precision.
- Computational time comparison.
- Stability across repeated runs.

Important wording:

```txt
We will benchmark the hybrid layer against classical AI baselines before claiming performance advantage.
```

### 4. Explainability

Question:

```txt
Can a researcher understand why each signal and candidate was ranked?
```

Metrics:

- Percentage of candidates with complete explanation.
- Evidence provenance completeness.
- User rating of explanation usefulness.

### 5. Workflow value

Question:

```txt
Does the platform reduce time from mutation dataset to research shortlist?
```

Metrics:

- Time-to-shortlist.
- Analyst hours saved.
- Number of manual review steps reduced.
- Report generation time.

## Evidence provenance plan

### Phase 2 prototype

Use local mock knowledgebase:

- gene to pathway mapping
- pathway to candidate class mapping
- evidence category notes
- deterministic scoring notes

### Phase 3 pilot

Evaluate integration with curated biomedical resources such as:

- oncology variant knowledgebases
- clinical variant archives
- cancer mutation databases
- drug-target databases
- pathway databases
- scientific literature indexing

Do not claim live integration unless built.

## Expert review plan

Recruit at least 3 expert reviewers:

1. Bioinformatician.
2. Oncology researcher.
3. Clinician-scientist or molecular pathologist.

Ask them to rate:

- biological plausibility
- usefulness of ranking
- clarity of explanation
- missing evidence
- workflow value

## Retrospective pilot plan

### Pilot input

- De-identified historical mutation dataset.
- Known cancer type.
- Expert-curated baseline or literature-backed known associations.

### Pilot output

- Ranked mutation signals.
- Drug-repurposing candidate classes.
- Evidence report.
- Benchmark comparison.

### Pilot success target

- 50%+ reduction in time-to-shortlist.
- Top-k ranking judged useful by expert reviewers.
- One publishable or presentation-worthy case study.
- One conversion into annual research SaaS or extended pilot.

## Risk register

### Risk: Diagnostic overclaim

Mitigation:

- Research-use disclaimer on every page.
- Avoid treatment recommendation language.
- No patient-level action instruction.

### Risk: Quantum hype

Mitigation:

- Label Phase 2 as simulated/prototype.
- Benchmark against classical baselines.
- Claim potential advantage only after evidence.

### Risk: Data privacy

Mitigation:

- De-identified data only.
- No patient names or contact fields.
- Future enterprise security controls.

### Risk: Biological false positives

Mitigation:

- Evidence category and limitation fields.
- Expert review requirement.
- Retrospective validation.

### Risk: Weak commercial adoption

Mitigation:

- Start with research labs and genomics providers.
- Paid pilot model.
- Clear report output.
- Customer discovery interviews.
