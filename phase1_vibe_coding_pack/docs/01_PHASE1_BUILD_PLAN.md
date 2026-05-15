# 01 — Phase 1 Build Plan

## Phase 1 objective
Create a working visual prototype that judges can understand in a 5-minute pitch.

## Non-negotiable outputs
1. Landing/dashboard screen
2. Dataset upload/select screen
3. Mutation ranking screen
4. Drug-repurposing shortlist screen
5. Explainability/evidence screen
6. Report preview/export screen
7. Architecture diagram slide or page

## Day 1 coding priorities

### Priority A — Build the story flow
Do this first:
- Create route structure.
- Create navigation/sidebar.
- Load mock mutation dataset.
- Show upload/select dataset step.
- Show final ranked results.

### Priority B — Make it visually credible
Use a clean biotech SaaS style:
- White/soft background
- Green/blue clinical accents
- Glassmorphism cards
- Clear tables
- Evidence badges
- Confidence meters
- Minimal but premium dashboard design

### Priority C — Add explainability
Each ranked drug must show:
- Target gene/pathway
- Matched mutation
- Evidence type
- Confidence score
- Research-use limitation

### Priority D — Prepare demo mode
Add a `Demo Dataset` button so the pitch presenter can run the flow without depending on file upload.

## Recommended file structure

```text
src/
  app/
    page.tsx
    dashboard/page.tsx
    analysis/page.tsx
    results/page.tsx
    report/page.tsx
  components/
    app-shell.tsx
    upload-card.tsx
    mutation-table.tsx
    drug-ranking-card.tsx
    evidence-panel.tsx
    confidence-badge.tsx
    report-preview.tsx
    architecture-flow.tsx
  lib/
    mock-analysis.ts
    scoring.ts
    types.ts
  data/
    demo-mutations.json
    demo-drugs.json
    evidence-links.json
```

## Phase 1 feature checklist

### Must have
- [ ] Demo dataset selector
- [ ] Mutation ranking table
- [ ] Drug ranking cards
- [ ] Evidence/explanation panel
- [ ] Report preview
- [ ] Research-use disclaimer
- [ ] Basic architecture flow

### Nice to have
- [ ] CSV upload parser
- [ ] Recharts confidence chart
- [ ] Animated progress/loading states
- [ ] PDF export placeholder
- [ ] Dark/light mode toggle

### Do not build in Phase 1
- Real clinical prediction engine
- Real patient risk output
- Real hospital EHR integration
- Real quantum backend
- Payment system
- Login/auth unless time is available

## Sprint timeline

### 0–1 hour
Create app skeleton, routes, layout, and navigation.

### 1–2 hours
Build mock data and types.

### 2–4 hours
Build upload/select and mutation analysis screens.

### 4–6 hours
Build drug-repurposing ranking and explainability screens.

### 6–8 hours
Build report preview and demo script flow.

### Overnight polish
Improve visual hierarchy, loading animation, empty states, and pitch demo reliability.
