import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  hint?: string;
  action?: React.ReactNode;
};

export function EmptyState({ icon: Icon, title, hint, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-aqua/30 bg-white/55 px-6 py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef8fd] text-tide">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      {hint ? <p className="max-w-md text-sm text-ink/60">{hint}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
