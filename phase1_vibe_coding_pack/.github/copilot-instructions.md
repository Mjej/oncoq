# GitHub Copilot Instructions — BioQuantum Oncology

You are assisting with a hackathon prototype for BioQuantum Oncology.

## Product context
This is a research-use oncology analytics platform. It helps oncology R&D teams analyse de-identified mutation data and rank drug-repurposing hypotheses.

## Safety and wording rules
Never claim the app diagnoses cancer, predicts real patient outcomes, recommends treatment, or is clinically validated.

Use safe phrases:
- research-use only
- mutation relevance signal
- drug-repurposing hypothesis
- candidate for investigation
- requires retrospective validation
- expert review required

Avoid unsafe phrases:
- diagnosis
- treatment recommendation
- patient risk prediction
- clinically proven
- guaranteed drug response

## Coding style
- Use TypeScript strictly.
- Use clear component names.
- Prefer small reusable components.
- Keep business logic in `lib/`.
- Keep mock data separate from UI components.
- Add comments where mock scoring is used.
- Make UI responsive and projector-friendly.

## Design style
- Premium clinical SaaS dashboard.
- Soft white background.
- Green/blue accents.
- Glassmorphism cards.
- Rounded corners.
- Clear spacing.
- No heavy purple AI gradients.

## Phase 1 constraints
- No real backend required.
- No real quantum backend required.
- No real medical dataset required.
- Use local JSON mock data.
- Prioritise pitch reliability over complex engineering.

## Demo flow
The app should support this click path:
Dashboard → Analysis → Results → Explainability → Report → Architecture

## Required pages
- `/`
- `/dashboard`
- `/analysis`
- `/results`
- `/report`
- `/architecture`

## Required components
- AppShell
- MetricCard
- UploadCard
- MutationTable
- DrugRankingCard
- EvidencePanel
- ConfidenceBadge
- ReportPreview
- ArchitectureFlow
