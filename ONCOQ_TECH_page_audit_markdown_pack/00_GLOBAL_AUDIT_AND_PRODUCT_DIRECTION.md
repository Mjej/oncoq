# ONCOQ.TECH — Global Product Audit & Rebuild Direction

## 1. Executive verdict

The current product looks polished at first glance, but it does **not yet communicate a strong deep-tech product**. It reads like a static admin dashboard filled with placeholder operational language instead of a working research workflow for oncology mutation evidence review.

The biggest issue is not only visual design. The bigger issue is that the interface does not prove the product’s value to the user.

For the National Deep Tech Challenge, the product must show commercial thinking, meaningful use of the selected IP, market opportunity, feasibility, user-centricity, and strong storytelling. The briefing specifically states that final deliverables should include a structured pitch deck and prototype/demo with selected IP, market opportunity, commercialisation strategy, business model, go-to-market plan, competitive landscape, scaling potential, wireframes/mockups, system flow/architecture, prototype, and pitch deck. It also says the challenge is testing thinking, not just coding skill. Therefore, the UI must communicate “this solves a real workflow problem for oncology researchers / biotech teams / translational medicine users,” not merely “this is a dashboard.” 

## 2. Product positioning problem

Current positioning:
> ONCOQ.TECH produces evidence-ranked mutation signals and drug-repurposing hypotheses.

This is too generic. It sounds like a generated phrase. It does not clearly tell a target user what they can do, why it matters, or why this system is better than manual review.

Better positioning:
> ONCOQ.TECH helps translational oncology teams turn de-identified mutation files into a review-ready evidence board: ranked variants, pathway context, repurposing hypotheses, validation notes, and exportable research briefs.

This is stronger because it names:
- the user: translational oncology teams
- the input: de-identified mutation files
- the output: review-ready evidence board
- the workflow: ranked variants → pathway context → hypotheses → validation notes → brief
- the safety boundary: research review, not clinical recommendation

## 3. Main UX diagnosis

### 3.1 The product has too many dashboards and too little workflow

Most pages repeat the same cards:
- cohort count
- signal count
- report count
- health
- run queue
- “research-use only” warning
- generic workflow steps

This creates dashboard fatigue. The user does not know where to focus.

### 3.2 The hierarchy is weak

Every card looks equally important. Important actions such as:
- upload mutation file
- validate schema
- run score
- inspect top variant
- add reviewer note
- export brief

are not visually distinguished enough.

### 3.3 The language is not target-user native

Target users are likely:
- oncology researchers
- bioinformatics analysts
- translational medicine teams
- biotech R&D teams
- clinical research collaborators
- university IP commercialization judges / mentors

They do not need generic SaaS copy like:
> Start here, then run analysis.

They need confidence-building language:
> Upload a de-identified VCF or annotated mutation table. ONCOQ maps variants to pathway-level evidence, ranks review priority, and prepares a hypothesis shortlist for expert review.

### 3.4 Many pages look corrupted

The most visible corruption appears in:
- the Review Evidence page, where the right hypothesis panel becomes too long and narrow
- Operations page, where topology diagrams overflow and text overlaps
- some cards where copy is squeezed and unreadable
- chart/table balance is poor
- page heights become unrealistic with huge blank spaces

### 3.5 The product lacks a convincing demo narrative

A winning prototype should guide the judge through a story:

1. Research team receives de-identified mutation file.
2. System validates schema and detects genes/variants.
3. System ranks mutation signals by pathway relevance and evidence strength.
4. Researcher opens each signal, sees why it was ranked, checks limitations.
5. System suggests drug-repurposing hypothesis classes.
6. Reviewer approves/rejects hypotheses.
7. System generates a research-use evidence brief.
8. Client/research collaborator sees a controlled read-only view.
9. Admin can monitor pipeline, validation, and pilot value.

The current pages show fragments of this story, but not a coherent end-to-end narrative.

---

## 4. Must-fix information architecture

### New primary navigation

#### Research Workflow
1. **Cohort Intake**
   - Upload CSV / VCF
   - Validate schema
   - De-identification check
   - Cohort metadata

2. **Mutation Scoring**
   - Run local scoring
   - Pathway mapping
   - Evidence ranking
   - Run history

3. **Evidence Board**
   - Ranked mutations
   - Evidence tags
   - Pathway context
   - Reviewer notes
   - Limitations

4. **Hypothesis Shortlist**
   - Candidate drug / pathway classes
   - Match logic
   - Confidence / evidence tier
   - Validation next steps

5. **Research Brief**
   - Export report
   - Review status
   - Client-ready summary
   - Research-use boundary

6. **Client Review Portal**
   - Read-only view
   - Summary of reviewed outputs
   - Report download
   - Validation disclaimer

#### Admin / Commercial
7. **Pipeline Operations**
   - Job health
   - Error logs
   - API / local workflow status

8. **Retrospective Validation**
   - Benchmark comparison
   - Reviewer agreement
   - Top-k precision
   - Ranking stability

9. **Pilot Tracker**
   - Customer pipeline
   - Pilot scope
   - ROI calculator
   - SOW draft

---

## 5. Global design correction

### 5.1 Layout rules

Use a 12-column grid.

Recommended page structure:
- Left sidebar: 260 px fixed
- Main content: max-width 1280–1440 px
- Page header: title, subtitle, primary action
- Workflow status strip: compact, not oversized
- Main working area: 70%
- Context panel: 30%
- Tables: full-width only when needed
- Right panels must not become narrow scroll towers

### 5.2 Card rules

Every card must answer one of these:
- What is the input?
- What is the output?
- What decision must the user make?
- What evidence supports the decision?
- What is the next action?

