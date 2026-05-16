# Page Audit — Run Cohort Analysis

## Current page verdict

This page has a clearer workflow than the overview, but it still looks like a static demo screen rather than a real cohort intake and scoring workflow. The page says “Run a cohort analysis,” yet the actual user actions are weak and not enough details are shown to convince a technical or research audience.

The page should be the place where a user:
1. chooses or uploads a de-identified cohort file,
2. validates the file schema,
3. sees detected genes / variants / samples,
4. runs mutation relevance scoring,
5. sees run logs and scoring output.

Currently it mostly shows summary cards and a demo cohort. It does not feel operational.

---

## 1. Main problems

### 1.1 The workflow starts too late

The page immediately talks about scoring, but the user needs to trust the input first.

Before running anything, show:
- input file type
- de-identification status
- schema validation
- required columns
- detected columns
- missing fields
- sample count
- mutation count
- gene count

### 1.2 Upload CSV is too small

The page has “Demo cohort / Upload CSV / Schema” as tabs or buttons, but upload is not treated as a serious first-class workflow.

For a real user, file intake is one of the highest-risk steps.

### 1.3 The “active cohort” selector is visually detached

The cohort selector floats on the right of a large empty container. It should be part of the intake flow:
- selected cohort
- file source
- schema status
- data readiness
- run eligibility

### 1.4 Analysis goals are too generic

Current:
- Mutation relevance ranking
- Cancer pathway mapping
- Drug-repurposing hypothesis shortlist
- Evidence provenance report

These are acceptable, but they need clearer explanation:
- what is ranked?
- what evidence is used?
- what output will appear?
- what is excluded?

### 1.5 Run history is too thin

The table says complete/failed but does not explain failure reasons or scoring artifacts. A technical judge will expect:
- run ID
- input file
- scoring version
- duration
- detected variants
- errors
- export availability
- reproducibility / audit trail

---

## 2. Correct page objective

The page should answer:
> Is this cohort file ready to score, and what exactly will the scoring run produce?

---

## 3. Recommended page structure

### 3.1 Header

```md
# Cohort intake & scoring

Upload a de-identified mutation table, confirm the schema, then run pathway-aware mutation relevance scoring.

Active cohort: Lung adenocarcinoma demo · 48 samples · 5 genes detected
```

Primary actions:
- `Run scoring`
- `Upload mutation file`
- `Open previous result`

### 3.2 Stepper

Use a real stepper:
1. Select cohort
2. Validate schema
3. Preview detected mutations
4. Run scoring
5. Review output

The current workflow bar has too many downstream steps. This page should only focus on intake/scoring.

### 3.3 Intake panel

Left side:
- upload dropzone
- demo cohort selector
- file metadata

Right side:
- schema validation checklist

### 3.4 Mutation preview

Table preview:
| Column | Example | Status |
|---|---|---|
| sample_id | S-014 | Valid |
| gene | EGFR | Valid |
| variant | L858R | Valid |
| cancer_type | LUAD | Valid |
| evidence_source | internal_demo | Optional |

### 3.5 Run configuration

Include:
- cohort
- scoring mode: local deterministic demo / validated pipeline / future API mode
- scoring version
- evidence library version
- output format

### 3.6 Run result

After run:
- mutation signals ranked
- hypothesis classes generated
- warnings
- failed mappings
- next step button: `Review ranked evidence`

---

## 4. Section-by-section correction

### 4.1 Header

Current:
> Run a cohort analysis  
> Choose a de-identified cohort, confirm the schema, then run mutation relevance scoring for research review.

This is okay but can be more direct.

Replace with:
> **Cohort intake & scoring**  
> Upload a de-identified mutation table, validate the schema, and rank mutation signals for expert research review.

Metadata:
> Cohort: Lung adenocarcinoma demo · 48 samples · EGFR, TP53, KRAS, ALK, MET

---

### 4.2 Warning banner

Current:
> Research-use only. Expert review and retrospective validation are required.

Better:
> **Research-use boundary**  
> Scoring output supports research prioritisation only. It is not a patient-level diagnosis, risk prediction, or treatment recommendation.

This is more specific and safer.

---

### 4.3 Workflow card

Current:
> Start with cohort scoring

Better:
> **Scoring workflow**  
> Confirm the cohort file is de-identified, check required mutation fields, then run the local scoring layer. Results will appear in the Evidence Board for expert review.

Step labels:
1. Cohort selected
2. Schema validated
3. Mutations detected
4. Scoring ready
5. Evidence board

---

### 4.4 Metrics

Current:
- Last run
- Avg duration
- Success rate
- Mutations scored

