"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Filter, Microscope, Star } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CohortSwitcher } from "@/components/cohort-switcher";
import { MutationTable } from "@/components/mutation-table";
import { DrugRankingCard } from "@/components/drug-ranking-card";
import { EvidencePanel } from "@/components/evidence-panel";
import { DataToolbar } from "@/components/data-toolbar";
import { ResearchUseAlert } from "@/components/research-use-alert";
import { ResearchFlowPanel } from "@/components/research-flow-panel";
import { cohorts, getRankedDrugHypotheses, getRankedMutations } from "@/lib/mock-analysis";

export default function ResultsPage() {
  const [cohortId, setCohortId] = useState(cohorts[0].id);
  const [query, setQuery] = useState("");
  const [geneFilter, setGeneFilter] = useState("all");
  const [pathwayFilter, setPathwayFilter] = useState("all");
  const [sortKey, setSortKey] = useState("score-desc");
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  const mutations = useMemo(() => getRankedMutations(cohortId), [cohortId]);
  const drugs = useMemo(() => getRankedDrugHypotheses(cohortId), [cohortId]);

  const genes = useMemo(() => Array.from(new Set(mutations.map((mutation) => mutation.gene))), [mutations]);
  const pathways = useMemo(() => Array.from(new Set(mutations.map((mutation) => mutation.pathway))), [mutations]);

  const filteredMutations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = mutations.filter((mutation) => {
      const matchesQuery =
        !q ||
        mutation.gene.toLowerCase().includes(q) ||
        mutation.variant.toLowerCase().includes(q) ||
        mutation.pathway.toLowerCase().includes(q);
      const matchesGene = geneFilter === "all" || mutation.gene === geneFilter;
      const matchesPathway = pathwayFilter === "all" || mutation.pathway === pathwayFilter;
      return matchesQuery && matchesGene && matchesPathway;
    });
    if (sortKey === "score-desc") return [...filtered].sort((a, b) => b.prototypeRelevanceScore - a.prototypeRelevanceScore);
    if (sortKey === "score-asc") return [...filtered].sort((a, b) => a.prototypeRelevanceScore - b.prototypeRelevanceScore);
    if (sortKey === "gene") return [...filtered].sort((a, b) => a.gene.localeCompare(b.gene));
    return filtered;
  }, [mutations, query, geneFilter, pathwayFilter, sortKey]);

  const selectedDrug = drugs.find((drug) => drug.id === selectedDrugId) ?? drugs[0];
  const matchedMutation = mutations.find((mutation) => mutation.gene === selectedDrug?.matchedGene);

  function exportCsv() {
    const header = ["gene", "variant", "pathway", "score", "evidence"];
    const rows = filteredMutations.map((mutation) => [
      mutation.gene,
      mutation.variant,
      mutation.pathway,
      String(mutation.prototypeRelevanceScore),
      mutation.evidenceCategory
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `oncoq-mutations-${cohortId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Step 2 · Review evidence"
        icon={Microscope}
        title="Review mutation evidence"
        description="Filter mutation relevance signals, inspect linked drug-repurposing hypotheses, and check the evidence trace before exporting a report."
        meta={
          <>
            <span>{filteredMutations.length} of {mutations.length} mutations</span>
            <span>·</span>
            <span>{drugs.length} hypotheses</span>
          </>
        }
        action={
          <>
            <button className="focus-ring inline-flex items-center gap-2 rounded-xl border border-aqua/30 bg-white/80 px-3 py-2 text-sm font-semibold text-ink/72 hover:border-aqua/55 hover:text-tide" onClick={exportCsv} type="button">
              <Download aria-hidden="true" className="h-4 w-4" /> Export CSV
            </button>
            <Link className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" href="/report">
              Generate report
            </Link>
          </>
        }
      />

      <ResearchUseAlert compact />

      <ResearchFlowPanel
        body="This page is where the researcher checks why each signal or hypothesis is surfaced before turning it into a report."
        currentStep={2}
        nextHref="/report"
        nextLabel="Export report"
        title="Inspect signals before reporting"
      />

      <div className="glass-tile rounded-2xl p-3">
        <CohortSwitcher activeId={cohortId} cohorts={cohorts} onChange={setCohortId} />
      </div>

      <DataToolbar
        filters={[
          { id: "gene", label: "Gene", value: geneFilter, onChange: setGeneFilter, options: [{ value: "all", label: "All" }, ...genes.map((gene) => ({ value: gene, label: gene }))] },
          { id: "pathway", label: "Pathway", value: pathwayFilter, onChange: setPathwayFilter, options: [{ value: "all", label: "All" }, ...pathways.map((pathway) => ({ value: pathway, label: pathway }))] },
          { id: "sort", label: "Sort", value: sortKey, onChange: setSortKey, options: [
            { value: "score-desc", label: "Score ↓" },
            { value: "score-asc", label: "Score ↑" },
            { value: "gene", label: "Gene A→Z" }
          ] }
        ]}
        onQueryChange={setQuery}
        placeholder="Search gene, variant, pathway…"
        query={query}
        resultCount={filteredMutations.length}
        rightSlot={
          <button className="focus-ring inline-flex items-center gap-2 rounded-xl border border-aqua/25 bg-white/80 px-3 py-1.5 text-xs font-semibold text-tide hover:border-aqua/45" type="button">
            <Filter aria-hidden="true" className="h-3.5 w-3.5" /> Saved view
          </button>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Mutations</p>
            <p className="text-xs text-ink/55">Click a row to see drug evidence</p>
          </div>
          <div className="mt-3">
            <MutationTable mutations={filteredMutations} />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Drug hypotheses</p>
            <Star aria-hidden="true" className="h-4 w-4 text-tide/60" />
          </div>
          <ul className="mt-3 space-y-2">
            {drugs.map((drug, index) => (
              <li key={drug.id}>
                <DrugRankingCard candidate={drug} onSelect={() => setSelectedDrugId(drug.id)} rank={index + 1} selected={drug.id === (selectedDrug?.id ?? "")} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedDrug && matchedMutation ? (
        <section className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Evidence detail</p>
            <span className="text-xs text-ink/55">{selectedDrug.candidateClass} · {selectedDrug.matchedGene}</span>
          </div>
          <div className="mt-3">
            <EvidencePanel drug={selectedDrug} mutation={matchedMutation} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
