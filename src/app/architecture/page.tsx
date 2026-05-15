"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ChevronRight, Cpu, Network, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { DataToolbar } from "@/components/data-toolbar";
import { StatusPill } from "@/components/status-pill";
import { formatRelative, pipelineRuns, pipelineStages } from "@/data/operations";

export default function PipelinePage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRuns = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pipelineRuns.filter((run) => {
      const matchesQuery = !q || run.id.toLowerCase().includes(q) || run.cohortLabel.toLowerCase().includes(q) || run.triggeredBy.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || run.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const overallUptime = (pipelineStages.reduce((sum, stage) => sum + stage.uptimePct, 0) / pipelineStages.length).toFixed(1);
  const meanLatency = Math.round(pipelineStages.reduce((sum, stage) => sum + stage.latencyMs, 0) / pipelineStages.length);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin tool · Operations"
        icon={Activity}
        title="Pipeline health and run monitoring"
        description="Use this page only when checking service stages, run logs, and implementation readiness. Researchers can complete the main workflow without coming here."
        meta={
          <>
            <span>{pipelineStages.filter((stage) => stage.status === "healthy").length}/{pipelineStages.length} stages healthy</span>
            <span>·</span>
            <span>Uptime {overallUptime}%</span>
            <span>·</span>
            <span>Mean latency {meanLatency} ms</span>
          </>
        }
        action={
          <button className="focus-ring inline-flex items-center gap-2 rounded-xl border border-aqua/30 bg-white/80 px-3 py-2 text-sm font-semibold text-ink/72 hover:border-aqua/55 hover:text-tide" type="button">
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Refresh
          </button>
        }
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {pipelineStages.map((stage) => (
          <div className="glass-tile rounded-2xl p-4" key={stage.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">{stage.name}</p>
              <StatusPill kind={stage.status} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink/60">
              <div><dt className="uppercase tracking-[0.1em]">Latency</dt><dd className="text-base font-semibold text-ink">{stage.latencyMs} ms</dd></div>
              <div><dt className="uppercase tracking-[0.1em]">Uptime</dt><dd className="text-base font-semibold text-ink">{stage.uptimePct}%</dd></div>
              <div className="col-span-2"><dt className="uppercase tracking-[0.1em]">Throughput</dt><dd className="text-sm font-medium text-ink">{stage.throughput}</dd></div>
              <div className="col-span-2"><dt className="uppercase tracking-[0.1em]">Owner</dt><dd className="font-mono text-xs text-ink/65">{stage.owner}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-ink/55">Last run · {formatRelative(stage.lastRunAt)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Operations log</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Pipeline run log</h2>
            </div>
            <Cpu aria-hidden="true" className="h-4 w-4 text-tide/60" />
          </div>
          <div className="mt-3">
            <DataToolbar
              filters={[
                { id: "status", label: "Status", value: statusFilter, onChange: setStatusFilter, options: [
                  { value: "all", label: "All" },
                  { value: "complete", label: "Complete" },
                  { value: "running", label: "Running" },
                  { value: "queued", label: "Queued" },
                  { value: "failed", label: "Failed" },
                  { value: "review", label: "In review" }
                ] }
              ]}
              onQueryChange={setQuery}
              placeholder="Search run id, cohort, user…"
              query={query}
              resultCount={filteredRuns.length}
            />
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-aqua/15">
            <table className="w-full text-left text-sm">
              <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.1em] text-tide">
                <tr>
                  <th className="px-4 py-3">Run</th>
                  <th className="px-4 py-3">Cohort</th>
                  <th className="px-4 py-3">Started</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">By</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-aqua/10">
                {filteredRuns.map((run) => (
                  <tr className="hover:bg-cyan/[0.05]" key={run.id}>
                    <td className="px-4 py-3 font-mono text-xs text-ink/70">{run.id}</td>
                    <td className="px-4 py-3 text-ink">{run.cohortLabel}</td>
                    <td className="px-4 py-3 text-ink/65">{formatRelative(run.startedAt)}</td>
                    <td className="px-4 py-3 text-ink/65">{run.durationSec ? `${run.durationSec}s` : "—"}</td>
                    <td className="px-4 py-3"><StatusPill kind={run.status} /></td>
                    <td className="px-4 py-3 text-ink/65">{run.triggeredBy}</td>
                    <td className="px-4 py-3 text-right">
                      <Link className="inline-flex items-center gap-1 text-xs font-semibold text-tide hover:underline" href="/results">
                        View <ChevronRight aria-hidden="true" className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Implementation map</p>
            <Network aria-hidden="true" className="h-4 w-4 text-tide/60" />
          </div>
          <h3 className="mt-1 text-lg font-semibold text-ink">Service topology</h3>
          <div className="mt-4">
            <ArchitectureFlow />
          </div>
          <p className="mt-3 text-xs text-ink/55">5 stages · ingest → annotate → rank → review → report</p>
        </div>
      </section>
    </div>
  );
}
