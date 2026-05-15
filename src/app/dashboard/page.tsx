"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Clock4,
  Dna,
  FileText,
  FileUp,
  FlaskConical,
  Microscope,
  Network
} from "lucide-react";
import { CohortSwitcher } from "@/components/cohort-switcher";
import { PathwayChart } from "@/components/pathway-chart";
import { RecentActivity } from "@/components/recent-activity";
import { StatusPill } from "@/components/status-pill";
import { researchUseDisclaimer } from "@/lib/content";
import { formatRelative, generatedReports, pipelineRuns, pipelineStages } from "@/data/operations";
import {
  cohorts,
  getAggregateKpi,
  getCohortKpi,
  getPathwayDistribution,
  getRankedDrugHypotheses,
  getRankedMutations
} from "@/lib/mock-analysis";

const cohortInputLabels: Record<string, string> = {
  "cohort-luad-demo": "VCF / annotated mutation table",
  "cohort-crc-demo": "CSV / annotated mutation table",
  "cohort-brca-demo": "CSV / VCF / annotated mutation table"
};

const candidateDirectionByGene: Record<string, string> = {
  EGFR: "EGFR inhibitor class",
  TP53: "DNA damage response research marker",
  KRAS: "KRAS pathway inhibitor class",
  ALK: "ALK inhibitor class",
  MET: "MET pathway inhibitor class",
  BRAF: "BRAF inhibitor combination class",
  APC: "Wnt-pathway research compounds",
  MSH2: "Immune checkpoint research class",
  PIK3CA: "PI3K / AKT pathway inhibition",
  BRCA1: "DNA damage response vulnerability",
  BRCA2: "ATR / DNA damage response class",
  ERBB2: "HER2 / ERBB inhibitor class",
  ESR1: "Selective ER degrader research class"
};

const hypothesisLabelByGene: Record<string, string> = {
  EGFR: "EGFR inhibitor class",
  KRAS: "KRAS / MEK pathway inhibition",
  TP53: "DNA damage response vulnerability",
  ALK: "ALK inhibitor class",
  MET: "MET pathway inhibitor class",
  BRAF: "BRAF inhibitor combination class",
  APC: "Wnt-pathway research compounds",
  MSH2: "Immune checkpoint research class",
  PIK3CA: "PI3K / AKT pathway inhibition",
  BRCA1: "DNA damage response vulnerability",
  BRCA2: "ATR / DNA damage response class",
  ERBB2: "HER2 / ERBB inhibitor class",
  ESR1: "Selective ER degrader research class"
};

const stagePresentation: Record<string, { title: string; detail: string }> = {
  "stage-ingest": {
    title: "Ingest",
    detail: "Schema and cohort checks"
  },
  "stage-annotate": {
    title: "Annotate",
    detail: "Pathway and mutation tags"
  },
  "stage-rank": {
    title: "Score",
    detail: "Mutation relevance signals"
  },
  "stage-hybrid": {
    title: "Rank",
    detail: "Candidate hypothesis order"
  },
  "stage-report": {
    title: "Report",
    detail: "Evidence brief export"
  }
};

const workflowSteps = [
  { title: "Upload", detail: "Load de-identified mutation data.", href: "/analysis", icon: FileUp },
  { title: "Score", detail: "Run mutation relevance scoring.", href: "/analysis", icon: Microscope },
  { title: "Review", detail: "Inspect hypotheses and limitations.", href: "/results", icon: FlaskConical },
  { title: "Export", detail: "Create an evidence-traced brief.", href: "/report", icon: FileText }
];

function getHypothesisLabel(gene: string, fallback: string) {
  return hypothesisLabelByGene[gene] ?? fallback;
}

function getHypothesisStatus(gene: string): { kind: "ready" | "review" | "draft"; label: string } {
  switch (gene) {
    case "EGFR":
    case "ERBB2":
    case "BRCA1":
      return { kind: "ready", label: "Report ready" };
    case "KRAS":
    case "BRAF":
    case "MSH2":
      return { kind: "review", label: "Review" };
    default:
      return { kind: "draft", label: "Draft" };
  }
}

