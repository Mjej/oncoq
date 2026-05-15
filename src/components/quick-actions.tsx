import { FileUp, FlaskConical, FileText, Microscope, BarChart3, Camera } from "lucide-react";
import Link from "next/link";

const actions = [
  { href: "/analysis", label: "Upload cohort", icon: FileUp, hint: "CSV / VCF / annotated mutations" },
  { href: "/analysis", label: "Run relevance scoring", icon: FlaskConical, hint: "Deterministic prototype scoring" },
  { href: "/results", label: "Review shortlist", icon: Microscope, hint: "Signals + hypotheses" },
  { href: "/report", label: "Generate evidence report", icon: FileText, hint: "Research brief / validation memo" },
  { href: "/validation", label: "Queue benchmark", icon: BarChart3, hint: "Retrospective comparison" },
  { href: "/report", label: "Prepare review packet", icon: Camera, hint: "Brief with limitations" }
];

export function QuickActions() {
  return (
    <section className="rounded-[22px] border border-[#dbeef8] bg-white/66 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Quick actions</p>
        <span className="text-xs text-ink/50">⌘K</span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              className="group flex items-center gap-3 rounded-2xl border border-[#cde8f5] bg-white/70 p-3.5 transition hover:border-aqua/45 hover:bg-cyan/10"
              href={action.href}
              key={action.label}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef8fd] text-tide">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{action.label}</span>
                <span className="block text-xs text-ink/55">{action.hint}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
