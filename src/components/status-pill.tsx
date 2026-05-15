import { CheckCircle2, Loader2, AlertOctagon, AlertTriangle, Clock, Eye, type LucideIcon } from "lucide-react";

type StatusKind =
  | "running"
  | "queued"
  | "complete"
  | "failed"
  | "review"
  | "ready"
  | "draft"
  | "archived"
  | "healthy"
  | "degraded"
  | "down"
  | "green"
  | "amber"
  | "red";

const styles: Record<StatusKind, { label: string; icon: LucideIcon; classes: string }> = {
  running: { label: "Running", icon: Loader2, classes: "border-tide/35 bg-tide/10 text-tide" },
  queued: { label: "Queued", icon: Clock, classes: "border-aqua/30 bg-aqua/10 text-tide" },
  complete: { label: "Complete", icon: CheckCircle2, classes: "border-leaf/35 bg-leaf/10 text-leaf" },
  failed: { label: "Failed", icon: AlertOctagon, classes: "border-coral/35 bg-coral/10 text-coral" },
  review: { label: "In review", icon: Eye, classes: "border-gold/35 bg-gold/10 text-gold" },
  ready: { label: "Ready", icon: CheckCircle2, classes: "border-leaf/35 bg-leaf/10 text-leaf" },
  draft: { label: "Draft", icon: Clock, classes: "border-aqua/30 bg-aqua/10 text-tide" },
  archived: { label: "Archived", icon: Clock, classes: "border-ink/15 bg-ink/5 text-ink/60" },
  healthy: { label: "Healthy", icon: CheckCircle2, classes: "border-leaf/35 bg-leaf/10 text-leaf" },
  degraded: { label: "Degraded", icon: AlertTriangle, classes: "border-gold/35 bg-gold/10 text-gold" },
  down: { label: "Down", icon: AlertOctagon, classes: "border-coral/35 bg-coral/10 text-coral" },
  green: { label: "On track", icon: CheckCircle2, classes: "border-leaf/35 bg-leaf/10 text-leaf" },
  amber: { label: "Watch", icon: AlertTriangle, classes: "border-gold/35 bg-gold/10 text-gold" },
  red: { label: "At risk", icon: AlertOctagon, classes: "border-coral/35 bg-coral/10 text-coral" }
};

export function StatusPill({ kind, label }: { kind: StatusKind; label?: string }) {
  const cfg = styles[kind];
  const Icon = cfg.icon;
  const animate = kind === "running" ? "animate-spin" : "";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.classes}`}>
      <Icon aria-hidden="true" className={`h-3.5 w-3.5 ${animate}`} />
      {label ?? cfg.label}
    </span>
  );
}
