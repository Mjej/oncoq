import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Client research review portal",
  description:
    "Client-facing research-use portal for reviewing de-identified cohort deliverables, mutation relevance signals, drug-repurposing hypotheses, and evidence report status.",
  path: "/client",
  keywords: ["client research portal", "oncology R&D deliverables", "mutation relevance review"]
});

export default function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
