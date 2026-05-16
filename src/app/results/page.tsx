"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Download, Filter, MessageSquarePlus, Microscope, ShieldAlert, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CohortSwitcher } from "@/components/cohort-switcher";
import { MutationTable } from "@/components/mutation-table";
import { EvidencePanel } from "@/components/evidence-panel";
import { DataToolbar } from "@/components/data-toolbar";
import { ResearchUseAlert } from "@/components/research-use-alert";
import { ResearchFlowPanel } from "@/components/research-flow-panel";
import { StatusPill } from "@/components/status-pill";
import { reviewerStates } from "@/lib/content";
import { cohorts, getRankedDrugHypotheses, getRankedMutations } from "@/lib/mock-analysis";

type ReviewState = "pending" | "needsEvidence" | "accepted" | "rejected" | "limitation";

function getInitialReviewState(index: number): ReviewState {
  if (index === 0) return "accepted";
  if (index === 1) return "needsEvidence";
  if (index === 2) return "pending";
  return "limitation";
}

function getReviewLabel(state: ReviewState) {
  return reviewerStates[state];
}

function getReviewPill(state: ReviewState) {
  if (state === "accepted") return { kind: "ready" as const, label: reviewerStates.accepted };
  if (state === "rejected") return { kind: "failed" as const, label: reviewerStates.rejected };
  if (state === "needsEvidence") return { kind: "review" as const, label: reviewerStates.needsEvidence };
  if (state === "limitation") return { kind: "review" as const, label: reviewerStates.limitation };
  return { kind: "draft" as const, label: reviewerStates.pending };
}

function findMatchedDrug(mutation: ReturnType<typeof getRankedMutations>[number], drugs: ReturnType<typeof getRankedDrugHypotheses>) {
  return (
    drugs.find((drug) => drug.matchedGene === mutation.gene && drug.matchedVariant === mutation.variant) ??
    drugs.find((drug) => drug.matchedGene === mutation.gene) ??
    null
  );
}

