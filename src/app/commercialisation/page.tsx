import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Beaker,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  FlaskConical,
  Globe2,
  HeartPulse,
  Layers,
  Network,
  ShieldCheck,
  Target
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ResearchUseAlert } from "@/components/research-use-alert";

export const metadata = {
  title: "Commercialisation — OncoQ.tech",
  description:
    "Target customer, beachhead market, business model, go-to-market plan, and competitive landscape for the OncoQ.tech research-use prototype."
};

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#dbeef8] bg-white p-5 ${className}`}>{children}</div>;
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-tide">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h2>
      {description && <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>}
    </div>
  );
}

const targetCustomers = [
  {
    title: "Hospitals with oncology / genomics units",
    body: "Precision-oncology research teams that need defensible mutation interpretation for internal review and partner discussions.",
    icon: HeartPulse
  },
  {
    title: "Molecular diagnostic labs",
    body: "Labs running de-identified panels that want structured workflow output for R&D collaborators and pharma partners.",
    icon: FlaskConical
  },
  {
    title: "Pharma / biotech drug discovery",
    body: "Repurposing and translational teams looking for early hypothesis-class signal tied to mutation evidence.",
    icon: Beaker
  },
  {
    title: "Research institutes & university units",
    body: "University commercialisation offices, translational research centres, and IP-aligned partners running structured pilots.",
    icon: Building2
  }
];

const businessModel = [
  { title: "Research SaaS subscription", body: "Per-seat or per-team subscription for hospital and lab research workspaces.", icon: Layers },
  { title: "Institutional pilot license", body: "Fixed-fee pilot with onboarding, validation support, and review packets.", icon: Briefcase },
  { title: "Pharma / biotech API access", body: "Licensed API for structured mutation-to-pathway and repurposing signal.", icon: Network },
  { title: "Custom research collaboration", body: "Co-developed research projects with UM, hospitals, and aligned labs.", icon: FlaskConical },
  { title: "Future clinical decision-support licensing", body: "Long-horizon option, only after retrospective and prospective validation plus regulatory review.", icon: ShieldCheck }
];

const gtmPhases = [
  { title: "UM / hospital research pilot", body: "Run research-use pilot with UM hospital and aligned oncology research units." },
  { title: "Retrospective validation", body: "Benchmark prototype outputs against retrospective datasets and reviewer-labelled cohorts." },
  { title: "Lab workflow integration", body: "Integrate with molecular lab reporting and de-identified panel workflows." },
  { title: "Pharma / biotech partnership", body: "License structured mutation-to-pathway signal for repurposing investigation." },
  { title: "Regional expansion", body: "Expand across SEA research clusters and regional hospital networks." }
];

const competitors: Array<{
  name: string;
  mutation: string;
  risk: string;
  repurposing: string;
  ip: string;
  workflow: string;
  highlight?: boolean;
}> = [
  {
    name: "Manual bioinformatics workflow",
    mutation: "Manual triage across multiple tools",
    risk: "Fragmented; per-team heuristics",
    repurposing: "Manual literature review",
    ip: "None specific",
    workflow: "Ad-hoc, hard to audit"
  },
  {
    name: "Generic AI health dashboard",
    mutation: "Surface-level interpretation",
    risk: "Generic predictive layer",
    repurposing: "Rare or absent",
    ip: "Limited",
    workflow: "Marketing-led, weak provenance"
  },
  {
    name: "Existing genomic interpretation tools",
    mutation: "Strong, tool-specific",
    risk: "Partial",
    repurposing: "Limited",
    ip: "Tool-specific algorithms",
    workflow: "Single-purpose"
  },
  {
    name: "OncoQ.tech (research-use)",
    mutation: "Ranked + pathway-mapped with evidence trail",
    risk: "Research-use risk category signal",
    repurposing: "Hypothesis-class candidates with rationale",
    ip: "UM hybrid AI / quantum-inspired IP",
    workflow: "Integrated research workspace",
    highlight: true
  }
];

