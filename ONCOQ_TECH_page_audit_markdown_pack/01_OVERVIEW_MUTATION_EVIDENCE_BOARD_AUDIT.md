# Page Audit — Overview / Mutation Evidence Board

## Current page verdict

The overview page is visually the cleanest, but it still fails as a product landing workspace. It shows many metrics and cards, but it does not clearly guide the target user through the actual research task.

The page currently feels like:
> A generic SaaS admin homepage with oncology words pasted into cards.

It should feel like:
> A research command centre that tells the user exactly which cohort is active, what mutation evidence has been produced, what requires expert review, and what the next decision is.

---

## 1. Main problems

### 1.1 Weak page purpose

Current title:
> Mutation Evidence Board

This is acceptable, but the subtitle and first hero card are weak. “Start a cohort analysis or continue the latest evidence review” is generic.

The page should immediately answer:
- Which cohort is active?
- What has been scored?
- Which signals need review?
- What is ready for report?
- What is blocked?
- What should the researcher do next?

### 1.2 Too many repeated cards

The page has:
- Cohorts
- Samples
- Signals
- Review
- Top signal
- Review queue
- Workflow actions
- Cohort details
- Run health
- Pathway distribution
- Recent runs
- Recent activity
- Review boundary

This is too much for an overview. It dilutes attention.

### 1.3 Metrics lack meaning

Examples:
- “Review 88”
- “Success 60%”
- “Avg run 177s”
- “Pipeline healthy”

These are not meaningful without context. A researcher wants to know:
- What evidence is ready?
- What is uncertain?
- What requires human review?
- What can be exported?

### 1.4 The page does not show the selected IP strongly

The product should connect to the chosen IP / system purpose. The overview should explicitly say:
- hybrid AI/quantum or AI-assisted mutation scoring, if relevant to your selected IP narrative
- genetic mutation detection / cancer risk / drug repurposing scope
- research-use output, not clinical recommendation

### 1.5 Bottom section is wasted

The “Keep the evidence trail visible before export” section is good as a concept, but it is placed too late and looks like generic compliance copy. It should be part of a permanent research boundary component.

---

## 2. Target user expectation

### Primary user
Bioinformatics analyst, oncology researcher, translational medicine team member, biotech R&D analyst.

### What they need from this page
1. See active cohort and run status.
2. See top evidence-ranked mutation signals.
3. See candidate hypothesis classes.
4. Know what needs review before report export.
5. Jump into the next workflow step.

### What they do not need
- decorative activity cards
- fake operational metrics
- repetitive workflow boxes
- generic “start here” phrases

---

## 3. Recommended information architecture

### Above the fold

1. **Page header**
   - Title: “Evidence workspace”
   - Subtitle: “Rank mutation signals, inspect pathway evidence, and prepare research-use hypotheses for expert review.”

2. **Active cohort panel**
   - Cohort name
   - Cancer type
   - Input type
   - Samples
   - Detected genes
   - Last run
   - Readiness status

3. **Primary next action**
   - If no run: “Run mutation scoring”
   - If run complete: “Review ranked signals”
   - If review complete: “Generate research brief”

4. **Evidence readiness strip**
   - Signals ranked
   - Hypotheses drafted
   - Reviewer-approved
   - Reports ready

### Main content

Left 65%:
- Ranked mutation signals table/card list
- Pathway distribution or evidence distribution

Right 35%:
- Review queue
- Candidate hypothesis classes
- Export readiness

### Bottom
- Recent runs
- Audit trail
- Research-use boundary

---

## 4. Specific section-by-section correction

### 4.1 Header

Current:
> WORKSPACE  
> Mutation Evidence Board  
> Lung adenocarcinoma cohort / research-use review

Issue:
Too generic. “Evidence Board” is good, but “research-use review” is not enough.

Replace with:
> **Evidence workspace**  
> Turn a de-identified mutation cohort into ranked signals, pathway context, and report-ready research hypotheses.

Supporting metadata:
> Active cohort: Lung adenocarcinoma demo · 48 samples · 5 genes · Last scored 24m ago

---

### 4.2 Hero card

Current:
> Start a cohort analysis or continue the latest evidence review.

Problem:
Feels like filler.

Replace with:
> **Next step: review the top-ranked mutation signals**  
> The latest lung adenocarcinoma run produced 15 ranked signals and 5 draft hypothesis classes. Review the evidence trail before exporting the research brief.

Buttons:
- Primary: `Review ranked signals`
- Secondary: `Run new cohort`
- Tertiary text link: `Open report draft`

---

### 4.3 Top signal card

Current:
> Top Signal — EGFR L858R

Better:
> **Highest-priority signal**  
> EGFR L858R · EGFR/ERBB signalling  
> Strong pathway relevance · Matched to EGFR inhibitor class · Needs expert review before report export.

Add:
- score
- evidence tier
- pathway
- limitation
- next validation step

---

### 4.4 Review queue

Current:
> 5 matches · 2 reports ready

Better:
> **Review queue**  
> 5 evidence items require reviewer decision. 3 are eligible for the research brief after expert confirmation.

Status breakdown:
- 2 ready for report
- 2 need evidence check
- 1 limitation unresolved

