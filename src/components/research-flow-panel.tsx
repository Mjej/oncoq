import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = ["Run analysis", "Review evidence", "Export report", "Share client view"];

type ResearchFlowPanelProps = {
  currentStep: number;
  title: string;
  body: string;
  nextHref?: string;
  nextLabel?: string;
};

export function ResearchFlowPanel({ currentStep, title, body, nextHref, nextLabel }: ResearchFlowPanelProps) {
  return (
    <section className="rounded-[22px] border border-[#dbeef8] bg-[#f8fcff] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Research workflow</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/60">{body}</p>
        </div>
        {nextHref && nextLabel ? (
          <Link className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href={nextHref}>
            {nextLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold ${isCurrent ? "border-[#2d83ee] bg-white text-ink" : "border-[#dbeef8] bg-white/72 text-ink/62"}`} key={step}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${isDone ? "bg-leaf text-white" : isCurrent ? "bg-[#2d83ee] text-white" : "bg-[#eef8fd] text-tide"}`}>
                {isDone ? <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" /> : stepNumber}
              </span>
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
