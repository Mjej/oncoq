# Page Audit — Client Review Portal

## Current page verdict

The client portal has the right idea, but it still feels like an internal dashboard with a simplified layout. A client-facing page should be calmer, more explanatory, and more polished. It should not expose too much operational language, and it should help a non-technical stakeholder understand what is ready, what is still under review, and what the research boundary is.

This page is especially important for commercialisation because it demonstrates how ONCOQ.TECH can be shared with labs, hospitals, biotech partners, and research clients.

---

## 1. Main problems

### 1.1 The headline is clunky

Current:
> Client review for Lung adenocarcinoma demo cohort.

This is too literal and not polished.

Better:
> **Lung adenocarcinoma research review**  
> A read-only summary of reviewed mutation signals, candidate hypothesis classes, and validation next steps.

### 1.2 The client sees too many internal terms

Terms like:
- latest run
- mutation signals scored
- report ready
- boundary R&D

are okay, but need clearer explanation.

Client-facing language should be:
- reviewed evidence
- research brief
- expert review required
- validation next steps
- not clinical recommendation

### 1.3 Cards are too empty

The page has large cards with few details. It wastes space and does not create confidence.

### 1.4 Review path is good but too generic

Current:
- Cohort received
- Signals ranked
- Hypotheses drafted
- Report export

Better:
- De-identified cohort received
- Mutation signals ranked
- Evidence reviewed by analyst
- Research brief prepared
- Validation next steps documented

### 1.5 No report preview

A client portal should show:
- report title
- report status
- what is included
- download/open button
- date generated
- prepared by
- limitations

### 1.6 No stakeholder-friendly summary

Clients need a plain summary:
- what was analysed
- what was found
- what is still uncertain
- what happens next

---

## 2. Correct page objective

This page should answer:
> What has ONCOQ reviewed for this cohort, what outputs are ready to view, and what are the research-use limits?

---

## 3. Recommended layout

### Header area

```md
# Lung adenocarcinoma research review

Read-only workspace for reviewed mutation signals, candidate hypothesis classes, report status, and validation next steps.

Prepared for: [Client / Partner]  
Cohort: Lung adenocarcinoma demo  
Status: Research brief ready  
Last updated: 24m ago
```

Buttons:
- `View research brief`
- `Review evidence summary`

### Summary cards

- Reviewed mutation signals: 15
- Candidate hypothesis classes: 5
- Report status: Ready
- Validation boundary: Expert review required

### Plain-language summary

Add a card:
```md
## What this review contains

This workspace summarises a de-identified lung adenocarcinoma cohort. ONCOQ.TECH ranked mutation signals by pathway relevance, linked them to candidate research hypothesis classes, and prepared a research-use evidence brief. The output is for R&D planning and expert review only.
```

### Review path

Use a vertical timeline:
1. Cohort received
2. Schema checked
3. Signals ranked
4. Evidence reviewed
5. Brief prepared
6. Validation next steps

### Evidence summary

Show only approved items:
- EGFR L858R
- TP53 R175H
- KRAS G12C

Do not show raw operational details.

### Hypothesis classes

Show:
- candidate class
- linked signal
- evidence status
- validation requirement

### Research boundary

Make this strong but readable:
> This review is for research and commercial evaluation only. It is not a clinical report, diagnostic output, treatment recommendation, or prescribing guide. Any downstream scientific or clinical use requires qualified expert review, validated evidence sources, and appropriate governance.

---

## 4. Section-by-section correction

### 4.1 Top badge

Current:
> Read-only review

Better:
> **Read-only research review**  
> External viewers can inspect approved summaries only. Editing and internal reviewer notes are hidden.

### 4.2 Hero

Current:
> Client review for Lung adenocarcinoma demo cohort.

Replace with:
> **Lung adenocarcinoma research review**  
> Review the approved evidence summary, candidate hypothesis classes, and research brief prepared from a de-identified cohort.

Buttons:
- `View research brief`
- `Open evidence summary`

### 4.3 Status cards

Current:
- cohort
- latest run
- report
- boundary

Better:
- cohort analysed
- reviewed signals
- brief status
- validation required

### 4.4 Review path

Current timeline is useful but should be more specific.

Replace:
1. De-identified cohort received
2. Schema and fields checked
3. Mutation signals ranked
4. Evidence reviewed
5. Research brief prepared
6. Validation next steps documented

### 4.5 Mutation signals

Current:
> Top items for review

Client should not see “for review” if it is already read-only. Use:
> **Reviewed mutation signals**

Show:
- signal
- pathway
- evidence tier
- report status

### 4.6 Hypotheses

Current:
> Candidate classes

Better:
> **Candidate research hypothesis classes**

Add disclaimer:
> These classes are generated for research planning and require expert validation. They are not treatment recommendations.

---

## 5. Rewritten page copy

```md
# Lung adenocarcinoma research review

Read-only summary of reviewed mutation signals, candidate hypothesis classes, report status, and validation next steps.

Prepared from a de-identified demo cohort. Editing and internal reviewer notes are hidden.

[View research brief] [Open evidence summary]

## What this review contains

ONCOQ.TECH ranked mutation signals by pathway relevance, linked selected signals to candidate research hypothesis classes, and packaged the reviewed items into a research-use brief.

This workspace is intended for R&D discussion and expert review only.

## Review progress

1. De-identified cohort received — Complete
2. Schema and fields checked — Complete
3. Mutation signals ranked — Complete
4. Evidence reviewed — In review
5. Research brief prepared — Ready
6. Validation next steps documented — Ready

## Reviewed mutation signals

EGFR L858R · EGFR/ERBB signalling · Strong evidence tier  
TP53 R175H · p53 tumour suppressor pathway · Strong evidence tier  
KRAS G12C · RAS/MAPK signalling · Moderate evidence tier

## Research-use boundary

This output is not a clinical report, diagnostic result, treatment recommendation, or prescribing guide. Downstream use requires qualified expert review, validated evidence sources, and appropriate governance.
```

---

## 6. UI rebuild checklist

- [ ] Make the page visually distinct from internal workspace.
- [ ] Use less operational/admin language.
- [ ] Add “What this review contains” summary.
- [ ] Add prepared-for/prepared-by metadata.
- [ ] Show only approved evidence items.
- [ ] Hide internal IDs unless needed.
- [ ] Add report preview/download card.
- [ ] Strengthen research-use boundary.
- [ ] Add “last updated” and “prepared by” fields.
- [ ] Make the page printable/export-friendly.

---

## 7. Developer prompt

```md
Redesign the Client Portal as a polished read-only research review page.

Goals:
1. It must not look like an internal admin dashboard.
2. It must be understandable to a biotech/research client.
3. It must show only approved or client-safe information.
4. It must clearly explain the research-use boundary.

Required sections:
- Header: Lung adenocarcinoma research review
- Prepared for / cohort / last updated / report status
- Hero summary explaining what the review contains
- CTA buttons:
  - View research brief
  - Open evidence summary
- Status cards:
  - cohort analysed
  - reviewed signals
  - candidate hypothesis classes
  - validation required
- Review progress timeline:
  - de-identified cohort received
  - schema checked
  - mutation signals ranked
  - evidence reviewed
  - research brief prepared
  - validation next steps documented
- Reviewed mutation signals cards
- Candidate research hypothesis classes
- Report preview card
- Research-use boundary block

Copy must be precise, client-facing, and non-generic. Avoid internal words like “run queue” or “pipeline health” on this page.
```
