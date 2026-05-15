import { ShieldCheck } from "lucide-react";
import { researchUseDisclaimer } from "@/lib/content";

type ResearchUseAlertProps = {
  compact?: boolean;
};

export function ResearchUseAlert({ compact = false }: ResearchUseAlertProps) {
  return (
    <div className="rounded-2xl border border-[#dbeef8] bg-white p-4 text-sm leading-6 text-ink/76">
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-tide" />
        <p>
          {compact
            ? "Research-use only. Expert review and retrospective validation are required."
            : researchUseDisclaimer}
        </p>
      </div>
    </div>
  );
}
