import type { Metadata } from "next";
import { audienceStatement, researchUseDisclaimer } from "./content";

export const siteConfig = {
  name: "OncoQ.tech",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://oncoq.tech",
  title: "OncoQ.tech | Research-use oncology intelligence",
  description:
    "OncoQ.tech helps oncology R&D and translational research teams turn de-identified mutation data into evidence-ranked mutation signals and drug-repurposing hypotheses for expert review. Research-use only; outputs are not clinical recommendations."
};

type RouteMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  keywords?: string[];
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "research-use oncology intelligence",
    "mutation relevance signals",
    "drug-repurposing hypotheses",
    "oncology R&D software",
    "de-identified mutation data"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  },
  other: {
    "audience": audienceStatement,
    "research-use-disclaimer": researchUseDisclaimer
  }
};

export function createRouteMetadata({ title, description, path, index = true, keywords = [] }: RouteMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    keywords,
    robots: {
      index,
      follow: index
    },
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description
    }
  };
}
