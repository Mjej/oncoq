// Central copy bank — keep language research-aware and aligned with the audit pack.

export const researchUseDisclaimer =
  "Research-use only. ONCOQ.TECH supports research planning and expert review. Outputs are not clinical diagnoses, treatment recommendations, prescribing advice, or patient-level decisions. Downstream use requires qualified expert review, validated evidence sources, and appropriate governance.";

export const researchUseDisclaimerShort =
  "Research-use only. Not a diagnosis, treatment recommendation, prescribing guide, or patient-level decision tool.";

export const audienceStatement =
  "Built for translational oncology teams, bioinformatics analysts, biotech R&D, and research labs reviewing de-identified mutation cohorts in a research-use setting.";

export const productOneLiner =
  "ONCOQ.TECH helps translational oncology teams turn de-identified mutation files into a review-ready evidence board: ranked variants, pathway context, candidate hypothesis classes, limitations, and exportable research briefs.";

export const pageTitles = {
  dashboard: "Evidence workspace",
  analysis: "Cohort intake & scoring",
  results: "Evidence review board",
  report: "Research brief export",
  client: "Research review",
  architecture: "Pipeline operations",
  validation: "Retrospective validation",
  pilot: "Pilot pipeline"
} as const;

export const pageSubtitles = {
  dashboard:
    "Rank mutation signals, inspect pathway evidence, and prepare research-use hypotheses for expert review.",
  analysis:
    "Upload a de-identified mutation table, validate the schema, and rank mutation signals for expert research review.",
  results:
    "Inspect ranked mutation signals, pathway matches, limitations, and draft hypotheses before research brief export.",
  report:
    "Package reviewed mutation signals, candidate hypothesis classes, limitations, and validation notes into a research-use deliverable.",
  client:
    "Read-only summary of reviewed mutation signals, candidate hypothesis classes, report status, and validation next steps.",
  architecture:
    "Monitor cohort intake, scoring jobs, evidence ranking, and report exports across the research workflow.",
  validation:
    "Compare prototype scoring against baseline or reviewer-labeled benchmarks to assess ranking agreement, pathway consistency, and run stability.",
  pilot:
    "Track research pilots, buyer use cases, commercial stage, and estimated analyst-time savings."
} as const;

export const reviewerStates = {
  pending: "Pending review",
  needsEvidence: "Needs evidence",
  accepted: "Accepted for report",
  rejected: "Rejected",
  limitation: "Limitation unresolved"
} as const;

export const metricDefinitions = {
  topKAgreement:
    "How closely the prototype's top-ranked mutation signals match the reviewer or baseline top-10 list.",
  pathwayConsistency:
    "How often the system maps mutations to the same pathway category as the benchmark.",
  evidenceAgreement:
    "How often the evidence tier matches reviewer or baseline labels.",
  topKPrecision:
    "How many of the highest-ranked prototype outputs are judged relevant by the benchmark.",
  stability:
    "Whether repeated runs produce consistent ranking outputs.",
  evidenceTier:
    "Evidence tier summarises the strength of the research evidence linked to the mutation signal. It does not imply clinical action.",
  prototypeScore:
    "Prototype score ranks review priority based on pathway relevance and evidence mapping. It is not a probability of response or clinical risk.",
  candidateClass:
    "A pathway or drug-class research hypothesis generated from matched mutation evidence. It requires expert review before inclusion in a brief.",
  reviewState:
    "Reviewer decision state that controls whether an evidence item can be included in the exported research brief.",
  retrospectiveValidation:
    "Internal benchmark comparison used to evaluate prototype behaviour on historical or demo data. It does not establish clinical validity."
} as const;
