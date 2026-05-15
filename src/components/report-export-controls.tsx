"use client";

import { useState } from "react";
import { Check, ClipboardCopy, Download } from "lucide-react";
import { buildReportMarkdown, buildReportSummary, copyToClipboard, downloadTextFile } from "@/lib/export-report";
import type { DatasetSummary, EvidenceProvenance, RankedDrugHypothesis, RankedMutationRecord } from "@/lib/types";

type ReportExportControlsProps = {
  summary: DatasetSummary;
  mutations: RankedMutationRecord[];
  drugHypotheses: RankedDrugHypothesis[];
  evidenceProvenance: EvidenceProvenance[];
  validationSteps: string[];
};

export function ReportExportControls(props: ReportExportControlsProps) {
  const [copied, setCopied] = useState(false);

  function handleExport() {
    const markdown = buildReportMarkdown(props);
    const safeName = props.summary.cohort.cancerType.toLowerCase().replace(/\s+/g, "-");
    downloadTextFile(markdown, `oncoq-research-brief-${safeName}-${Date.now()}.md`);
  }

  async function handleCopy() {
    const text = buildReportSummary({ summary: props.summary, drugHypotheses: props.drugHypotheses });
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-ocean px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tide"
        onClick={handleExport}
        type="button"
      >
        <Download aria-hidden="true" className="h-4 w-4" />
        Export Report (.md)
      </button>
      <button
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-aqua/30 bg-white/80 px-4 py-2.5 text-sm font-semibold text-tide transition hover:border-aqua/55 hover:text-ocean"
        onClick={handleCopy}
        type="button"
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4 text-leaf" /> : <ClipboardCopy aria-hidden="true" className="h-4 w-4" />}
        {copied ? "Copied" : "Copy Summary"}
      </button>
    </div>
  );
}
