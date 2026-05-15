import { Microscope, Target } from "lucide-react";
import { ConfidenceBadge } from "./confidence-badge";
import { EvidenceBadge } from "./evidence-badge";
import type { RankedDrugHypothesis } from "@/lib/types";

type DrugRankingCardProps = {
  candidate: RankedDrugHypothesis;
  rank: number;
  selected?: boolean;
  onSelect?: () => void;
};

export function DrugRankingCard({ candidate, rank, selected = false, onSelect }: DrugRankingCardProps) {
  return (
    <button
      className={`focus-ring w-full rounded-2xl p-5 text-left transition ${
        selected
          ? "border border-aqua/55 bg-cyan/10"
          : "border border-aqua/15 bg-white/72 hover:border-aqua/40 hover:bg-white/85"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ocean px-2.5 py-1 text-xs font-semibold text-white">#{rank}</span>
            <EvidenceBadge level={candidate.evidenceCategory} />
          </div>
          <h3 className="mt-3 text-xl font-semibold text-ink">{candidate.candidateClass}</h3>
          <p className="mt-1 text-sm text-ink/65">Candidate class for expert research review</p>
        </div>
        <ConfidenceBadge score={candidate.compositePriorityScore} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-aqua/15 bg-white/75 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Target aria-hidden="true" className="h-4 w-4 text-tide" />
            Target / pathway
          </div>
          <p className="mt-2 text-sm text-ink/68">{candidate.target}</p>
        </div>
        <div className="rounded-xl border border-aqua/15 bg-white/75 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Microscope aria-hidden="true" className="h-4 w-4 text-leaf" />
            Matched mutation signal
          </div>
          <p className="mt-2 text-sm text-ink/68">{candidate.matchedMutationSignal}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-aqua/25 bg-cyan/8 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tide">Prototype compatibility score</p>
        <p className="mt-1 text-sm leading-6 text-ink/72">{candidate.prototypeCompatibilityScore}. {candidate.whyRanked}</p>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-ink/70 lg:grid-cols-2">
        <div>
          <p className="font-semibold text-ink">Limitation</p>
          <p className="mt-1 leading-6">{candidate.limitation}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Next validation step</p>
          <p className="mt-1 leading-6">{candidate.nextValidationStep}</p>
        </div>
      </div>
    </button>
  );
}
