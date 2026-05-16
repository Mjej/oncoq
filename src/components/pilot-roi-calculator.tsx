"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CircleDollarSign, Download, Sparkles } from "lucide-react";
import { buildPilotSow, downloadTextFile } from "@/lib/export-report";

export function PilotRoiCalculator() {
  const [analysts, setAnalysts] = useState(3);
  const [rate, setRate] = useState(120);
  const [hoursPerCohort, setHoursPerCohort] = useState(60);
  const [assistedHoursPerCohort, setAssistedHoursPerCohort] = useState(27);
  const [cohortsPerYear, setCohortsPerYear] = useState(8);
  const [customer, setCustomer] = useState("Customer research lab");
  const [cohortName, setCohortName] = useState("Lung adenocarcinoma demo cohort");

  const result = useMemo(() => {
    const manualHoursPerYear = analysts * hoursPerCohort * cohortsPerYear;
    const assistedHoursPerYear = analysts * Math.min(assistedHoursPerCohort, hoursPerCohort) * cohortsPerYear;
    const savedHours = Math.max(0, manualHoursPerYear - assistedHoursPerYear);
    const manualCost = Math.round(manualHoursPerYear * rate);
    const assistedCost = Math.round(assistedHoursPerYear * rate);
    const moneyValue = Math.max(0, manualCost - assistedCost);
    const pilotFee = 50_000;
    const saasFee = 120_000;
    const netVsPilot = moneyValue - pilotFee;
    const netVsSaas = moneyValue - saasFee;
    const paybackMonthsPilot = moneyValue > 0 ? Math.max(1, Math.round((pilotFee / moneyValue) * 12)) : 99;
    const paybackMonthsSaas = moneyValue > 0 ? Math.max(1, Math.round((saasFee / moneyValue) * 12)) : 99;
    return { manualHoursPerYear, assistedHoursPerYear, savedHours, manualCost, assistedCost, moneyValue, netVsPilot, netVsSaas, paybackMonthsPilot, paybackMonthsSaas };
  }, [analysts, rate, hoursPerCohort, assistedHoursPerCohort, cohortsPerYear]);

  function handleDownloadSow() {
    const sow = buildPilotSow({
      customer,
      cohortName,
      analystRate: rate,
      hoursSaved: result.savedHours
    });
    downloadTextFile(sow, `oncoq-pilot-sow-${Date.now()}.md`);
  }

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Pilot ROI calculator</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Translate cohort workload into pilot value</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/68">
            Estimates are illustrative for research-pilot scoping. Final value depends on dataset complexity, expert-review depth, and customer workflow.
          </p>
        </div>
        <Sparkles aria-hidden="true" className="hidden h-8 w-8 text-aqua sm:block" />
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="space-y-5">
          <NumberInput label="Bioinformatics analysts" suffix="analysts" min={1} max={50} value={analysts} onChange={setAnalysts} />
          <NumberInput label="Internal analyst rate" suffix="RM / hr" min={50} max={600} value={rate} onChange={setRate} step={10} />
          <NumberInput label="Manual hours per cohort" suffix="hours" min={5} max={400} value={hoursPerCohort} onChange={setHoursPerCohort} step={5} />
          <NumberInput label="Assisted hours per cohort (with OncoQ.tech)" suffix="hours" min={1} max={hoursPerCohort} value={Math.min(assistedHoursPerCohort, hoursPerCohort)} onChange={setAssistedHoursPerCohort} step={1} />
          <NumberInput label="Cohorts analysed / year" suffix="cohorts" min={1} max={100} value={cohortsPerYear} onChange={setCohortsPerYear} />

          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput label="Customer name" value={customer} onChange={setCustomer} />
            <TextInput label="Pilot cohort name" value={cohortName} onChange={setCohortName} />
          </div>
        </div>

        <div className="space-y-4">
          <ResultTile
            icon={CircleDollarSign}
            label="Estimated analyst hours saved / year"
            value={`${result.savedHours.toLocaleString()} hrs`}
            sub={`Baseline manual: ${result.manualHoursPerYear.toLocaleString()} hrs`}
          />
          <ResultTile
            icon={CircleDollarSign}
            label="Estimated workflow value / year"
            value={`RM ${result.moneyValue.toLocaleString()}`}
            sub="Internal value, research-use scoping only"
            accent
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultTile
              icon={CalendarClock}
              label="Payback vs RM50K pilot"
              value={`${result.paybackMonthsPilot} mo`}
              sub={`Net year-1: RM ${result.netVsPilot.toLocaleString()}`}
            />
            <ResultTile
              icon={CalendarClock}
              label="Payback vs RM120K SaaS"
              value={`${result.paybackMonthsSaas} mo`}
              sub={`Net year-1: RM ${result.netVsSaas.toLocaleString()}`}
            />
          </div>

          <button
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ocean px-5 py-3 text-sm font-semibold text-white transition hover:bg-tide"
            onClick={handleDownloadSow}
            type="button"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download draft pilot SOW (.md)
          </button>

          <div className="rounded-2xl border border-[#dbeef8] bg-[#f8fcff] p-4 text-xs leading-6 text-ink/65">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-tide">Assumptions</p>
            <ul className="mt-2 space-y-1">
              <li>• Manual baseline: {result.manualHoursPerYear.toLocaleString()} analyst hours / year at RM {rate.toLocaleString()} / hr = RM {result.manualCost.toLocaleString()}.</li>
              <li>• Assisted with OncoQ.tech: {result.assistedHoursPerYear.toLocaleString()} hours / year = RM {result.assistedCost.toLocaleString()}.</li>
              <li>• Pilot fee assumed at RM 50,000; SaaS license assumed at RM 120,000 / year.</li>
              <li>• Estimates are research-pilot scoping only; expert review and validation effort excluded.</li>
            </ul>
          </div>

          <p className="text-xs leading-5 text-ink/55">
            Draft SOW for discussion only. Final pilot terms subject to mutual agreement. Research-use boundary applies.
          </p>
        </div>
      </div>
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.10em] text-ink/55">{label}</span>
      <div className="mt-2 flex items-center gap-3">
        <input
          className="w-full accent-aqua"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <div className="min-w-[7.5rem] rounded-xl border border-aqua/25 bg-white/80 px-3 py-2 text-right text-sm font-semibold text-ink">
          {value.toLocaleString()} {suffix ? <span className="text-ink/55">{suffix}</span> : null}
        </div>
      </div>
    </label>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.10em] text-ink/55">{label}</span>
      <input
        className="mt-2 w-full rounded-xl border border-aqua/25 bg-white/80 px-3 py-2 text-sm font-semibold text-ink focus-ring outline-none"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ResultTile({
  icon: Icon,
  label,
  value,
  sub,
  accent = false
}: {
  icon: typeof CircleDollarSign;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "border-[#b9e2f4] bg-[#f8fcff] text-ink"
          : "border-[#dbeef8] bg-white text-ink"
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.10em] text-tide">
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink/55">{sub}</p>
    </div>
  );
}
