import { Activity, Dna, ShieldCheck } from "lucide-react";
import type { RankedMutationRecord } from "@/lib/types";

const nodePositions = [
  "left-[6%] top-[14%]",
  "right-[6%] top-[18%]",
  "left-[10%] bottom-[20%]",
  "right-[8%] bottom-[18%]",
  "left-[42%] top-[4%]"
];

export function GenomicIntelligenceCanvas({ mutations }: { mutations: RankedMutationRecord[] }) {
  return (
    <section className="relative min-h-[460px] overflow-hidden rounded-[22px] border border-[#dbeef8] bg-white p-6 sm:p-8">

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-tide">
            <Dna aria-hidden="true" className="h-3.5 w-3.5" />
            Genomic Intelligence Canvas
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Cohort mutation signals mapped to research pathways</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/68">
            Research-use cohort visualization, not a care-delivery view.
          </p>
        </div>
        <div className="hidden rounded-full border border-aqua/30 bg-white/80 px-3 py-1.5 text-xs font-semibold text-tide sm:inline-flex">
          Research hypothesis only
        </div>
      </div>

      <div className="relative z-10 mt-8 flex min-h-[300px] items-center justify-center">
        <svg aria-hidden="true" className="absolute h-[280px] w-[340px] max-w-full" viewBox="0 0 320 260">
          <defs>
            <linearGradient id="helixStrokeA" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0B3D6B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="helixStrokeB" x1="1" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3FB6E0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0E6BA8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M92 18 C234 52 86 92 228 126 C82 164 232 194 96 242" fill="none" stroke="url(#helixStrokeA)" strokeLinecap="round" strokeWidth="5" />
          <path d="M228 18 C86 52 234 92 92 126 C238 164 88 194 224 242" fill="none" stroke="url(#helixStrokeB)" strokeLinecap="round" strokeWidth="5" />
          {[34, 66, 98, 130, 162, 194, 226].map((y, index) => (
            <line key={y} stroke="#3FB6E0" strokeOpacity="0.45" strokeWidth="3" x1={index % 2 === 0 ? 105 : 132} x2={index % 2 === 0 ? 216 : 190} y1={y} y2={y + 10} />
          ))}
        </svg>

        <div className="absolute h-56 w-56 rounded-full border border-aqua/25 bg-white/35" />
        <div aria-hidden="true" className="ripple-ring absolute h-44 w-44 rounded-full border border-cyan/50" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-aqua/30 bg-white/85 text-tide">
          <Activity aria-hidden="true" className="h-9 w-9" />
        </div>

        {mutations.slice(0, 5).map((mutation, index) => (
          <div
            className={`float-node absolute ${nodePositions[index] ?? "left-1/2 top-1/2"} rounded-2xl border border-aqua/25 bg-white/90 p-3 backdrop-blur`}
            key={mutation.id}
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-tide">{mutation.pathway.split(" ")[0]}</p>
            <p className="mt-1 whitespace-nowrap text-sm font-semibold text-ink">{mutation.gene} {mutation.variant}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-ink/65">
              <span className="h-2 w-2 rounded-full bg-tide" />
              Prototype score {mutation.prototypeRelevanceScore}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-5 flex items-start gap-3 rounded-xl border border-aqua/25 bg-white/65 p-3 text-sm leading-6 text-ink/72">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-tide" />
        <p>Signals are ranked for research review and retrospective validation. No care action is implied.</p>
      </div>
    </section>
  );
}
