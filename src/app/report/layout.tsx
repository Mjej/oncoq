import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Export report - Evidence briefs",
  description:
    "Generate traceable research briefs that summarize mutation relevance signals, candidate hypotheses, limitations, and validation next steps.",
  path: "/report",
  keywords: ["oncology evidence brief", "research report", "mutation evidence provenance"]
});

export default function ReportLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
