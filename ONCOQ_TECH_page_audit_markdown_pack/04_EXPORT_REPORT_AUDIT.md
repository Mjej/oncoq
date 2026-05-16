# Page Audit — Export Research Reports

## Current page verdict

The export page is functional-looking but too much like a generic document table. It does not show what a research report contains, why it is safe to share, or what evidence trail is included.

For a deep-tech challenge, the report export page should prove that the system can package complex mutation evidence into a controlled, research-use deliverable.

---

## 1. Main problems

### 1.1 The page is too generic

Current title:
> Export research reports

This is fine, but the rest of the page looks like any SaaS file manager.

It should communicate:
- report type
- evidence included
- reviewer status
- limitations included
- validation steps included
- client-facing readiness

### 1.2 Report table lacks trust signals

The table has:
- title
- cohort
- template
- status
- generated
- size
- owner
- actions

But it does not show:
- number of signals included
- reviewer approval count
- unresolved limitations
- evidence sources/provenance
- research boundary included
- client visibility

### 1.3 Generate report button lacks context

A user should know what will be generated:
- research brief
- validation memo
- client review brief
- pilot SOW

Currently “Generate report” is too broad.

### 1.4 No preview structure

A report page should show a preview of the report sections:
- cohort summary
- ranked signals
- hypothesis classes
- limitations
- validation plan
- research-use boundary
- audit trail

### 1.5 No approval gate

Reports should not be generated freely if evidence is not reviewed. There must be a readiness gate.

---

## 2. Correct page objective

This page should answer:
> Which evidence has been reviewed, what report can be safely generated, and what limitations will be included?

---

## 3. Recommended page layout

### Header

```md
# Research brief export

Package reviewed mutation signals, hypothesis classes, limitations, and validation notes into a research-use deliverable.
```

Primary action:
- `Generate research brief`

Secondary:
- `Preview latest brief`
- `Open client view`

### Readiness gate

```md
## Export readiness

15 ranked signals  
5 hypothesis classes  
3 accepted for report  
2 still require evidence review  
Research-use boundary included
```

Status:
- Ready to export
- Export blocked
- Needs reviewer approval

### Report template cards

Instead of only table:
1. Research brief
2. Validation memo
3. Client review brief
4. Pilot SOW

Each card should state:
- purpose
- included sections
- audience
- status

### Report table

Keep table but add:
- evidence items
- unresolved limitations
- visibility
- last reviewer

---

## 4. Report generation modal

When clicking “Generate report,” show modal:

```md
Generate research brief

Cohort: Lung adenocarcinoma demo
Signals to include: 3 accepted, 2 pending excluded
Hypotheses: EGFR inhibitor class, MEK pathway inhibitor class
Boundary: Research-use only statement included
Validation notes: Included
Audit trail: Included

[Generate brief] [Cancel]
```

Add option:
- Include pending items as appendix
- Exclude unresolved limitations
- Include reviewer notes
- Include audit trail

---

## 5. Better report statuses

Current:
- Ready
- Draft
- Archived

Better:
- `Draft`
- `Needs reviewer approval`
- `Ready for client review`
- `Exported`
- `Archived`

---

## 6. Rewritten page copy

```md
# Research brief export

Package reviewed mutation signals, candidate hypothesis classes, limitations, and validation notes into a controlled research-use deliverable.

5 reports total · 3 ready for client review · 2 require reviewer action

## Export readiness

The latest lung adenocarcinoma run has 15 ranked signals. Three evidence items are accepted for report export. Two items still require evidence review and will be excluded unless approved.

[Generate research brief] [Preview latest brief]

## Report templates

### Research brief
For internal research and translational review. Includes ranked signals, pathway context, hypothesis classes, limitations, and validation next steps.

### Validation memo
For retrospective benchmark discussion. Includes score comparison, reviewer agreement, and unresolved validation questions.

### Client review brief
For read-only external review. Includes only accepted evidence items and the research-use boundary.

### Pilot SOW
For commercial pilot planning. Includes cohort volume, workflow scope, deliverables, and estimated analyst time.
```

---

## 7. Improved table

| Title | Cohort | Type | Evidence included | Limitations | Status | Visibility | Owner | Actions |
|---|---|---|---|---|---|---|---|---|
| LUAD research brief | Lung adenocarcinoma | Research brief | 3 accepted | 2 unresolved excluded | Ready for client review | Client portal | Amir | Preview |
| BRCA validation memo | Breast carcinoma | Validation memo | 4 reviewed | 1 unresolved | Ready | Internal only | Amir | Preview |

---

## 8. Required features

- Report template selector
- Evidence inclusion checklist
- Export readiness gate
- Report preview drawer
- Client visibility toggle
- Audit trail inclusion
- Reviewer sign-off indicator
- Research boundary auto-inclusion
- Download/export button
- Duplicate/archive actions

---

## 9. UI rebuild checklist

- [ ] Replace generic file manager layout with report readiness workflow.
- [ ] Add export readiness summary.
- [ ] Add report template cards.
- [ ] Add included evidence count to report table.
- [ ] Add unresolved limitations count.
- [ ] Add client visibility state.
- [ ] Add report generation modal.
- [ ] Add reviewer approval gate.
- [ ] Improve button labels.
- [ ] Remove generic “Use this step…” copy.

---

## 10. Developer prompt

```md
Redesign the Export Report page as a research brief export workflow, not a generic file manager.

Required sections:
1. Header:
   - “Research brief export”
   - subtitle explaining reviewed mutation signals, hypotheses, limitations, validation notes.
2. Export readiness card:
   - ranked signals
   - accepted for report
   - pending review
   - unresolved limitations
   - research-use boundary included
3. Primary CTA:
   - Generate research brief
4. Report template cards:
   - Research brief
   - Validation memo
   - Client review brief
   - Pilot SOW
5. Report table with columns:
   - title
   - cohort
   - type
   - evidence included
   - unresolved limitations
   - status
   - visibility
   - owner
   - actions
6. Generate report modal:
   - select template
   - select evidence inclusion
   - include reviewer notes
   - include audit trail
   - include research-use boundary
7. Statuses:
   - Draft
   - Needs reviewer approval
   - Ready for client review
   - Exported
   - Archived
8. Remove generic SaaS wording.
9. Make the page prove safety, provenance, and report readiness.
```
