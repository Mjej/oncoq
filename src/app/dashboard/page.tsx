"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Clock4,
  Dna,
  FileText,
  FlaskConical,
  Microscope,
  Network,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { CohortSwitcher } from "@/components/cohort-switcher";
import { PathwayChart } from "@/components/pathway-chart";
import { StatusPill } from "@/components/status-pill";
import { researchUseDisclaimer, pageTitles, pageSubtitles } from "@/lib/content";
import { formatRelative, generatedReports, pipelineRuns } from "@/data/operations";
import {
  cohorts,
  getCohortKpi,
  getPathwayDistribution,
  getRankedDrugHypotheses,
  getRankedMutations
} from "@/lib/mock-analysis";

// Static client-side mapping of pathway-level hypothesis labels.
// Used for the "candidate research class" tag in the dashboard. Research-use only, not clinical claims.
const candidateDirectionByGene: Record<string, string> = {
  EGFR: "EGFR inhibitor class",
  TP53: "DNA damage response research marker",
  KRAS: "KRAS / MEK pathway inhibition",
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

const cohortInputLabels: Record<string, string> = {
  "cohort-luad-demo": "Annotated mutation table (VCF / CSV)",
  "cohort-crc-demo": "Annotated mutation table (CSV)",
  "cohort-brca-demo": "Annotated mutation table (VCF / CSV)"
};

// Demo-only reviewer state — research-use only, not clinical decisions.
function getReviewState(rank: number): { kind: "ready" | "review" | "draft"; label: string } {
  if (rank === 0) return { kind: "ready", label: "Ready for review" };
  if (rank === 1) return { kind: "review", label: "Needs interpretation" };
  if (rank === 2) return { kind: "draft", label: "Hypothesis drafted" };
  return { kind: "draft", label: "Pending review" };
}

function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[22px] border border-[#dbeef8] bg-white p-5 ${className}`}>
      {children}
    </section>
  );
}

