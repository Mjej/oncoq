import type { DrugHypothesis, EvidenceCategory, MutationRecord, RankedDrugHypothesis } from "./types";

export const evidenceWeights: Record<EvidenceCategory, number> = {
  Strong: 8,
  Moderate: 4,
  Emerging: 2,
  Exploratory: 0
};

export const evidenceWeightNormalized: Record<EvidenceCategory, number> = {
  Strong: 95,
  Moderate: 80,
  Emerging: 68,
  Exploratory: 55
};

export const pathwayImportanceWeights: Record<string, number> = {
  "EGFR/ERBB signalling": 4,
  "p53 tumour suppressor pathway": 3,
  "RAS/MAPK signalling": 3,
  "Homologous recombination DNA repair": 2,
  "ALK tyrosine kinase signalling": 2
};

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

// Deterministic prototype ranking logic for demo use only; not a clinical validity or treatment score.
export function computeMutationRelevanceScore(mutation: MutationRecord): number {
  return clampScore(
    mutation.baseRelevanceScore +
      evidenceWeights[mutation.evidenceCategory] +
      (pathwayImportanceWeights[mutation.pathway] ?? 0)
  );
}

// Simulates a prototype compatibility layer without external ranking services.
export function computeSimulatedHybridScore(
  mutationScore: number,
  pathwayMatchScore: number,
  evidenceCategory: EvidenceCategory
): number {
  const evidenceBoost = evidenceWeightNormalized[evidenceCategory] * 0.1;
  return clampScore(mutationScore * 0.45 + pathwayMatchScore * 0.45 + evidenceBoost);
}

// Composite priority score for research shortlist ordering only; every output still requires expert review.
export function computeDrugHypothesisScore(
  hypothesis: DrugHypothesis,
  mutationScore: number
): RankedDrugHypothesis {
  const simulatedHybridScore = hypothesis.simulatedHybridScore ?? computeSimulatedHybridScore(
    mutationScore,
    hypothesis.pathwayMatchScore,
    hypothesis.evidenceCategory
  );
  const evidence = evidenceWeightNormalized[hypothesis.evidenceCategory];
  const compositePriorityScore = clampScore(
    hypothesis.targetMatchScore * 0.35 +
      hypothesis.pathwayMatchScore * 0.3 +
      simulatedHybridScore * 0.2 +
      evidence * 0.15
  );

  return {
    ...hypothesis,
    simulatedHybridScore,
    compositePriorityScore,
    prototypeCompatibilityScore: simulatedHybridScore,
    matchedMutationSignal: `${hypothesis.matchedGene} ${hypothesis.matchedVariant}`,
    scoreBreakdown: {
      targetMatch: Math.round(hypothesis.targetMatchScore * 0.35),
      pathwayMatch: Math.round(hypothesis.pathwayMatchScore * 0.3),
      simulatedHybrid: Math.round(simulatedHybridScore * 0.2),
      evidence: Math.round(evidence * 0.15)
    }
  };
}

export function scoreLabel(score: number): "High" | "Medium" | "Exploratory" {
  if (score >= 85) return "High";
  if (score >= 72) return "Medium";
  return "Exploratory";
}