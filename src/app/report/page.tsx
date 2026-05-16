"use client";

import { useMemo, useState } from "react";
import { Archive, Copy, Download, Eye, FileText, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { StatusPill } from "@/components/status-pill";
import { EmptyState } from "@/components/empty-state";
import { ReportExportControls } from "@/components/report-export-controls";
import { ResearchUseAlert } from "@/components/research-use-alert";
import { ResearchFlowPanel } from "@/components/research-flow-panel";
import { researchUseDisclaimer } from "@/lib/content";
import { cohorts, getDatasetSummary, getRankedDrugHypotheses, getRankedMutations, validationSteps } from "@/lib/mock-analysis";
import { evidenceProvenance } from "@/data/evidence-provenance";
import { formatBytes, formatRelative, generatedReports, type GeneratedReport, type ReportStatus } from "@/data/operations";

const templates = ["Research brief", "Client review brief", "Validation memo", "Pilot SOW"] as const;

function getNextReportId(reports: GeneratedReport[]) {
  const latestNumber = Number.parseInt(reports[0]?.id.split("-")[1] ?? "0", 10);
  return `rep-${String((Number.isFinite(latestNumber) ? latestNumber : 0) + 1).padStart(4, "0")}`;
}

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reports, setReports] = useState<GeneratedReport[]>(generatedReports);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [showGenerate, setShowGenerate] = useState(false);
  const [genCohortId, setGenCohortId] = useState(cohorts[0].id);
  const [genTemplate, setGenTemplate] = useState<(typeof templates)[number]>("Research brief");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesQuery = !q || report.title.toLowerCase().includes(q) || report.cohortLabel.toLowerCase().includes(q) || report.id.toLowerCase().includes(q);
      const matchesTemplate = templateFilter === "all" || report.template === templateFilter;
      const matchesStatus = statusFilter === "all" || report.status === statusFilter;
      return matchesQuery && matchesTemplate && matchesStatus;
    });
  }, [reports, query, templateFilter, statusFilter]);

  const previewed = reports.find((report) => report.id === previewId);
  const previewCohortId = previewed
    ? (cohorts.find((cohort) => cohort.name === previewed.cohortLabel || previewed.cohortLabel.startsWith(cohort.cancerType))?.id ?? cohorts[0].id)
    : cohorts[0].id;
  const summary = getDatasetSummary(previewCohortId);
  const mutations = getRankedMutations(previewCohortId);
  const drugs = getRankedDrugHypotheses(previewCohortId);

  function generateReport() {
    const nextId = getNextReportId(reports);
    const cohort = cohorts.find((c) => c.id === genCohortId)!;
    const newReport: GeneratedReport = {
      id: nextId,
      title: `${cohort.cancerType.split(" ")[0]} demo · ${genTemplate.toLowerCase()}`,
      cohortLabel: cohort.name,
      template: genTemplate,
      status: "ready" as ReportStatus,
      generatedAt: new Date().toISOString(),
      bytes: 30_000 + Math.floor(Math.random() * 15_000),
      owner: "amir.k@oncoq"
    };
    setReports([newReport, ...reports]);
    setShowGenerate(false);
  }

  function archiveReport(id: string) {
    setReports(reports.map((report) => (report.id === id ? { ...report, status: "archived" as ReportStatus } : report)));
  }

  function duplicateReport(id: string) {
    const source = reports.find((report) => report.id === id);
    if (!source) return;
    const nextId = getNextReportId(reports);
    setReports([{ ...source, id: nextId, status: "draft", generatedAt: new Date().toISOString(), title: `${source.title} (copy)` }, ...reports]);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Step 3 · Research brief export"
        icon={FileText}
        title="Research brief export"
        description="Package reviewed mutation signals, candidate hypothesis classes, limitations, and validation notes into a research-use deliverable."
        meta={<><span>{reports.length} total</span><span>·</span><span>{reports.filter((report) => report.status === "ready").length} ready</span></>}
        action={
          <button className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" onClick={() => setShowGenerate(true)} type="button">
            <Plus aria-hidden="true" className="h-4 w-4" /> Generate report
          </button>
        }
      />

      <ResearchUseAlert compact />

      <section data-tour="report-export" className="rounded-[22px] border border-[#dbeef8] bg-[#f8fcff] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Export readiness</p>
            <h2 className="mt-1 text-base font-semibold text-ink">Checks completed before brief export</h2>
            <p className="mt-1 max-w-2xl text-xs text-ink/55">Each item must be reviewed and accepted before a research brief can be released.</p>
          </div>
          <span className="rounded-full border border-[#bfe3d2] bg-[#f3fbf6] px-3 py-1 text-[11px] font-semibold" style={{ color: "#22A06B" }}>Ready to draft</span>
        </div>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/68 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-[#dbeef8] bg-white p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-tide">Signals accepted</p><p className="mt-1 font-semibold text-ink">Reviewer-accepted only</p></li>
          <li className="rounded-2xl border border-[#dbeef8] bg-white p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-tide">Limitations recorded</p><p className="mt-1 font-semibold text-ink">Unresolved gaps flagged</p></li>
          <li className="rounded-2xl border border-[#dbeef8] bg-white p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-tide">Validation notes</p><p className="mt-1 font-semibold text-ink">Retrospective check attached</p></li>
          <li className="rounded-2xl border border-[#dbeef8] bg-white p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-tide">Research-use boundary</p><p className="mt-1 font-semibold text-ink">Disclaimer included</p></li>
        </ul>
      </section>

      <ResearchFlowPanel
        body="Use this step to package reviewed signals and hypotheses into a shareable report. Then open the client portal for read-only review."
        currentStep={3}
        nextHref="/client"
        nextLabel="Open client view"
        title="Prepare a shareable evidence brief"
      />

      <DataToolbar
        filters={[
          { id: "template", label: "Template", value: templateFilter, onChange: setTemplateFilter, options: [{ value: "all", label: "All" }, ...templates.map((template) => ({ value: template, label: template }))] },
          { id: "status", label: "Status", value: statusFilter, onChange: setStatusFilter, options: [
            { value: "all", label: "All" },
            { value: "ready", label: "Ready" },
            { value: "draft", label: "Draft" },
            { value: "archived", label: "Archived" }
          ] }
        ]}
        onQueryChange={setQuery}
        placeholder="Search by title, cohort, ID…"
        query={query}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState
          hint="Adjust the filters or generate a new report from a cohort."
          icon={FileText}
          title="No reports match these filters"
          action={
            <button className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ocean px-3 py-1.5 text-sm font-semibold text-white hover:bg-tide" onClick={() => setShowGenerate(true)} type="button">
              <Plus aria-hidden="true" className="h-3.5 w-3.5" /> Generate report
            </button>
          }
        />
      ) : (
        <section className="glass-panel overflow-hidden rounded-3xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.1em] text-tide">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Cohort</th>
                <th className="px-4 py-3">Template</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Generated</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aqua/10">
              {filtered.map((report) => (
                <tr className="hover:bg-cyan/[0.05]" key={report.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{report.title}</p>
                    <p className="font-mono text-xs text-ink/55">{report.id}</p>
                  </td>
                  <td className="px-4 py-3 text-ink/75">{report.cohortLabel}</td>
                  <td className="px-4 py-3 text-ink/75">{report.template}</td>
                  <td className="px-4 py-3"><StatusPill kind={report.status} /></td>
                  <td className="px-4 py-3 text-ink/60">{formatRelative(report.generatedAt)}</td>
                  <td className="px-4 py-3 text-ink/60">{formatBytes(report.bytes)}</td>
                  <td className="px-4 py-3 text-ink/65">{report.owner}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-tide hover:border-aqua/45" onClick={() => setPreviewId(report.id)} type="button">
                        <Eye aria-hidden="true" className="h-3 w-3" /> Preview
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-ink/70 hover:border-aqua/45" onClick={() => duplicateReport(report.id)} type="button">
                        <Copy aria-hidden="true" className="h-3 w-3" /> Duplicate
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-ink/70 hover:border-aqua/45" onClick={() => archiveReport(report.id)} type="button">
                        <Archive aria-hidden="true" className="h-3 w-3" /> Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {showGenerate ? (
        <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Generate report</h2>
              <button aria-label="Close" className="focus-ring rounded-lg p-1 text-ink/60 hover:text-ink" onClick={() => setShowGenerate(false)} type="button">
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-tide">Cohort</span>
                <select className="focus-ring mt-1 w-full rounded-xl border border-aqua/25 bg-white/85 px-3 py-2" onChange={(event) => setGenCohortId(event.target.value)} value={genCohortId}>
                  {cohorts.map((cohort) => <option key={cohort.id} value={cohort.id}>{cohort.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-tide">Template</span>
                <select className="focus-ring mt-1 w-full rounded-xl border border-aqua/25 bg-white/85 px-3 py-2" onChange={(event) => setGenTemplate(event.target.value as (typeof templates)[number])} value={genTemplate}>
                  {templates.map((template) => <option key={template} value={template}>{template}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button className="rounded-xl border border-aqua/25 bg-white/80 px-3 py-2 text-sm font-semibold text-ink/70" onClick={() => setShowGenerate(false)} type="button">Cancel</button>
              <button className="rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" onClick={generateReport} type="button">Generate</button>
            </div>
          </div>
        </div>
      ) : null}

      {previewed ? (
        <div aria-modal="true" className="fixed inset-0 z-50 flex justify-end bg-ink/40" role="dialog">
          <div className="glass-panel flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-l-3xl">
            <header className="flex items-center justify-between border-b border-aqua/15 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tide">{previewed.template}</p>
                <h2 className="text-lg font-semibold text-ink">{previewed.title}</h2>
                <p className="text-xs text-ink/55">{previewed.cohortLabel} · {formatBytes(previewed.bytes)} · {formatRelative(previewed.generatedAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <ReportExportControls drugHypotheses={drugs} evidenceProvenance={evidenceProvenance} mutations={mutations} summary={summary} validationSteps={validationSteps} />
                <button aria-label="Close" className="focus-ring rounded-lg border border-aqua/25 bg-white/80 p-2 text-ink/60 hover:text-ink" onClick={() => setPreviewId(null)} type="button">
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4 text-sm text-ink/80">
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-tide">Cohort summary</h3>
                  <p className="mt-2">Cancer type: <strong>{summary.cohort.cancerType}</strong> · Genes: <strong>{summary.genesDetected.length}</strong> · Mutations scored: <strong>{summary.mutationCount}</strong></p>
                </section>
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-tide">Top mutations</h3>
                  <ul className="mt-2 space-y-1">
                    {mutations.slice(0, 5).map((mutation) => (
                      <li className="flex items-center justify-between rounded-lg border border-aqua/15 bg-white/70 px-3 py-2" key={mutation.id}>
                        <span><strong>{mutation.gene}</strong> {mutation.variant} · <span className="text-ink/55">{mutation.pathway}</span></span>
                        <span className="rounded-full border border-aqua/20 bg-cyan/10 px-2 py-0.5 text-xs font-semibold text-tide">{mutation.prototypeRelevanceScore}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-tide">Drug hypotheses</h3>
                  <ul className="mt-2 space-y-1">
                    {drugs.slice(0, 5).map((drug) => (
                      <li className="flex items-center justify-between rounded-lg border border-aqua/15 bg-white/70 px-3 py-2" key={drug.id}>
                        <span><strong>{drug.candidateClass}</strong> · {drug.matchedGene}</span>
                        <span className="rounded-full border border-aqua/20 bg-cyan/10 px-2 py-0.5 text-xs font-semibold text-tide">{drug.compositePriorityScore}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-tide">Validation steps</h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5">
                    {validationSteps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </section>
                <p className="rounded-xl border border-aqua/20 bg-cyan/10 p-3 text-xs text-ink/65">
                  {researchUseDisclaimer}
                </p>
              </div>
            </div>
            <footer className="flex items-center justify-between border-t border-aqua/15 bg-white/60 px-5 py-3 text-xs text-ink/60">
              <span>Owner: {previewed.owner}</span>
              <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 font-semibold text-tide hover:border-aqua/45" type="button">
                <Download aria-hidden="true" className="h-3 w-3" /> Download .md
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
}
