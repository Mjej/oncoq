"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, FlaskConical, History, Play, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AnalysisModeTabs } from "@/components/analysis-mode-tabs";
import { ResearchUseAlert } from "@/components/research-use-alert";
import { ResearchFlowPanel } from "@/components/research-flow-panel";
import { StatusPill } from "@/components/status-pill";
import { cohorts, getCohortKpi, getDatasetSummary } from "@/lib/mock-analysis";
import { formatRelative, pipelineRuns } from "@/data/operations";

export default function AnalysisPage() {
  const [cohortId, setCohortId] = useState(cohorts[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const summary = useMemo(() => getDatasetSummary(cohortId), [cohortId]);
  const kpi = useMemo(() => getCohortKpi(cohortId), [cohortId]);
  const cohortRuns = pipelineRuns.filter((run) => run.cohortId === cohortId).slice(0, 5);

  function runPipeline() {
    if (isRunning) return;
    setIsRunning(true);
    setRunId(null);
    const id = `run-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setTimeout(() => {
      setIsRunning(false);
      setRunId(id);
    }, 2200);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Step 1 · Run analysis"
        icon={FlaskConical}
        title="Run a cohort analysis"
        description="Choose a de-identified cohort, confirm the schema, then run mutation relevance scoring for research review."
        meta={
          <>
            <span>Cohort: <strong className="text-ink">{summary.cohort.cancerType}</strong></span>
            <span>·</span>
            <span>{summary.mutationCount} signals</span>
            <span>·</span>
            <span>{summary.genesDetected.length} genes</span>
          </>
        }
        action={
          <>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-xl border border-aqua/30 bg-white/80 px-3 py-2 text-sm font-semibold text-ink/72 hover:border-aqua/55 hover:text-tide" href="/results">
              Review existing results
            </Link>
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide disabled:opacity-60"
              disabled={isRunning}
              onClick={runPipeline}
              type="button"
            >
              {isRunning ? <RefreshCw aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Play aria-hidden="true" className="h-4 w-4" />}
              {isRunning ? "Running…" : "Run analysis"}
            </button>
          </>
        }
      />

      <ResearchUseAlert compact />

      <ResearchFlowPanel
        body="This is the first working step for a researcher. Upload or select a cohort, run the analysis, then continue to evidence review."
        currentStep={1}
        nextHref="/results"
        nextLabel="Review evidence"
        title="Start with cohort scoring"
      />

      <section className="grid gap-3 md:grid-cols-4">
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Last run</p>
          <p className="mt-1 text-lg font-semibold text-ink">{formatRelative(cohortRuns[0]?.startedAt ?? "")}</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Avg duration</p>
          <p className="mt-1 text-lg font-semibold text-ink">{Math.round((cohortRuns.reduce((sum, run) => sum + run.durationSec, 0) || 180) / Math.max(cohortRuns.length, 1))}s</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Success rate</p>
          <p className="mt-1 text-lg font-semibold text-ink">{cohortRuns.length ? Math.round((cohortRuns.filter((run) => run.status === "complete").length / cohortRuns.length) * 100) : 0}%</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Mutations scored</p>
          <p className="mt-1 text-lg font-semibold text-ink">{kpi.mutationSignals}</p>
        </div>
      </section>

      {runId ? (
        <div className="flex items-center justify-between rounded-2xl border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <StatusPill kind="complete" />
            <p className="text-ink">
              Run <span className="font-mono font-semibold">{runId}</span> finished · {kpi.mutationSignals} mutation relevance signals scored · {kpi.candidateClasses} hypotheses prepared.
            </p>
          </div>
          <Link className="text-sm font-semibold text-leaf hover:underline" href="/results">Open results →</Link>
        </div>
      ) : null}

      <AnalysisModeTabs cohortId={cohortId} onCohortChange={setCohortId} summary={summary} />

      <section className="glass-panel rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Run history</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Recent runs for this cohort</h2>
          </div>
          <History aria-hidden="true" className="h-4 w-4 text-tide/60" />
        </div>
        {cohortRuns.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-aqua/25 bg-white/55 p-8 text-center text-sm text-ink/55">
            No runs yet. Click <strong className="text-ink">Run analysis</strong> to start.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-aqua/15">
            <table className="w-full text-left text-sm">
              <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.1em] text-tide">
                <tr>
                  <th className="px-4 py-3">Run</th>
                  <th className="px-4 py-3">Started</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Signals</th>
                  <th className="px-4 py-3">Hypotheses</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">By</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-aqua/10">
                {cohortRuns.map((run) => (
                  <tr className="hover:bg-cyan/[0.05]" key={run.id}>
                    <td className="px-4 py-3 font-mono text-xs text-ink/70">{run.id}</td>
                    <td className="px-4 py-3 text-ink">{formatRelative(run.startedAt)}</td>
                    <td className="px-4 py-3 text-ink/70">{run.durationSec ? `${run.durationSec}s` : "—"}</td>
                    <td className="px-4 py-3 font-semibold text-ink">{run.mutationsScored}</td>
                    <td className="px-4 py-3 font-semibold text-ink">{run.hypotheses}</td>
                    <td className="px-4 py-3"><StatusPill kind={run.status} /></td>
                    <td className="px-4 py-3 text-ink/65">{run.triggeredBy}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-tide hover:border-aqua/45" type="button">
                        <Download aria-hidden="true" className="h-3 w-3" /> Logs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
