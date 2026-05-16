import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Beaker,
  Building2,
  CircleDot,
  Compass,
  Dna,
  FileText,
  FlaskConical,
  Handshake,
  HeartPulse,
  LineChart,
  Microscope,
  Network,
  ShieldCheck,
  Target,
  Users
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ResearchUseAlert } from "@/components/research-use-alert";

export const metadata = {
  title: "Pitch mode — OncoQ.tech",
  description:
    "Compact judge-mode walkthrough of the OncoQ.tech research-use oncology workflow: problem, target users, UM IP, demo, market, business model, GTM, competition, feasibility, and ask."
};

function SectionCard({
  index,
  title,
  subtitle,
  icon: Icon,
  children
}: {
  index: string;
  title: string;
  subtitle?: string;
  icon: typeof Target;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-[#dbeef8] bg-white p-6 shadow-[0_1px_0_rgba(11,61,107,0.04)]">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#eef8fd] text-tide">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-tide">{index}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1.5 max-w-3xl text-sm leading-6 text-ink/60">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-6 text-ink/72">
      <CircleDot aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-tide" />
      <span>{children}</span>
    </li>
  );
}

function MiniCard({ title, body, icon: Icon }: { title: string; body: string; icon: typeof Target }) {
  return (
    <div className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-tide">
          <Icon aria-hidden="true" className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold text-ink">{title}</p>
      </div>
      <p className="mt-2 text-xs leading-5 text-ink/60">{body}</p>
    </div>
  );
}

export default function PitchModePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Judge mode · Pitch walkthrough"
        icon={Compass}
        title="OncoQ.tech in 10 panels"
        description="A structured pitch view of the product: problem, target users, UM IP application, demo flow, market, business model, GTM, competition, feasibility, and ask."
        meta={
          <>
            <span>Research-use prototype</span>
            <span>·</span>
            <span>UM deep-tech IP basis</span>
            <span>·</span>
            <span>~5 minute walkthrough</span>
          </>
        }
        action={
          <Link
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide"
            href="/dashboard"
          >
            Open demo dashboard
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        }
      />

      <ResearchUseAlert />

      {/* 1. Problem */}
      <SectionCard
        icon={Target}
        index="01 · Problem"
        subtitle="Mutation interpretation in oncology research is slow, fragmented, and hard to translate into action."
        title="What problem are we solving?"
      >
        <ul className="grid gap-3 md:grid-cols-3">
          <Bullet>
            Cancer mutation data is complex; turning a variant table into a defensible research direction takes manual review across many tools and literature sources.
          </Bullet>
          <Bullet>
            Drug repurposing investigation is expensive and slow; promising mutation-to-pathway-to-compound links are missed because the workflow is fragmented.
          </Bullet>
          <Bullet>
            Research teams lack a single workspace that connects mutation prioritisation, cancer risk modelling, and drug repurposing hypotheses with evidence provenance.
          </Bullet>
        </ul>
      </SectionCard>

      {/* 2. Target users */}
      <SectionCard
        icon={Users}
        index="02 · Target users"
        subtitle="OncoQ.tech is built for research-use teams first — not for direct patient care."
        title="Who exactly has this problem?"
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MiniCard
            body="Oncology and precision medicine research units that need defensible mutation interpretation for internal review."
            icon={HeartPulse}
            title="Hospital research units"
          />
          <MiniCard
            body="Molecular diagnostic labs running de-identified panels and seeking structured workflow output for R&D collaborators."
            icon={Microscope}
            title="Molecular diagnostic labs"
          />
          <MiniCard
            body="Biotech and pharma drug-repurposing teams looking for early hypothesis-class signals tied to mutation evidence."
            icon={FlaskConical}
            title="Pharma / biotech R&D"
          />
          <MiniCard
            body="University commercialisation, research offices, and translational partners managing IP-backed research pilots."
            icon={Building2}
            title="Research commercialisation"
          />
        </div>
      </SectionCard>

      {/* 3. UM IP application */}
      <SectionCard
        icon={Dna}
        index="03 · UM IP application"
        subtitle="Based on the UM hybrid AI / quantum-inspired computational approach for genetic mutation detection, cancer risk prediction, and drug repurposing."
        title="How does the UM IP create value?"
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-5">
            <p className="text-sm font-semibold text-ink">Why this is not a generic AI wrapper</p>
            <ul className="mt-3 space-y-2">
              <Bullet>The selected UM IP provides a deep-tech computational base spanning mutation detection, cancer risk modelling, and drug repurposing analysis.</Bullet>
              <Bullet>Hybrid AI / quantum-inspired components are applied to the parts of the workflow that benefit from high-dimensional pattern search and combinatorial scoring.</Bullet>
              <Bullet>Outputs are kept as research-use signals with evidence provenance, not as clinical decisions.</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl bg-ocean p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ice/85">Three IP-aligned modules</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ice/92">
              <li><span className="font-semibold text-white">Mutation detection & prioritisation</span> — rank variants by biological relevance and evidence.</li>
              <li><span className="font-semibold text-white">Cancer risk prediction</span> — research-use risk category from mutation patterns.</li>
              <li><span className="font-semibold text-white">Drug repurposing engine</span> — match mutation pathways to existing compound classes for hypothesis review.</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* 4. Product demo flow */}
      <SectionCard
        icon={Beaker}
        index="04 · Product demo flow"
        subtitle="A research analyst can walk the full path inside the prototype."
        title="What does the product actually do?"
      >
        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            { step: "Intake", body: "Load a de-identified demo cohort or sample (mock data)." },
            { step: "Mutation panel", body: "See ranked variants with pathway, confidence, and clinical-relevance tag." },
            { step: "Risk panel", body: "Inspect a research-use risk category with contributing factors." },
            { step: "Repurposing", body: "Review candidate compound classes tied to mutation pathways." },
            { step: "Brief export", body: "Generate a research-use report with disclaimers and validation notes." }
          ].map((item, index) => (
            <li
              className="rounded-2xl border border-[#dbeef8] bg-white p-4"
              key={item.step}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-tide">Step {index + 1}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{item.step}</p>
              <p className="mt-1 text-xs leading-5 text-ink/60">{item.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/dashboard">
            Open dashboard <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/results">
            View ranked signals <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/report">
            See report export <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionCard>

      {/* 5. Market opportunity */}
      <SectionCard
        icon={LineChart}
        index="05 · Market opportunity"
        subtitle="Research-use oncology analytics is a defensible beachhead with adjacency to a larger precision-medicine market."
        title="Where is the commercial pull?"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <MiniCard
            body="Research-use oncology analytics across hospital research units, molecular labs, and university research teams."
            icon={Target}
            title="Beachhead segment"
          />
          <MiniCard
            body="Pharma and biotech drug-repurposing teams that pay for early hypothesis-class signal and structured mutation context."
            icon={Banknote}
            title="High-willingness-to-pay segment"
          />
          <MiniCard
            body="Future expansion into clinical decision-support after retrospective validation, prospective study, and regulatory review."
            icon={ShieldCheck}
            title="Long-horizon adjacency"
          />
        </div>
      </SectionCard>

      {/* 6. Business model */}
      <SectionCard
        icon={Banknote}
        index="06 · Business model"
        subtitle="Multiple aligned revenue lines, anchored on research SaaS and pharma partnerships."
        title="How do we make money?"
      >
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Bullet>Research SaaS subscription for hospital and lab research teams.</Bullet>
          <Bullet>Institutional pilot license bundled with onboarding and validation support.</Bullet>
          <Bullet>API access licensed to pharma and biotech for structured mutation-to-pathway signal.</Bullet>
          <Bullet>Custom research collaboration agreements with hospitals and UM-aligned partners.</Bullet>
          <Bullet>Future clinical decision-support licensing — only after validation and regulatory clearance.</Bullet>
          <Bullet>UM IP licensing pathway preserved through structured research partnerships.</Bullet>
        </ul>
      </SectionCard>

      {/* 7. GTM */}
      <SectionCard
        icon={Network}
        index="07 · Go-to-market"
        subtitle="Pilot-first, evidence-driven expansion through validated research partners."
        title="How do we land and expand?"
      >
        <ol className="grid gap-3 md:grid-cols-5">
          {[
            { title: "UM / hospital pilot", body: "Run early research pilots with UM hospital and aligned research units." },
            { title: "Retrospective validation", body: "Benchmark prototype outputs against retrospective datasets." },
            { title: "Lab integration", body: "Integrate with molecular lab workflows and panel reporting." },
            { title: "Pharma partnership", body: "License structured mutation-to-pathway signal to pharma / biotech R&D." },
            { title: "Regional expansion", body: "Expand across SEA research clusters and regional hospital networks." }
          ].map((item, index) => (
            <li className="rounded-2xl border border-[#dbeef8] bg-white p-4" key={item.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-tide">Phase {index + 1}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-ink/60">{item.body}</p>
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* 8. Competitive landscape */}
      <SectionCard
        icon={BarChart3}
        index="08 · Competitive landscape"
        subtitle="Differentiates by combining mutation prioritisation, risk modelling, and drug-repurposing hypothesis in one research workflow — not by claiming clinical superiority."
        title="Where do we sit versus alternatives?"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.16em] text-ink/55">
                <th className="border-b border-[#dbeef8] py-2 pr-3">Solution type</th>
                <th className="border-b border-[#dbeef8] py-2 pr-3">Mutation interpretation</th>
                <th className="border-b border-[#dbeef8] py-2 pr-3">Cancer risk modelling</th>
                <th className="border-b border-[#dbeef8] py-2 pr-3">Drug repurposing</th>
                <th className="border-b border-[#dbeef8] py-2 pr-3">Deep-tech IP</th>
                <th className="border-b border-[#dbeef8] py-2 pr-3">Research workflow</th>
              </tr>
            </thead>
            <tbody className="text-ink/72">
              {[
                ["Manual bioinformatics workflow", "Manual", "Fragmented", "Manual literature review", "None specific", "Ad-hoc"],
                ["Generic AI health dashboard", "Surface-level", "Generic", "Rare", "Limited", "Marketing-led"],
                ["Existing genomic interpretation tools", "Strong", "Partial", "Limited", "Tool-specific", "Single-purpose"],
                ["OncoQ.tech (research-use)", "Ranked + pathway-mapped", "Research-use category signal", "Hypothesis-class candidates", "UM hybrid AI / quantum-inspired IP", "Integrated workspace"]
              ].map((row, idx) => (
                <tr
                  className={`text-sm ${idx === 3 ? "bg-[#f0f8fd]" : ""}`}
                  key={row[0]}
                >
                  {row.map((cell, i) => (
                    <td
                      className={`border-b border-[#eaf3f9] py-3 pr-3 ${i === 0 ? "font-semibold text-ink" : ""} ${idx === 3 ? "text-ink" : ""}`}
                      key={i}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* 9. Feasibility / architecture */}
      <SectionCard
        icon={ShieldCheck}
        index="09 · Feasibility & architecture"
        subtitle="Phased build that respects regulatory and validation realities."
        title="Why is this feasible to build?"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <MiniCard
            body="Frontend research workspace, mock cohort data, mutation ranking, risk category signal, repurposing hypothesis, and report export."
            icon={FlaskConical}
            title="Prototype now"
          />
          <MiniCard
            body="UM hospital and lab pilots, retrospective validation, evidence partnerships, and pharma research API."
            icon={Beaker}
            title="Pilot next"
          />
          <MiniCard
            body="Clinical decision-support licensing — only after prospective study, regulatory review, and governance approval."
            icon={ShieldCheck}
            title="Commercial later"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/architecture">
            See system flow <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/validation">
            Retrospective validation <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          <Link className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-[#eef8fd] px-3 py-1.5 font-semibold text-tide hover:bg-[#dff1fb]" href="/dashboard">
            Open workspace <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionCard>

      {/* 10. Ask */}
      <SectionCard
        icon={Handshake}
        index="10 · Ask"
        subtitle="What we want from judges, UM, hospitals, and partners."
        title="What are we asking for?"
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MiniCard
            body="Recognition of the UM IP application and research-use feasibility of the prototype."
            icon={Target}
            title="From judges"
          />
          <MiniCard
            body="Access to UM hospital research data partnerships under research-use governance for retrospective validation."
            icon={Building2}
            title="From UM"
          />
          <MiniCard
            body="Research-use pilot collaborations with oncology and molecular lab teams."
            icon={HeartPulse}
            title="From hospitals / labs"
          />
          <MiniCard
            body="Pharma and biotech repurposing teams open to evaluating structured mutation-to-pathway signal for early hypothesis review."
            icon={FlaskConical}
            title="From industry partners"
          />
        </div>
        <div className="mt-5 rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-4 text-sm leading-6 text-ink/70">
          OncoQ.tech is a research-use prototype. It is not a medical device, not a diagnostic tool, and not a treatment recommendation system. All outputs require expert review and validation.
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href="/dashboard">
            Walk the demo
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white px-5 py-2.5 text-sm font-semibold text-ink/72 hover:text-tide" href="/report">
            <FileText aria-hidden="true" className="h-4 w-4" />
            View report demo
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
