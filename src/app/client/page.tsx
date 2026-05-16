import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Dna,
  FlaskConical,
  LockKeyhole,
  Upload
} from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { researchUseDisclaimer } from "@/lib/content";
import { generatedReports, pipelineRuns } from "@/data/operations";
import { cohorts, getRankedDrugHypotheses, getRankedMutations } from "@/lib/mock-analysis";

const clientCohort = cohorts[0];
const mutations = getRankedMutations(clientCohort.id).slice(0, 3);
const hypotheses = getRankedDrugHypotheses(clientCohort.id).slice(0, 3);
const latestReport = generatedReports[0];
const latestRun = pipelineRuns.find((run) => run.cohortId === clientCohort.id) ?? pipelineRuns[0];

const clientSteps = [
  { title: "Cohort received", detail: "De-identified mutation file checked against the demo schema.", status: "Complete" },
  { title: "Schema validated", detail: "Required fields, gene names, and variants confirmed before scoring.", status: "Complete" },
  { title: "Signals ranked", detail: "Mutation relevance signals prepared for research review.", status: "Complete" },
  { title: "Hypotheses drafted", detail: "Candidate drug-repurposing hypotheses include limitations and evidence tags.", status: "In review" },
  { title: "Limitations recorded", detail: "Unresolved evidence gaps flagged for retrospective validation.", status: "Pending review" },
  { title: "Report export", detail: "Evidence brief available for read-only client review.", status: "Ready" }
];

function PortalPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-[#dbeef8] bg-white px-3 py-1 text-xs font-semibold text-ink/62">{children}</span>;
}

function PortalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[22px] border border-[#dbeef8] bg-white p-5 ${className}`}>{children}</section>;
}

export default function ClientPortalPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
        <Link className="flex items-center gap-3" href="/">
          <Wordmark size={24} />
          <span className="hidden text-[11px] font-medium text-ink/55 sm:inline">Client portal</span>
        </Link>
        <div className="hidden items-center gap-2 rounded-full border border-[#dbeef8] bg-[#f8fcff] px-4 py-2 text-sm font-semibold text-tide md:inline-flex">
          <LockKeyhole aria-hidden="true" className="h-4 w-4" />
          Read-only review
        </div>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href="#brief">
          View brief
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-[28px] border border-[#dbeef8] bg-white p-5 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[22px] border border-[#dbeef8] bg-[#f8fcff] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <PortalPill>Client-facing</PortalPill>
                <PortalPill>Research-use only</PortalPill>
                <PortalPill>{clientCohort.cancerType}</PortalPill>
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Client review for {clientCohort.name}.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/62 sm:text-base">
                Review the research-use deliverables: mutation relevance signals, candidate drug-repurposing hypotheses, report status, and validation next steps.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white hover:bg-tide" href="#signals">
                  Review signals
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-5 py-3 text-sm font-semibold text-ink/72 hover:text-tide" href="#brief">
                  Open evidence brief
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <PortalCard>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Cohort</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{clientCohort.name}</p>
                <p className="mt-1 text-sm text-ink/52">De-identified demo dataset</p>
              </PortalCard>
              <PortalCard>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Latest run</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{latestRun.mutationsScored}</p>
                <p className="mt-1 text-sm text-ink/52">Mutation signals scored</p>
              </PortalCard>
              <PortalCard>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Report</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{latestReport.status}</p>
                <p className="mt-1 text-sm text-ink/52">Evidence brief status</p>
              </PortalCard>
              <PortalCard>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Boundary</p>
                <p className="mt-3 text-2xl font-semibold text-ink">R&D</p>
                <p className="mt-1 text-sm text-ink/52">Expert review required</p>
              </PortalCard>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1fr_1fr]" id="signals">
            <PortalCard>
              <div className="flex items-center gap-2">
                <Upload aria-hidden="true" className="h-4 w-4 text-tide" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Review path</p>
              </div>
              <div className="mt-4 space-y-3">
                {clientSteps.map((step, index) => (
                  <div className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3" key={step.title}>
                    <div className="flex items-start gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-tide">{index + 1}</span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{step.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-ink/55">{step.detail}</span>
                        <span className="mt-2 inline-flex rounded-full border border-[#cde8f5] bg-white px-2 py-0.5 text-[11px] font-semibold text-tide">{step.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </PortalCard>

            <PortalCard>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Mutation signals</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">Top items for review</h2>
                </div>
                <Dna aria-hidden="true" className="h-5 w-5 text-tide/70" />
              </div>
              <div className="mt-4 space-y-3">
                {mutations.map((mutation, index) => (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3" key={mutation.id}>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{index + 1}. {mutation.gene} {mutation.variant}</span>
                      <span className="mt-1 block text-xs text-ink/52">{mutation.pathway}</span>
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-tide">{mutation.prototypeRelevanceScore}</span>
                  </div>
                ))}
              </div>
            </PortalCard>

            <PortalCard>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Hypotheses</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">Candidate classes</h2>
                </div>
                <FlaskConical aria-hidden="true" className="h-5 w-5 text-tide/70" />
              </div>
              <div className="mt-4 space-y-3">
                {hypotheses.map((hypothesis, index) => (
                  <div className="flex items-start justify-between gap-3 rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3" key={hypothesis.id}>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{index + 1}. {hypothesis.candidateClass}</span>
                      <span className="mt-1 block text-xs text-ink/52">Linked to {hypothesis.matchedGene} {hypothesis.matchedVariant}</span>
                    </span>
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-leaf" />
                  </div>
                ))}
              </div>
            </PortalCard>
          </div>

          <div className="mt-5 rounded-[22px] border border-[#dbeef8] bg-[#f8fcff] p-5" id="brief">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Research-use boundary</p>
                <p className="mt-2 text-sm leading-7 text-ink/64">{researchUseDisclaimer}</p>
              </div>
              <div className="rounded-2xl border border-[#dbeef8] bg-white px-4 py-3 text-sm font-semibold text-ink/68">
                Evidence brief is ready for read-only review.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
