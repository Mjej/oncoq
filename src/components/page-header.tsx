import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  icon?: LucideIcon;
};

export function PageHeader({ eyebrow, title, description, meta, action, icon: Icon }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#cde8f5] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#b9e2f4] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-tide">
          {Icon ? <Icon aria-hidden="true" className="h-3 w-3" /> : null}
          {eyebrow}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {description ? <div className="mt-2 max-w-3xl text-sm leading-6 text-ink/66">{description}</div> : null}
        {meta ? <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink/65">{meta}</div> : null}
      </div>
      {action ? <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div> : null}
    </header>
  );
}
