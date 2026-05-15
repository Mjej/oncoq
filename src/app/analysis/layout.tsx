import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Run analysis - Cohort scoring",
  description:
    "Upload de-identified cohort files or run demo cohorts through prototype mutation relevance scoring for research-use review.",
  path: "/analysis",
  keywords: ["cohort scoring", "de-identified mutation data", "research-use analysis"]
});

export default function AnalysisLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
