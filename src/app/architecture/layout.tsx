import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Operations - Prototype pipeline",
  description:
    "Admin operations page for reviewing prototype pipeline stages, run logs, risk controls, and future validation requirements.",
  path: "/architecture",
  keywords: ["oncology analytics architecture", "prototype pipeline", "research-use workflow"]
});

export default function ArchitectureLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