Better:
- Schema status: Passed
- Samples detected: 48
- Mutation rows: 15
- Genes mapped: 5
- Last scoring run: 24m ago

“Success rate 50%” looks bad and unexplained. If shown, explain why:
> Success rate: 50% demo runs, including one intentionally failed schema test.

Otherwise remove it.

---

### 4.5 Demo cohort card

Current copy:
> Run the complete local analysis workflow on a preloaded de-identified cohort, without external APIs.

Better:
> **Demo cohort: Lung adenocarcinoma**  
> Use this preloaded, de-identified cohort to demonstrate the full workflow: schema validation, pathway mapping, signal ranking, hypothesis drafting, and report export.

Show:
- input format: annotated mutation table
- sample count: 48
- mutation signals: 15
- detected genes: EGFR, TP53, KRAS, ALK, MET
- data state: de-identified demo

Primary button:
- `Run scoring`

Secondary:
- `Preview mutation rows`
- `Open previous results`

---

### 4.6 Analysis goals

Current:
Basic bullet list.

Rebuild into output preview cards:
1. **Ranked mutation signals**
   - Score variants by pathway relevance and evidence strength.
2. **Pathway map**
   - Link variants to EGFR/ERBB, p53, RAS/MAPK, ALK/RTK, MET pathways.
3. **Hypothesis classes**
   - Draft candidate pathway or drug-repurposing classes for expert review.
4. **Evidence provenance**
   - Preserve match reason, limitation, and validation next step.

---

### 4.7 Run history

Current table is okay but too thin.

Add columns:
| Run | Input | Scoring layer | Started | Duration | Signals | Warnings | Status | Action |
|---|---|---|---|---|---|---|---|---|

Add failure detail:
- “Missing variant column”
- “Unsupported cancer type”
- “No mapped genes”
- “Schema mismatch”

---

## 5. Rewritten page copy

```md
# Cohort intake & scoring

Upload a de-identified mutation table, validate the schema, and rank mutation signals for expert research review.

Cohort: Lung adenocarcinoma demo · 48 samples · 5 mapped genes

## Research-use boundary

Scoring output supports research prioritisation only. It is not a diagnosis, risk prediction, prescribing recommendation, or patient-level treatment decision.

## Intake status

Schema validated  
Required fields detected: sample_id, gene, variant, cancer_type  
Genes detected: EGFR, TP53, KRAS, ALK, MET  
Ready for scoring

[Run scoring] [Preview mutation rows] [Upload CSV]

## What this run will produce

1. Ranked mutation signals
2. Pathway-level evidence mapping
3. Candidate hypothesis classes
4. Evidence provenance for report export

## Latest result

run-2026-0142 · Completed 24m ago  
15 signals ranked · 5 hypothesis classes drafted · 0 schema errors

[Review ranked evidence]
```

---

## 6. Missing functionality

Add these interactions:

- Upload CSV modal
- Schema validation drawer
- Mutation row preview
- Run scoring loading state
- Failed run state
- Run result summary
- “Open in Evidence Board” transition
- Export logs button
- Scoring version metadata

---

## 7. UI rebuild checklist

- [ ] Convert “Demo cohort / Upload CSV / Schema” into a real intake workflow.
- [ ] Add schema validation checklist.
- [ ] Add file preview table.
- [ ] Replace vague metrics with readiness metrics.
- [ ] Explain scoring outputs before the user runs.
- [ ] Add failure reason in run history.
- [ ] Add scoring layer/version metadata.
- [ ] Make `Run scoring` the dominant action only after validation passes.
- [ ] Disable run button if schema fails.
- [ ] Add loading and completion states.

---

## 8. Developer prompt

```md
Rebuild the Run Analysis page into a real cohort intake and scoring workflow.

The page must include:
1. Header: “Cohort intake & scoring”
2. Research-specific subtitle explaining upload, schema validation, and mutation relevance scoring.
3. A research-use boundary banner with specific non-clinical wording.
4. A 5-step intake stepper:
   - Select cohort
   - Validate schema
   - Preview mutations
   - Run scoring
   - Review output
5. A main card with:
   - demo cohort selector
   - upload CSV button
   - schema validation checklist
   - detected fields
   - detected genes
   - sample count
   - mutation row count
6. A mutation preview table.
7. A scoring configuration card:
   - scoring mode
   - scoring layer/version
   - evidence library version
   - output type
8. Run history table with error reasons and actions.
9. Button logic:
   - run button disabled until schema passes
   - show loading state while running
   - show result summary after run
   - primary next step becomes “Review ranked evidence”
10. Remove generic copy and decorative metrics.

Fix layout:
- no floating empty spaces
- no text overflow
- no excessive blank vertical height
- responsive 12-column grid
```
