# Phase 2 UI/UX Upgrade Spec

## Visual goal

Phase 2 should look like a premium biotech SaaS platform, not a generic admin dashboard.

The design should feel like:

```txt
Behance-level medical SaaS dashboard + oncology genomics research platform + deep-tech startup pitch demo.
```

## Core layout

Desktop-first layout for pitch demo:

- Fixed left sidebar.
- Main content max-width around 1200–1440px.
- Soft Lab Mist background.
- White cards.
- Rounded panels.
- Subtle shadows.
- Teal/cyan accents.

## Global components

### Sidebar

Items:

- Dashboard
- Analysis
- Results
- Report
- Architecture
- Validation
- Pilot Model

Sidebar footer badge:

```txt
Research-use boundary
Outputs are ranked investigation hypotheses requiring expert review and retrospective validation.
```

### Top page header

Each page should have:

- Page eyebrow label.
- Page title.
- Page subtitle.
- Optional CTA button.

### Research-use alert component

Create reusable component:

```tsx
<ResearchUseAlert />
```

Text:

```txt
These outputs are research hypotheses, not treatment recommendations. Expert review and retrospective validation are required.
```

## Dashboard page upgrade

### Required visual feature

Add `GenomicIntelligenceCanvas`.

Component structure:

```tsx
<GenomicIntelligenceCanvas>
  <DnaHelix />
  <MutationNode label="EGFR L858R" score={94} />
  <MutationNode label="TP53 R175H" score={88} />
  <MutationNode label="KRAS G12D" score={82} />
  <MutationNode label="BRCA1" score={79} />
  <MutationNode label="ALK" score={74} />
</GenomicIntelligenceCanvas>
```

Style:

- large central rounded panel
- pale background gradient
- subtle teal glow
- animated floating nodes
- no heavy neon

### Dashboard content hierarchy

1. Hero card with headline and CTA.
2. Genomic Intelligence Canvas.
3. Demo dataset card.
4. Four key metric cards.
5. Top candidate preview.
6. Workflow progress.

## Analysis page upgrade

Add visual tabs:

- Demo cohort
- Upload CSV
- Schema

Demo cohort tab should be active by default.

Upload zone should say:

```txt
Drop a de-identified CSV or VCF-like dataset
```

Schema tab shows required fields.

## Results page upgrade

### Layout

Two-column layout:

Left:

- Mutation relevance table.
- Drug candidate cards.

Right:

- Pathway score distribution.
- Explainability panel.
- Research-use limitation card.

### Interaction

Clicking a drug candidate updates explainability panel.

Default selected candidate:

```txt
EGFR inhibitor class
```

## Report page upgrade

Make it look like a printable research brief.

Sections:

- Report title.
- Dataset summary.
- Top mutation signals.
- Top drug hypotheses.
- Evidence provenance.
- Recommended validation steps.
- Research-use disclaimer.

Add buttons:

- Export Preview
- Copy Summary
- Back to Results

## Architecture page upgrade

Add visual workflow diagram:

```txt
Genomic Dataset → Preprocessing → AI Mutation Engine → Drug-Target Layer → Hybrid Ranking → Evidence Report
```

Add two cards underneath:

- What is implemented in Phase 2.
- What requires future validation.

## Validation page

New page for Phase 2.

Purpose:
Show judges that the team understands validation.

Sections:

1. Retrospective benchmark plan.
2. Classical AI baseline comparison.
3. Expert review workflow.
4. Data privacy and de-identification.
5. Success metrics.

Success metrics:

- Top-k ranking agreement.
- Time-to-shortlist reduction.
- Expert usefulness rating.
- Evidence provenance completeness.
- Pilot conversion.

## Pilot Model page

New page for Phase 2.

Purpose:
Connect prototype to business model.

Sections:

1. First customer: oncology research labs / genomics providers.
2. Paid pilot: RM50K for 3 months.
3. Annual SaaS: RM120K/year.
4. Enterprise pharma: RM250K–RM500K/year.
5. Six-month milestone: 3 pilots + 1 conversion.

## Motion guidelines

Use subtle animation only:

- Cards fade up.
- Mutation nodes pulse lightly.
- Progress line animates once.
- Candidate cards highlight on hover.

Avoid:

- excessive bouncing
- flashy neon
- distracting particle effects

## Accessibility

- Text must be readable on Lab Mist background.
- Buttons must have visible focus states.
- Do not rely only on color for status.
- Use labels plus icons for evidence categories.
- Ensure table text is large enough for projector display.
