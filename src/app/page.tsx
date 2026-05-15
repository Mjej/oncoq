import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Dna,
  FileText,
  FileUp,
  FlaskConical,
  Home,
  LayoutDashboard,
  Microscope,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { researchUseDisclaimer } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

const heroStats = [
  { label: "Cohort files reviewed", value: "3", tone: "#3FB6E0", detail: "De-identified demo datasets", dash: "42 100" },
  { label: "Mutation signals ranked", value: "44", tone: "#22C5B6", detail: "Prioritised for research review", dash: "58 100" },
  { label: "Genes requiring review", value: "13", tone: "#0E6BA8", detail: "Linked to pathway context", dash: "65 100" },
  { label: "Validation status", value: "RUO", tone: "#E0A458", detail: "Research-use only", dash: "36 100" }
];

const workflow = [
  { title: "Upload mutation data", detail: "Import a de-identified cohort mutation table or demo dataset.", icon: FileUp },
  { title: "Rank mutation signals", detail: "Prioritise variants and genes using relevance scoring and evidence availability.", icon: Microscope },
  { title: "Review biological context", detail: "Inspect pathway links, supporting evidence, limitations, and confidence boundaries.", icon: FlaskConical },
  { title: "Generate research brief", detail: "Create a structured output for R&D review, partner discussion, or validation planning.", icon: FileText }
];

const dashboardStages = [
  {
    title: "Prioritise",
    detail: "Score mutation signals by biological relevance, recurrence, and available evidence.",
    icon: Microscope,
    progress: "Evidence ranking in progress"
  },
  {
    title: "Investigate",
    detail: "Review pathway links, known limitations, and supporting references before escalation.",
    icon: FlaskConical,
    progress: "Requires domain review"
  },
  {
    title: "Brief",
    detail: "Export a structured research brief for internal review, partner discussion, or validation planning.",
    icon: FileText,
    progress: "Ready for validation planning"
  }
];

const audienceCards = [
  {
    title: "Bioinformatics leads",
    detail: "Reduce manual mutation triage and give each ranked signal a clear evidence trail, pathway context, and review status."
  },
  {
    title: "Translational research teams",
    detail: "Move from raw mutation lists to testable drug-repurposing hypotheses that can be discussed, challenged, and refined."
  },
  {
    title: "R&D operators",
    detail: "Standardise review packets across projects so internal teams can compare opportunities without losing provenance or assumptions."
  },
  {
    title: "Pharma partnering teams",
    detail: "Screen early research opportunities faster by reviewing mutation relevance, pathway fit, and repurposing rationale in one place."
  }
];

const evidenceItems = [
  {
    title: "Mutation relevance score",
    detail: "Shows why a mutation or gene was prioritised for review."
  },
  {
    title: "Pathway context",
    detail: "Links the signal to biological mechanisms and affected pathways."
  },
  {
    title: "Evidence category",
    detail: "Separates literature support, database evidence, computational inference, and internal assumptions."
  },
  {
    title: "Known limitation",
    detail: "Flags weak evidence, missing validation, cohort bias, or unresolved biological uncertainty."
  },
  {
    title: "Next validation step",
    detail: "Suggests what reviewers should check before advancing the hypothesis."
  },
  {
    title: "Source provenance",
    detail: "Keeps references and data origins attached to the candidate output."
  }
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OncoQ.tech",
  applicationCategory: "ResearchApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  softwareVersion: "Prototype",
  audience: {
    "@type": "Audience",
    audienceType: "Oncology R&D and bioinformatics teams"
  }
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-ink/15" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">{children}</span>
      <span className="h-px w-10 bg-ink/15" />
    </div>
  );
}

function ProductIcon({ active, children, href, label }: { active?: boolean; children: ReactNode; href: string; label: string }) {
  return (
    <Link
      aria-label={label}
      className={`focus-ring grid h-10 w-10 place-items-center rounded-full transition ${active ? "bg-[#2d83ee] text-white" : "bg-white/72 text-ink hover:bg-white hover:text-tide"}`}
      href={href}
      title={label}
    >
      {children}
    </Link>
  );
}

