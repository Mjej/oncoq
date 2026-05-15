import { FileUp, FlaskConical, FileText, Microscope, BarChart3, Briefcase, type LucideIcon } from "lucide-react";
import { activityFeed, formatRelative, type ActivityEvent } from "@/data/operations";

const iconMap: Record<ActivityEvent["kind"], LucideIcon> = {
  upload: FileUp,
  run: FlaskConical,
  report: FileText,
  engagement: Briefcase,
  benchmark: BarChart3
};

const actorMap: Record<string, string> = {
  "amir.k@oncoq": "Amir",
  "lim.s@oncoq": "Lim",
  system: "System"
};

const actionMap: Record<string, string> = {
  "exported report": "exported evidence report",
  "completed run": "completed cohort scoring",
  "uploaded cohort": "uploaded cohort",
  "queued benchmark": "queued retrospective benchmark",
  "flagged for review": "flagged for expert review",
  "renewed engagement": "renewed research engagement",
  "pipeline error": "reported pipeline interruption",
  "generated report": "generated evidence report",
  "signed pilot SOW": "signed pilot SOW"
};

export function RecentActivity({ limit = 7 }: { limit?: number }) {
  const items = activityFeed.slice(0, limit);
  return (
    <section className="rounded-[22px] border border-[#dbeef8] bg-white/66 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">Recent activity</p>
        <Microscope aria-hidden="true" className="h-4 w-4 text-tide/60" />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((event) => {
          const Icon = iconMap[event.kind];
          const actor = actorMap[event.actor] ?? event.actor;
          const action = actionMap[event.action] ?? event.action;
          return (
            <li className="flex items-start gap-3 rounded-2xl border border-[#dbeef8] bg-white/70 p-3" key={event.id}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef8fd] text-tide">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink">
                  <span className="font-semibold">{actor}</span> {action}{" "}
                  <span className="font-medium text-tide">{event.target}</span>
                </p>
                <p className="mt-0.5 text-xs text-ink/50">{formatRelative(event.at)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
