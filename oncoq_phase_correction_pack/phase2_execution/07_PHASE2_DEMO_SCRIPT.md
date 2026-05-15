# Phase 2 Demo Script — 3-Minute Walkthrough

## Demo objective

Show judges that OncoQ.tech is not just a dashboard. It is a research-use workflow that converts de-identified mutation data into an explainable drug-repurposing shortlist.

## 0:00–0:20 — Opening

Say:

```txt
OncoQ.tech helps oncology R&D teams move from cancer mutation data to ranked drug-repurposing hypotheses faster. This is research-use decision support only, not a diagnostic or treatment recommendation tool.
```

Show Dashboard.

Point to:

- headline
- research-use badge
- demo dataset
- Genomic Intelligence Canvas

## 0:20–0:50 — Problem + dataset

Say:

```txt
In this demo, we use a de-identified lung adenocarcinoma cohort with 48 samples and five mutation signals: EGFR, TP53, KRAS, BRCA1, and ALK. The goal is to show how a research team can quickly prioritise mutation relevance and drug-repurposing candidate classes for expert review.
```

Click Run Demo Analysis.

## 0:50–1:20 — Analysis workflow

Show Analysis page.

Say:

```txt
The workflow standardises mutation fields, maps genes to cancer pathways, ranks mutation relevance, matches drug-target relationships, runs a simulated hybrid compatibility layer, and builds an explainable report.
```

Point out:

- workflow progress
- local deterministic demo mode
- no patient-identifying data

Click View Ranked Results.

## 1:20–2:10 — Results

Show Results page.

Say:

```txt
Here, the system ranks mutation relevance signals. EGFR, TP53, and KRAS appear as high-priority research signals because of their pathway relevance in the demo knowledgebase. The right panel shows score distribution by pathway.
```

Scroll to drug candidates.

Say:

```txt
The platform then generates a drug-repurposing shortlist. These are not treatment recommendations. They are candidate classes for research discussion, with evidence category, matched pathway, limitations, and next validation steps.
```

Click EGFR inhibitor class.

Say:

```txt
The explainability panel shows why the candidate was ranked: EGFR L858R maps to EGFR/ERBB signalling, and the candidate class targets the same pathway. The system also states the limitation and the validation required.
```

## 2:10–2:40 — Report

Click Report.

Say:

```txt
The output becomes an explainable research-use report. It summarises the dataset, top mutation signals, top drug-repurposing hypotheses, evidence provenance, and recommended validation steps.
```

Point to disclaimer.

Say:

```txt
We keep the boundary clear: this is for expert review and retrospective validation, not clinical action.
```

## 2:40–3:00 — Architecture + closing

Click Architecture.

Say:

```txt
Phase 2 uses local deterministic scoring to demonstrate the protected workflow. The future validated architecture connects de-identified genomic datasets, bioinformatics preprocessing, AI mutation ranking, hybrid quantum/classical ranking, evidence knowledgebases, and report/API output.
```

Close with:

```txt
Our first commercial step is a paid research pilot with a cancer research lab or genomics provider, where we validate ranking quality against retrospective datasets and expert review.
```

## Q&A defence lines

### Is this diagnostic?

```txt
No. Phase 1 and Phase 2 are research-use only. Clinical diagnostic use would require future regulatory and clinical validation.
```

### Is the quantum layer real?

```txt
In this prototype, the hybrid layer is simulated as a compatibility-ranking module. The plan is to benchmark it against classical baselines before claiming performance advantage.
```

### Who pays?

```txt
The first payer is a cancer research lab, genomics provider, or oncology R&D group paying for a research analytics pilot.
```

### What is the first pilot outcome?

```txt
A validated case study showing time-to-shortlist reduction, expert usefulness rating, and ranking agreement against retrospective evidence.
```
