// Operational mock data for the SaaS-style product surface.
// All values are synthetic and local — no backend, no real PHI.

export type RunStatus = "running" | "queued" | "complete" | "failed" | "review";
export type EngagementStage = "lead" | "pilot" | "saas" | "enterprise" | "renewal";
export type ReportStatus = "draft" | "ready" | "archived";

export type PipelineRun = {
  id: string;
  cohortId: string;
  cohortLabel: string;
  startedAt: string; // ISO
  durationSec: number;
  status: RunStatus;
  mutationsScored: number;
  hypotheses: number;
  triggeredBy: string;
};

export type GeneratedReport = {
  id: string;
  title: string;
  cohortLabel: string;
  template: "Research brief" | "Client review brief" | "Validation memo" | "Pilot SOW";
  status: ReportStatus;
  generatedAt: string;
  bytes: number;
  owner: string;
};

export type Engagement = {
  id: string;
  customer: string;
  contact: string;
  stage: EngagementStage;
  tier: "Pilot" | "SaaS" | "Enterprise";
  mrrMyr: number;
  contractMyr: number;
  startedAt: string;
  renewalAt: string;
  primaryCohort: string;
  health: "green" | "amber" | "red";
};

export type BenchmarkRun = {
  id: string;
  label: string;
  startedAt: string;
  status: RunStatus;
  classicalScore: number;
  hybridScore: number;
  delta: number;
  reviewer: string;
};

export type ActivityEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  kind: "upload" | "run" | "report" | "engagement" | "benchmark";
};

export type PipelineStage = {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down" | "queued";
  throughput: string;
  latencyMs: number;
  lastRunAt: string;
  uptimePct: number;
  owner: string;
};

export type SampleRow = {
  id: string;
  sampleId: string;
  cohortLabel: string;
  cancerType: string;
  receivedAt: string;
  mutations: number;
  status: "queued" | "running" | "ready" | "review" | "failed";
  riskBand: "high" | "elevated" | "moderate" | "low";
  topGene: string;
};

const now = new Date("2026-05-15T09:30:00Z");
function ago(daysOrHours: number, unit: "h" | "d" | "m" = "h"): string {
  const ms =
    unit === "h" ? daysOrHours * 3600 * 1000 : unit === "d" ? daysOrHours * 86400 * 1000 : daysOrHours * 60 * 1000;
  return new Date(now.getTime() - ms).toISOString();
}

export const pipelineRuns: PipelineRun[] = [
  {
    id: "run-2026-0142",
    cohortId: "cohort-luad-demo",
    cohortLabel: "Lung adenocarcinoma demo",
    startedAt: ago(0.4),
    durationSec: 168,
    status: "complete",
    mutationsScored: 15,
    hypotheses: 5,
    triggeredBy: "amir.k@oncoq"
  },
  {
    id: "run-2026-0141",
    cohortId: "cohort-brca-demo",
    cohortLabel: "Breast carcinoma demo",
    startedAt: ago(2.1),
    durationSec: 191,
    status: "complete",
    mutationsScored: 14,
    hypotheses: 5,
    triggeredBy: "amir.k@oncoq"
  },
  {
    id: "run-2026-0140",
    cohortId: "cohort-crc-demo",
    cohortLabel: "Colorectal demo",
    startedAt: ago(6),
    durationSec: 184,
    status: "review",
    mutationsScored: 15,
    hypotheses: 5,
    triggeredBy: "lim.s@oncoq"
  },
  {
    id: "run-2026-0139",
    cohortId: "cohort-luad-demo",
    cohortLabel: "Lung adenocarcinoma demo",
    startedAt: ago(22),
    durationSec: 9,
    status: "failed",
    mutationsScored: 0,
    hypotheses: 0,
    triggeredBy: "system"
  },
  {
    id: "run-2026-0138",
    cohortId: "cohort-brca-demo",
    cohortLabel: "Breast carcinoma demo",
    startedAt: ago(1.4, "d"),
    durationSec: 172,
    status: "complete",
    mutationsScored: 14,
    hypotheses: 4,
    triggeredBy: "amir.k@oncoq"
  },
  {
    id: "run-2026-0137",
    cohortId: "cohort-crc-demo",
    cohortLabel: "Colorectal demo",
    startedAt: ago(2.6, "d"),
    durationSec: 0,
    status: "queued",
    mutationsScored: 0,
    hypotheses: 0,
    triggeredBy: "scheduler"
  }
];