---

### 4.5 Metric cards

Current:
- Cohorts 3
- Samples 136
- Signals 15
- Review 88

Replace with:
- Active samples: 48
- Ranked signals: 15
- Draft hypotheses: 5
- Report-ready items: 2

Reason:
These metrics map to the actual workflow.

---

### 4.6 Top mutation signals

Current card list is usable but too shallow.

Rebuild as:

| Rank | Signal | Pathway | Evidence tier | Review state | Action |
|---|---|---|---|---|---|
| 1 | EGFR L858R | EGFR/ERBB | Strong | Ready for review | Inspect |
| 2 | TP53 R175H | p53/DNA damage | Strong | Needs interpretation | Inspect |
| 3 | KRAS G12C | RAS/MAPK | Moderate | Hypothesis drafted | Inspect |

Add hover/click:
- Open evidence drawer
- See matched gene
- See pathway reason
- See limitation
- Add reviewer note

---

### 4.7 Hypotheses panel

Current:
> Candidate shortlist

Better:
> **Draft hypothesis classes**  
> Candidate classes generated from matched pathway context. These are research hypotheses, not treatment recommendations.

Each card:
- Class: EGFR inhibitor class
- Linked signal: EGFR L858R
- Match basis: EGFR/ERBB pathway activation
- Evidence state: Ready for expert review
- Next action: Confirm evidence trail

---

### 4.8 Cohort details

Current cohort details are okay but too low on page.

Move active cohort details higher. Include:
- Cohort
- Cancer type
- Input format
- Samples
- Genes detected
- Date uploaded
- De-identification status
- Schema status

Copy:
> **Cohort intake summary**  
> The uploaded file is de-identified and matches the required mutation schema. Five genes were detected and mapped into pathway-level evidence.

---

### 4.9 Pathway chart

Current chart is visually acceptable but lacks interpretation.

Add chart explanation:
> EGFR/ERBB and p53 pathways dominate the current evidence distribution. Use this to prioritize reviewer attention, not to infer clinical action.

Add empty state if no pathway selected:
> Select a pathway to view linked variants and hypothesis classes.

---

### 4.10 Recent activity

Current activity is generic.

Replace with audit trail:
- `24m ago · Amir ran scoring on LUAD demo`
- `21m ago · EGFR L858R marked report-ready`
- `18m ago · Report rep-0023 exported`
- `12m ago · Lim added note to KRAS G12C`

Make it useful:
- clickable entity IDs
- filter by user
- filter by cohort

---

## 5. Rewritten page copy

```md
# Evidence workspace

Turn a de-identified mutation cohort into ranked signals, pathway context, and report-ready research hypotheses.

Active cohort: Lung adenocarcinoma demo · 48 samples · 5 genes · Last scored 24m ago

## Next step: review ranked signals

The latest run produced 15 mutation signals and 5 draft hypothesis classes. Review the evidence trail, confirm limitations, and decide what can be included in the research brief.

[Review ranked signals] [Run new cohort] [Open report draft]

## Highest-priority signal

EGFR L858R  
EGFR/ERBB signalling · Strong evidence tier · Score 94

Matched to EGFR inhibitor class. Requires expert review before inclusion in any downstream research plan.

[Inspect evidence]

## Research-use boundary

ONCOQ.TECH supports research planning only. Outputs are not diagnostic, prescribing, or treatment recommendations. Expert review and retrospective validation are required before downstream use.
```

---

## 6. UI rebuild checklist

- [ ] Remove generic “Start here” phrasing.
- [ ] Replace fake dashboard metrics with workflow metrics.
- [ ] Move active cohort details above fold.
- [ ] Show primary next action based on workflow state.
- [ ] Convert “Review 88” into meaningful evidence readiness.
- [ ] Add evidence tier and review status to top mutation cards.
- [ ] Add explanation below pathway chart.
- [ ] Make audit trail useful and clickable.
- [ ] Ensure bottom boundary is always visible but not dominant.
- [ ] Reduce total number of cards by 30–40%.

---

## 7. Developer prompt for Copilot / Claude

```md
Redesign the Overview page into a focused oncology evidence workspace.

Goals:
1. The page must immediately show the active cohort, latest scoring result, ranked mutation signals, draft hypothesis classes, and next action.
2. Remove generic SaaS copy and replace it with research-specific language.
3. Replace decorative metrics with workflow metrics:
   - active samples
   - ranked signals
   - draft hypotheses
   - report-ready items
4. Move the active cohort summary above the fold.
5. Create a main content grid:
   - left 65%: ranked mutation signals + pathway distribution
   - right 35%: review queue + hypothesis classes + export readiness
6. Add a persistent research-use boundary component:
   “Research-use only. Not diagnostic, prescribing, or treatment recommendation. Expert review and retrospective validation required.”
7. Fix spacing, card hierarchy, and text density.
8. All cards must have real user purpose. Remove cards that do not lead to a decision or action.
9. Ensure responsive layout does not overflow or create huge blank space.
10. Use navy, signal blue, and teal consistently.

Do not create a generic admin dashboard. This page is a command centre for translational oncology evidence review.
```
