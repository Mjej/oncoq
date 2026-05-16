// Mock demo patient/sample cases used in the dashboard, pitch mode, and report demo.
// Research-use only. Synthetic data. Not derived from real patient records.
// No clinical inference, diagnosis, prognosis, or treatment recommendation is implied.

export type DemoMutationEntry = {
  gene: string;
  variant: string;
  priority: "High" | "Medium" | "Low";
  pathway: string;
  confidence: number; // 0–100, mock relevance signal
  clinicalRelevanceTag: string;
};

export type DemoDrugCandidate = {
  drug: string;
  targetPathway: string;
  evidenceLevel: "Preclinical" | "Early clinical" | "Approved (other indication)" | "Literature signal";
  rationale: string;
  validationStatus: "Hypothesis" | "Needs retrospective validation" | "Needs expert review";
};

export type DemoRiskPrediction = {
  category: "Low" | "Moderate" | "Elevated" | "High";
  confidence: number; // 0–100, mock model confidence
  contributingFactors: string[];
  nextStep: string;
};

export type DemoPatientCase = {
  id: string;
  label: string;
  cancerType: string;
  sampleType: string;
  sequencingSource: string;
  mutationFileStatus: "Loaded" | "Validating" | "Queued";
  patientRiskFactors: string[];
  mutations: DemoMutationEntry[];
  risk: DemoRiskPrediction;
  drugs: DemoDrugCandidate[];
  disclaimer: string;
};

const sharedDisclaimer =
  "Mock research-use case. Synthetic data. Not for diagnosis, prognosis, prescribing, or any patient-level decision.";