export const generatedReports: GeneratedReport[] = [
  {
    id: "rep-0023",
    title: "LUAD demo · research brief",
    cohortLabel: "Lung adenocarcinoma demo",
    template: "Research brief",
    status: "ready",
    generatedAt: ago(0.5),
    bytes: 42_188,
    owner: "amir.k@oncoq"
  },
  {
    id: "rep-0022",
    title: "BRCA demo · validation memo",
    cohortLabel: "Breast carcinoma demo",
    template: "Validation memo",
    status: "ready",
    generatedAt: ago(2.4),
    bytes: 38_402,
    owner: "amir.k@oncoq"
  },
  {
    id: "rep-0021",
    title: "CRC demo · client review brief",
    cohortLabel: "Colorectal demo",
    template: "Client review brief",
    status: "draft",
    generatedAt: ago(9),
    bytes: 17_220,
    owner: "lim.s@oncoq"
  },
  {
    id: "rep-0020",
    title: "Pantai BioLabs · pilot SOW",
    cohortLabel: "Lung adenocarcinoma demo",
    template: "Pilot SOW",
    status: "ready",
    generatedAt: ago(2, "d"),
    bytes: 22_100,
    owner: "amir.k@oncoq"
  },
  {
    id: "rep-0019",
    title: "Sunway Oncology · research brief",
    cohortLabel: "Breast carcinoma demo",
    template: "Research brief",
    status: "archived",
    generatedAt: ago(8, "d"),
    bytes: 41_980,
    owner: "amir.k@oncoq"
  }
];

export const engagements: Engagement[] = [
  {
    id: "eng-001",
    customer: "Pantai BioLabs",
    contact: "Dr. Tan Wei Lin",
    stage: "pilot",
    tier: "Pilot",
    mrrMyr: 16_667,
    contractMyr: 50_000,
    startedAt: ago(28, "d"),
    renewalAt: ago(-62, "d"),
    primaryCohort: "Lung adenocarcinoma",
    health: "green"
  },
  {
    id: "eng-002",
    customer: "Sunway Oncology Research",
    contact: "Dr. Aiman Rashid",
    stage: "saas",
    tier: "SaaS",
    mrrMyr: 10_000,
    contractMyr: 120_000,
    startedAt: ago(94, "d"),
    renewalAt: ago(-271, "d"),
    primaryCohort: "Breast carcinoma",
    health: "green"
  },
  {
    id: "eng-003",
    customer: "Universiti Malaya OncoLab",
    contact: "Prof. Lim Boon Eng",
    stage: "pilot",
    tier: "Pilot",
    mrrMyr: 16_667,
    contractMyr: 50_000,
    startedAt: ago(11, "d"),
    renewalAt: ago(-79, "d"),
    primaryCohort: "Colorectal",
    health: "amber"
  },
  {
    id: "eng-004",
    customer: "ASEAN Pharma R&D",
    contact: "Mr. Daniel Wong",
    stage: "lead",
    tier: "Enterprise",
    mrrMyr: 0,
    contractMyr: 380_000,
    startedAt: ago(3, "d"),
    renewalAt: "",
    primaryCohort: "Multi-cohort",
    health: "amber"
  },
  {
    id: "eng-005",
    customer: "KL Genomics Centre",
    contact: "Dr. Nurul Hidayah",
    stage: "renewal",
    tier: "SaaS",
    mrrMyr: 10_000,
    contractMyr: 120_000,
    startedAt: ago(310, "d"),
    renewalAt: ago(-21, "d"),
    primaryCohort: "Lung adenocarcinoma",
    health: "green"
  }
];

export const benchmarkRuns: BenchmarkRun[] = [
  {
    id: "bench-0042",
    label: "Top-10 ranking agreement · LUAD retro",
    startedAt: ago(4),
    status: "complete",
    classicalScore: 62,
    hybridScore: 71,
    delta: 9,
    reviewer: "Dr. Tan Wei Lin"
  },
  {
    id: "bench-0041",
    label: "Pathway mapping consistency · BRCA retro",
    startedAt: ago(1.2, "d"),
    status: "complete",
    classicalScore: 70,
    hybridScore: 78,
    delta: 8,
    reviewer: "Dr. Aiman Rashid"
  },
  {
    id: "bench-0040",
    label: "Evidence-category agreement · CRC retro",
    startedAt: ago(2.8, "d"),
    status: "review",
    classicalScore: 65,
    hybridScore: 74,
    delta: 9,
    reviewer: "Prof. Lim Boon Eng"
  },
  {
    id: "bench-0039",
    label: "Top-k precision · LUAD retro",
    startedAt: ago(5.5, "d"),
    status: "complete",
    classicalScore: 58,
    hybridScore: 69,
    delta: 11,
    reviewer: "Dr. Tan Wei Lin"
  },
  {
    id: "bench-0038",
    label: "Run-to-run stability · CRC retro",
    startedAt: ago(8, "d"),
    status: "complete",
    classicalScore: 84,
    hybridScore: 92,
    delta: 8,
    reviewer: "Prof. Lim Boon Eng"
  },
  {
    id: "bench-0037",
    label: "Prototype layer noise sweep",
    startedAt: ago(0.7),
    status: "queued",
    classicalScore: 0,
    hybridScore: 0,
    delta: 0,
    reviewer: "—"
  }
];

