# Page Audit — Review Mutation Evidence

## Current page verdict

This is the most important product page, but it is also the most broken. It should be the core “wow” page because this is where the system proves that it can transform mutation data into evidence-backed research hypotheses. Instead, the page currently has severe layout corruption, a compressed right rail, excessive vertical scrolling, and generic evidence cards.

This page must be rebuilt.

---

## 1. Critical corruption issues

### 1.1 Right hypothesis rail is broken

The right panel stacks many hypothesis cards vertically in a very narrow column. This causes:
- unreadable text
- cramped cards
- repeated information
- extremely long page height
- weak visual hierarchy
- impossible scanning

Fix:
- Do not use a narrow right rail for all hypotheses.
- Use either:
  - tabs,
  - expandable drawers,
  - a bottom panel,
  - or a 2-column hypothesis grid below the table.

### 1.2 Main table is too wide but underused

The mutation table has many columns:
- rank
- gene
- variant
- pathway
- evidence
- prototype score
- interpretation
- limitation
- next validation

This is good conceptually, but the text is small and squeezed. The table needs better interaction.

Fix:
- Keep table summary columns short.
- Move long interpretation / limitation / next validation into a detail drawer.

Recommended table columns:
| Rank | Signal | Pathway | Evidence tier | Score | Review state | Action |
|---|---|---|---|---|---|---|

Clicking a row opens the evidence drawer.

### 1.3 Detail panel is too low

The “Evidence details” section appears only at the bottom after long scrolling. It should open immediately when a mutation row is selected.

Fix:
- Use sticky detail drawer on the right for selected mutation, or
- Use full-width expandable row.

### 1.4 Page lacks reviewer workflow

A researcher must be able to:
- approve for report
- request more evidence
- reject hypothesis
- add note
- assign reviewer
- mark limitation unresolved
- export selected evidence

Current page mostly displays data; it does not support decision-making.

### 1.5 No strong explanation of scoring logic

The page says signals are ranked but does not explain why. Users need to see:
- matched gene
- matched variant
- matched pathway
- evidence category
- score components
- limitation
- next validation

---

## 2. Correct page objective

This page should answer:
> Which mutation signals are worth reviewing, why were they ranked, and what evidence/limitations must be checked before reporting?

---

## 3. Recommended page layout

### Header
```md
# Evidence review board

Inspect ranked mutation signals, pathway matches, limitations, and draft hypotheses before report export.

Run: run-2026-0142 · Cohort: Lung adenocarcinoma demo · 15 signals · 5 draft hypotheses
```

Actions:
- `Export CSV`
- `Generate report`
- `Open reviewer mode`

### Main layout

Use a two-zone layout:

#### Zone A — Evidence table
Full width, compact, scannable.

Columns:
- Rank
- Signal
- Cancer pathway
- Evidence tier
- Score
- Hypothesis link
- Review state
- Action

#### Zone B — Selected signal drawer
When user clicks a signal:
- summary
- evidence match
- score breakdown
- interpretation
- limitation
- next validation
- reviewer decision
- linked hypothesis

This replaces the corrupted right rail.

### Optional bottom zone
Hypothesis cards in 2 or 3 columns.

---

## 4. Rebuild table structure

### Current problem
Too much prose inside table cells.

### New table

| Rank | Signal | Pathway | Tier | Score | Hypothesis | Status | Action |
|---|---|---|---|---|---|---|---|
| 1 | EGFR L858R | EGFR/ERBB | Strong | 94 | EGFR inhibitor class | Ready for review | Inspect |
| 2 | TP53 R175H | p53/DNA damage | Strong | 88 | p53 pathway reactivation concept | Needs evidence | Inspect |
| 3 | KRAS G12C | RAS/MAPK | Moderate | 82 | MEK pathway inhibitor class | In review | Inspect |

Each row opens detail.

---

## 5. Evidence detail drawer

### Required content

```md
## EGFR L858R

Pathway: EGFR/ERBB signalling  
Evidence tier: Strong  
Prototype score: 94  
Review state: Ready for expert review

### Why this signal ranked highly
EGFR L858R maps directly to EGFR/ERBB signalling and is linked to an EGFR inhibitor hypothesis class in this research workflow.

### Evidence match
- Matched gene: EGFR
- Matched variant: L858R
- Matched pathway: EGFR/ERBB signalling
- Evidence category: Strong research evidence

### Interpretation
This signal is relevant because the variant is pathway-defining in the current cohort context and supports review of an EGFR-focused research hypothesis.

### Limitation
This output does not confirm patient response, clinical eligibility, or treatment suitability. Evidence must be checked by a qualified reviewer.

### Next validation
Compare against curated evidence sources, check cohort context, and document reviewer notes before inclusion in the research brief.

### Reviewer decision
[Approve for report] [Needs more evidence] [Reject] [Add note]
```

