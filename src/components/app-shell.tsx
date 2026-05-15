"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Briefcase,
  Dna,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Sparkles,
  Users
} from "lucide-react";

const researchNavigation = [
  { href: "/dashboard", label: "Overview", description: "Start here", icon: LayoutDashboard, step: "0" },
  { href: "/analysis", label: "Run analysis", description: "Upload and score", icon: FlaskConical, step: "1" },
  { href: "/results", label: "Review evidence", description: "Signals and hypotheses", icon: Dna, step: "2" },
  { href: "/report", label: "Export report", description: "Research brief", icon: FileText, step: "3" },
  { href: "/client", label: "Share client view", description: "Read-only portal", icon: Users, step: "4" }
];

const operationsNavigation = [
  { href: "/architecture", label: "Operations", description: "Pipeline health", icon: Activity },
  { href: "/validation", label: "Validation", description: "Retrospective checks", icon: BarChart3 },
  { href: "/pilot", label: "Pilots", description: "Customer tracking", icon: Briefcase }
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
      <aside className="relative border-b border-[#dbeef8] bg-white px-4 py-3 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">

        <div className="flex items-center justify-between gap-3 lg:block">
        <Link className="focus-ring flex items-center gap-3" href="/">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-ocean text-white lg:h-11 lg:w-11">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">ONCOQ.TECH</p>
            <h1 className="text-sm font-semibold text-ink lg:text-base">Workspace</h1>
          </div>
        </Link>

        <div className="flex items-center gap-2 rounded-2xl border border-[#dbeef8] bg-white p-2 lg:mt-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ocean text-[11px] font-semibold text-white">AK</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink">Amir Khalid</p>
            <p className="hidden truncate text-[11px] text-ink/55 sm:block">amir.k@oncoq · Admin</p>
          </div>
        </div>
        </div>

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
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/42">Admin tools</p>
            <div className="grid grid-cols-3 gap-2 lg:block lg:space-y-1">
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
      </main>
    </div>
  );
}