export const activityFeed: ActivityEvent[] = [
  { id: "a-9", at: ago(0.3), actor: "amir.k@oncoq", action: "exported report", target: "rep-0023", kind: "report" },
  { id: "a-8", at: ago(0.4), actor: "amir.k@oncoq", action: "completed run", target: "run-2026-0142", kind: "run" },
  { id: "a-7", at: ago(2), actor: "lim.s@oncoq", action: "uploaded cohort", target: "BRCA-2026-05.csv", kind: "upload" },
  { id: "a-6", at: ago(3.2), actor: "system", action: "queued benchmark", target: "bench-0037", kind: "benchmark" },
  { id: "a-5", at: ago(6), actor: "lim.s@oncoq", action: "flagged for review", target: "run-2026-0140", kind: "run" },
  { id: "a-4", at: ago(11), actor: "amir.k@oncoq", action: "renewed engagement", target: "eng-005 KL Genomics", kind: "engagement" },
  { id: "a-3", at: ago(22), actor: "system", action: "pipeline error", target: "run-2026-0139", kind: "run" },
  { id: "a-2", at: ago(1.4, "d"), actor: "amir.k@oncoq", action: "generated report", target: "rep-0022", kind: "report" },
  { id: "a-1", at: ago(2, "d"), actor: "amir.k@oncoq", action: "signed pilot SOW", target: "eng-001 Pantai BioLabs", kind: "engagement" }
];

export const pipelineStages: PipelineStage[] = [
  {
    id: "stage-ingest",
    name: "Dataset ingestion",
    status: "healthy",
    throughput: "12 cohorts / day",
    latencyMs: 280,
    lastRunAt: ago(0.4),
    uptimePct: 99.6,
    owner: "data-platform"
  },
  {
    id: "stage-annotate",
    name: "Mutation annotation",
    status: "healthy",
    throughput: "14 cohorts / day",
    latencyMs: 412,
    lastRunAt: ago(0.4),
    uptimePct: 99.4,
    owner: "bioinfo"
  },
  {
    id: "stage-rank",
    name: "Risk & relevance scoring",
    status: "healthy",
    throughput: "11 cohorts / day",
    latencyMs: 624,
    lastRunAt: ago(0.4),
    uptimePct: 99.2,
    owner: "ml-platform"
  },
  {
    id: "stage-hybrid",
    name: "Prototype candidate ranking",
    status: "degraded",
    throughput: "9 cohorts / day",
    latencyMs: 1432,
    lastRunAt: ago(0.5),
    uptimePct: 96.1,
    owner: "ml-platform"
  },
  {
    id: "stage-report",
    name: "Evidence report builder",
    status: "healthy",
    throughput: "10 reports / day",
    latencyMs: 322,
    lastRunAt: ago(0.5),
    uptimePct: 99.9,
    owner: "app-platform"
  }
];

export const sampleRows: SampleRow[] = [
  { id: "s-1", sampleId: "LUAD-2026-014", cohortLabel: "Lung adenocarcinoma demo", cancerType: "Lung adenocarcinoma", receivedAt: ago(0.2), mutations: 8, status: "ready", riskBand: "elevated", topGene: "EGFR" },
  { id: "s-2", sampleId: "LUAD-2026-013", cohortLabel: "Lung adenocarcinoma demo", cancerType: "Lung adenocarcinoma", receivedAt: ago(0.4), mutations: 6, status: "ready", riskBand: "high", topGene: "KRAS" },
  { id: "s-3", sampleId: "BRCA-2026-007", cohortLabel: "Breast carcinoma demo", cancerType: "Breast carcinoma", receivedAt: ago(1.1), mutations: 9, status: "review", riskBand: "high", topGene: "BRCA1" },
  { id: "s-4", sampleId: "CRC-2026-009", cohortLabel: "Colorectal demo", cancerType: "Colorectal", receivedAt: ago(2.4), mutations: 5, status: "running", riskBand: "moderate", topGene: "APC" },
  { id: "s-5", sampleId: "LUAD-2026-012", cohortLabel: "Lung adenocarcinoma demo", cancerType: "Lung adenocarcinoma", receivedAt: ago(6), mutations: 7, status: "ready", riskBand: "elevated", topGene: "TP53" },
  { id: "s-6", sampleId: "BRCA-2026-006", cohortLabel: "Breast carcinoma demo", cancerType: "Breast carcinoma", receivedAt: ago(8), mutations: 4, status: "queued", riskBand: "moderate", topGene: "ERBB2" },
  { id: "s-7", sampleId: "CRC-2026-008", cohortLabel: "Colorectal demo", cancerType: "Colorectal", receivedAt: ago(22), mutations: 0, status: "failed", riskBand: "low", topGene: "—" },
  { id: "s-8", sampleId: "LUAD-2026-011", cohortLabel: "Lung adenocarcinoma demo", cancerType: "Lung adenocarcinoma", receivedAt: ago(1.4, "d"), mutations: 6, status: "ready", riskBand: "moderate", topGene: "EGFR" }
];

export function formatRelative(iso: string): string {
  if (!iso) return "—";
  const diff = now.getTime() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatMyr(value: number): string {
  if (!value) return "—";
  return `RM ${value.toLocaleString("en-MY")}`;
}
