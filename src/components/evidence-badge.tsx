import type { EvidenceCategory } from "@/lib/types";

const evidenceStyles: Record<EvidenceCategory, string> = {
  Strong: "bg-leaf/15 text-leaf ring-leaf/30",
  Moderate: "bg-aqua/15 text-tide ring-aqua/30",
  Emerging: "bg-gold/15 text-gold ring-gold/30",
  Exploratory: "bg-coral/15 text-coral ring-coral/30"
};

export function EvidenceBadge({ level }: { level: EvidenceCategory }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${evidenceStyles[level]}`}>
      {level}
    </span>
  );
}
