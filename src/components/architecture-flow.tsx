import { ArrowRight, BrainCircuit, Database, FileText, Network, ShieldCheck, TestTube2 } from "lucide-react";

const phase2Lane = [
  "Local demo JSON",
  "Preprocessing helper",
  "Deterministic ranking logic",
  "UI explanation cards",
  "Report preview"
];

const futureLane = [
  "De-identified genomic datasets",
  "Bioinformatics preprocessing",
  "Benchmarked mutation scoring",
  "Prototype ranking service",
  "Evidence knowledgebase",
  "Research report/API"
];

const riskControls = [
  "Research-use boundary",
  "Audit trail",
  "Model versioning",
  "Source provenance",
  "Data de-identification",
  "Role-based access future plan"
];

function ArchitectureLane({ title, subtitle, items }: { title: string; subtitle: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-[#dbeef8] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">{title}</p>
      <p className="mt-1 text-sm leading-6 text-ink/65">{subtitle}</p>
      <div className="mt-5 grid gap-3 xl:grid-cols-6">
        {items.map((item, index) => (
          <div className="relative" key={item}>
            <div className="flex h-full min-h-24 items-center justify-center rounded-xl border border-[#dbeef8] bg-white px-3 py-4 text-center text-sm font-semibold text-ink">
              {item}
            </div>
            {index < items.length - 1 ? <ArrowRight aria-hidden="true" className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-aqua xl:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureFlow() {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Architecture</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">What is implemented now vs what requires validation</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/68">
          Phase 2 uses local deterministic scoring to demonstrate the protected workflow. The future architecture requires validated data sources, benchmarking, governance, and expert review.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <ArchitectureLane
          items={phase2Lane}
          subtitle="The current prototype runs locally with no backend and no external biomedical API dependencies."
          title="Lane A: Phase 2 demo architecture"
        />
        <ArchitectureLane
          items={futureLane}
          subtitle="The pilot roadmap connects curated data, bioinformatics preprocessing, benchmarked ranking, and governed research outputs."
          title="Lane B: Future validated architecture"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-[#dbeef8] bg-white p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-tide">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          Risk-control module
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {riskControls.map((control) => (
            <div className="rounded-xl border border-[#dbeef8] bg-[#f8fcff] px-3 py-2 text-sm font-semibold text-ink" key={control}>{control}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const architectureHighlights = [
  {
    title: "Implemented in Phase 2",
    body: "Local mock cohort, transparent deterministic scoring, CSV validation preview, evidence cards, report preview, and risk-boundary UI.",
    icon: TestTube2
  },
  {
    title: "Requires future validation",
    body: "Curated biomedical source integration, retrospective benchmarks, expert review, model versioning, and enterprise controls.",
    icon: Network
  },
  {
    title: "Benchmark posture",
    body: "The prototype ranking layer is simulated in Phase 2 and must be benchmarked against baseline logic before performance claims.",
    icon: BrainCircuit
  },
  {
    title: "Research output",
    body: "The platform produces ranked hypotheses and evidence reports for oncology R&D discussion, not clinical action.",
    icon: FileText
  },
  {
    title: "Data pathway",
    body: "Future pilots start from de-identified genomic datasets with provenance and privacy controls before any broader expansion.",
    icon: Database
  }
];
