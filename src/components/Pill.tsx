import { cn } from "@/lib/cn";
import { typeLabel } from "@/lib/format";

export function TypePill({ type }: { type: string }) {
  const map: Record<string, string> = {
    residency: "chip-sage",
    project_grant: "chip-accent",
    fellowship: "chip-ink",
    emergency: "chip-warn",
    festival: "chip-sage",
    prize: "chip-accent"
  };
  return <span className={cn("chip", map[type] ?? "")}>{typeLabel(type)}</span>;
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    discovered: "",
    drafting: "chip-warn",
    ready: "chip-sage",
    submitted: "chip-ink",
    awarded: "chip-sage",
    declined: "chip-accent"
  };
  const label: Record<string, string> = {
    discovered: "Discovered",
    drafting: "Drafting",
    ready: "Ready to submit",
    submitted: "Submitted",
    awarded: "Awarded",
    declined: "Declined"
  };
  return <span className={cn("chip", map[status] ?? "")}>{label[status] ?? status}</span>;
}