export default function ResultsPage() {
  const [cohortId, setCohortId] = useState(cohorts[0].id);
  const [query, setQuery] = useState("");
  const [geneFilter, setGeneFilter] = useState("all");
  const [pathwayFilter, setPathwayFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [sortKey, setSortKey] = useState("score-desc");
  const [selectedMutationId, setSelectedMutationId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reviewStatesById, setReviewStatesById] = useState<Record<string, ReviewState>>({});
  const [notesById, setNotesById] = useState<Record<string, string>>({});

  const mutations = useMemo(() => getRankedMutations(cohortId), [cohortId]);
  const drugs = useMemo(() => getRankedDrugHypotheses(cohortId), [cohortId]);

  useEffect(() => {
    setSelectedMutationId(null);
    setDrawerOpen(false);
    setNotesById({});
    setReviewStatesById(
      Object.fromEntries(mutations.map((mutation, index) => [mutation.id, getInitialReviewState(index)]))
    );
  }, [cohortId, mutations]);

  const genes = useMemo(() => Array.from(new Set(mutations.map((mutation) => mutation.gene))), [mutations]);
  const pathways = useMemo(() => Array.from(new Set(mutations.map((mutation) => mutation.pathway))), [mutations]);
  const evidenceTiers = useMemo(
    () => Array.from(new Set(mutations.map((mutation) => mutation.evidenceCategory))),
    [mutations]
  );

  const hypothesisById = useMemo(
    () =>
      Object.fromEntries(
        mutations.map((mutation) => {
          const matchedDrug = findMatchedDrug(mutation, drugs);
          return [mutation.id, matchedDrug?.candidateClass ?? "Reviewer follow-up needed"];
        })
      ),
    [drugs, mutations]
  );

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
      const matchesTier = tierFilter === "all" || mutation.evidenceCategory === tierFilter;
      const matchesReview =
        reviewFilter === "all" ||
        getReviewLabel(reviewStatesById[mutation.id] ?? getInitialReviewState(mutations.findIndex((entry) => entry.id === mutation.id))) === reviewFilter;
      return matchesQuery && matchesGene && matchesPathway && matchesTier && matchesReview;
    });
    if (sortKey === "score-desc") return [...filtered].sort((a, b) => b.prototypeRelevanceScore - a.prototypeRelevanceScore);
    if (sortKey === "score-asc") return [...filtered].sort((a, b) => a.prototypeRelevanceScore - b.prototypeRelevanceScore);
    if (sortKey === "gene") return [...filtered].sort((a, b) => a.gene.localeCompare(b.gene));
    return filtered;
  }, [mutations, pathwayFilter, geneFilter, query, reviewFilter, reviewStatesById, sortKey, tierFilter]);

  const selectedMutation =
    mutations.find((mutation) => mutation.id === selectedMutationId) ?? filteredMutations[0] ?? mutations[0] ?? null;
  const selectedDrug = selectedMutation ? findMatchedDrug(selectedMutation, drugs) : null;
  const selectedReviewState = selectedMutation ? reviewStatesById[selectedMutation.id] ?? "pending" : "pending";
  const reviewSummary = useMemo(
    () => ({
      accepted: filteredMutations.filter((mutation) => (reviewStatesById[mutation.id] ?? "pending") === "accepted").length,
      needsEvidence: filteredMutations.filter((mutation) => (reviewStatesById[mutation.id] ?? "pending") === "needsEvidence").length,
      pending: filteredMutations.filter((mutation) => (reviewStatesById[mutation.id] ?? "pending") === "pending").length,
      limitation: filteredMutations.filter((mutation) => (reviewStatesById[mutation.id] ?? "pending") === "limitation").length
    }),
    [filteredMutations, reviewStatesById]
  );

  function openReviewDrawer(mutationId: string) {
    setSelectedMutationId(mutationId);
    setDrawerOpen(true);
  }

  function updateReviewState(nextState: ReviewState) {
    if (!selectedMutation) return;
    setReviewStatesById((current) => ({ ...current, [selectedMutation.id]: nextState }));
  }

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
        eyebrow="Step 2 · Evidence review board"
        icon={Microscope}
        title="Evidence review board"
        description="Inspect ranked mutation signals, pathway matches, limitations, and draft hypotheses before research brief export."
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

      <section className="rounded-[22px] border border-[#dbeef8] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Reviewer states</p>
        <h2 className="mt-1 text-base font-semibold text-ink">Decisions that gate report export</h2>
        <ul className="mt-3 grid gap-2 text-xs leading-6 text-ink/65 sm:grid-cols-2 lg:grid-cols-5">
          <li className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3"><strong className="block text-ink">Pending review</strong>Awaiting expert review.</li>
          <li className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3"><strong className="block text-ink">Needs evidence</strong>Reviewer flagged the evidence trail as incomplete.</li>
          <li className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3"><strong className="block text-ink">Accepted for report</strong>Approved for inclusion in the research brief.</li>
          <li className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3"><strong className="block text-ink">Rejected</strong>Excluded from the brief, with reason.</li>
          <li className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-3"><strong className="block text-ink">Limitation unresolved</strong>Evidence gap noted for retrospective validation.</li>
        </ul>
      </section>

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

      <div data-tour="results-toolbar">
        <DataToolbar
          filters={[
            { id: "gene", label: "Gene", value: geneFilter, onChange: setGeneFilter, options: [{ value: "all", label: "All" }, ...genes.map((gene) => ({ value: gene, label: gene }))] },
            { id: "pathway", label: "Pathway", value: pathwayFilter, onChange: setPathwayFilter, options: [{ value: "all", label: "All" }, ...pathways.map((pathway) => ({ value: pathway, label: pathway }))] },
            { id: "tier", label: "Tier", value: tierFilter, onChange: setTierFilter, options: [{ value: "all", label: "All" }, ...evidenceTiers.map((tier) => ({ value: tier, label: tier }))] },
            { id: "review", label: "Review state", value: reviewFilter, onChange: setReviewFilter, options: [
              { value: "all", label: "All" },
              { value: reviewerStates.pending, label: reviewerStates.pending },
              { value: reviewerStates.needsEvidence, label: reviewerStates.needsEvidence },
              { value: reviewerStates.accepted, label: reviewerStates.accepted },
              { value: reviewerStates.rejected, label: reviewerStates.rejected },
              { value: reviewerStates.limitation, label: reviewerStates.limitation }
            ] },
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
      </div>

      <section data-tour="results-summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/55">Accepted for report</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{reviewSummary.accepted}</p>
          <p className="mt-1 text-xs text-ink/55">Ready to include in the research brief</p>
        </div>
        <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/55">Needs evidence</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{reviewSummary.needsEvidence}</p>
          <p className="mt-1 text-xs text-ink/55">Reviewer requested a stronger evidence trail</p>
        </div>
        <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/55">Pending review</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{reviewSummary.pending}</p>
          <p className="mt-1 text-xs text-ink/55">Awaiting expert interpretation and notes</p>
        </div>
        <div className="rounded-[18px] border border-[#dbeef8] bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/55">Limitation unresolved</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{reviewSummary.limitation}</p>
          <p className="mt-1 text-xs text-ink/55">Carry to retrospective validation or exclude from export</p>
        </div>
      </section>

      <section data-tour="mutation-table" className="glass-panel rounded-3xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Mutation review queue</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Ranked signals with linked hypothesis classes</h2>
          </div>
          <p className="text-xs text-ink/55">Open a row to review the evidence trail in the side panel.</p>
        </div>
        <div className="mt-4">
          <MutationTable
            hypothesisById={hypothesisById}
            mutations={filteredMutations}
            onSelect={openReviewDrawer}
            reviewStateById={Object.fromEntries(Object.entries(reviewStatesById).map(([id, state]) => [id, getReviewLabel(state)]))}
            selectedId={selectedMutationId}
          />
        </div>
      </section>

      {drawerOpen && selectedMutation ? (
        <div aria-modal="true" className="fixed inset-0 z-50 flex justify-end bg-ink/35" role="dialog">
          <div className="flex h-full w-full max-w-[860px] flex-col overflow-hidden border-l border-[#dbeef8] bg-[#f8fbfe] shadow-2xl">
            <header className="flex items-start justify-between gap-4 border-b border-[#dbeef8] bg-white px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Evidence review</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{selectedMutation.gene} {selectedMutation.variant}</h2>
                <p className="mt-1 text-sm text-ink/60">{selectedMutation.pathway} · {hypothesisById[selectedMutation.id] ?? "Reviewer follow-up needed"}</p>
              </div>
              <button
                aria-label="Close review drawer"
                className="focus-ring rounded-lg border border-[#cde8f5] bg-white p-2 text-ink/60 hover:text-ink"
                onClick={() => setDrawerOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <section className="rounded-[22px] border border-[#dbeef8] bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Reviewer decision</p>
                    <h3 className="mt-1 text-base font-semibold text-ink">Set the export state for this signal</h3>
                  </div>
                  <StatusPill kind={getReviewPill(selectedReviewState).kind} label={getReviewPill(selectedReviewState).label} />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-[#bfe3d2] bg-[#f3fbf6] px-3 py-2 text-sm font-semibold text-[#198754]" onClick={() => updateReviewState("accepted")} type="button">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" /> Approve
                  </button>
                  <button className="focus-ring rounded-xl border border-[#f4d8a7] bg-[#fff8ec] px-3 py-2 text-sm font-semibold text-[#A8721A]" onClick={() => updateReviewState("needsEvidence")} type="button">
                    Needs evidence
                  </button>
                  <button className="focus-ring rounded-xl border border-[#f4c7cd] bg-[#fff4f5] px-3 py-2 text-sm font-semibold text-[#c94b5c]" onClick={() => updateReviewState("rejected")} type="button">
                    Reject
                  </button>
                  <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-[#cde8f5] bg-white px-3 py-2 text-sm font-semibold text-tide" onClick={() => updateReviewState("limitation")} type="button">
                    <ShieldAlert aria-hidden="true" className="h-4 w-4" /> Flag limitation
                  </button>
                </div>

                <label className="mt-4 block">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/55">
                    <MessageSquarePlus aria-hidden="true" className="h-3.5 w-3.5" /> Reviewer note
                  </span>
                  <textarea
                    className="focus-ring mt-2 min-h-[96px] w-full rounded-2xl border border-[#dbeef8] bg-[#f8fcff] px-3 py-3 text-sm text-ink outline-none"
                    onChange={(event) => setNotesById((current) => ({ ...current, [selectedMutation.id]: event.target.value }))}
                    placeholder="Record why the item was accepted, rejected, or deferred to validation."
                    value={notesById[selectedMutation.id] ?? ""}
                  />
                </label>
              </section>

              <div className="mt-5">
                {selectedDrug ? (
                  <EvidencePanel drug={selectedDrug} mutation={selectedMutation} />
                ) : (
                  <section className="rounded-[22px] border border-[#dbeef8] bg-white p-5 text-sm text-ink/65">
                    No linked drug hypothesis was found for this mutation signal. Review the pathway evidence and add a note before report export.
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
