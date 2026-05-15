import { scoreLabel } from "@/lib/scoring";

type ConfidenceBadgeProps = {
  score: number;
  compact?: boolean;
};

const styles = {
  High: "bg-leaf/15 text-leaf ring-leaf/30",
  Medium: "bg-aqua/15 text-tide ring-aqua/30",
  Exploratory: "bg-gold/15 text-gold ring-gold/30"
};

export function ConfidenceBadge({ score, compact = false }: ConfidenceBadgeProps) {
  const label = scoreLabel(score);

  return (
    <div className="min-w-[7.5rem]">
      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[label]}`}>
        {compact ? `${score}` : `${label} ${score}`}
      </span>
      {!compact ? (
        <div aria-hidden="true" className="mt-2 h-1.5 rounded-full bg-tide/10">
          <div className="h-1.5 rounded-full bg-gradient-to-r from-ocean via-tide to-aqua" style={{ width: `${Math.min(score, 100)}%` }} />
        </div>
      ) : null}
    </div>
  );
}
