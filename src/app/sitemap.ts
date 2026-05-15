import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const publicRoutes = ["/", "/dashboard", "/analysis", "/results", "/report", "/client", "/architecture", "/validation", "/pilot"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.4
  }));
}
