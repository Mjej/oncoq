"use client";

import { useState } from "react";
import { Database } from "lucide-react";
import type { Cohort } from "@/lib/types";

type CohortSwitcherProps = {
  cohorts: Cohort[];
  activeId: string;
  onChange: (id: string) => void;
};

export function CohortSwitcher({ cohorts, activeId, onChange }: CohortSwitcherProps) {
  return (
    <div className="rounded-2xl border border-[#cde8f5] bg-white/66 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-tide">
        <Database aria-hidden="true" className="h-3.5 w-3.5" />
        Active cohort
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {cohorts.map((cohort) => {
          const isActive = cohort.id === activeId;
          return (
            <button
              className={`focus-ring rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-ocean text-white"
                  : "border border-[#cde8f5] bg-white/70 text-ink/70 hover:border-aqua/55 hover:text-tide"
              }`}
              key={cohort.id}
              onClick={() => onChange(cohort.id)}
              type="button"
            >
              {cohort.cancerType}
              <span className="ml-2 text-xs font-medium opacity-80">n={cohort.sampleCount}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function useCohortState(defaultId: string) {
  const [activeId, setActiveId] = useState(defaultId);
  return { activeId, setActiveId };
}
