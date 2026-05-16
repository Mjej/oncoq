"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Briefcase,
  Compass,
  Dna,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Users
} from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { useTour } from "@/components/tour/tour-provider";

const researchNavigation = [
  { href: "/dashboard", label: "Evidence workspace", description: "Active cohort summary", icon: LayoutDashboard, step: "0" },
  { href: "/analysis", label: "Cohort intake", description: "Validate & score", icon: FlaskConical, step: "1" },
  { href: "/results", label: "Evidence board", description: "Ranked signals", icon: Dna, step: "2" },
  { href: "/report", label: "Research brief", description: "Reviewed export", icon: FileText, step: "3" },
  { href: "/client", label: "Client review", description: "Read-only portal", icon: Users, step: "4" }
];

const operationsNavigation = [
  { href: "/architecture", label: "Pipeline operations", description: "Run monitor & architecture", icon: Activity },
  { href: "/validation", label: "Retrospective validation", description: "Benchmark checks", icon: BarChart3 },
  { href: "/pilot", label: "Pilot pipeline", description: "Pilot tracker", icon: Briefcase }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isClientPortal = pathname === "/client";

  if (isLanding || isClientPortal) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white lg:flex">
      <aside data-tour="sidebar" className="relative border-b border-[#dbeef8] bg-white px-4 py-3 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">

        <div className="flex items-center justify-between gap-3 lg:block">
        <Link className="focus-ring flex items-center gap-3" href="/">
          <Wordmark size={22} />
          <span className="sr-only">OncoQ.tech — Research workspace</span>
        </Link>
        <p className="mt-1 hidden text-[11px] font-medium text-ink/55 lg:block">Research workspace</p>

        <div className="flex items-center gap-2 rounded-2xl border border-[#dbeef8] bg-white p-2 lg:mt-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ocean text-[11px] font-semibold text-white">AK</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink">Amir Khalid</p>
            <p className="hidden truncate text-[11px] text-ink/55 sm:block">amir.k@oncoq · Admin</p>
          </div>
        </div>
        </div>

        <TourLauncher />

        <nav aria-label="Primary" className="mt-4 space-y-4 lg:mt-6">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/42">Research workflow</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:block lg:space-y-1">
          {researchNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                className={`focus-ring flex items-center gap-2 rounded-2xl px-2.5 py-2 text-xs font-medium transition lg:gap-3 lg:px-3 lg:py-2.5 lg:text-sm ${
                  isActive
                    ? "bg-ocean text-white"
                    : "text-[#355466] hover:bg-[#f5fbff] hover:text-ink"
                }`}
                href={item.href}
                key={item.href}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${isActive ? "bg-white/20 text-white" : "bg-[#eef8fd] text-tide"}`}>{item.step}</span>
                <span className="flex flex-col leading-tight">
                  <span>{item.label}</span>
                  <span className={`hidden text-[11px] font-medium sm:block ${isActive ? "text-white/82" : "text-[#6E8796]"}`}>{item.description}</span>
                </span>
                <Icon aria-hidden="true" className={`ml-auto hidden h-4 w-4 lg:block ${isActive ? "text-white/85" : "text-ink/38"}`} />
              </Link>
            );
          })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/42">Operations</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1">
              {operationsNavigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    className={`focus-ring flex items-center gap-2 rounded-2xl px-2.5 py-2 text-xs font-medium transition lg:gap-3 lg:px-3 lg:py-2.5 lg:text-sm ${
                      isActive ? "bg-[#eef8fd] text-tide" : "text-[#547084] hover:bg-[#f5fbff] hover:text-ink"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="flex flex-col leading-tight">
                      <span>{item.label}</span>
                      <span className="hidden text-[11px] font-medium text-[#7890A0] sm:block">{item.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="mt-6 hidden rounded-2xl border border-[#dbeef8] bg-white p-3 text-xs lg:block">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-ink/75">Pipeline</p>
            <span className="inline-flex items-center gap-1 rounded-full border border-leaf/30 bg-leaf/10 px-2 py-0.5 font-semibold text-leaf">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              Healthy
            </span>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-ink/60">
            <div><dt className="uppercase tracking-[0.1em]">Uptime</dt><dd className="text-sm font-semibold text-ink">99.6%</dd></div>
            <div><dt className="uppercase tracking-[0.1em]">Queue</dt><dd className="text-sm font-semibold text-ink">1 run</dd></div>
          </dl>
        </div>
      </aside>

      <main className="relative w-full bg-white px-4 py-5 sm:px-6 lg:ml-72 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
        <TourHelpButton />
      </main>
    </div>
  );
}

function TourLauncher() {
  const { start } = useTour();
  return (
    <button
      className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-aqua/40 bg-gradient-to-r from-[#eef8fd] to-white px-3 py-2 text-xs font-semibold text-tide shadow-sm hover:from-white hover:to-[#eef8fd] lg:mt-4"
      onClick={start}
      type="button"
    >
      <Compass aria-hidden="true" className="h-3.5 w-3.5" />
      Take the guided tour
    </button>
  );
}

function TourHelpButton() {
  const { start, active } = useTour();
  if (active) return null;
  return (
    <button
      aria-label="Start guided tour"
      className="focus-ring fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ocean px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-ocean/25 hover:bg-tide"
      onClick={start}
      type="button"
    >
      <Compass aria-hidden="true" className="h-4 w-4" />
      Tour
    </button>
  );
}
