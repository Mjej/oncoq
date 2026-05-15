# BioQuantum Oncology — Phase 1 Vibe Coding Pack

## Purpose
This folder is the working specification pack for building a Phase 1 hackathon prototype of **BioQuantum Oncology**, a research-use oncology decision-support platform.

The Phase 1 goal is not to build a certified medical product. The goal is to create a clear, believable demo that shows how a cancer research lab or genomics R&D team can upload de-identified mutation data and receive ranked mutation-risk signals and drug-repurposing hypotheses.

## Product positioning
**BioQuantum Oncology helps oncology R&D teams convert genomic mutation data into ranked cancer-risk and drug-repurposing hypotheses faster.**

## Phase 1 demo scope
Build a frontend-first prototype with mock data:

1. Upload or select a demo mutation dataset.
2. Display mutation relevance/risk ranking.
3. Display top drug-repurposing candidates.
4. Explain why each candidate was ranked.
5. Export or preview a research-use report.

## Recommended tech stack
- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for simple charts
- Local JSON mock data
- Optional: no backend for hackathon Phase 1

## Important disclaimer
This prototype is **research-use only**. It must not claim to diagnose cancer, predict a real patient's risk, or recommend treatment. Any clinical/diagnostic use would require formal validation, regulatory planning, privacy controls, and medical governance.

## Suggested build order
1. Read `docs/00_MASTER_CONTEXT.md`.
2. Add `.github/copilot-instructions.md` to your repo.
3. Use prompts from `.github/prompts/` in VS Code GitHub Copilot Chat.
4. Build screens from `docs/04_UI_UX_SCREENS.md`.
5. Use data from `mock-data/`.
6. Rehearse using `docs/08_DEMO_SCRIPT_AND_QA.md`.