Remove decorative cards that only display fake metrics.

### 5.3 Typography rules

Use clear hierarchy:
- Page title: 36–44 px
- Section heading: 18–22 px
- Card title: 15–17 px
- Body: 14–16 px
- Table text: 13–14 px
- Labels: 11–12 px uppercase, letter spacing only for true metadata

Current copy uses too many uppercase labels, making the interface feel artificial.

### 5.4 Visual theme correction

The blue/green theme is acceptable, but currently too empty and sterile.

Recommended direction:
- Background: warm off-white or very light blue-gray
- Primary navy: `#063B63` or `#073B5C`
- Signal blue: `#2D9CDB`
- Evidence teal: `#20C7B5`
- Warning amber: `#F4A340`
- Risk red: `#EF5B6A`
- Border: `#D9ECF7`
- Text primary: `#102033`
- Text secondary: `#5D6B7A`

Use color meaning consistently:
- Blue = workflow/navigation
- Teal = verified / evidence-supported
- Amber = needs review
- Red = failed / risk
- Gray = inactive / draft

---

## 6. Global copywriting rules

### Replace generic AI phrases

Avoid:
- “Start here”
- “Use this page to…”
- “Review signals and hypotheses”
- “Research-use only”
- “Prepare a shareable evidence brief”
- “Pipeline snapshot”
- “Candidate shortlist”
- “Degraded”
- “Healthy”

Use:
- “Upload a de-identified cohort and check whether it is ready for scoring.”
- “Rank mutation signals by pathway relevance and evidence strength.”
- “Open each signal to inspect matched gene, pathway, evidence category, limitations, and next validation step.”
- “Export a research brief with reviewer notes and validation boundaries.”
- “This output is for research planning only. It is not a diagnostic, treatment, or prescribing recommendation.”

### Voice of product

The product should sound:
- precise
- research-aware
- clinically careful
- commercial enough for biotech
- not overclaiming
- not generic SaaS

---

## 7. Corruption / implementation defects to fix globally

### Defect list

1. Right-side panels overflow vertically.
2. Text overlaps in small cards and topology diagrams.
3. Dashboard pages have excessive blank vertical space.
4. Tables are too wide or too compressed depending on page.
5. Cards do not have consistent padding.
6. Status badges have inconsistent meanings.
7. Charts lack legends, axis clarity, and interpretation.
8. Important actions are visually weaker than secondary buttons.
9. Client portal looks like another internal dashboard instead of a polished client-facing review.
10. Admin tools are mixed with researcher workflow, causing confusion.

### Frontend rules for repair

- Set `min-width: 0` on grid children.
- Use `overflow-wrap: anywhere` only for IDs/emails, not normal paragraphs.
- Use `line-clamp` for table cells.
- Avoid fixed height cards unless content is known.
- Use `overflow-x-auto` for wide tables.
- Do not place complex diagrams inside narrow cards.
- Use responsive breakpoints:
  - desktop: sidebar + 12-column content
  - tablet: collapsible sidebar
  - mobile: stacked cards only
- Do not use long right rail content. Convert it to tabs or expandable cards.

---

## 8. Rebuilt demo narrative

The prototype should be demoed in this order:

1. **Overview**
   - “This is the command centre for a translational oncology research team.”
   - Show latest cohort, top mutation signals, evidence readiness, and next action.

2. **Cohort Intake / Run Analysis**
   - Upload / select demo cohort.
   - Show schema validation.
   - Show detected genes and sample count.
   - Run score.

3. **Evidence Board**
   - Show ranked mutations.
   - Click EGFR L858R.
   - Explain why it ranks high.
   - Show pathway, evidence tags, limitations, and next validation.

4. **Hypothesis Shortlist**
   - Show candidate classes, not fake drug recommendations.
   - Show “why matched” and “what must be validated next.”

5. **Export Brief**
   - Generate research brief.
   - Show sections included.

6. **Client Portal**
   - Show clean read-only summary.
   - Strong safety boundary.

7. **Validation / Operations / Pilots**
   - Show commercial readiness: reliability, benchmark checks, pilot ROI.

---

## 9. Minimum viable product features needed

### Must have for hackathon

- Upload/select demo cohort
- Schema validation display
- Mutation ranking table
- Evidence detail drawer
- Hypothesis cards with match reason
- Reviewer status: Pending / Accepted for report / Needs evidence / Rejected
- Exportable report preview
- Client-facing read-only page
- Admin monitoring mock
- Retrospective validation mock
- Pilot ROI mock

### Nice to have

- Interactive pathway filter
- Reviewer comments
- CSV export
- Report PDF export
- Comparison of baseline vs prototype
- Role-based view: Researcher / Reviewer / Client / Admin

---

## 10. Final quality bar

The UI should answer these judging questions clearly:

1. **What real problem does this solve?**
   Manual oncology mutation evidence review is slow, fragmented, and hard to package into review-ready outputs.

2. **Who needs it?**
   Translational oncology groups, biotech R&D teams, bioinformatics service labs, and research hospitals running cohort-level mutation review.

3. **What does the technology do?**
   It maps mutation signals to pathway relevance, evidence tags, candidate hypothesis classes, and report-ready provenance.

4. **Why is it feasible?**
   Phase 1 can run locally on structured demo cohorts with deterministic scoring. Future phases can connect validated biomedical databases and expert review workflows.

5. **How does it make money?**
   Pilot projects, SaaS workspace subscriptions, research service bundles, and enterprise/custom deployments.

6. **What is the safety boundary?**
   Research-use only. No clinical diagnosis, treatment selection, or patient-level recommendation without expert review and validation.