---

## 6. Hypothesis cards correction

### Current issue
The right cards repeat:
- candidate class
- target/pathway
- matched mutation signal
- prototype compatibility score
- limitation
- next validation

This is useful, but the layout is unusable.

### New design
Place hypothesis cards under the selected mutation or in a tabbed panel.

Card structure:
```md
## EGFR inhibitor class

Linked signal: EGFR L858R  
Match basis: EGFR/ERBB pathway involvement  
Evidence status: Strong  
Prototype compatibility score: 94

Research hypothesis:
Explore EGFR-focused inhibitor class relevance for this cohort under expert-reviewed research conditions.

Limitations:
Not a clinical recommendation. Requires curated source review, cohort stratification, and retrospective validation.

Next validation:
Confirm evidence provenance and reviewer acceptance before report export.

[Mark report-ready] [Add reviewer note]
```

### Important language correction
Avoid saying “drug recommendation.” Use:
- candidate class
- research hypothesis
- repurposing hypothesis
- pathway class
- expert review required

---

## 7. Search/filter correction

Current filters:
- gene
- pathway
- sort
- search

Improve:
- Search by gene, variant, pathway, hypothesis
- Filter by evidence tier: Strong / Moderate / Emerging / Weak
- Filter by review state: Pending / Report-ready / Needs evidence / Rejected
- Filter by pathway
- Sort by score, rank, latest reviewed

---

## 8. Rewritten page copy

```md
# Evidence review board

Inspect ranked mutation signals, pathway matches, limitations, and draft hypotheses before report export.

Run: run-2026-0142 · Lung adenocarcinoma demo · 15 signals · 5 draft hypotheses

## Research-use boundary

This board supports expert research review. It does not generate clinical diagnosis, treatment selection, or prescribing advice.

## Ranked mutation signals

Review the top-ranked signals first. Open a row to inspect the evidence trail, scoring rationale, limitation, and linked hypothesis class.

[Search gene, variant, pathway...] [Evidence tier] [Review state] [Pathway] [Sort by score]

## Selected signal

EGFR L858R ranks highest because it maps to EGFR/ERBB signalling and links to an EGFR inhibitor hypothesis class. Review the evidence match and limitation before marking it report-ready.
```

---

## 9. Reviewer workflow states

Use these states:
- `Pending review`
- `Needs evidence`
- `Accepted for report`
- `Rejected`
- `Limitation unresolved`

Do not use vague states like:
- “Strong” alone
- “Healthy”
- “Review”
- “Ready” without context

---

## 10. UI rebuild checklist

- [ ] Remove long right-side hypothesis rail.
- [ ] Convert hypothesis cards into tabbed panel or grid.
- [ ] Shorten table cells.
- [ ] Move long interpretation/limitation into detail drawer.
- [ ] Add reviewer decision buttons.
- [ ] Add reviewer notes.
- [ ] Add evidence trail section.
- [ ] Add score breakdown.
- [ ] Add filter by evidence tier and review status.
- [ ] Add selected mutation state.
- [ ] Prevent page from becoming extremely tall.
- [ ] Make evidence detail visible above the fold after row selection.

---

## 11. Developer prompt

```md
Rebuild the Review Evidence page. It is currently corrupted because the right hypothesis rail is too narrow and creates extreme vertical scrolling.

New layout:
1. Header:
   - Evidence review board
   - run ID, cohort, signal count, hypothesis count
   - actions: Export CSV, Generate report
2. Research-use boundary banner.
3. Filter bar:
   - search gene/variant/pathway
   - evidence tier
   - review state
   - pathway
   - sort by score
4. Main evidence table with only compact columns:
   - rank
   - signal
   - pathway
   - evidence tier
   - score
   - linked hypothesis
   - review state
   - action
5. When a row is selected, open an evidence detail drawer or right panel with:
   - why this signal ranked
   - matched gene
   - matched variant
   - matched pathway
   - evidence category
   - interpretation
   - limitation
   - next validation
   - reviewer note
   - reviewer decision buttons
6. Move hypothesis cards into:
   - a tab inside selected detail panel, OR
   - a 2/3-column grid below the table.
7. Remove the long vertical right rail entirely.
8. Fix all text overflow and card width issues.
9. Use research-safe wording:
   - candidate class
   - research hypothesis
   - expert review required
   - not clinical recommendation
10. Add reviewer workflow states:
   - Pending review
   - Needs evidence
   - Accepted for report
   - Rejected
   - Limitation unresolved
```