function CircleMetric({ label, value, caption, tone, progress }: { label: string; value: string; caption: string; tone: string; progress: string }) {
  return (
    <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{label}</p>
          <p className="mt-3 text-xl font-semibold tracking-tight text-ink">{value}</p>
          <p className="mt-1 text-xs leading-5 text-ink/45">{caption}</p>
        </div>
        <div className="relative h-16 w-16 shrink-0">
          <svg className="h-16 w-16 rotate-[135deg]" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#e7f1f7" strokeWidth="2.6" />
            <circle cx="20" cy="20" r="15" fill="none" stroke={tone} strokeDasharray={progress} strokeLinecap="round" strokeWidth="2.6" />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-ink">{value}</span>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[22px] border border-[#dbeef8] bg-white/66 p-5 backdrop-blur ${className}`}>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const [activeCohortId, setActiveCohortId] = useState(cohorts[0].id);
  const aggregate = getAggregateKpi();
  const kpi = useMemo(() => getCohortKpi(activeCohortId), [activeCohortId]);
  const mutations = useMemo(() => getRankedMutations(activeCohortId), [activeCohortId]);
  const drugs = useMemo(() => getRankedDrugHypotheses(activeCohortId), [activeCohortId]);
  const pathwayData = useMemo(() => getPathwayDistribution(activeCohortId), [activeCohortId]);
  const recentRuns = pipelineRuns.slice(0, 4);
  const topMutation = mutations[0];
  const topMutationSlice = mutations.slice(0, 3);
  const candidateMatches = drugs.filter((drug) => drug.evidenceCategory !== "Exploratory").length;
  const readyReports = generatedReports.filter(
    (report) => report.status === "ready" && report.cohortLabel.toLowerCase().includes(kpi.cohort.cancerType.split(" ")[0].toLowerCase())
  ).length;
  const confidenceScore = Math.round(
    topMutationSlice.reduce((sum, mutation) => sum + mutation.prototypeRelevanceScore, 0) / Math.max(topMutationSlice.length, 1)
  );
  const completedRuns = pipelineRuns.filter((run) => run.status === "complete");
  const finishedRuns = pipelineRuns.filter((run) => run.status !== "queued");
  const successRate = Math.round((completedRuns.length / Math.max(finishedRuns.length, 1)) * 100);
  const averageRunTime = Math.round(completedRuns.reduce((sum, run) => sum + run.durationSec, 0) / Math.max(completedRuns.length, 1));
  const pathwayInsights = Object.fromEntries(
    pathwayData.map((point) => {
      const topPathwayMutation = mutations.find((mutation) => mutation.pathway === point.pathway);
      const linkedDrug = drugs.find((drug) => drug.pathway === point.pathway || drug.matchedGene === topPathwayMutation?.gene);

      return [
        point.pathway,
        {
          topMutation: topPathwayMutation ? `${topPathwayMutation.gene} ${topPathwayMutation.variant}` : "Analyst review required",
          candidateClass: linkedDrug ? getHypothesisLabel(linkedDrug.matchedGene, linkedDrug.candidateClass) : "Analyst review required",
          evidenceTags: ["pathway", "literature", "cohort signal"]
        }
      ];
    })
  );

  const topMetrics = [
    { label: "Cohorts", value: String(aggregate.cohortCount), caption: "Demo datasets loaded", tone: "#3FB6E0", progress: "46 100" },
    { label: "Samples", value: String(aggregate.samples), caption: "Across de-identified cohorts", tone: "#22C5B6", progress: "68 100" },
    { label: "Signals", value: String(aggregate.mutationSignals), caption: "Mutation relevance rows", tone: "#0E6BA8", progress: "74 100" },
    { label: "Review", value: String(confidenceScore), caption: "Top-signal average", tone: "#E0A458", progress: "61 100" }
  ];

  const cohortFacts = [
    { label: "Cohort", value: kpi.cohort.name },
    { label: "Cancer type", value: kpi.cohort.cancerType },
    { label: "Samples", value: kpi.samples },
    { label: "Input", value: cohortInputLabels[activeCohortId] },
    { label: "Candidate matches", value: candidateMatches },
    { label: "Reports ready", value: readyReports }
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[24px] border border-[#dbeef8] bg-white p-4 sm:p-5">
        <div>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2d83ee] text-white">
                <Dna aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">Workspace</p>
                <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">Mutation Evidence Board</h1>
                <p className="mt-1 text-sm text-ink/52">{kpi.cohort.cancerType} cohort / research-use review</p>
              </div>
            </div>

            <div className="rounded-[20px] border border-[#dbeef8] bg-[#f8fcff] p-4 xl:w-[340px]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Research workflow</p>
              <p className="mt-2 text-sm font-semibold text-ink">Start here, then run analysis.</p>
              <p className="mt-1 text-xs leading-5 text-ink/55">Use the sidebar for navigation. This panel only points to the next workflow step.</p>
              <Link className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" href="/analysis">
                Run analysis
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
            <div className="rounded-[20px] border border-[#dbeef8] bg-[#f8fcff] p-4">
              <p className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Start a cohort analysis or continue the latest evidence review.
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/58">
                The workflow is linear: run analysis, review mutation relevance signals, export a research report, then share the client view.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white hover:bg-tide" href="/analysis">
                  Run analysis
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-5 py-3 text-sm font-semibold text-ink/72 hover:text-tide" href="/results">
                  Review results
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[20px] border border-[#dbeef8] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Top signal</p>
                <p className="mt-2 text-lg font-semibold text-ink">{topMutation?.gene} {topMutation?.variant}</p>
                <p className="mt-1 text-xs text-ink/52">{topMutation?.pathway}</p>
              </div>
              <div className="rounded-[20px] border border-[#dbeef8] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Review queue</p>
                <p className="mt-2 text-lg font-semibold text-ink">{candidateMatches} matches</p>
                <p className="mt-1 text-xs text-ink/52">{readyReports} reports ready</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {topMetrics.map((metric) => (
              <CircleMetric key={metric.label} {...metric} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_1fr_0.85fr]">
            <SectionCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Top mutation signals</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">Ranked for review</h2>
                </div>
                <Link className="inline-flex items-center gap-1 text-xs font-semibold text-tide hover:underline" href="/results">
                  Open trace <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {mutations.slice(0, 3).map((mutation, index) => (
                  <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4" key={mutation.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink">{index + 1}. {mutation.gene} <span className="font-normal text-ink/58">{mutation.variant}</span></p>
                        <p className="mt-1 text-xs text-ink/55">{mutation.pathway} / {candidateDirectionByGene[mutation.gene] ?? "Analyst review required"}</p>
                      </div>
                      <span className="rounded-full bg-[#eef8fd] px-2.5 py-1 text-xs font-semibold text-tide">{mutation.prototypeRelevanceScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Hypotheses</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">Candidate shortlist</h2>
                </div>
                <span className="rounded-full border border-[#cde8f5] bg-white/75 px-2.5 py-1 text-xs font-semibold text-ink/58">{candidateMatches} matches</span>
              </div>
              <div className="mt-4 space-y-3">
                {drugs.slice(0, 3).map((drug, index) => {
                  const status = getHypothesisStatus(drug.matchedGene);
                  return (
                    <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4" key={drug.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-ink">{index + 1}. {getHypothesisLabel(drug.matchedGene, drug.candidateClass)}</p>
                          <p className="mt-1 text-xs text-ink/55">Linked to {drug.matchedGene} {drug.matchedVariant}</p>
                        </div>
                        <StatusPill kind={status.kind} label={status.label} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Workflow actions</p>
              <div className="mt-4 grid gap-3">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Link className="flex items-center gap-3 rounded-2xl border border-[#dbeef8] bg-white/70 p-3 hover:border-aqua/45 hover:bg-cyan/10" href={step.href} key={step.title}>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef8fd] text-tide">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{index + 1}. {step.title}</span>
                        <span className="block text-xs text-ink/52">{step.detail}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <SectionCard>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Cohort details</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">{kpi.cohort.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/58">
                Switch cohorts, check the input shape, and confirm what is ready for expert review.
              </p>
            </div>
            <CohortSwitcher activeId={activeCohortId} cohorts={cohorts} onChange={setActiveCohortId} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cohortFacts.map((fact) => (
              <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4" key={fact.label}>
                <p className="text-xs uppercase tracking-[0.12em] text-ink/48">{fact.label}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Run health</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">Pipeline snapshot</h2>
            </div>
            <StatusPill kind="healthy" label="Healthy" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/48">Success</p>
              <p className="mt-1 text-xl font-semibold text-ink">{successRate}%</p>
            </div>
            <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/48">Avg run</p>
              <p className="mt-1 text-xl font-semibold text-ink">{averageRunTime}s</p>
            </div>
            <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/48">Review</p>
              <p className="mt-1 text-xl font-semibold text-ink">{pipelineRuns.filter((run) => run.status === "review").length}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {pipelineStages.map((stage) => (
              <div className="rounded-2xl border border-[#dbeef8] bg-white/70 p-3" key={stage.id}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{stagePresentation[stage.id]?.title ?? stage.name}</p>
                  <StatusPill kind={stage.status} />
                </div>
                <p className="mt-1 text-xs text-ink/52">{stagePresentation[stage.id]?.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Pathway view</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">Relevance distribution</h2>
              <p className="mt-2 text-sm leading-6 text-ink/58">Hover a pathway to inspect the linked mutation, candidate class, and evidence tags.</p>
            </div>
            <Network aria-hidden="true" className="h-5 w-5 text-tide/60" />
          </div>
          <PathwayChart data={pathwayData} details={pathwayInsights} />
        </SectionCard>

        <div className="space-y-5">
          <SectionCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Recent runs</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">Activity queue</h2>
              </div>
              <Link className="text-sm font-semibold text-tide hover:underline" href="/architecture">Pipeline</Link>
            </div>
            <div className="mt-4 space-y-2">
              {recentRuns.map((run) => (
                <Link className="flex items-center justify-between gap-3 rounded-2xl border border-[#dbeef8] bg-white/70 p-3 hover:border-aqua/45 hover:bg-cyan/10" href={run.status === "failed" ? "/architecture" : "/results"} key={run.id}>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{run.cohortLabel}</span>
                    <span className="block text-xs text-ink/52">{formatRelative(run.startedAt)} / {run.mutationsScored} signals</span>
                  </span>
                  <StatusPill kind={run.status} />
                </Link>
              ))}
            </div>
          </SectionCard>

          <RecentActivity limit={4} />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#dbeef8] bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-[#eef8fd] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-tide">
              <Clock4 aria-hidden="true" className="h-3.5 w-3.5" />
              Review boundary
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Keep the evidence trail visible before export.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/62">{researchUseDisclaimer}</p>
          </div>
          <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white hover:bg-tide" href="/report">
            Generate report
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
