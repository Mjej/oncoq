import type { EvidenceProvenance } from "@/lib/types";

export const evidenceProvenance: EvidenceProvenance[] = [
  {
    id: "prov-gene-pathway",
    layer: "gene_pathway",
    evidenceLayer: "Gene-pathway mapping",
    phase2Source: "Local mock knowledgebase",
    futureSourcePlan: "OncoKB / COSMIC / ClinVar / CIViC-style curated references",
    limitation: "Future sources are planned integration targets and are not connected in this prototype."
  },
  {
    id: "prov-drug-target",
    layer: "drug_target",
    evidenceLayer: "Drug-target relationship",
    phase2Source: "Local demo mapping",
    futureSourcePlan: "DrugBank / ChEMBL / DGIdb-style references",
    limitation: "Candidate classes are used for research discussion and are not prescription suggestions."
  },
  {
    id: "prov-hybrid-ranking",
    layer: "hybrid_ranking",
    evidenceLayer: "Prototype ranking",
    phase2Source: "Deterministic simulated compatibility score",
    futureSourcePlan: "Benchmarked ranking model compared with baseline logic",
    limitation: "The Phase 2 layer is simulated and no performance advantage is claimed."
  },
  {
    id: "prov-validation",
    layer: "validation",
    evidenceLayer: "Validation",
    phase2Source: "Internal logic checks",
    futureSourcePlan: "Retrospective datasets plus expert review",
    limitation: "Research-use outputs require validation before expanded use."
  }
];