import { cohorts, demoCohort, getCohortById } from "@/data/cohorts";
import { demoDrugHypotheses } from "@/data/drug-hypotheses";
import { demoMutations } from "@/data/mutations";
import { computeDrugHypothesisScore, computeMutationRelevanceScore } from "./scoring";
import type {
  Cohort,
  DatasetSummary,
  PathwayDistributionPoint,
  RankedDrugHypothesis,
  RankedMutationRecord
} from "./types";

export { cohorts, demoCohort, getCohortById };

export function getRankedMutations(cohortId: string = demoCohort.id): RankedMutationRecord[] {
  return demoMutations
    .filter((mutation) => mutation.cohortId === cohortId)
    .map((mutation) => ({
      ...mutation,
      prototypeRelevanceScore: computeMutationRelevanceScore(mutation)
    }))
    .sort((first, second) => second.prototypeRelevanceScore - first.prototypeRelevanceScore);
}

export function getRankedDrugHypotheses(cohortId: string = demoCohort.id): RankedDrugHypothesis[] {
  const rankedMutations = getRankedMutations(cohortId);
  const cohortGenes = new Set(rankedMutations.map((mutation) => mutation.gene));

  return demoDrugHypotheses
    .filter((hypothesis) => cohortGenes.has(hypothesis.matchedGene))
    .map((hypothesis) => {
      const matchedMutation = rankedMutations.find((mutation) => mutation.gene === hypothesis.matchedGene);
      return computeDrugHypothesisScore(hypothesis, matchedMutation?.prototypeRelevanceScore ?? 70);
    })
    .sort((first, second) => second.compositePriorityScore - first.compositePriorityScore);
}

export function getDatasetSummary(cohortId: string = demoCohort.id): DatasetSummary {
  const rankedMutations = getRankedMutations(cohortId);
  const cohort = getCohortById(cohortId);
  const genesDetected = rankedMutations.map((record) => record.gene);
  const topPathways = rankedMutations.slice(0, 3).map((record) => record.pathway);

  return {
    cohort,
    mutationCount: rankedMutations.length,
    genesDetected,
    topPathways,
    status: "Ready for research analysis"
  };
}

export function getPathwayDistribution(cohortId: string = demoCohort.id): PathwayDistributionPoint[] {
  const pathwayMap = new Map<string, { count: number; scoreTotal: number }>();

  for (const mutation of getRankedMutations(cohortId)) {
    const current = pathwayMap.get(mutation.pathway) ?? { count: 0, scoreTotal: 0 };
    pathwayMap.set(mutation.pathway, {
      count: current.count + 1,
      scoreTotal: current.scoreTotal + mutation.prototypeRelevanceScore
    });
  }

  return Array.from(pathwayMap.entries()).map(([pathway, value]) => ({
    pathway,
    count: value.count,
    averageScore: Math.round(value.scoreTotal / value.count)
  }));
}

export function getCohortKpi(cohortId: string = demoCohort.id) {
  const ranked = getRankedMutations(cohortId);
  const drugs = getRankedDrugHypotheses(cohortId);
  const cohort = getCohortById(cohortId);
  // Mock workflow KPIs anchored to cohort size — research-use only
  const analystHoursManual = Math.round(cohort.sampleCount * 0.55 + ranked.length * 1.8 + 12);
  const analystHoursOncoq = Math.round(analystHoursManual * 0.42);
  const timeToShortlistMinutes = Math.max(2, Math.round(ranked.length * 0.6));
  const topPriority = drugs[0]?.compositePriorityScore ?? 0;
  return {
    cohort,
    samples: cohort.sampleCount,
    mutationSignals: ranked.length,
    candidateClasses: drugs.length,
    analystHoursManual,
    analystHoursOncoq,
    analystHoursSaved: analystHoursManual - analystHoursOncoq,
    timeToShortlistMinutes,
    topPriority
  };
}

export function getAggregateKpi() {
  // Aggregate across all demo cohorts to demonstrate pilot-scale value
  return cohorts.reduce(
    (acc, cohort) => {
      const kpi = getCohortKpi(cohort.id);
      acc.samples += kpi.samples;
      acc.mutationSignals += kpi.mutationSignals;
      acc.candidateClasses += kpi.candidateClasses;
      acc.analystHoursSaved += kpi.analystHoursSaved;
      return acc;
    },
    { samples: 0, mutationSignals: 0, candidateClasses: 0, analystHoursSaved: 0, cohortCount: cohorts.length }
  );
}

// Deterministic mock benchmark comparing the prototype scoring layer to baseline ranking.
export function getBenchmarkSeries() {
  return [
    { metric: "Top-10 ranking agreement", classical: 62, simulatedHybrid: 71 },
    { metric: "Pathway mapping consistency", classical: 70, simulatedHybrid: 78 },
    { metric: "Evidence-category agreement", classical: 65, simulatedHybrid: 74 },
    { metric: "Top-k precision", classical: 58, simulatedHybrid: 69 },
    { metric: "Run-to-run stability", classical: 84, simulatedHybrid: 92 }
  ];
}

export const analysisSteps = [
  { label: "Standardising mutation fields", status: "COMPLETE" },
  { label: "Mapping genes to cancer pathways", status: "COMPLETE" },
  { label: "Ranking mutation relevance", status: "COMPLETE" },
  { label: "Matching drug-target relationships", status: "COMPLETE" },
  { label: "Running prototype compatibility layer", status: "SIMULATED" },
  { label: "Building explainable report", status: "PENDING VALIDATION" }
] as const;

export const validationSteps = [
  "Confirm mutation calls and variant annotations from the source sequencing workflow.",
  "Compare ranked signals against curated oncology knowledgebases and retrospective datasets.",
  "Benchmark the prototype scoring layer against baseline ranking logic.",
  "Run expert review with bioinformatics, oncology research, and molecular pathology reviewers."
];

export const acceptedSchema = [
  "sample_id",
  "gene",
  "variant",
  "cancer_type",
  "pathway",
  "evidence_category",
  "source_note"
];

// Light helper to derive cohort metadata from an in-browser parsed dataset
export function summarizeUploadedRows(rows: Array<{ gene: string; variant: string; pathway?: string; evidence?: string }>) {
  const genes = Array.from(new Set(rows.map((row) => row.gene).filter(Boolean)));
  const pathways = Array.from(new Set(rows.map((row) => row.pathway).filter(Boolean) as string[]));
  return {
    rowCount: rows.length,
    genes,
    pathways
  };
}

export function getCohortList(): Cohort[] {
  return cohorts;
}
