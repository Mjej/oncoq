import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Validation - Retrospective benchmark checks",
  description:
    "Queue internal retrospective benchmark runs comparing baseline ranking logic with the prototype scoring layer. No care-delivery claims are made.",
  path: "/validation",
  keywords: ["retrospective benchmark", "ranking benchmark", "oncology research validation"]
});

export default function ValidationLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
