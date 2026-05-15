import { CheckCircle2, Database, PlayCircle } from "lucide-react";
import { ActionLink } from "./action-link";
import type { DatasetSummary } from "@/lib/types";

const goals = [
  "Mutation relevance ranking",
  "Cancer pathway mapping",
  "Drug-repurposing hypothesis shortlist",
  "Evidence provenance report"
];

export function UploadCard({ summary }: { summary: DatasetSummary }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="relative overflow-hidden rounded-3xl border border-[#cde8f5] bg-white/68 p-6 backdrop-blur-xl">
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean text-white">
            <Database aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Load demo cohort</p>
            <h2 className="text-xl font-semibold text-ink">{summary.cohort.name}</h2>
          </div>
        </div>

        <p className="relative mt-4 text-sm leading-6 text-ink/68">
          Run the complete local analysis workflow on a preloaded de-identified cohort, without external APIs.
        </p>

        <dl className="relative mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-[#cde8f5] bg-white/76 p-3">
            <dt className="text-ink/55">Samples</dt>
            <dd className="mt-1 text-lg font-semibold text-ink">{summary.cohort.sampleCount}</dd>
          </div>
          <div className="rounded-xl border border-[#cde8f5] bg-white/76 p-3">
            <dt className="text-ink/55">Mutation signals</dt>
            <dd className="mt-1 text-lg font-semibold text-ink">{summary.mutationCount}</dd>
          </div>
          <div className="col-span-2 rounded-xl border border-[#cde8f5] bg-white/76 p-3">
            <dt className="text-ink/55">Genes detected</dt>
            <dd className="mt-1 font-semibold text-ink">{summary.genesDetected.join(", ")}</dd>
          </div>
        </dl>

        <div className="relative mt-5 flex flex-col gap-3 sm:flex-row">
          <ActionLink href="/results" icon={PlayCircle}>View Ranked Results</ActionLink>
          <ActionLink href="/architecture" variant="secondary">View Workflow</ActionLink>
        </div>
      </div>

      <div className="rounded-3xl border border-[#cde8f5] bg-white/66 p-6 backdrop-blur-xl">
        <p className="text-sm font-semibold text-ink">Analysis goals</p>
        <ul className="mt-4 space-y-3 text-sm text-ink/70">
          {goals.map((goal) => (
            <li className="flex items-center gap-2" key={goal}>
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-leaf" />
              {goal}
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-xl border border-aqua/30 bg-cyan/10 px-3 py-2 text-sm font-semibold text-tide">
          {summary.status}
        </p>
      </div>
    </section>
  );
}
