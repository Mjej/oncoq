# Copilot / Codex Prompt — Fix Phase 1 Prototype

Paste this into GitHub Copilot Chat, Codex, or ChatGPT inside VS Code.

```md
Act as a senior full-stack frontend engineer, biotech SaaS product designer, and hackathon technical advisor.

We already have a Phase 1 prototype for an oncology research platform. I need you to audit and improve the current codebase without overengineering.

Product name:
OncoQ.tech

Product positioning:
OncoQ.tech is a research-use oncology analytics platform that helps oncology R&D teams analyse de-identified genomic mutation datasets, rank mutation relevance signals, and generate drug-repurposing hypotheses using classical AI logic plus a simulated/prototype hybrid AI-quantum compatibility layer.

Strict product boundary:
Research-use decision support only. Not for clinical diagnosis or treatment recommendation.

Your tasks:

1. Rename the platform consistently to OncoQ.tech.
2. Replace any wording that implies patient diagnosis, treatment recommendation, or clinical prescription.
3. Improve the Dashboard so it has a premium medical/biotech SaaS feeling, inspired by modern healthcare analytics dashboards but not copied from any reference.
4. Add a central Genomic Intelligence Canvas using CSS/SVG/React components:
   - DNA helix or molecular network visual.
   - Floating mutation nodes.
   - Labels: EGFR L858R, TP53 R175H, KRAS G12D, BRCA1 truncating variant, ALK rearrangement signal.
   - Soft teal/cyan glow.
   - Must feel like oncology genomics research, not hospital patient monitoring.
5. Make the user journey obvious:
   Dashboard → Analysis → Results → Report → Architecture.
6. Add a persistent research-use badge and disclaimer across pages.
7. Tighten biological and AI wording:
   - Replace “prediction” with “ranking” or “hypothesis”.
   - Replace “model accuracy” with “benchmark target” unless actual validation exists.
   - Replace “AI confidence” with “prototype relevance score” where appropriate.
8. Improve Results page with:
   - Mutation ranking table.
   - Drug-repurposing hypothesis cards.
   - Evidence category.
   - Limitation.
   - Next validation step.
9. Improve Report page with:
   - Dataset summary.
   - Top mutation relevance signals.
   - Top drug-repurposing hypotheses.
   - Evidence provenance.
   - Validation steps.
   - Research-use disclaimer.
10. Improve Architecture page with two lanes:
   - Phase 1 demo architecture.
   - Future validated architecture.

Use this color palette:
- Primary: Deep Quantum Teal `#0B4F4A`
- Secondary: Bioinformatics Sage `#7FA99B`
- Accent: Precision Cyan `#2BB3A3`
- Light Background: Lab Mist `#F4F8F7`
- Dark Text: Graphite Navy `#17202A`

Design style:
- Premium medical SaaS.
- Clean biotech dashboard.
- White cards on Lab Mist background.
- Soft glassmorphism.
- Rounded corners 20–28px.
- Thin borders and soft shadows.
- Calm futuristic feel.
- Not generic purple AI.
- Not consumer health app.
- Not hospital admin dashboard.

Implementation constraints:
- Keep everything local/mock for Phase 1.
- No backend required.
- Use deterministic mock ranking logic.
- Do not add heavy dependencies unless already installed.
- Keep desktop demo polished first; responsive improvement second.
- Use semantic components and clean data files.

Deliverables:
- Updated pages/components.
- Mock data separated into readable files.
- Clear comments explaining that ranking logic is deterministic prototype logic.
- No misleading medical claims.
- The app must run without external API keys.

Acceptance criteria:
- The Dashboard immediately communicates the value proposition.
- The demo flow works in under 3 minutes.
- The UI looks polished enough for a pitch.
- All outputs are labelled as research hypotheses.
- The architecture honestly states that the hybrid quantum layer is simulated/prototype in Phase 1.
```
