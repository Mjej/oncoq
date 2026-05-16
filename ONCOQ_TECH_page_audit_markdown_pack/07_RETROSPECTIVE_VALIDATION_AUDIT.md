# Page Audit — Retrospective Validation Runs

## Current page verdict

This page is conceptually strong because it supports scientific credibility. However, the current page does not explain validation clearly enough. It shows a chart and benchmark table, but it does not tell the user what validation means, what is being compared, and why the result matters.

For the hackathon, this page can help prove feasibility and trust if improved.

---

## 1. Main problems

### 1.1 Validation purpose is vague

Current:
> Queue and review internal benchmark checks after the research workflow is complete.

Better:
> Compare prototype scoring against reviewer-labeled or baseline benchmark outputs to estimate ranking agreement, pathway consistency, and stability.

### 1.2 Metrics need definitions

The chart includes:
- Top-10 ranking agreement
- Pathway mapping consistency
- Evidence-category agreement
- Top-k precision
- Run-to-run stability

These are strong metrics, but each needs a tooltip or explanation.

### 1.3 Chart lacks interpretation

The chart shows prototype scores higher than baseline, but the page does not explain:
- what delta means
- whether the change is meaningful
- what should be done next
- whether validation is complete or still preliminary

### 1.4 Queue form feels too fake

The form has dropdowns but does not explain:
- required benchmark dataset
- reviewer label source
- metric definition
- expected output
- who approves it

### 1.5 No validation caveat

This page needs explicit caveat:
> This is retrospective validation for prototype assessment only. It does not establish clinical validity.

---

## 2. Correct page objective

This page should answer:
> How does the prototype ranking compare against a baseline or reviewer benchmark, and what validation gaps remain before pilot deployment?

---

## 3. Recommended page structure

### Header

```md
# Retrospective validation

Compare prototype scoring against baseline or reviewer-labeled benchmarks to assess ranking agreement, pathway consistency, and run stability.
```

Metrics:
- 6 benchmark runs
- mean delta +9.0 pts
- 1 in flight
- 2 require reviewer confirmation

### Validation caveat

```md
Validation outputs are for prototype evaluation only. They do not establish clinical validity or treatment utility.
```

### Benchmark queue

Fields:
- cohort
- benchmark dataset
- metric
- reviewer/source
- scoring version
- notes

### Chart

Add interpretation:
> Prototype scoring improves pathway mapping consistency and top-k precision in the current demo benchmark, but reviewer confirmation is still required.

### Table

Add columns:
- benchmark type
- data source
- scoring version
- reviewer status
- next action

---

## 4. Metric definitions

Add info tooltips:

### Top-10 ranking agreement
How closely the prototype’s top-ranked mutation signals match the reviewer or baseline top-10 list.

### Pathway mapping consistency
How often the system maps mutations to the same pathway category as the benchmark.

### Evidence-category agreement
How often the evidence tier matches reviewer or baseline labels.

### Top-k precision
How many of the highest-ranked prototype outputs are judged relevant by the benchmark.

### Run-to-run stability
Whether repeated runs produce consistent ranking outputs.

---

## 5. Rewritten page copy

```md
# Retrospective validation

Compare prototype scoring against baseline or reviewer-labeled benchmarks to assess ranking agreement, pathway consistency, and run stability.

6 benchmark runs · Mean improvement +9.0 pts · 1 validation run in flight

## Validation boundary

These checks evaluate prototype behaviour on retrospective or demo data. They do not establish clinical validity, patient outcome benefit, or treatment utility.

## New benchmark run

Choose a cohort, benchmark metric, reviewer source, and scoring version. The result will be added to the validation log for internal review.

## Current comparison

Prototype scoring shows higher agreement than the classical baseline across the selected demo metrics. Reviewer confirmation is still required before using these results in a pilot claim.

## Benchmark run log

Track benchmark runs, score deltas, reviewer status, and the next validation action.
```

---

## 6. Improved benchmark table

| ID | Benchmark | Cohort | Metric | Baseline | Prototype | Δ | Reviewer status | Next action |
|---|---|---|---|---|---|---|---|---|
| bench-0042 | LUAD Top-10 agreement | LUAD | Top-10 ranking agreement | 62 | 71 | +9 | Confirmed | Include in validation memo |
| bench-0040 | CRC evidence category | CRC | Evidence-category agreement | 65 | 74 | +9 | In review | Reviewer sign-off needed |

---

## 7. Required features

- Metric explanation tooltips
- Reviewer status
- Validation caveat
- Benchmark source metadata
- Scoring version metadata
- Chart interpretation
- Validation memo export
- Next action field

---

## 8. UI rebuild checklist

- [ ] Rewrite header to explain what validation compares.
- [ ] Add validation boundary banner.
- [ ] Add metric tooltips.
- [ ] Add chart interpretation paragraph.
- [ ] Add benchmark source/scoring version.
- [ ] Add reviewer status column.
- [ ] Add next action column.
- [ ] Make queue form more credible.
- [ ] Add export validation memo button.
- [ ] Avoid suggesting clinical validation.

---

## 9. Developer prompt

```md
Improve the Retrospective Validation page.

Goals:
1. Make validation scientifically clearer and safer.
2. Explain that these are prototype benchmark checks, not clinical validation.
3. Add metric definitions and reviewer status.

Required:
- Header: “Retrospective validation”
- Subtitle explaining comparison against baseline or reviewer-labeled benchmarks
- Validation boundary banner
- Benchmark queue form:
  - cohort
  - benchmark dataset/source
  - metric
  - reviewer/source
  - scoring version
  - notes
- Comparison chart with interpretation text
- Metric tooltips for:
  - Top-10 ranking agreement
  - Pathway mapping consistency
  - Evidence-category agreement
  - Top-k precision
  - Run-to-run stability
- Benchmark table columns:
  - ID
  - benchmark
  - cohort
  - metric
  - baseline
  - prototype
  - delta
  - reviewer status
  - next action
- Add “Export validation memo” action.
- Use cautious wording: prototype evaluation, retrospective benchmark, reviewer confirmation required.
```
