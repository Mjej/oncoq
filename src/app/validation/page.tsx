"use client";

import { useMemo, useState } from "react";
import { BarChart3, Play, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BenchmarkChart } from "@/components/benchmark-chart";
import { DataToolbar } from "@/components/data-toolbar";
import { StatusPill } from "@/components/status-pill";
import { cohorts, getBenchmarkSeries } from "@/lib/mock-analysis";
import { benchmarkRuns as seedBenchmarks, formatRelative, type BenchmarkRun } from "@/data/operations";

const metricOptions = [
  "Top-10 ranking agreement",
  "Top-k precision",
  "Pathway mapping consistency",
  "Run-to-run stability",
  "Evidence-category agreement"
];

export default function BenchmarksPage() {
  const [runs, setRuns] = useState<BenchmarkRun[]>(seedBenchmarks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cohortId, setCohortId] = useState(cohorts[0].id);
  const [metric, setMetric] = useState(metricOptions[0]);
  const [reviewer, setReviewer] = useState("Dr. Tan Wei Lin");
  const [submitting, setSubmitting] = useState(false);

  const series = useMemo(() => { void cohortId; return getBenchmarkSeries(); }, [cohortId]);
  const filteredRuns = useMemo(() => {
    const q = query.trim().toLowerCase();
    return runs.filter((run) => {
      const matchesQuery = !q || run.label.toLowerCase().includes(q) || run.id.toLowerCase().includes(q) || run.reviewer.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || run.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [runs, query, statusFilter]);

  const meanDelta = (runs.filter((run) => run.status === "complete").reduce((sum, run) => sum + run.delta, 0) / Math.max(runs.filter((run) => run.status === "complete").length, 1)).toFixed(1);

  function queueBenchmark() {
    setSubmitting(true);
    setTimeout(() => {
      const nextNumber = parseInt(runs[0].id.split("-")[1], 10) + 1;
      const cohort = cohorts.find((c) => c.id === cohortId)!;
      const newRun: BenchmarkRun = {
        id: `bench-${String(nextNumber).padStart(4, "0")}`,
        label: `${metric} · ${cohort.cancerType} retro`,
        startedAt: new Date().toISOString(),
        status: "queued",
        classicalScore: 0,
        hybridScore: 0,
        delta: 0,
        reviewer
      };
      setRuns([newRun, ...runs]);
      setSubmitting(false);
    }, 800);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin tool · Retrospective validation"
        icon={BarChart3}
        title="Retrospective validation runs"
        description="Queue and review internal benchmark checks after the research workflow is complete. This page does not produce client-facing claims."
        meta={
          <>
            <span>{runs.length} runs</span>
            <span>·</span>
            <span>Mean Δ +{meanDelta} pts</span>
            <span>·</span>
            <span>{runs.filter((run) => run.status === "queued" || run.status === "running").length} in flight</span>
          </>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <div className="glass-panel rounded-3xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Validation queue</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">New comparison run</h2>
          <div className="mt-4 space-y-3 text-sm">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">Cohort</span>
              <select className="focus-ring mt-1 w-full rounded-xl border border-aqua/25 bg-white/85 px-3 py-2" onChange={(event) => setCohortId(event.target.value)} value={cohortId}>
                {cohorts.map((cohort) => <option key={cohort.id} value={cohort.id}>{cohort.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">Metric</span>
              <select className="focus-ring mt-1 w-full rounded-xl border border-aqua/25 bg-white/85 px-3 py-2" onChange={(event) => setMetric(event.target.value)} value={metric}>
                {metricOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">Reviewer</span>
              <input className="focus-ring mt-1 w-full rounded-xl border border-aqua/25 bg-white/85 px-3 py-2" onChange={(event) => setReviewer(event.target.value)} value={reviewer} />
            </label>
            <button className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ocean px-4 py-2.5 text-sm font-semibold text-white hover:bg-tide disabled:opacity-60" disabled={submitting} onClick={queueBenchmark} type="button">
              {submitting ? <RefreshCw aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Play aria-hidden="true" className="h-4 w-4" />}
              {submitting ? "Queueing…" : "Queue benchmark"}
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Comparison</p>
            <span className="text-xs text-ink/55">{cohorts.find((cohort) => cohort.id === cohortId)?.cancerType}</span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-ink">Baseline vs prototype relevance</h3>
          <div className="mt-3">
            <BenchmarkChart data={series} />
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Runs</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Benchmark run log</h2>
          </div>
        </div>
        <div className="mt-3">
          <DataToolbar
            filters={[
              { id: "status", label: "Status", value: statusFilter, onChange: setStatusFilter, options: [
                { value: "all", label: "All" },
                { value: "complete", label: "Complete" },
                { value: "queued", label: "Queued" },
                { value: "running", label: "Running" },
                { value: "review", label: "In review" }
              ] }
            ]}
            onQueryChange={setQuery}
            placeholder="Search by label, ID, reviewer…"
            query={query}
            resultCount={filteredRuns.length}
          />
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-aqua/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.1em] text-tide">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Classical</th>
                <th className="px-4 py-3 text-right">Prototype</th>
                <th className="px-4 py-3 text-right">Δ</th>
                <th className="px-4 py-3">Reviewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aqua/10">
              {filteredRuns.map((run) => (
                <tr className="hover:bg-cyan/[0.05]" key={run.id}>
                  <td className="px-4 py-3 font-mono text-xs text-ink/70">{run.id}</td>
                  <td className="px-4 py-3 text-ink">{run.label}</td>
                  <td className="px-4 py-3 text-ink/65">{formatRelative(run.startedAt)}</td>
                  <td className="px-4 py-3"><StatusPill kind={run.status} /></td>
                  <td className="px-4 py-3 text-right font-semibold text-ink/70">{run.classicalScore || "—"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink">{run.hybridScore || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    {run.delta ? <span className="rounded-full border border-leaf/30 bg-leaf/10 px-2 py-0.5 text-xs font-semibold text-leaf">+{run.delta}</span> : <span className="text-ink/40">—</span>}
                  </td>
                  <td className="px-4 py-3 text-ink/65">{run.reviewer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
