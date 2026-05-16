import { Badge } from "@/components/ui/badge";
import { typeLabel } from "@/lib/format";

type BadgeVariant = "default" | "primary" | "accent" | "warn" | "ink";

export function TypePill({ type }: { type: string }) {
  const map: Record<string, BadgeVariant> = {
    residency: "accent",
    project_grant: "primary",
    fellowship: "ink",
    emergency: "warn",
    festival: "accent",
    prize: "primary"
  };
  return <Badge variant={map[type] ?? "default"}>{typeLabel(type)}</Badge>;
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    discovered: "default",
    drafting: "warn",
    ready: "accent",
    submitted: "ink",
    awarded: "accent",
    declined: "primary"
  };
  const label: Record<string, string> = {
    discovered: "Discovered",
    drafting: "Drafting",
    ready: "Ready to submit",
    submitted: "Submitted",
    awarded: "Awarded",
    declined: "Declined"
  };
  return <Badge variant={map[status] ?? "default"}>{label[status] ?? status}</Badge>;
}
