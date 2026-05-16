import { ChevronRight } from "lucide-react";
import { EvidenceBadge } from "./evidence-badge";
import { ConfidenceBadge } from "./confidence-badge";
import type { RankedMutationRecord } from "@/lib/types";

type MutationTableProps = {
  mutations: RankedMutationRecord[];
  selectedId?: string | null;
  onSelect?: (mutationId: string) => void;
  hypothesisById?: Record<string, string>;
  reviewStateById?: Record<string, string>;
};

const reviewToneByState: Record<string, string> = {
  "Pending review": "border-aqua/25 bg-aqua/10 text-tide",
  "Needs evidence": "border-gold/30 bg-gold/10 text-gold",
  "Accepted for report": "border-leaf/30 bg-leaf/10 text-leaf",
  Rejected: "border-coral/30 bg-coral/10 text-coral",
  "Limitation unresolved": "border-coral/20 bg-coral/8 text-coral"
};

export function MutationTable({
  mutations,
  selectedId,
  onSelect,
  hypothesisById = {},
  reviewStateById = {}
}: MutationTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-aqua/20 bg-white/70 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse text-left text-sm">
          <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.12em] text-tide">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Signal</th>
              <th className="px-4 py-3">Pathway</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Hypothesis</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-aqua/10">
            {mutations.map((mutation, index) => (
              <tr
                className={`align-top transition hover:bg-cyan/[0.06] ${selectedId === mutation.id ? "bg-cyan/[0.08]" : ""}`}
                key={mutation.id}
              >
                <td className="px-4 py-4 font-semibold text-tide">{index + 1}</td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-ink">{mutation.gene} <span className="font-normal text-ink/60">{mutation.variant}</span></p>
                  <p className="mt-1 text-[11px] text-ink/52">Open for interpretation, limitation, and next validation review.</p>
                </td>
                <td className="px-4 py-4 text-ink/76">{mutation.pathway}</td>
                <td className="px-4 py-4"><EvidenceBadge level={mutation.evidenceCategory} /></td>
                <td className="px-4 py-4"><ConfidenceBadge compact score={mutation.prototypeRelevanceScore} /></td>
                <td className="max-w-[14rem] px-4 py-4 text-ink/70">{hypothesisById[mutation.id] ?? "Reviewer follow-up needed"}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${reviewToneByState[reviewStateById[mutation.id] ?? "Pending review"] ?? "border-aqua/25 bg-aqua/10 text-tide"}`}>
                    {reviewStateById[mutation.id] ?? "Pending review"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/85 px-2.5 py-1.5 text-xs font-semibold text-tide hover:border-aqua/45"
                    onClick={() => onSelect?.(mutation.id)}
                    type="button"
                  >
                    Review
                    <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
