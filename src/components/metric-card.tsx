import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  accent?: boolean;
};

export function MetricCard({ title, value, caption, icon: Icon, accent = false }: MetricCardProps) {
  return (
    <section className={`relative overflow-hidden rounded-[22px] p-5 ${accent ? "bg-ocean text-white" : "border border-[#dbeef8] bg-white/66 backdrop-blur"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${accent ? "text-cyan" : "text-tide"}`}>{title}</p>
          <p className={`mt-2 text-2xl font-semibold ${accent ? "text-white" : "text-ink"}`}>{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${accent ? "bg-white/15 text-cyan" : "bg-[#eef8fd] text-tide"}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
      <p className={`mt-4 text-sm leading-6 ${accent ? "text-ice/80" : "text-ink/65"}`}>{caption}</p>
    </section>
  );
}
