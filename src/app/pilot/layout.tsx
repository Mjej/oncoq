import type { ReactNode } from "react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Pilots - Admin tracker",
  description:
    "Admin page for tracking draft research pilots, indicative scope, and operational follow-up outside the core researcher workflow.",
  path: "/pilot",
  keywords: ["research pilot", "oncology R&D engagement", "pilot SOW"]
});

export default function PilotLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
