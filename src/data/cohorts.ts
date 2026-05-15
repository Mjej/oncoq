import type { Cohort } from "@/lib/types";

export const cohorts: Cohort[] = [
  {
    id: "cohort-luad-demo",
    name: "Lung adenocarcinoma demo cohort",
    cancerType: "Lung adenocarcinoma",
    sampleCount: 48,
    dataType: "de_identified_genomic_dataset",
    createdAt: "2026-05-15",
    notes: "Synthetic local demo cohort for research-use workflow demonstration. No patient-identifying data is included."
  },
  {
    id: "cohort-crc-demo",
    name: "Colorectal adenocarcinoma demo cohort",
    cancerType: "Colorectal adenocarcinoma",
    sampleCount: 36,
    dataType: "de_identified_genomic_dataset",
    createdAt: "2026-04-22",
    notes: "Synthetic colorectal cohort with RAS/MAPK and DNA-repair signals for research-use ranking demonstration."
  },
  {
    id: "cohort-brca-demo",
    name: "Breast carcinoma demo cohort",
    cancerType: "Breast carcinoma",
    sampleCount: 52,
    dataType: "de_identified_genomic_dataset",
    createdAt: "2026-03-10",
    notes: "Synthetic breast cohort emphasising HR-deficiency and HER2/ERBB signals for research-use ranking demonstration."
  }
];

export const demoCohort: Cohort = cohorts[0];

export function getCohortById(id: string | undefined | null): Cohort {
  if (!id) return cohorts[0];
  return cohorts.find((cohort) => cohort.id === id) ?? cohorts[0];
}