export default function CommercialisationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Commercial · Plan"
        icon={Compass}
        title="Commercialisation plan"
        description="Target customer, beachhead market, business model, go-to-market, and competitive landscape for the OncoQ.tech research-use prototype."
        meta={
          <>
            <span>Beachhead: research-use oncology labs & university hospital research teams</span>
            <span>·</span>
            <span>Multiple aligned revenue lines</span>
          </>
        }
        action={
          <Link
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide"
            href="/dashboard"
          >
            Open workspace
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        }
      />

      <ResearchUseAlert />

      {/* Target customer */}
      <section className="space-y-4">
        <SectionHeading
          description="OncoQ.tech is designed first for research-use buyers. Patient-care use is out of scope until validation and regulatory pathways are met."
          eyebrow="01 · Target customer"
          title="Who buys this?"
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {targetCustomers.map((customer) => {
            const Icon = customer.icon;
            return (
              <Card key={customer.title}>
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef8fd] text-tide">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{customer.title}</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/60">{customer.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Beachhead */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="02 · Beachhead market"
          title="Research-use oncology labs and university hospital research teams"
        />
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Card className="bg-ocean text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice/85">Why this beachhead</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-ice/92">
              <li className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                Avoids immediate full clinical diagnostic regulatory burden.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                Allows validation, pilot deployment, and data partnerships under research-use governance.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                Creates a credible evidence base before approaching clinical decision-support markets.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                Aligns with UM research strengths and hospital research partnerships.
              </li>
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-ink">What we sell on day one</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
              <li>Structured research workspace for mutation review.</li>
              <li>Evidence-traced mutation ranking and pathway context.</li>
              <li>Research-use risk category signal.</li>
              <li>Drug repurposing hypothesis-class candidates.</li>
              <li>Exportable research brief with disclaimers and validation notes.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Business model */}
      <section className="space-y-4">
        <SectionHeading
          description="Aligned revenue lines that fit research-use buyers first, with structured paths to industry partners and longer-horizon adjacencies."
          eyebrow="03 · Business model"
          title="How we make money"
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {businessModel.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef8fd] text-tide">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/60">{item.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* GTM */}
      <section className="space-y-4">
        <SectionHeading
          description="Pilot-first, evidence-led expansion. Each phase strengthens the next."
          eyebrow="04 · Go-to-market"
          title="Phased GTM plan"
        />
        <ol className="grid gap-3 md:grid-cols-5">
          {gtmPhases.map((phase, index) => (
            <li className="rounded-2xl border border-[#dbeef8] bg-white p-4" key={phase.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-tide">Phase {index + 1}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{phase.title}</p>
              <p className="mt-1 text-xs leading-5 text-ink/60">{phase.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Competitive landscape */}
      <section className="space-y-4">
        <SectionHeading
          description="Differentiates by combining mutation prioritisation, risk modelling, and drug repurposing hypothesis generation in one research workflow."
          eyebrow="05 · Competitive landscape"
          title="Where OncoQ.tech sits"
        />
        <div className="overflow-x-auto rounded-2xl border border-[#dbeef8] bg-white">
          <table className="w-full min-w-[820px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.16em] text-ink/55">
                <th className="border-b border-[#dbeef8] px-4 py-3">Solution type</th>
                <th className="border-b border-[#dbeef8] px-4 py-3">Mutation interpretation</th>
                <th className="border-b border-[#dbeef8] px-4 py-3">Cancer risk prediction</th>
                <th className="border-b border-[#dbeef8] px-4 py-3">Drug repurposing</th>
                <th className="border-b border-[#dbeef8] px-4 py-3">Deep-tech IP differentiation</th>
                <th className="border-b border-[#dbeef8] px-4 py-3">Research workflow integration</th>
              </tr>
            </thead>
            <tbody className="text-ink/72">
              {competitors.map((row) => (
                <tr className={row.highlight ? "bg-[#f0f8fd]" : ""} key={row.name}>
                  <td className={`border-b border-[#eaf3f9] px-4 py-3 font-semibold ${row.highlight ? "text-ink" : "text-ink"}`}>{row.name}</td>
                  <td className="border-b border-[#eaf3f9] px-4 py-3">{row.mutation}</td>
                  <td className="border-b border-[#eaf3f9] px-4 py-3">{row.risk}</td>
                  <td className="border-b border-[#eaf3f9] px-4 py-3">{row.repurposing}</td>
                  <td className="border-b border-[#eaf3f9] px-4 py-3">{row.ip}</td>
                  <td className="border-b border-[#eaf3f9] px-4 py-3">{row.workflow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-5 text-ink/50">
          Comparative wording reflects product scope and design intent. OncoQ.tech does not claim clinical superiority over any listed category.
        </p>
      </section>

      {/* Trust / regulatory pathway */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="06 · Clinical & regulatory pathway"
          title="How we earn the right to expand"
        />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            { title: "Research-use pilot first", body: "Hospital and lab pilots under research-use governance.", icon: FlaskConical },
            { title: "Retrospective validation", body: "Benchmark on historical de-identified cohorts.", icon: BarChart3 },
            { title: "Prospective clinical study", body: "Structured study with research and clinical partners.", icon: HeartPulse },
            { title: "Regulatory review", body: "Engage relevant regulators if used for clinical decision support.", icon: ShieldCheck },
            { title: "Ethics & data governance", body: "Hospital ethics, data governance, and IP review.", icon: Globe2 }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef8fd] text-tide">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/60">{item.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="rounded-2xl border border-[#dbeef8] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">See the prototype that supports this plan</p>
            <p className="mt-1 text-xs leading-5 text-ink/60">Walk the workspace demo, review architecture, and inspect validation outputs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" href="/dashboard">
              Launch demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-4 py-2 text-sm font-semibold text-ink/72 hover:text-tide" href="/architecture">
              <Target aria-hidden="true" className="h-4 w-4" />
              View architecture
            </Link>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-4 py-2 text-sm font-semibold text-ink/72 hover:text-tide" href="/validation">
              <BarChart3 aria-hidden="true" className="h-4 w-4" />
              Validation benchmarks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
