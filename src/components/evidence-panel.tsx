import { AlertTriangle, CheckCircle2, FlaskConical, Network, ShieldCheck } from "lucide-react";
import { EvidenceBadge } from "./evidence-badge";
import type { RankedDrugHypothesis, RankedMutationRecord } from "@/lib/types";

type EvidencePanelProps = {
  drug: RankedDrugHypothesis;
  mutation?: RankedMutationRecord;
};

export function EvidencePanel({ drug, mutation }: EvidencePanelProps) {
  const factors = [
    { label: "Matched gene", value: drug.matchedGene },
    { label: "Matched variant", value: drug.matchedVariant },
    { label: "Matched pathway", value: drug.pathway },
    { label: "Evidence category", value: `${drug.evidenceCategory} research evidence` }
  ];

  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Explainability</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">{drug.candidateClass}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/68">{drug.whyRanked}</p>
        </div>
        <EvidenceBadge level={drug.evidenceCategory} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {factors.map((factor) => (
          <div className="rounded-xl border border-aqua/15 bg-white/75 p-4" key={factor.label}>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-leaf" />
              {factor.label}
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/66">{factor.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-aqua/15 bg-white/75 p-4">
        <p className="text-sm font-semibold text-ink">Transparent score factors</p>
        <div className="mt-3 grid gap-3 text-sm text-ink/68 sm:grid-cols-4">
          <div><p className="font-semibold text-ink">Target</p><p>{drug.scoreBreakdown.targetMatch}</p></div>
          <div><p className="font-semibold text-ink">Pathway</p><p>{drug.scoreBreakdown.pathwayMatch}</p></div>
          <div><p className="font-semibold text-ink">Prototype</p><p>{drug.scoreBreakdown.simulatedHybrid}</p></div>
          <div><p className="font-semibold text-ink">Evidence</p><p>{drug.scoreBreakdown.evidence}</p></div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-aqua/25 bg-cyan/8 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-tide">
            <Network aria-hidden="true" className="h-4 w-4" />
            Prototype compatibility layer
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/68">
            Prototype compatibility score: {drug.prototypeCompatibilityScore}. This score is simulated in Phase 2.
          </p>
        </div>
        <div className="rounded-xl border border-gold/25 bg-gold/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gold">
            <AlertTriangle aria-hidden="true" className="h-4 w-4" />
            Limitation
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/68">{drug.limitation}</p>
        </div>
        <div className="rounded-xl border border-leaf/25 bg-leaf/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-leaf">
            <FlaskConical aria-hidden="true" className="h-4 w-4" />
            Next validation
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/68">{drug.nextValidationStep}</p>
        </div>
      </div>

      {mutation ? (
        <div className="mt-5 rounded-xl border border-aqua/25 bg-tide/8 p-4 text-sm leading-6 text-ink/70">
          <p className="font-semibold text-tide">Matched mutation interpretation</p>
          <p className="mt-1">{mutation.interpretation}</p>
        </div>
      ) : null}

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-aqua/25 bg-white/65 p-4 text-sm leading-6 text-ink/70">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-tide" />
        <p>Research-use decision support only. This panel supports expert review and retrospective validation planning.</p>
      </div>
    </section>
  );
}
