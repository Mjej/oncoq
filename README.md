# OncoQ.tech Phase 2 Prototype

OncoQ.tech is a research-use oncology analytics prototype for ranking mutation relevance signals and drug-repurposing hypotheses from de-identified genomic datasets.

This repository contains a Next.js + TypeScript frontend implementation built from the `phase1_vibe_coding_pack` and `oncoq_phase_correction_pack` specifications.

## Phase Implementation Plan

1. **Foundation** - Next.js app router, TypeScript, Tailwind, local mock data, and safe product wording.
2. **Analysis Logic** - deterministic prototype scoring, mutation ranking, drug-hypothesis ranking, score breakdowns, and dataset summaries.
3. **Core Experience** - dashboard, dataset analysis flow, mutation results, drug shortlist, explainability, report, architecture, validation, and pilot pages.
4. **Trust and Safety** - research-use disclaimers, evidence badges, limitations, validation steps, provenance, and no clinical recommendation language.
5. **Demo Reliability** - local TypeScript data, no backend dependency, responsive layouts, and projector-friendly screens.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start the development server.
- `npm run build` - create a production build.
- `npm run start` - run the production server.
- `npm run lint` - run ESLint.

## Product Boundary

This prototype is research-use decision support only. It does not diagnose cancer, predict patient outcomes, recommend treatment, or claim clinical validation.