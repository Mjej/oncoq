# ONCOQ.TECH Copy Bank — Target-User Language

## Purpose

Use this file to replace generic AI-sounding copy across the product with language that sounds credible to oncology researchers, bioinformatics analysts, biotech R&D teams, and deep-tech commercialisation judges.

---

## 1. Product one-liner

### Weak
ONCOQ.TECH produces evidence-ranked mutation signals and drug-repurposing hypotheses.

### Better
ONCOQ.TECH helps translational oncology teams turn de-identified mutation files into a review-ready evidence board: ranked variants, pathway context, candidate hypothesis classes, limitations, and exportable research briefs.

---

## 2. Research-use boundary

### Short version
Research-use only. Not a diagnosis, treatment recommendation, prescribing guide, or patient-level decision tool.

### Full version
ONCOQ.TECH supports research planning and expert review only. Outputs are not clinical diagnoses, treatment recommendations, prescribing advice, or patient-level decisions. Any downstream scientific or clinical use requires qualified expert review, validated evidence sources, and appropriate governance.

### Report version
This brief summarises evidence-ranked mutation signals and candidate research hypothesis classes for R&D discussion. It must not be used as a clinical report, diagnostic result, treatment recommendation, or prescribing guide.

---

## 3. Page titles

### Overview
Evidence workspace

### Run Analysis
Cohort intake & scoring

### Review Evidence
Evidence review board

### Export Report
Research brief export

### Client Portal
Lung adenocarcinoma research review

### Operations
Pipeline operations

### Validation
Retrospective validation

### Pilots
Pilot pipeline

---

## 4. Button labels

### Weak
Run analysis

### Better
Run scoring

### Weak
Review results

### Better
Review ranked evidence

### Weak
Generate report

### Better
Generate research brief

### Weak
Share client view

### Better
Open read-only review

### Weak
View workflow

### Better
Preview scoring workflow

### Weak
Export report

### Better
Export research brief

---

## 5. Status labels

### Use these

- Schema validated
- Ready for scoring
- Scoring complete
- Pending review
- Needs evidence
- Accepted for report
- Limitation unresolved
- Ready for client review
- Exported
- Failed schema check
- Reviewer sign-off needed

### Avoid these unless explained

- Healthy
- Degraded
- Ready
- Review
- Strong
- Complete
- Draft

---

## 6. Replacement copy by section

### Hero copy

```md
Turn de-identified mutation data into ranked research evidence.

Upload or select a cohort, run pathway-aware mutation scoring, inspect evidence and limitations, then export a research-use brief for expert review.
```

### Cohort intake

```md
Upload a de-identified mutation table and confirm that required fields are present before scoring begins.
```

### Schema validation

```md
The file matches the required mutation schema. ONCOQ detected sample identifiers, gene names, variant labels, cancer type, and pathway-mapping fields.
```

### Scoring

```md
The scoring layer ranks mutation signals by pathway relevance, evidence strength, and report-readiness. Results are prepared for expert review, not clinical action.
```

### Evidence review

```md
Open each ranked signal to inspect the matched gene, variant, pathway, evidence category, interpretation, limitation, and next validation step.
```

### Hypothesis class

```md
Candidate hypothesis classes are generated from pathway-level evidence. They are research prompts for expert review, not drug recommendations.
```

### Report export

```md
Package accepted evidence items, reviewer notes, limitations, validation next steps, and the research-use boundary into a controlled brief.
```

### Client portal

```md
This read-only workspace summarises approved evidence items and report status for external research review. Internal reviewer notes and unresolved items are hidden.
```

### Validation

```md
Benchmark prototype scoring against baseline or reviewer-labeled outputs to assess ranking agreement, pathway consistency, and run stability.
```

### Pilot value

```md
Estimate how much analyst review time a partner can save when cohort-level mutation evidence is ranked, structured, and packaged into a research-use brief.
```

---

## 7. Empty states

### No cohort selected
```md
Select a demo cohort or upload a de-identified mutation table to begin schema validation.
```

### Schema failed
```md
The file cannot be scored yet. Required fields are missing or incorrectly named. Review the schema checklist and upload a corrected file.
```

### No ranked signals
```md
No mutation signals have been ranked for this cohort. Run scoring after schema validation is complete.
```

### No report-ready items
```md
No evidence items are approved for export yet. Review ranked signals and mark accepted items before generating a research brief.
```

### No client-ready report
```md
The client view is not available until a research brief is generated and marked ready for read-only review.
```

---

## 8. Tooltip copy

### Evidence tier
Evidence tier summarises the strength of the research evidence linked to the mutation signal. It does not imply clinical action.

### Prototype score
Prototype score ranks review priority based on pathway relevance and evidence mapping. It is not a probability of response or clinical risk.

### Candidate hypothesis class
A pathway or drug-class research hypothesis generated from matched mutation evidence. It requires expert review before inclusion in a brief.

### Review state
Reviewer decision state that controls whether an evidence item can be included in the exported research brief.

### Retrospective validation
Internal benchmark comparison used to evaluate prototype behaviour on historical or demo data. It does not establish clinical validity.

---

## 9. Report section headings

1. Cohort summary
2. Mutation signal ranking
3. Pathway evidence context
4. Candidate research hypothesis classes
5. Evidence limitations
6. Reviewer notes
7. Validation next steps
8. Research-use boundary
9. Audit trail

---

## 10. Final product tone

The product should sound like:
- precise
- research-aware
- careful
- evidence-first
- commercially credible

It should not sound like:
- generic SaaS
- overclaiming medical AI
- vague AI assistant
- fake enterprise dashboard
- clinical recommendation engine
