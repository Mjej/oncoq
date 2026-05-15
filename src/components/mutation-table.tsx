import { EvidenceBadge } from "./evidence-badge";
import { ConfidenceBadge } from "./confidence-badge";
import type { RankedMutationRecord } from "@/lib/types";

export function MutationTable({ mutations }: { mutations: RankedMutationRecord[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-aqua/20 bg-white/70 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse text-left text-sm">
          <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.12em] text-tide">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Gene</th>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">Pathway</th>
              <th className="px-4 py-3">Evidence</th>
              <th className="px-4 py-3">Prototype score</th>
              <th className="px-4 py-3">Interpretation</th>
              <th className="px-4 py-3">Limitation</th>
              <th className="px-4 py-3">Next validation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-aqua/10">
            {mutations.map((mutation, index) => (
              <tr className="align-top transition hover:bg-cyan/[0.06]" key={mutation.id}>
                <td className="px-4 py-4 font-semibold text-tide">{index + 1}</td>
                <td className="px-4 py-4 font-semibold text-ink">{mutation.gene}</td>
                <td className="px-4 py-4 text-ink/76">{mutation.variant}</td>
                <td className="px-4 py-4 text-ink/76">{mutation.pathway}</td>
                <td className="px-4 py-4"><EvidenceBadge level={mutation.evidenceCategory} /></td>
                <td className="px-4 py-4"><ConfidenceBadge compact score={mutation.prototypeRelevanceScore} /></td>
                <td className="max-w-xs px-4 py-4 leading-6 text-ink/70">{mutation.interpretation}</td>
                <td className="max-w-xs px-4 py-4 leading-6 text-ink/70">{mutation.limitation}</td>
                <td className="max-w-xs px-4 py-4 leading-6 text-ink/70">{mutation.nextValidationStep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
