# Phase 1 Correction + Improvement Spec

## Objective

Improve the current OncoQ.tech Phase 1 prototype so it becomes a stronger hackathon demo while staying feasible, honest, and research-use only.

## Non-negotiable product boundary

Every page must obey this boundary:

```txt
Research-use decision support only. Not for clinical diagnosis or treatment recommendation.
```

Do not build or imply:

- patient diagnosis
- clinical treatment recommendation
- prescription suggestion
- medical device approval
- hospital workflow deployment
- real-time patient monitoring

## Required global changes

### 1. Rename the product everywhere

Replace all instances of:

```txt
BioQuantum Oncology
```

with:

```txt
OncoQ.tech
```

Optional subtitle:

```txt
Hybrid AI-Quantum Oncology Research Platform
```

### 2. Add a persistent research-use badge

Add a small badge in the top header or sidebar:

```txt
Research-use only
```

Tooltip text:

```txt
Outputs are ranked research hypotheses for expert review and retrospective validation. They are not clinical diagnosis or treatment recommendations.
```

### 3. Add a top-level demo narrative

On the Dashboard, use this copy:

```txt
From cancer mutation data to drug-repurposing shortlist, faster.
```

Subcopy:

```txt
OncoQ.tech helps oncology R&D teams analyse de-identified genomic datasets, rank mutation relevance signals, and generate explainable drug-repurposing hypotheses for expert validation.
```

Primary CTA:

```txt
Run Demo Analysis
```

Secondary CTA:

```txt
View Workflow
```

## Dashboard page correction

### Current issue
The Dashboard is clean but too static. It lacks a memorable scientific visual and does not immediately show the full workflow.

### Required dashboard sections

#### Section 1: Hero panel

Content:

- Product badge: Research-use oncology analytics
- Heading: From cancer mutation data to drug-repurposing shortlist, faster.
- Short explanation.
- CTA: Run Demo Analysis
- Secondary CTA: View Architecture

#### Section 2: Demo dataset card

Use:

```txt
Demo dataset: Lung adenocarcinoma demo
Samples: 48
Genes: 5
Detected genes: EGFR, TP53, KRAS, BRCA1, ALK
Data type: De-identified genomic dataset
```

#### Section 3: Genomic Intelligence Canvas

Add a central visual component.

Suggested implementation options:

Option A: CSS/SVG only

- DNA helix made from SVG paths.
- Floating mutation nodes.
- Teal/cyan glow.
- Labels for EGFR, TP53, KRAS, BRCA1, ALK.

Option B: Lottie / image placeholder

- Use a generated static scientific visual as a background.
- Overlay live UI cards.

Do not use a clinical patient body monitor layout.

Suggested labels:

```txt
EGFR L858R
TP53 R175H
KRAS G12D
BRCA1 truncating variant
ALK rearrangement signal
```

#### Section 4: Key metric cards

Cards:

1. Boundary
   - Title: Research-use
   - Body: Non-diagnostic outputs for expert review and validation planning.

2. Mutation ranking
   - Title: 5 signals
   - Body: Ranked by gene, pathway, evidence level, and relevance score.

3. Hybrid score
   - Title: Simulated
   - Body: Quantum-inspired compatibility layer prepared for future benchmarking.

4. Report
   - Title: Ready
   - Body: Evidence notes, limitations, and next validation steps in one preview.

#### Section 5: Shortlist preview

Show top 3 drug-repurposing candidate classes:

1. EGFR inhibitor class — EGFR/ERBB signalling — Strong
2. MEK pathway inhibitor class — RAS/MAPK signalling — Moderate
3. PARP inhibitor class — Homologous recombination DNA repair — Moderate

Add label:

```txt
Research hypothesis only
```

#### Section 6: Pathway distribution chart

Keep the bar chart, but add interpretation:

```txt
Average mutation relevance by pathway. Scores are prototype relevance rankings for demo purposes and require retrospective validation.
```

## Analysis page correction

### Current issue
The page is clear, but the upload area should better explain the MVP logic.

### Add three modes

```txt
1. Load demo cohort
2. Upload CSV/VCF-like file
3. View accepted schema
```

For Phase 1, only the demo cohort needs to work. Upload can be visual-only.

### Accepted schema card

