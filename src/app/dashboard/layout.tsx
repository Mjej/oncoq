import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Workspace overview - Research workflow",
  description:
    "Research-use workspace overview that guides researchers from cohort analysis to evidence review, report export, and client sharing.",
  path: "/dashboard",
  keywords: ["oncology R&D dashboard", "mutation relevance workspace", "drug-repurposing hypotheses"]
});

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
