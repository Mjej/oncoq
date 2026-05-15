"use client";

import { useMemo, useState } from "react";
import { Briefcase, Download, Mail, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { StatusPill } from "@/components/status-pill";
import { PilotRoiCalculator } from "@/components/pilot-roi-calculator";
import { engagements, formatMyr, formatRelative } from "@/data/operations";

const stageLabel: Record<string, string> = {
  lead: "Lead",
  pilot: "Pilot",
  saas: "SaaS",
  enterprise: "Enterprise",
  renewal: "Renewal"
};

export default function CustomerPilotsPage() {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return engagements.filter((engagement) => {
      const matchesQuery = !q || engagement.customer.toLowerCase().includes(q) || engagement.contact.toLowerCase().includes(q) || engagement.id.toLowerCase().includes(q);
      const matchesStage = stageFilter === "all" || engagement.stage === stageFilter;
      const matchesTier = tierFilter === "all" || engagement.tier === tierFilter;
      return matchesQuery && matchesStage && matchesTier;
    });
  }, [query, stageFilter, tierFilter]);

  const totals = useMemo(() => {
    const mrr = engagements.reduce((sum, engagement) => sum + engagement.mrrMyr, 0);
    const pipeline = engagements.filter((engagement) => engagement.stage === "lead" || engagement.stage === "pilot").reduce((sum, engagement) => sum + engagement.contractMyr, 0);
    const renewals = engagements.filter((engagement) => engagement.stage === "renewal").length;
    return { mrr, pipeline, renewals, active: engagements.filter((engagement) => engagement.stage !== "lead").length };
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin tool · Customer pilots"
        icon={Briefcase}
        title="Customer pilot tracker"
        description="Track research workspace pilots and commercial follow-up separately from the core researcher workflow."
        meta={
          <>
            <span>{engagements.length} pilot records</span>
            <span>·</span>
            <span>{totals.active} active pilots</span>
            <span>·</span>
            <span>{engagements.filter((engagement) => engagement.health === "amber" || engagement.health === "red").length} need attention</span>
          </>
        }
        action={
          <button className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-tide" type="button">
            <Plus aria-hidden="true" className="h-4 w-4" /> New pilot record
          </button>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Active pilots</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{totals.active}</p>
          <p className="mt-1 text-xs text-ink/55">Pilot, workspace, and renewal records</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Monthly recurring revenue</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{formatMyr(totals.mrr)}</p>
          <p className="mt-1 text-xs text-ink/55">Pilot + SaaS billing</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Pipeline value</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{formatMyr(totals.pipeline)}</p>
          <p className="mt-1 text-xs text-ink/55">Open lead + pilot contracts</p>
        </div>
        <div className="glass-tile rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-tide">Renewals due</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{totals.renewals}</p>
          <p className="mt-1 text-xs text-ink/55">Within 30 days</p>
        </div>
      </section>

      <DataToolbar
        filters={[
          { id: "stage", label: "Stage", value: stageFilter, onChange: setStageFilter, options: [
            { value: "all", label: "All" },
            { value: "lead", label: "Lead" },
            { value: "pilot", label: "Pilot" },
            { value: "saas", label: "SaaS" },
            { value: "renewal", label: "Renewal" }
          ] },
          { id: "tier", label: "Tier", value: tierFilter, onChange: setTierFilter, options: [
            { value: "all", label: "All" },
            { value: "Pilot", label: "Pilot" },
            { value: "SaaS", label: "SaaS" },
            { value: "Enterprise", label: "Enterprise" }
          ] }
        ]}
        onQueryChange={setQuery}
        placeholder="Search customer, contact, ID…"
        query={query}
        resultCount={filtered.length}
      />

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="glass-panel overflow-hidden rounded-3xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-tide/[0.06] text-xs font-semibold uppercase tracking-[0.1em] text-tide">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3 text-right">MRR</th>
                <th className="px-4 py-3 text-right">Contract</th>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3">Health</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aqua/10">
              {filtered.map((engagement) => (
                <tr className="hover:bg-cyan/[0.05]" key={engagement.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{engagement.customer}</p>
                    <p className="text-xs text-ink/55">{engagement.contact} · {engagement.primaryCohort}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-aqua/25 bg-cyan/10 px-2 py-0.5 text-xs font-semibold text-tide">{stageLabel[engagement.stage]}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/75">{engagement.tier}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink">{formatMyr(engagement.mrrMyr)}</td>
                  <td className="px-4 py-3 text-right text-ink/70">{formatMyr(engagement.contractMyr)}</td>
                  <td className="px-4 py-3 text-ink/65">{formatRelative(engagement.startedAt)}</td>
                  <td className="px-4 py-3"><StatusPill kind={engagement.health} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button aria-label="Email" className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-tide hover:border-aqua/45" type="button">
                        <Mail aria-hidden="true" className="h-3 w-3" />
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-lg border border-aqua/25 bg-white/80 px-2 py-1 text-xs font-semibold text-tide hover:border-aqua/45" type="button">
                        <Download aria-hidden="true" className="h-3 w-3" /> SOW
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PilotRoiCalculator />
      </section>
    </div>
  );
}