export const demoPatients: DemoPatientCase[] = [
  {
    id: "case-lung-001",
    label: "Lung cancer research sample",
    cancerType: "Non-small cell lung cancer (research cohort)",
    sampleType: "De-identified tumour panel",
    sequencingSource: "Targeted panel (demo)",
    mutationFileStatus: "Loaded",
    patientRiskFactors: ["Smoking history (mock)", "Age 62 (mock)", "Family history: none recorded"],
    mutations: [
      {
        gene: "EGFR",
        variant: "L858R",
        priority: "High",
        pathway: "Growth signalling (RTK)",
        confidence: 87,
        clinicalRelevanceTag: "Well-characterised driver (research literature)"
      },
      {
        gene: "TP53",
        variant: "R175H",
        priority: "High",
        pathway: "DNA damage response",
        confidence: 82,
        clinicalRelevanceTag: "Frequent co-mutation (research literature)"
      },
      {
        gene: "KRAS",
        variant: "G12C",
        priority: "Medium",
        pathway: "MAPK pathway",
        confidence: 64,
        clinicalRelevanceTag: "Pathway-level signal"
      }
    ],
    risk: {
      category: "Elevated",
      confidence: 71,
      contributingFactors: ["EGFR driver signal", "TP53 co-mutation", "Smoking history (mock)"],
      nextStep: "Retrospective validation against matched research cohort recommended."
    },
    drugs: [
      {
        drug: "Osimertinib (reference)",
        targetPathway: "EGFR (RTK)",
        evidenceLevel: "Approved (other indication)",
        rationale: "EGFR L858R mutation signal in mock cohort matches a documented research target class.",
        validationStatus: "Needs expert review"
      },
      {
        drug: "Adagrasib (reference)",
        targetPathway: "KRAS G12C",
        evidenceLevel: "Early clinical",
        rationale: "Co-occurring KRAS G12C signal flagged as a hypothesis-class candidate for research review.",
        validationStatus: "Hypothesis"
      },
      {
        drug: "PARP-class candidate",
        targetPathway: "DNA damage response",
        evidenceLevel: "Literature signal",
        rationale: "TP53 co-mutation context noted for DDR-class repurposing investigation.",
        validationStatus: "Needs retrospective validation"
      }
    ],
    disclaimer: sharedDisclaimer
  },
  {
    id: "case-breast-001",
    label: "Breast cancer research sample",
    cancerType: "HR+ breast cancer (research cohort)",
    sampleType: "De-identified tumour panel",
    sequencingSource: "Whole-exome (demo)",
    mutationFileStatus: "Loaded",
    patientRiskFactors: ["Family history: BRCA (mock)", "Age 47 (mock)", "Premenopausal (mock)"],
    mutations: [
      {
        gene: "BRCA1",
        variant: "c.5266dupC",
        priority: "High",
        pathway: "DNA repair (HR)",
        confidence: 91,
        clinicalRelevanceTag: "Strong research literature support"
      },
      {
        gene: "PIK3CA",
        variant: "H1047R",
        priority: "High",
        pathway: "PI3K / AKT",
        confidence: 84,
        clinicalRelevanceTag: "Frequent activating signal"
      },
      {
        gene: "ESR1",
        variant: "Y537S",
        priority: "Medium",
        pathway: "Hormone signalling",
        confidence: 68,
        clinicalRelevanceTag: "Resistance-context research signal"
      }
    ],
    risk: {
      category: "High",
      confidence: 76,
      contributingFactors: ["BRCA1 loss-of-function signal", "PIK3CA activating signal", "Family history (mock)"],
      nextStep: "Expert genetics review and retrospective cohort validation required before further interpretation."
    },
    drugs: [
      {
        drug: "Olaparib (reference)",
        targetPathway: "PARP / DNA repair",
        evidenceLevel: "Approved (other indication)",
        rationale: "BRCA1 signal aligns with PARP-inhibitor research class for repurposing review.",
        validationStatus: "Needs expert review"
      },
      {
        drug: "Alpelisib (reference)",
        targetPathway: "PI3K alpha",
        evidenceLevel: "Approved (other indication)",
        rationale: "PIK3CA H1047R signal flagged as PI3K pathway candidate hypothesis.",
        validationStatus: "Hypothesis"
      },
      {
        drug: "SERD-class candidate",
        targetPathway: "Hormone signalling",
        evidenceLevel: "Early clinical",
        rationale: "ESR1 resistance-context signal mapped to SERD-class research hypothesis.",
        validationStatus: "Needs retrospective validation"
      }
    ],
    disclaimer: sharedDisclaimer
  },
  {
    id: "case-crc-001",
    label: "Colorectal cancer research sample",
    cancerType: "Colorectal adenocarcinoma (research cohort)",
    sampleType: "De-identified tumour panel",
    sequencingSource: "Targeted panel (demo)",
    mutationFileStatus: "Loaded",
    patientRiskFactors: ["Age 58 (mock)", "MSI status: pending (mock)", "Family history: none recorded"],
    mutations: [
      {
        gene: "KRAS",
        variant: "G12D",
        priority: "High",
        pathway: "MAPK pathway",
        confidence: 86,
        clinicalRelevanceTag: "Common driver (research literature)"
      },
      {
        gene: "APC",
        variant: "R1450*",
        priority: "High",
        pathway: "Wnt signalling",
        confidence: 80,
        clinicalRelevanceTag: "Initiating-event class signal"
      },
      {
        gene: "TP53",
        variant: "R273H",
        priority: "Medium",
        pathway: "DNA damage response",
        confidence: 70,
        clinicalRelevanceTag: "Frequent co-mutation"
      }
    ],
    risk: {
      category: "Elevated",
      confidence: 68,
      contributingFactors: ["KRAS driver signal", "APC truncation signal", "TP53 co-mutation"],
      nextStep: "MSI / MMR status review and retrospective validation recommended before research interpretation."
    },
    drugs: [
      {
        drug: "MEK-inhibitor class (reference)",
        targetPathway: "MAPK",
        evidenceLevel: "Early clinical",
        rationale: "KRAS G12D pathway signal mapped to MEK-class research hypothesis.",
        validationStatus: "Hypothesis"
      },
      {
        drug: "Wnt-pathway research compound",
        targetPathway: "Wnt / β-catenin",
        evidenceLevel: "Preclinical",
        rationale: "APC loss signal flagged for Wnt-pathway repurposing investigation.",
        validationStatus: "Needs retrospective validation"
      },
      {
        drug: "Immune checkpoint candidate",
        targetPathway: "Immune microenvironment",
        evidenceLevel: "Literature signal",
        rationale: "Subject to MSI / MMR confirmation, candidate for immune checkpoint research class review.",
        validationStatus: "Needs expert review"
      }
    ],
    disclaimer: sharedDisclaimer
  }
];

export function getDemoPatient(id: string): DemoPatientCase | undefined {
  return demoPatients.find((c) => c.id === id);
}
