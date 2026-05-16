# Page Audit — Customer Pilot Tracker

## Current page verdict

This page is commercially important, but it currently mixes CRM, financial metrics, and ROI calculator in a way that feels shallow and not credible. It should demonstrate how the product can become a real business from the university IP. Instead, it currently looks like a generic SaaS sales dashboard.

The page should connect the technical workflow to buyer value:
- saves analyst time
- standardises evidence review
- produces client-ready research briefs
- supports pilot contracts
- enables SaaS or service revenue

---

## 1. Main problems

### 1.1 Commercial claims need stronger logic

Current:
- MRR RM 53,334
- Pipeline value RM 480,000
- estimated workflow value RM 95,040
- payback months

These may be useful, but they look arbitrary. Add assumptions clearly:
- cohorts per year
- manual hours per cohort
- analyst rate
- automated time reduction
- pilot fee
- SaaS subscription fee
- number of analysts

### 1.2 Pilot table lacks buyer pain

The table shows customers, stage, tier, MRR, contract, started, health. But it does not show:
- use case
- pain point
- dataset size
- expected deliverable
- decision maker
- next meeting
- blocker

### 1.3 ROI calculator is too narrow

The calculator focuses on analyst hours and rate. Add:
- manual review baseline
- ONCOQ-assisted review estimate
- time saved
- report turnaround improvement
- number of cohorts
- pilot fee comparison
- annual value

### 1.4 Commercial page should be separate from research workspace

It is okay as admin tool, but the page should not feel like part of the scientific workflow. It should be clearly labelled:
> Commercial pilot planning, not research output.

### 1.5 Copy is generic

Current:
> Translate cohort workload into pilot value

Better:
> Estimate how much analyst review time a pilot can save when cohort-level mutation evidence is ranked, structured, and exported automatically.

---

## 2. Correct page objective

This page should answer:
> Which organisations are testing the product, what workflow pain are we solving, and what commercial value can a pilot demonstrate?

---

## 3. Recommended page structure

### Header

```md
# Pilot pipeline

Track research pilots, buyer use cases, commercial stage, and estimated analyst-time savings.
```

Subheader:
> Commercial planning view. Does not create research or clinical claims.

### Top metrics

- Active pilots
- Pilot revenue
- Pipeline value
- Renewals due
- Average analyst hours saved

### Pilot table

Columns:
- Customer
- Use case
- Stage
- Buyer
- Cohorts/year
- Pilot value
- Health
- Next action

### Pilot detail side panel

When clicking a customer:
- organisation
- buyer
- use case
- cohort type
- baseline manual process
- ONCOQ workflow
- expected deliverables
- blockers
- next meeting
- commercial model

### ROI calculator

Inputs:
- cohorts/year
- manual hours/cohort
- ONCOQ-assisted hours/cohort
- analyst rate
- number of analysts
- pilot fee
- SaaS fee

Outputs:
- manual cost/year
- assisted cost/year
- estimated time saved
- estimated value
- payback period
- suggested pilot scope

---

## 4. Rewritten page copy

```md
# Pilot pipeline

Track research pilots, buyer use cases, commercial stage, and estimated analyst-time savings.

Commercial planning view. This page does not create research, diagnostic, or clinical claims.

## Pilot value model

Estimate how much analyst review time a partner can save when cohort-level mutation evidence is ranked, structured, and packaged into a research-use brief.

Manual baseline: 1,440 analyst hours/year  
ONCOQ-assisted estimate: 648 analyst hours/year  
Estimated time saved: 792 hours/year  
Estimated internal value: RM 95,040/year

## Active pilots

Track each pilot by use case, cohort workload, decision maker, next action, and commercial health.
```

---

## 5. Improved pilot table

| Customer | Use case | Stage | Buyer | Cohorts/year | Pilot value | Health | Next action |
|---|---|---|---|---|---|---|---|
| Pantai BioLabs | LUAD research review | Pilot | Dr. Tan Wei Lin | 8 | RM50,000 | On track | Confirm validation scope |
| Sunway Oncology Research | Breast carcinoma evidence brief | SaaS | Dr. Aiman Rashid | 12 | RM120,000 | On track | Renewal meeting |
| Universiti Malaya OncoLab | CRC retrospective validation | Pilot | Prof. Lim Boon Eng | 6 | RM50,000 | Watch | Await benchmark data |

---

## 6. ROI calculator correction

### Input labels

Replace:
- Bioinformatics analysts
- Internal analyst rate
- Manual hours per cohort
- Cohorts analysed/year

With clearer:
- Analyst team size
- Fully-loaded analyst rate
- Manual review hours per cohort
- ONCOQ-assisted hours per cohort
- Cohorts reviewed per year
- Pilot fee
- SaaS annual fee

### Output cards

- Manual review cost/year
- ONCOQ-assisted cost/year
- Estimated hours saved
- Estimated value saved
- Payback vs pilot fee
- Payback vs annual SaaS

### Add assumptions box

```md
Assumptions:
- Estimates are for research workflow planning only.
- Savings depend on dataset complexity, reviewer depth, and customer process.
- Does not include clinical validation, regulatory review, or implementation services.
```

---

## 7. Required features

- Pilot detail drawer
- Next action tracking
- Buyer persona field
- Use case field
- Dataset/cohort volume field
- SOW export
- ROI assumptions
- Commercial stage filter
- Renewal reminders
- Health reason, not just status

---

## 8. UI rebuild checklist

- [ ] Rename page to “Pilot pipeline.”
- [ ] Add commercial planning boundary.
- [ ] Replace generic CRM metrics with pilot-specific metrics.
- [ ] Add use case and buyer to table.
- [ ] Add pilot detail drawer.
- [ ] Add ROI assumptions.
- [ ] Show manual vs assisted cost.
- [ ] Add next action and blocker.
- [ ] Make SOW export credible with scope items.
- [ ] Avoid unsupported revenue claims unless assumptions are visible.

---

## 9. Developer prompt

```md
Rebuild the Customer Pilot Tracker into a credible pilot pipeline and ROI planning page.

Required:
1. Header:
   - “Pilot pipeline”
   - subtitle: “Track research pilots, buyer use cases, commercial stage, and estimated analyst-time savings.”
2. Boundary note:
   - “Commercial planning view. Does not create research, diagnostic, or clinical claims.”
3. Top metrics:
   - active pilots
   - pilot revenue
   - pipeline value
   - renewals due
   - estimated analyst hours saved
4. Pilot table columns:
   - customer
   - use case
   - stage
   - buyer
   - cohorts/year
   - pilot value
   - health
   - next action
5. Pilot detail drawer:
   - buyer
   - use case
   - cohort type
   - baseline manual workflow
   - ONCOQ-assisted workflow
   - expected deliverables
   - blockers
   - next meeting
   - commercial model
6. ROI calculator:
   - analyst team size
   - analyst rate
   - manual hours per cohort
   - assisted hours per cohort
   - cohorts per year
   - pilot fee
   - SaaS fee
7. ROI outputs:
   - manual cost/year
   - assisted cost/year
   - hours saved
   - estimated value saved
   - payback vs pilot
   - payback vs SaaS
8. Include assumptions and limitations clearly.
9. Remove generic CRM copy.
10. Make this page prove commercial thinking for deep-tech judges.
```