Add a collapsible schema preview:

```txt
sample_id
gene
variant
cancer_type
pathway
evidence_category
source_note
```

### Analysis workflow must show

1. Standardising mutation fields
2. Mapping genes to cancer pathways
3. Ranking mutation relevance
4. Matching drug-target relationships
5. Running hybrid compatibility layer
6. Building explainable report

Use statuses:

- COMPLETE
- SIMULATED
- PENDING VALIDATION

## Results page correction

### Current issue
The results page is strong but dense. It should separate mutation ranking and drug hypothesis ranking more clearly.

### Required top alert

```txt
These ranked outputs are research hypotheses, not treatment recommendations. Expert review and retrospective validation are required.
```

### Mutation table columns

Use:

- Rank
- Gene
- Variant
- Pathway
- Evidence category
- Prototype relevance score
- Interpretation
- Limitation
- Next validation

### Drug shortlist card fields

Each card should contain:

- Candidate class
- Target/pathway
- Matched mutation signal
- Prototype compatibility score
- Why ranked?
- Evidence category
- Limitation
- Next validation step

Example:

```txt
Candidate class: EGFR inhibitor class
Target/pathway: EGFR/ERBB signalling
Matched mutation signal: EGFR L858R
Prototype compatibility score: 92
Why ranked: The demo dataset contains an EGFR driver mutation and the candidate class targets the same oncogenic signalling pathway.
Limitation: Requires clinical-trial, guideline, and retrospective evidence review before any real-world interpretation.
Next validation: Compare ranking against curated oncology knowledgebases and expert review.
```

## Report page correction

### Current issue
The report preview is good. Add more credibility through structured evidence provenance.

### Add sections

1. Dataset summary
2. Mutation relevance ranking
3. Drug-repurposing hypotheses
4. Evidence provenance
5. Limitations
6. Recommended validation steps
7. Research-use disclaimer

### Evidence provenance section

Add table:

| Evidence layer | What Phase 1 uses | Future Phase 2/3 source |
|---|---|---|
| Gene-pathway mapping | Local mock knowledgebase | OncoKB / COSMIC / ClinVar / CIViC-style curated references |
| Drug-target relationship | Local demo mapping | DrugBank / ChEMBL / DGIdb-style references |
| Hybrid ranking | Deterministic simulated compatibility score | Benchmarked hybrid AI-quantum model |
| Validation | Internal logic checks | Retrospective datasets + expert review |

Use this carefully: mention these as future-style sources unless actually integrated.

## Architecture page correction

### Current issue
The architecture is clear but should explicitly separate Phase 1 simulation from future validated modules.

### Add two architecture lanes

#### Lane A: Phase 1 demo architecture

```txt
Local demo JSON → Preprocessing helper → Deterministic ranking logic → UI explanation cards → Report preview
```

#### Lane B: Future validated architecture

```txt
De-identified genomic datasets → Bioinformatics preprocessing → AI mutation engine → Hybrid quantum/classical ranking → Evidence knowledgebase → Research report/API
```

### Add risk-control module

Include:

- research-use boundary
- audit trail
- model versioning
- source provenance
- role-based access future plan
- data de-identification

## UI/UX improvements

### Visual hierarchy

Use:

- Large cards for hero and primary workflows.
- Medium cards for metrics.
- Small badges for status.
- Avoid too many equal-weight cards.

### Color usage

Use the palette consistently:

- `#F4F8F7` page background
- White cards
- `#0B4F4A` primary actions and active nav
- `#7FA99B` secondary borders/icons
- `#2BB3A3` active statuses and highlights
- `#17202A` primary text

### Component style

- Radius: 20–28px for main cards.
- Shadow: soft and low-opacity.
- Border: `rgba(11, 79, 74, 0.08)`.
- Avoid heavy blue and purple gradients.
- Avoid patient-monitor aesthetics.

## Phase 1 acceptance standard

The corrected prototype passes Phase 1 when:

- A judge understands the value proposition in 60 seconds.
- The demo can be clicked from Dashboard → Analysis → Results → Report → Architecture.
- No page makes clinical claims.
- The workflow clearly uses UM IP meaningfully.
- The UI looks like a premium biotech SaaS dashboard.
- The report output is explainable and defensible.
