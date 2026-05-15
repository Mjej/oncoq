import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Review evidence - Mutation signals and hypotheses",
  description:
    "Explore ranked mutation relevance signals, candidate classes, pathway context, and evidence provenance for expert review.",
  path: "/results",
  keywords: ["mutation signals", "drug-repurposing hypotheses", "evidence provenance"]
});

export default function ResultsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