function ReadinessPill({ value, label, icon: Icon, tone }: { value: number | string; label: string; icon: typeof CircleCheck; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#dbeef8] bg-white px-4 py-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f0f8fc]" style={{ color: tone }}>
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-lg font-semibold leading-tight text-ink">{value}</p>
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink/55">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeCohortId, setActiveCohortId] = useState(cohorts[0].id);
  const kpi = useMemo(() => getCohortKpi(activeCohortId), [activeCohortId]);
  const mutations = useMemo(() => getRankedMutations(activeCohortId), [activeCohortId]);
  const drugs = useMemo(() => getRankedDrugHypotheses(activeCohortId), [activeCohortId]);
  const pathwayData = useMemo(() => getPathwayDistribution(activeCohortId), [activeCohortId]);
  const topMutation = mutations[0];
  const topMutationSlice = mutations.slice(0, 3);
  const draftHypotheses = drugs.length;
  const candidateMatches = drugs.filter((drug) => drug.evidenceCategory !== "Exploratory").length;
  const reportReady = generatedReports.filter(
    (report) =>
      report.status === "ready" &&
      report.cohortLabel.toLowerCase().includes(kpi.cohort.cancerType.split(" ")[0].toLowerCase())
  ).length;
  // Demo-only reviewer breakdown (research-use only)
  const readyForReport = Math.min(2, drugs.length);
  const needsEvidence = Math.min(2, Math.max(0, drugs.length - readyForReport));
  const limitationUnresolved = Math.max(0, drugs.length - readyForReport - needsEvidence);

  const genesDetected = useMemo(
    () => Array.from(new Set(mutations.map((m) => m.gene))),
    [mutations]
  );

  const lastScoredAgo = useMemo(() => {
    const run = pipelineRuns.find((r) => r.cohortId === activeCohortId);
    return run ? formatRelative(run.startedAt) : "—";
  }, [activeCohortId]);

  const pathwayInsights = Object.fromEntries(
    pathwayData.map((point) => {
      const topPathwayMutation = mutations.find((mutation) => mutation.pathway === point.pathway);
      const linkedDrug = drugs.find(
        (drug) => drug.pathway === point.pathway || drug.matchedGene === topPathwayMutation?.gene
      );
      return [
        point.pathway,
        {
          topMutation: topPathwayMutation
            ? `${topPathwayMutation.gene} ${topPathwayMutation.variant}`
            : "Reviewer follow-up needed",
          candidateClass: linkedDrug
            ? candidateDirectionByGene[linkedDrug.matchedGene] ?? linkedDrug.candidateClass
            : "Reviewer follow-up needed",
          evidenceTags: ["pathway", "literature", "cohort signal"]
        }
      ];
    })
  );

  const workflowMetrics = [
    { label: "Active samples", value: String(kpi.samples), caption: "De-identified rows in cohort" },
    { label: "Ranked signals", value: String(kpi.mutationSignals), caption: "Mutation relevance rows" },
    { label: "Draft hypotheses", value: String(draftHypotheses), caption: "Candidate research classes" },
    { label: "Report-ready items", value: String(readyForReport), caption: "Accepted for research brief" }
  ];

  const cohortFacts = [
    { label: "Cohort", value: kpi.cohort.name },
    { label: "Cancer type", value: kpi.cohort.cancerType },
    { label: "Samples", value: String(kpi.samples) },
    { label: "Genes detected", value: String(genesDetected.length) },
    { label: "Input format", value: cohortInputLabels[activeCohortId] ?? "Annotated mutation table" },
    { label: "De-identification", value: "Confirmed (demo)" },
    { label: "Schema status", value: "Validated" },
    { label: "Last scored", value: lastScoredAgo }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <section className="rounded-[24px] border border-[#dbeef8] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#063B63] text-white">
              <Dna aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">Workspace</p>
              <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{pageTitles.dashboard}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/62">{pageSubtitles.dashboard}</p>
              <p className="mt-3 text-xs text-ink/55">
                Active cohort: <span className="font-semibold text-ink">{kpi.cohort.name}</span> · {kpi.samples} samples · {genesDetected.length} genes · Last scored {lastScoredAgo}
              </p>
            </div>
          </div>
          <div data-tour="cohort-switcher">
            <CohortSwitcher activeId={activeCohortId} cohorts={cohorts} onChange={setActiveCohortId} />
          </div>
        </div>
      </section>

      {/* Primary next action + top signal + review queue */}
      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <div data-tour="next-step" className="rounded-[22px] border border-[#dbeef8] bg-[#f8fcff] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Next step</p>
          <h2 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Review the top-ranked mutation signals</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/65">
            The latest {kpi.cohort.cancerType.toLowerCase()} run produced {kpi.mutationSignals} ranked signals and {draftHypotheses} draft hypothesis classes. Review the evidence trail before exporting the research brief.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href="/results">
              Review ranked signals
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-5 py-2.5 text-sm font-semibold text-ink/72 hover:text-tide" href="/analysis">
              Run new cohort
            </Link>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-tide hover:underline" href="/report">
              Open report draft →
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ReadinessPill icon={CircleDot} label="Signals ranked" tone="#2D9CDB" value={kpi.mutationSignals} />
            <ReadinessPill icon={CircleDashed} label="Hypotheses drafted" tone="#20C7B5" value={draftHypotheses} />
            <ReadinessPill icon={CircleCheck} label="Accepted for report" tone="#22A06B" value={readyForReport} />
            <ReadinessPill icon={ShieldCheck} label="Limitation unresolved" tone="#F4A340" value={limitationUnresolved} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Highest-priority signal</p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{topMutation?.gene} {topMutation?.variant}</h3>
            <p className="mt-1 text-xs text-ink/58">{topMutation?.pathway}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              {topMutation?.evidenceCategory} pathway evidence · linked to {candidateDirectionByGene[topMutation?.gene ?? ""] ?? "candidate research class"}.
            </p>
            <p className="mt-2 text-xs text-ink/55">Needs expert review before report export.</p>
            <Link className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tide hover:underline" href="/results">
              Inspect evidence trail <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </SectionCard>

          <SectionCard>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Review queue</p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{drugs.length} evidence items</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-ink/65">
              <li className="flex items-center justify-between gap-2"><span>Ready for report</span><span className="font-semibold text-leaf">{readyForReport}</span></li>
              <li className="flex items-center justify-between gap-2"><span>Needs evidence check</span><span className="font-semibold text-gold">{needsEvidence}</span></li>
              <li className="flex items-center justify-between gap-2"><span>Limitation unresolved</span><span className="font-semibold text-coral">{limitationUnresolved}</span></li>
            </ul>
            <p className="mt-3 text-xs text-ink/55">
              {reportReady} brief{reportReady === 1 ? "" : "s"} already prepared for this cancer type.
            </p>
          </SectionCard>
        </div>
      </section>

      {/* Workflow metrics */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {workflowMetrics.map((metric) => (
          <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4" key={metric.label}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/55">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{metric.value}</p>
            <p className="mt-1 text-xs text-ink/55">{metric.caption}</p>
          </div>
        ))}
      </section>

      {/* Top mutation signals + candidate hypothesis classes */}
      <section className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <SectionCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Top mutation signals</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Ranked for expert review</h2>
              <p className="mt-1 text-xs text-ink/55">Open a signal to inspect matched gene, pathway, evidence category, limitation, and next validation step.</p>
            </div>
            <Link className="inline-flex items-center gap-1 text-xs font-semibold text-tide hover:underline" href="/results">
              Open evidence board <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f5fbff] text-[11px] font-semibold uppercase tracking-[0.12em] text-tide">
                <tr>
                  <th className="px-3 py-2.5">Rank</th>
                  <th className="px-3 py-2.5">Signal</th>
                  <th className="px-3 py-2.5">Pathway</th>
                  <th className="px-3 py-2.5">Tier</th>
                  <th className="px-3 py-2.5">Score</th>
                  <th className="px-3 py-2.5">Review state</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7f1f7]">
                {topMutationSlice.map((mutation, index) => {
                  const state = getReviewState(index);
                  return (
                    <tr className="hover:bg-[#f5fbff]" key={mutation.id}>
                      <td className="px-3 py-3 font-semibold text-tide">{index + 1}</td>
                      <td className="px-3 py-3">
                        <p className="font-semibold text-ink">{mutation.gene} <span className="font-normal text-ink/60">{mutation.variant}</span></p>
                        <p className="text-[11px] text-ink/55">{candidateDirectionByGene[mutation.gene] ?? "Candidate research class"}</p>
                      </td>
                      <td className="px-3 py-3 text-ink/70">{mutation.pathway}</td>
                      <td className="px-3 py-3 text-ink/70">{mutation.evidenceCategory}</td>
                      <td className="px-3 py-3 font-semibold text-ink">{mutation.prototypeRelevanceScore}</td>
                      <td className="px-3 py-3"><StatusPill kind={state.kind} label={state.label} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Draft hypothesis classes</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Candidate research shortlist</h2>
            </div>
            <span className="rounded-full border border-[#cde8f5] bg-white px-2.5 py-1 text-xs font-semibold text-ink/58">{candidateMatches} matched</span>
          </div>
          <p className="mt-1 text-xs text-ink/55">Generated from matched pathway context. Research hypotheses only, not treatment recommendations.</p>
          <div className="mt-4 space-y-2">
            {drugs.slice(0, 4).map((drug, index) => {
              const state = getReviewState(index);
              return (
                <div className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3" key={drug.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{candidateDirectionByGene[drug.matchedGene] ?? drug.candidateClass}</p>
                      <p className="mt-0.5 text-[11px] text-ink/58">Linked to {drug.matchedGene} {drug.matchedVariant} · {drug.pathway}</p>
                    </div>
                    <StatusPill kind={state.kind} label={state.label} />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </section>

      {/* Cohort intake summary + pathway view */}
      <section className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Cohort intake summary</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{kpi.cohort.name}</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            The uploaded file is de-identified and matches the required mutation schema. Detected genes were mapped into pathway-level evidence and prepared for ranking.
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {cohortFacts.map((fact) => (
              <div className="rounded-xl border border-[#dbeef8] bg-[#f8fcff] p-3" key={fact.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/52">{fact.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Pathway distribution</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Relevance by pathway</h2>
              <p className="mt-1 text-xs leading-5 text-ink/55">
                Hover a pathway to inspect the top signal, candidate research class, and evidence tags. Counts reflect ranked rows in this cohort only.
              </p>
            </div>
            <Network aria-hidden="true" className="h-5 w-5 text-tide/60" />
          </div>
          <PathwayChart data={pathwayData} details={pathwayInsights} />
        </SectionCard>
      </section>

      {/* Workflow shortcuts */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Cohort intake", detail: "Upload or select a de-identified cohort.", href: "/analysis", icon: FlaskConical, step: "1" },
          { title: "Mutation scoring", detail: "Run pathway-aware relevance scoring.", href: "/analysis", icon: Microscope, step: "2" },
          { title: "Evidence board", detail: "Inspect ranked signals and limitations.", href: "/results", icon: Sparkles, step: "3" },
          { title: "Research brief", detail: "Export reviewed evidence as a brief.", href: "/report", icon: FileText, step: "4" }
        ].map((step) => {
          const Icon = step.icon;
          return (
            <Link className="group flex items-center gap-3 rounded-2xl border border-[#dbeef8] bg-white p-4 hover:border-[#9ed6ee] hover:bg-[#f8fcff]" href={step.href} key={step.title}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eef8fd] text-tide">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{step.step}. {step.title}</span>
                <span className="block text-xs text-ink/55">{step.detail}</span>
              </span>
              <ArrowRight aria-hidden="true" className="ml-auto h-4 w-4 text-ink/30 group-hover:text-tide" />
            </Link>
          );
        })}
      </section>

      {/* Research-use boundary */}
      <section className="rounded-[24px] border border-[#dbeef8] bg-[#f8fcff] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-tide">
              <Clock4 aria-hidden="true" className="h-3.5 w-3.5" />
              Research-use boundary
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Keep the evidence trail visible before export.
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">{researchUseDisclaimer}</p>
          </div>
          <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href="/report">
            Generate research brief
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
