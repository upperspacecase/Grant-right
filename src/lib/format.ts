export function countWords(s: string): number {
  return s
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function countChars(s: string): number {
  return s.length;
}

export function measure(unit: "words" | "chars" | "minutes" | "pages", s: string): number {
  if (unit === "words") return countWords(s);
  if (unit === "chars") return countChars(s);
  return 0;
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  const now = new Date("2026-05-12").getTime(); // pinned for deterministic UI
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export function relativeDeadline(iso: string): string {
  const d = daysUntil(iso);
  if (d < 0) return `${Math.abs(d)} days past`;
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  if (d < 60) return `In ${d} days`;
  const months = Math.round(d / 30);
  return `In ~${months} months`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function currency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function typeLabel(t: string): string {
  const map: Record<string, string> = {
    residency: "Residency",
    project_grant: "Project Grant",
    fellowship: "Fellowship",
    emergency: "Emergency",
    festival: "Festival / Lab",
    prize: "Prize"
  };
  return map[t] ?? t;
}
