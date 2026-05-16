// Guided product tour configuration.
// Each step targets an element by `data-tour="<id>"` selector on a specific page.
// When the next step lives on a different `path`, the Next button routes there
// before advancing the step index. Research-use only copy throughout.

export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export type TourStep = {
  id: string;
  path: string;
  selector?: string; // omit → centered modal-style step
  title: string;
  body: string;
  placement?: TourPlacement;
  nextLabel?: string;
};

export const tourSteps: TourStep[] = [
  {
    id: "welcome",
    path: "/dashboard",
    title: "Welcome to the demo workspace",
    body:
      "We'll walk through the five-step research workflow — cohort intake, evidence review, research brief, and client handoff. Research-use only.",
    placement: "center",
    nextLabel: "Start tour"
  },
  {
    id: "sidebar",
    path: "/dashboard",
    selector: '[data-tour="sidebar"]',
    title: "Research workflow sidebar",
    body:
      "Steps 0 → 4 form the linear research workflow. Admin and commercial views live below it. The active step is highlighted in ocean blue.",
    placement: "right"
  },
  {
    id: "cohort-switcher",
    path: "/dashboard",
    selector: '[data-tour="cohort-switcher"]',
    title: "Switch demo cohorts",
    body:
      "All metrics, ranked mutations, and hypothesis cards update from this switcher. Three de-identified demo cohorts are bundled (LUAD, CRC, BRCA).",
    placement: "bottom"
  },
  {
    id: "next-step",
    path: "/dashboard",
    selector: '[data-tour="next-step"]',
    title: "Your next action",
    body:
      "The workspace always surfaces the next research action. From here you can review ranked signals, run a new cohort, or open the report draft.",
    placement: "bottom",
    nextLabel: "Go to Cohort intake →"
  },
  {
    id: "analysis-stepper",
    path: "/analysis",
    selector: '[data-tour="analysis-stepper"]',
    title: "5-step intake",
    body:
      "Cohort intake validates schema, confirms de-identification, runs prototype scoring, and routes results into the evidence board.",
    placement: "bottom"
  },
  {
    id: "analysis-validation",
    path: "/analysis",
    selector: '[data-tour="analysis-validation"]',
    title: "Schema & de-identification checks",
    body:
      "Every cohort must pass these checks before prototype scoring runs. Failures block the workflow — this is a research-use guardrail.",
    placement: "top",
    nextLabel: "Open Evidence board →"
  },
  {
    id: "results-toolbar",
    path: "/results",
    selector: '[data-tour="results-toolbar"]',
    title: "Filter the ranked signals",
    body:
      "Narrow the queue by gene, pathway, evidence tier, or reviewer state. Saved views help re-open the same review context later.",
    placement: "bottom"
  },
  {
    id: "results-table",
    path: "/results",
    selector: '[data-tour="mutation-table"]',
    title: "Ranked mutation signals",
    body:
      "Each row is a mutation relevance signal with a linked candidate research class. Click a row to open the evidence drawer and set a reviewer state.",
    placement: "top"
  },
  {
    id: "results-summary",
    path: "/results",
    selector: '[data-tour="results-summary"]',
    title: "Reviewer states gate export",
    body:
      "Only signals marked “Accepted for report” flow into the research brief. Limitations and pending items are tracked separately for retrospective validation.",
    placement: "bottom",
    nextLabel: "Open Research brief →"
  },
  {
    id: "report-export",
    path: "/report",
    selector: '[data-tour="report-export"]',
    title: "Export a research-use brief",
    body:
      "Generate a PDF, CSV, or Markdown brief. Limitations, provenance, and reviewer notes are always included — never a clinical recommendation.",
    placement: "left"
  },
  {
    id: "finish",
    path: "/report",
    title: "Tour complete",
    body:
      "You've seen the core path: cohort → evidence board → research brief. Re-run this tour anytime from “Take the tour” in the sidebar.",
    placement: "center",
    nextLabel: "Finish"
  }
];
