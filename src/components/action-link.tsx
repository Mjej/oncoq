import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
};

export function ActionLink({ href, children, icon: Icon, variant = "primary" }: ActionLinkProps) {
  const styles = {
    primary:
      "focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-ocean px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tide",
    secondary:
      "focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-[#cde8f5] bg-white/75 px-4 py-2.5 text-sm font-semibold text-tide transition hover:border-aqua/55 hover:text-ocean",
    ghost:
      "focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-tide transition hover:text-ocean"
  } as const;

  return (
    <Link className={styles[variant]} href={href}>
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      {children}
    </Link>
  );
}
