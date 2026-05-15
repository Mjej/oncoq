import type { MutationRecord } from "@/lib/types";

export const demoMutations: MutationRecord[] = [
  // === Lung adenocarcinoma ===
  {
    id: "mut-luad-001",
    cohortId: "cohort-luad-demo",
    gene: "EGFR",
    variant: "L858R",
    pathway: "EGFR/ERBB signalling",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 82,
    interpretation: "EGFR L858R is a well-known oncogenic driver signal in lung adenocarcinoma research and is relevant for targeted pathway investigation.",
    limitation: "The demo signal is not sufficient for clinical action and requires curated evidence review.",
    nextValidationStep: "Confirm variant annotation and compare ranking against curated oncology knowledgebases."
  },
  {
    id: "mut-luad-002",
    cohortId: "cohort-luad-demo",
    gene: "TP53",
    variant: "R175H",
    pathway: "p53 tumour suppressor pathway",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 77,
    interpretation: "TP53 R175H is associated with disrupted tumour suppressor function and may affect genomic stability research.",
    limitation: "TP53 biology is context-specific and does not create a direct candidate class without additional evidence.",
    nextValidationStep: "Review tumour suppressor pathway evidence with an oncology researcher and molecular pathology expert."
  },
  {
    id: "mut-luad-003",
    cohortId: "cohort-luad-demo",
    gene: "KRAS",
    variant: "G12C",
    pathway: "RAS/MAPK signalling",
    cancerRelevance: "medium",
    evidenceCategory: "Moderate",
    baseRelevanceScore: 75,
    interpretation: "KRAS G12C affects RAS/MAPK signalling and is relevant for pathway-level drug-repurposing hypothesis generation.",
    limitation: "Pathway activation does not imply a real-world response to any candidate class.",
    nextValidationStep: "Benchmark the pathway match against retrospective mutation-drug association datasets."
  },
  {
    id: "mut-luad-004",
    cohortId: "cohort-luad-demo",
    gene: "ALK",
    variant: "Rearrangement signal",
    pathway: "ALK tyrosine kinase signalling",
    cancerRelevance: "emerging",
    evidenceCategory: "Emerging",
    baseRelevanceScore: 70,
    interpretation: "ALK rearrangement signals may indicate altered kinase signalling and require confirmatory research workflow checks.",
    limitation: "A rearrangement signal requires orthogonal confirmation before any real-world interpretation.",
    nextValidationStep: "Verify structural variant support and review evidence provenance."
  },
  {
    id: "mut-luad-005",
    cohortId: "cohort-luad-demo",
    gene: "MET",
    variant: "Exon 14 skipping",
    pathway: "RTK/MAPK signalling",
    cancerRelevance: "medium",
    evidenceCategory: "Moderate",
    baseRelevanceScore: 68,
    interpretation: "MET exon 14 skipping alters receptor turnover and may be relevant for kinase-pathway hypothesis review.",
    limitation: "Requires orthogonal confirmation and curated evidence review.",
    nextValidationStep: "Confirm splicing impact and compare with curated MET evidence."
  },

  // === Colorectal ===
  {
    id: "mut-crc-001",
    cohortId: "cohort-crc-demo",
    gene: "KRAS",
    variant: "G12D",
    pathway: "RAS/MAPK signalling",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 80,
    interpretation: "KRAS G12D is a recurrent driver signal in colorectal adenocarcinoma research and a focal point for pathway-level review.",
    limitation: "Drug-class response is context-specific and not implied by a pathway match alone.",
    nextValidationStep: "Cross-check ranking against curated colorectal evidence."
  },
  {
    id: "mut-crc-002",
    cohortId: "cohort-crc-demo",
    gene: "BRAF",
    variant: "V600E",
    pathway: "RAS/MAPK signalling",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 78,
    interpretation: "BRAF V600E activates downstream MAPK signalling and is informative for research-use ranking of pathway-targeted candidate classes.",
    limitation: "Colorectal context shows known resistance patterns; research-use interpretation only.",
    nextValidationStep: "Review combination-pathway literature with an oncology researcher."
  },
  {
    id: "mut-crc-003",
    cohortId: "cohort-crc-demo",
    gene: "APC",
    variant: "Truncating variant",
    pathway: "Wnt/beta-catenin signalling",
    cancerRelevance: "high",
    evidenceCategory: "Moderate",
    baseRelevanceScore: 72,
    interpretation: "APC loss-of-function is a common colorectal driver event affecting Wnt signalling for research review.",
    limitation: "Direct candidate classes are exploratory in current research.",
    nextValidationStep: "Review Wnt-targeted research literature with expert reviewers."
  },
  {
    id: "mut-crc-004",
    cohortId: "cohort-crc-demo",
    gene: "MSH2",
    variant: "Loss-of-function",
    pathway: "Mismatch repair (MMR)",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 76,
    interpretation: "MSH2 loss is associated with mismatch-repair deficiency and is relevant for DNA-damage-response research hypotheses.",
    limitation: "Functional impact requires orthogonal confirmation (IHC, MSI testing).",
    nextValidationStep: "Confirm MMR status and align with curated dMMR datasets."
  },
  {
    id: "mut-crc-005",
    cohortId: "cohort-crc-demo",
    gene: "PIK3CA",
    variant: "H1047R",
    pathway: "PI3K/AKT signalling",
    cancerRelevance: "medium",
    evidenceCategory: "Moderate",
    baseRelevanceScore: 70,
    interpretation: "PIK3CA H1047R activates PI3K signalling and supports research-use review of pathway-targeted candidate classes.",
    limitation: "Pathway dependency varies; not a clinical decision.",
    nextValidationStep: "Benchmark against curated PIK3CA research evidence."
  },

  // === Breast ===
  {
    id: "mut-brca-001",
    cohortId: "cohort-brca-demo",
    gene: "BRCA1",
    variant: "Truncating variant",
    pathway: "Homologous recombination DNA repair",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 82,
    interpretation: "BRCA1 loss-of-function affects DNA repair and supports research review of DNA damage response vulnerabilities.",
    limitation: "Cohort signal does not by itself establish homologous recombination deficiency.",
    nextValidationStep: "Confirm variant effect and review broader HR evidence."
  },
  {
    id: "mut-brca-002",
    cohortId: "cohort-brca-demo",
    gene: "BRCA2",
    variant: "Truncating variant",
    pathway: "Homologous recombination DNA repair",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 79,
    interpretation: "BRCA2 loss-of-function further supports HR-deficient research hypotheses for the cohort.",
    limitation: "Functional impact requires orthogonal HRD scoring.",
    nextValidationStep: "Align with curated HRD evidence and expert review."
  },
  {
    id: "mut-brca-003",
    cohortId: "cohort-brca-demo",
    gene: "ERBB2",
    variant: "Amplification signal",
    pathway: "EGFR/ERBB signalling",
    cancerRelevance: "high",
    evidenceCategory: "Strong",
    baseRelevanceScore: 78,
    interpretation: "HER2/ERBB2 amplification signals map to ERBB pathway and inform research review of candidate classes.",
    limitation: "Amplification status requires orthogonal confirmation (IHC/FISH).",
    nextValidationStep: "Confirm amplification and review research-use evidence."
  },
  {
    id: "mut-brca-004",
    cohortId: "cohort-brca-demo",
    gene: "PIK3CA",
    variant: "E545K",
    pathway: "PI3K/AKT signalling",
    cancerRelevance: "high",
    evidenceCategory: "Moderate",
    baseRelevanceScore: 74,
    interpretation: "PIK3CA E545K activates PI3K signalling and supports pathway-level research-use ranking.",
    limitation: "Pathway dependency is context-specific.",
    nextValidationStep: "Benchmark against curated PIK3CA breast cohorts."
  },
  {
    id: "mut-brca-005",
    cohortId: "cohort-brca-demo",
    gene: "ESR1",
    variant: "Y537S",
    pathway: "Estrogen receptor signalling",
    cancerRelevance: "medium",
    evidenceCategory: "Emerging",
    baseRelevanceScore: 68,
    interpretation: "ESR1 hotspot signals can affect endocrine response and inform research review.",
    limitation: "Functional impact requires orthogonal validation.",
    nextValidationStep: "Confirm signal and review ESR1 research literature."
  }
];

export const genePathwayMap = {
  EGFR: "EGFR/ERBB signalling",
  TP53: "p53 tumour suppressor pathway",
  KRAS: "RAS/MAPK signalling",
  BRCA1: "Homologous recombination DNA repair",
  ALK: "ALK tyrosine kinase signalling",
  BRAF: "RAS/MAPK signalling",
  APC: "Wnt/beta-catenin signalling",
  MSH2: "Mismatch repair (MMR)",
  PIK3CA: "PI3K/AKT signalling",
  BRCA2: "Homologous recombination DNA repair",
  ERBB2: "EGFR/ERBB signalling",
  ESR1: "Estrogen receptor signalling",
  MET: "RTK/MAPK signalling"
} as const;
