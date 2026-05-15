import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}