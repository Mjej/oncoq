export type EvidenceCategory = "Strong" | "Moderate" | "Emerging" | "Exploratory";

export type CancerRelevance = "high" | "medium" | "emerging" | "exploratory";

export type Cohort = {
  id: string;
  name: string;
  cancerType: string;
  sampleCount: number;
  dataType: "de_identified_genomic_dataset";
  createdAt: string;
  notes: string;
};

export type MutationRecord = {
  id: string;
  cohortId: string;
  gene: string;
  variant: string;
  pathway: string;
  cancerRelevance: CancerRelevance;
  evidenceCategory: EvidenceCategory;
  baseRelevanceScore: number;
  interpretation: string;
  limitation: string;
  nextValidationStep: string;
};

export type RankedMutationRecord = MutationRecord & {
  prototypeRelevanceScore: number;
};

export type DrugHypothesis = {
  id: string;
  candidateClass: string;
  target: string;
  pathway: string;
  matchedGene: string;
  matchedVariant: string;
  evidenceCategory: EvidenceCategory;
  targetMatchScore: number;
  pathwayMatchScore: number;
  simulatedHybridScore?: number;
  compositePriorityScore?: number;
  whyRanked: string;
  limitation: string;
  nextValidationStep: string;
};

export type RankedDrugHypothesis = DrugHypothesis & {
  matchedMutationSignal: string;
  prototypeCompatibilityScore: number;
  compositePriorityScore: number;
  scoreBreakdown: {
    targetMatch: number;
    pathwayMatch: number;
    simulatedHybrid: number;
    evidence: number;
  };
};

export type EvidenceProvenance = {
  id: string;
  layer: "gene_pathway" | "drug_target" | "hybrid_ranking" | "validation";
  evidenceLayer: string;
  phase2Source: string;
  futureSourcePlan: string;
  limitation: string;
};

export type DatasetSummary = {
  cohort: Cohort;
  mutationCount: number;
  genesDetected: string[];
  topPathways: string[];
  status: "Ready for research analysis";
};

export type PathwayDistributionPoint = {
  pathway: string;
  count: number;
  averageScore: number;
};

export type CsvValidationResult = {
  rowCount: number;
  validRows: number;
  missingColumns: string[];
  identifiableFields: string[];
  errors: string[];
};