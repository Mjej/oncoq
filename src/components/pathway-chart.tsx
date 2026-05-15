"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TooltipProps } from "recharts";
import type { PathwayDistributionPoint } from "../lib/types";

type PathwayInsight = {
  topMutation: string;
  candidateClass: string;
  evidenceTags: string[];
};

const pathwayAxisLabels: Record<string, string> = {
  "EGFR/ERBB signalling": "EGFR/ERBB",
  "p53 tumour suppressor pathway": "p53",
  "RAS/MAPK signalling": "RAS/MAPK",
  "ALK tyrosine kinase signalling": "ALK TK",
  "RTK/MAPK signalling": "RTK/MAPK",
  "Homologous recombination DNA repair": "HR repair",
  "PI3K/AKT signalling": "PI3K/AKT",
  "Wnt/beta-catenin signalling": "Wnt/beta-cat",
  "Mismatch repair (MMR)": "MMR",
  "Estrogen receptor signalling": "ER"
};

function PathwayTooltip({ active, payload, details }: TooltipProps<number, string> & { details: Record<string, PathwayInsight> }) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0]?.payload as PathwayDistributionPoint | undefined;
  if (!point) return null;
  const insight = details[point.pathway];
  return (
    <div className="min-w-[220px] rounded-xl border border-[#cde8f5] bg-white/95 p-3 text-xs text-ink/75 backdrop-blur">
      <p className="text-sm font-semibold text-ink">{point.pathway}</p>
      <dl className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink/55">Average relevance</dt>
          <dd className="font-semibold text-tide">{point.averageScore}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink/55">Top mutation</dt>
          <dd className="font-semibold text-ink">{insight?.topMutation ?? "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink/55">Candidate class</dt>
          <dd className="font-semibold text-ink">{insight?.candidateClass ?? "Analyst review required"}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink/55">Evidence tags</dt>
          <dd className="font-semibold text-ink">{insight?.evidenceTags.join(" · ") ?? "pathway · literature · cohort signal"}</dd>
        </div>
      </dl>
    </div>
  );
}

export function PathwayChart({ data, details = {} }: { data: PathwayDistributionPoint[]; details?: Record<string, PathwayInsight> }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ bottom: 48, left: -16, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="pathwayBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#0E6BA8" stopOpacity={0.95} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(14,107,168,0.10)" vertical={false} />
          <XAxis
            dataKey="pathway"
            interval={0}
            tick={{ fill: "#355466", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            angle={-22}
            textAnchor="end"
            tickFormatter={(value: string) => pathwayAxisLabels[value] ?? value}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tick={{ fill: "#355466", fontSize: 12 }}
            tickLine={false}
            label={{ value: "Relevance score", angle: -90, position: "insideLeft", fill: "#486779", fontSize: 12, offset: 8 }}
          />
          <Tooltip cursor={{ fill: "rgba(63,182,224,0.08)" }} content={<PathwayTooltip details={details} />} />
          <Bar dataKey="averageScore" fill="url(#pathwayBar)" name="Average score" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
