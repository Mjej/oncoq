"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileCode2, FileUp, Info, Sparkles } from "lucide-react";
import { UploadCard } from "./upload-card";
import { CohortSwitcher } from "./cohort-switcher";
import { acceptedSchema, cohorts } from "@/lib/mock-analysis";
import { validateCsvDataset } from "@/lib/csv";
import { computeMutationRelevanceScore } from "@/lib/scoring";
import type { CsvValidationResult, DatasetSummary, EvidenceCategory } from "@/lib/types";

type Mode = "demo" | "upload" | "schema";

const modes: { id: Mode; label: string }[] = [
  { id: "demo", label: "Demo cohort" },
  { id: "upload", label: "Upload CSV" },
  { id: "schema", label: "Schema" }
];

type UploadedRow = {
  rowNumber: number;
  gene: string;
  variant: string;
  pathway: string;
  evidence: EvidenceCategory;
  score: number;
};

function ValidationResult({ result }: { result: CsvValidationResult }) {
  const hasWarnings = result.missingColumns.length > 0 || result.identifiableFields.length > 0 || result.errors.length > 0;

  return (
    <div className={`mt-5 rounded-2xl border p-4 ${hasWarnings ? "border-gold/30 bg-gold/8" : "border-leaf/30 bg-leaf/8"}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        {hasWarnings ? <AlertTriangle aria-hidden="true" className="h-4 w-4 text-gold" /> : <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-leaf" />}
        CSV validation
      </div>
      <p className="mt-2 text-sm text-ink/70">Rows: {result.rowCount}. Valid rows: {result.validRows}.</p>
      {result.missingColumns.length > 0 ? <p className="mt-2 text-sm text-ink/70">Missing required columns: {result.missingColumns.join(", ")}.</p> : null}
      {result.identifiableFields.length > 0 ? (
        <p className="mt-2 text-sm text-ink/70">De-identified research data only. Remove possible identifying fields: {result.identifiableFields.join(", ")}.</p>
      ) : null}
      {result.errors.slice(0, 4).map((error) => <p className="mt-2 text-sm text-ink/70" key={error}>{error}</p>)}
    </div>
  );
}

function parseAndScoreCsv(content: string): UploadedRow[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());
  const idx = (column: string) => headers.indexOf(column);
  const validEvidence: EvidenceCategory[] = ["Strong", "Moderate", "Emerging", "Exploratory"];

  return lines
    .slice(1)
    .map((line, index) => {
      const values = line.split(",").map((value) => value.trim());
      const gene = values[idx("gene")] ?? "";
      const variant = values[idx("variant")] ?? "";
      const pathway = values[idx("pathway")] ?? "General oncology pathway";
      const rawEvidence = (values[idx("evidence_category")] ?? "Exploratory") as EvidenceCategory;
      const evidence = (validEvidence.includes(rawEvidence) ? rawEvidence : "Exploratory") as EvidenceCategory;
      if (!gene || !variant) return null;
      const score = computeMutationRelevanceScore({
        id: `upload-${index}`,
        cohortId: "uploaded",
        gene,
        variant,
        pathway,
        cancerRelevance: "medium",
        evidenceCategory: evidence,
        baseRelevanceScore: 70,
        interpretation: "",
        limitation: "",
        nextValidationStep: ""
      });
      return { rowNumber: index + 2, gene, variant, pathway, evidence, score };
    })
    .filter((row): row is UploadedRow => row !== null)
    .sort((first, second) => second.score - first.score);
}

type AnalysisModeTabsProps = {
  summary: DatasetSummary;
  cohortId: string;
  onCohortChange: (id: string) => void;
};

export function AnalysisModeTabs({ summary, cohortId, onCohortChange }: AnalysisModeTabsProps) {
  const [mode, setMode] = useState<Mode>("demo");
  const [validationResult, setValidationResult] = useState<CsvValidationResult | null>(null);
  const [uploadedRows, setUploadedRows] = useState<UploadedRow[]>([]);
  const [uploadName, setUploadName] = useState<string>("");

  const uploadSummary = useMemo(() => {
    if (uploadedRows.length === 0) return null;
    const genes = Array.from(new Set(uploadedRows.map((row) => row.gene)));
    const pathways = Array.from(new Set(uploadedRows.map((row) => row.pathway)));
    return { genes, pathways };
  }, [uploadedRows]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    setUploadName(file.name);
    setValidationResult(validateCsvDataset(content));
    setUploadedRows(parseAndScoreCsv(content));
  }

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {modes.map((item) => (
            <button
              className={`focus-ring rounded-xl px-4 py-2 text-sm font-semibold transition ${
                mode === item.id
                  ? "bg-ocean text-white"
                  : "border border-[#cde8f5] bg-white/75 text-ink/72 hover:border-aqua/55 hover:text-tide"
              }`}
              key={item.id}
              onClick={() => setMode(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        {mode === "demo" ? (
          <CohortSwitcher activeId={cohortId} cohorts={cohorts} onChange={onCohortChange} />
        ) : null}
      </div>

      <div className="mt-6">
        {mode === "demo" ? <UploadCard summary={summary} /> : null}

        {mode === "upload" ? (
          <div className="rounded-3xl border border-dashed border-[#b9e2f4] bg-white/62 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7fd] text-tide">
                <FileUp aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Upload CSV / VCF-like file</p>
                <h3 className="text-xl font-semibold text-ink">Drop a de-identified dataset</h3>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/68">
              The browser parses, validates, and ranks rows locally. No file contents leave this device.
            </p>
            <label className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#b9e2f4] bg-white/72 px-5 py-6 text-center transition hover:border-aqua/70">
              <FileUp aria-hidden="true" className="h-7 w-7 text-tide" />
              <span className="mt-2 text-sm font-semibold text-ink">{uploadName || "Choose CSV file"}</span>
              <span className="mt-1 text-sm text-ink/60">No file contents leave the browser.</span>
              <input accept=".csv,.txt,.vcf" className="sr-only" onChange={handleFileChange} type="file" />
            </label>
            {validationResult ? <ValidationResult result={validationResult} /> : null}

            {uploadedRows.length > 0 ? (
              <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#cde8f5] bg-white/70 p-4">
                  <Sparkles aria-hidden="true" className="h-4 w-4 text-tide" />
                  <p className="text-sm font-semibold text-ink">Local ranking preview</p>
                  <p className="text-sm text-ink/65">Rows scored: {uploadedRows.length}</p>
                  {uploadSummary ? (
                    <p className="text-sm text-ink/65">Genes: {uploadSummary.genes.slice(0, 8).join(", ")}{uploadSummary.genes.length > 8 ? "…" : ""}</p>
                  ) : null}
                </div>

                <div className="overflow-hidden rounded-2xl border border-aqua/20 bg-white/75">
                  <div className="overflow-x-auto">
                    <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                      <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.12em] text-tide">
                        <tr>
                          <th className="px-4 py-3">Rank</th>
                          <th className="px-4 py-3">Row</th>
                          <th className="px-4 py-3">Gene</th>
                          <th className="px-4 py-3">Variant</th>
                          <th className="px-4 py-3">Pathway</th>
                          <th className="px-4 py-3">Evidence</th>
                          <th className="px-4 py-3">Prototype score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-aqua/10">
                        {uploadedRows.slice(0, 12).map((row, index) => (
                          <tr key={`${row.rowNumber}-${row.gene}-${row.variant}`} className="transition hover:bg-cyan/[0.06]">
                            <td className="px-4 py-3 font-semibold text-tide">{index + 1}</td>
                            <td className="px-4 py-3 text-ink/65">{row.rowNumber}</td>
                            <td className="px-4 py-3 font-semibold text-ink">{row.gene}</td>
                            <td className="px-4 py-3 text-ink/76">{row.variant}</td>
                            <td className="px-4 py-3 text-ink/76">{row.pathway}</td>
                            <td className="px-4 py-3 text-ink/76">{row.evidence}</td>
                            <td className="px-4 py-3 font-semibold text-ink">{row.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs leading-5 text-ink/55">
                  Local-only preview. Drug-repurposing hypothesis generation in the prototype uses curated demo cohorts. Customer cohorts require expert review and retrospective validation before broader use.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {mode === "schema" ? (
          <div className="rounded-3xl border border-[#cde8f5] bg-white/70 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean text-white">
                <FileCode2 aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Accepted schema</p>
                <h3 className="text-xl font-semibold text-ink">Minimum CSV columns</h3>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {acceptedSchema.map((field) => (
                <div className="rounded-xl border border-[#cde8f5] bg-white/78 px-3 py-2 text-sm font-semibold text-ink" key={field}>{field}</div>
              ))}
            </div>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-abyss p-4 text-sm leading-6 text-ice">
{`sample_id,gene,variant,cancer_type,pathway,evidence_category,source_note
S001,EGFR,L858R,Lung adenocarcinoma,EGFR/ERBB signalling,Strong,local demo mapping`}
            </pre>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-4 text-sm leading-6 text-ink/72">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <p>Do not upload names, emails, phone numbers, medical record numbers, or other identifying fields.</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