function MetricTile({ label, value, tone, detail, dash }: { label: string; value: string; tone: string; detail: string; dash: string }) {
  return (
    <div className="rounded-[18px] border border-[#dbeef8] bg-white/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">{label}</p>
          <p className="mt-8 text-xl font-semibold tracking-tight text-ink">{value}</p>
          <p className="mt-1 text-[11px] text-ink/45">{detail}</p>
        </div>
        <div className="relative h-24 w-24 shrink-0">
          <svg className="h-24 w-24 rotate-[135deg]" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#e7f1f7" strokeWidth="2.6" />
            <circle cx="20" cy="20" r="15" fill="none" stroke={tone} strokeDasharray={dash} strokeLinecap="round" strokeWidth="2.6" />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xl font-semibold text-ink">
            {Number.isNaN(Number.parseInt(value, 10)) ? value : Number.parseInt(value, 10)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fbfe] text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link className="flex items-center gap-2" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean text-white">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-tide">ONCOQ.TECH</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/62 md:flex">
          <Link className="hover:text-ink" href="#platform">Platform</Link>
          <Link className="hover:text-ink" href="#workflow">Workflow</Link>
          <Link className="hover:text-ink" href="#audience">Use Cases</Link>
          <Link className="hover:text-ink" href="#evidence">Evidence Model</Link>
          <Link className="hover:text-ink" href="/dashboard">Demo</Link>
        </nav>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-tide" href="/dashboard">
          View Demo Workspace
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </header>

      <main>
        <section className="relative px-6 pb-24 pt-8 sm:pt-12" id="platform">
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white/66 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-tide">
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Mutation-to-hypothesis workspace
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[64px]">
              <span className="block">Turn cancer mutation data</span>
              <span className="block">into evidence-ranked</span>
              <span className="block">drug repurposing</span>
              <span className="block">hypotheses.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/62 sm:text-lg">
              ONCOQ.TECH helps oncology R&amp;D and translational research teams review de-identified mutation data, prioritise biologically relevant signals, connect them to pathway context, and generate evidence-traced hypotheses for expert review.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-14 max-w-7xl">
            <div
              className="relative overflow-hidden rounded-[18px] border-[7px] border-black bg-[#f7fbff]"
              style={{ transform: "perspective(2200px) rotateX(9deg)", transformOrigin: "50% 0%" }}
            >
              <div className="min-h-[520px] bg-[linear-gradient(112deg,rgba(255,255,255,0.95)_0%,rgba(246,251,254,0.92)_44%,rgba(222,240,254,0.86)_100%)] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2d83ee] text-white">
                      <Dna aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Oncology Evidence Workspace</h2>
                      <p className="mt-1 text-sm text-ink/48">Rank mutation signals, inspect pathway context, and prepare review-ready hypotheses.</p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 rounded-full bg-white/58 p-1.5 backdrop-blur md:flex">
                    <ProductIcon href="/dashboard" label="Open workspace"><Home aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                    <ProductIcon href="/analysis" label="Open analysis"><Database aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                    <ProductIcon active href="/results" label="Open results"><BarChart3 aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                    <ProductIcon href="/report" label="Open report"><FileText aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                    <ProductIcon href="/client" label="Open client portal"><Users aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                  </div>

                  <div className="hidden items-center gap-3 lg:flex">
                    <ProductIcon href="/architecture" label="Open pipeline"><Settings aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                    <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-xs font-semibold text-white">AK</span>
                      <div>
                        <p className="text-xs font-semibold text-ink">Research lead</p>
                        <p className="text-[11px] text-ink/45">Workspace owner</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <ProductIcon href="/results" label="Search results"><Search aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                  <ProductIcon active href="/dashboard" label="Open dashboard"><LayoutDashboard aria-hidden="true" className="h-4 w-4" /></ProductIcon>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-4">
                  {heroStats.map((stat) => (
                    <MetricTile key={stat.label} dash={stat.dash} detail={stat.detail} label={stat.label} tone={stat.tone} value={stat.value} />
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {dashboardStages.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div className="min-h-[196px] rounded-[20px] border border-[#dbeef8] bg-white/62 p-6" key={step.title}>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-ink">{step.title}</p>
                            <p className="mt-2 max-w-xs text-sm leading-6 text-ink/52">{step.detail}</p>
                          </div>
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef8fd] text-tide">
                            <Icon aria-hidden="true" className="h-4 w-4" />
                          </span>
                        </div>
                        <div className="mt-8 h-2 rounded-full bg-[#e9f3f9]">
                          <div className="h-2 rounded-full bg-[#2d83ee]" style={{ width: `${50 + index * 16}%` }} />
                        </div>
                        <p className="mt-3 text-xs text-ink/40">{step.progress}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="rounded-2xl border border-[#cde8f5] bg-white/68 px-4 py-3 text-sm leading-6 text-ink/62">
              {researchUseDisclaimer}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white hover:bg-tide" href="/analysis">
                Run Demo Mutation Review
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white/72 px-6 py-3 text-sm font-semibold text-ink/72 hover:text-tide" href="/report">
                View Evidence Brief
              </Link>
            </div>
          </div>
        </section>

        <section id="workflow" className="px-6 py-16">
          <SectionLabel>Workflow</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-2xl text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A structured review path from mutation upload to validation-ready hypothesis.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-ink/58 sm:text-base">
            Built to reduce manual triage, preserve evidence provenance, and make every candidate easier to defend in internal review.
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="rounded-[22px] border border-[#cde8f5] bg-white/66 p-5 backdrop-blur-xl" key={step.title}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">0{index + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef8fd] text-tide">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/58">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="audience" className="px-6 py-16">
          <SectionLabel>Use Cases</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for teams who need defensible oncology hypotheses, not another dashboard.
          </h2>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            {audienceCards.map((card) => (
              <div className="h-full rounded-[22px] border border-[#cde8f5] bg-white/66 p-6 backdrop-blur-xl" key={card.title}>
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-leaf" />
                <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/58">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="evidence" className="px-6 py-16">
          <SectionLabel>Evidence Model</SectionLabel>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-[24px] bg-ocean p-7 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <Network aria-hidden="true" className="h-3.5 w-3.5" />
                Traceable review chain
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Every hypothesis must explain why it deserves review.</h2>
              <p className="mt-4 text-sm leading-7 text-ice/82">
                ONCOQ.TECH keeps the mutation, pathway, evidence category, limitation, and next validation step connected so reviewers can see the rationale behind each candidate.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {evidenceItems.map((item) => (
                <div className="rounded-[18px] border border-[#cde8f5] bg-white/68 p-4" key={item.title}>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-ink/52">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-[#cde8f5] bg-white/68 p-10 text-center backdrop-blur-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">See how a mutation table becomes a review-ready oncology hypothesis.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/58 sm:text-base">
              Explore a demo cohort, review ranked mutation signals, inspect pathway evidence, and generate a research-use brief with limitations clearly stated.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link className="focus-ring inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white hover:bg-tide" href="/dashboard">
                Open Demo Workspace
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#cde8f5] bg-white/72 px-6 py-3 text-sm font-semibold text-ink/72 hover:text-tide" href="/architecture">
                View Review Pipeline
              </Link>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 pb-10 text-xs text-ink/52 sm:flex-row sm:items-center">
          <span>© 2026 ONCOQ.TECH. Research-use oncology intelligence. Not for clinical diagnosis, treatment selection, or direct patient-care decisions.</span>
          <Link className="font-semibold text-tide hover:underline" href="/dashboard">Explore demo workflow →</Link>
        </footer>
      </main>
    </div>
  );
}
