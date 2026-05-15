"use client";

import { Search, SlidersHorizontal } from "lucide-react";

type Option = { value: string; label: string };

type DataToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  filters?: { id: string; label: string; value: string; options: Option[]; onChange: (value: string) => void }[];
  rightSlot?: React.ReactNode;
  resultCount?: number;
};

export function DataToolbar({ query, onQueryChange, placeholder = "Search…", filters = [], rightSlot, resultCount }: DataToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#cde8f5] bg-white/68 p-3 backdrop-blur-xl">
      <label className="relative flex min-w-[220px] flex-1 items-center">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 h-4 w-4 text-ink/45" />
        <input
          className="focus-ring w-full rounded-xl border border-[#cde8f5] bg-white/78 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/45"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={query}
        />
      </label>

      {filters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-ink/45" />
          {filters.map((filter) => (
            <label className="flex items-center gap-2 text-xs font-semibold text-ink/65" key={filter.id}>
              <span className="uppercase tracking-[0.1em]">{filter.label}</span>
              <select
                className="focus-ring rounded-lg border border-[#cde8f5] bg-white/78 px-2 py-1.5 text-sm font-medium text-ink"
                onChange={(event) => filter.onChange(event.target.value)}
                value={filter.value}
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}

      {resultCount !== undefined ? (
        <span className="rounded-full border border-[#cde8f5] bg-white/70 px-2.5 py-1 text-xs font-semibold text-ink/65">
          {resultCount} result{resultCount === 1 ? "" : "s"}
        </span>
      ) : null}

      {rightSlot ? <div className="ml-auto flex items-center gap-2">{rightSlot}</div> : null}
    </div>
  );
}
