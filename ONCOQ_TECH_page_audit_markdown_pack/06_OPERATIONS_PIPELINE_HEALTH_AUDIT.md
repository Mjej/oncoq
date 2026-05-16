# Page Audit — Pipeline Health and Run Monitoring

## Current page verdict

This page has the worst visible corruption after the Review Evidence page. The “Implementation map” diagrams are unreadable because text overlaps inside tiny boxes. The page is trying to explain architecture, operations, and readiness in one narrow sidebar. It fails at all three.

Operations should be an admin page that proves the workflow is technically feasible and monitorable. It should not look like a squeezed pitch-deck diagram.

---

## 1. Critical problems

### 1.1 Implementation diagrams are corrupted

The “Lane A” and “Lane B” diagrams have text overlapping inside small vertical boxes. This makes the page look broken and unprofessional.

Fix:
- Remove tiny diagrams.
- Replace with horizontal architecture cards or a proper full-width diagram.
- Use icons and short labels, not paragraphs inside boxes.

### 1.2 “Healthy / Degraded” is too generic

Current stage cards show:
- Dataset ingestion
- Mutation annotation
- Risk & relevance scoring
- Prototype candidate ranking
- Evidence report builder

These are useful, but the health labels need detail:
- last run
- error rate
- failed jobs
- queue length
- average latency
- owner
- dependency

### 1.3 The page confuses implementation and monitoring

There are two different jobs:
1. monitor pipeline health
2. explain current vs future architecture

These should be separated into tabs:
- `Run monitor`
- `System architecture`
- `Data governance`
- `Error logs`

### 1.4 Operations log table is too thin

The table has run status but no:
- error reason
- affected module
- input cohort
- output artifact
- retry action
- logs drawer

### 1.5 The page currently weakens feasibility

Because of corrupted diagrams, the page makes the prototype look less built, not more built.

---

## 2. Correct page objective

This page should answer:
> Can the team monitor the scoring workflow, identify failures, and explain what is implemented now versus what needs validation later?

---

## 3. Recommended page structure

### Header

```md
# Pipeline operations

Monitor cohort intake, mutation scoring, hypothesis generation, and report export jobs across the research workflow.
```

Top status:
- 4/5 stages operational
- 1 degraded
- 1 run in queue
- uptime
- latest failed stage

### Tabs

1. Run monitor
2. Stage health
3. Architecture
4. Governance controls

### Stage health cards

Each card:
- stage name
- status
- latency
- uptime
- throughput
- last run
- latest error
- owner

### Operations log

Add:
- run ID
- cohort
- stage
- started
- duration
- status
- error reason
- output
- action

### Architecture panel

Use a full-width architecture flow:

Current prototype:
```md
De-identified demo cohort
→ Local schema check
→ Deterministic scoring layer
→ Evidence board
→ Report preview
```

Future validated architecture:
```md
Curated biomedical sources
→ Bioinformatics preprocessing
→ Benchmark scoring
→ Expert review workflow
→ Governed research outputs
```

Do not squeeze these into small cards.

---

## 4. Specific corrections

### 4.1 Header

Current:
> Pipeline health and run monitoring

Better:
> **Pipeline operations**  
> Monitor cohort intake, scoring jobs, evidence ranking, and report exports across the research workflow.

### 4.2 Stage cards

Current:
> Prototype candidate ranking — Degraded

Better:
```md
Prototype candidate ranking
Status: Needs attention
Latency: 1432 ms
Uptime: 96.1%
Latest issue: hypothesis ranking exceeded threshold on run-2026-0140
Owner: m1-platform
Action: View logs
```

Avoid “Degraded” alone.

### 4.3 Implementation map

Current:
Tiny overlapping diagrams.

Replace with:
```md
## What is implemented now

Phase 2 demo runs locally using deterministic scoring on de-identified demo cohorts. It demonstrates the workflow without external biomedical API dependencies.

[Demo cohort] → [Schema check] → [Scoring layer] → [Evidence board] → [Report preview]

## What requires validation next

Future pilot architecture requires curated biomedical data sources, benchmarked ranking, governance controls, and expert review before research deployment.

[Validated datasets] → [Bioinformatics preprocessing] → [Benchmark scoring] → [Reviewer workflow] → [Governed output]
```

### 4.4 Governance controls

Current:
Small blocks in the right panel.

Make into a grid:
- Research-use boundary
- Audit trail
- Model/scoring versioning
- Source provenance
- De-identification check
- Role-based access

Each card:
- status
- what it protects
- next implementation step

---

## 5. Rewritten page copy

```md
# Pipeline operations

Monitor cohort intake, scoring jobs, evidence ranking, and report exports across the research workflow.

4 of 5 stages operational · 1 stage needs attention · 1 run queued · Uptime 99.6%

## Current issue

Prototype candidate ranking is slower than expected on the latest colorectal demo run. Evidence ranking and report export remain available.

[View affected runs] [Open logs]

## What is implemented now

The current prototype runs locally on de-identified demo cohorts. It validates file shape, maps mutation rows to pathway categories, ranks signals, and prepares report-ready evidence cards.

Demo cohort → Schema check → Scoring layer → Evidence board → Report preview

## What requires validation next

A production pilot requires curated biomedical sources, benchmarked scoring, governance review, expert reviewer workflow, and source provenance controls.

Validated dataset → Bioinformatics preprocessing → Benchmark scoring → Expert review → Governed research output
```

---

## 6. UI rebuild checklist

- [ ] Remove corrupted topology diagrams.
- [ ] Replace narrow architecture boxes with full-width flow diagrams.
- [ ] Split page into tabs: monitor, stage health, architecture, governance.
- [ ] Add latest issue summary.
- [ ] Add error reason to run log.
- [ ] Add “view logs” action.
- [ ] Replace vague health words with specific operational details.
- [ ] Add dependency/source status.
- [ ] Add retry action.
- [ ] Make governance controls readable.

---

## 7. Developer prompt

```md
Rebuild the Operations page.

Current issue:
The implementation map is corrupted. Text overlaps inside tiny architecture boxes. Remove that layout entirely.

New page:
1. Header:
   - “Pipeline operations”
   - subtitle explaining monitoring of cohort intake, scoring, evidence ranking, and report export.
2. Top status strip:
   - stages operational
   - stages needing attention
   - queued runs
   - uptime
   - latest issue
3. Tabs:
   - Run monitor
   - Stage health
   - Architecture
   - Governance controls
4. Stage health cards:
   - stage name
   - status
   - latency
   - uptime
   - throughput
   - last run
   - latest issue
   - owner
   - View logs action
5. Operations log table:
   - run ID
   - cohort
   - stage
   - started
   - duration
   - status
   - error reason
   - output
   - action
6. Architecture section:
   - full-width readable flow for “implemented now”
   - full-width readable flow for “requires validation next”
7. Governance section:
   - research-use boundary
   - audit trail
   - source provenance
   - data de-identification
   - scoring versioning
   - role-based access

Do not place architecture diagrams inside narrow sidebars.
No text overlap.
No tiny unreadable boxes.
```
