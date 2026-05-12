"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { Plus, Filter, Search, ArrowRight, Globe, Calendar, DollarSign } from "lucide-react";
import { currency, formatDate, relativeDeadline, daysUntil, typeLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

const types = ["all", "residency", "project_grant", "fellowship", "emergency", "festival"];

export default function OpportunitiesPage() {
  const { opportunities, applications } = useStore();
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = opportunities.filter((o) => {
    if (filter !== "all" && o.type !== filter) return false;
    if (q && !`${o.funder} ${o.program}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="Opportunities"
        title="What's open. What you qualify for."
        subtitle="Manually entered in V1. V2 builds a scraped + curated database from NYFA Source, Res Artis, Hyperallergic, and Submittable Discover, normalized into the same schema."
        actions={
          <Link href="/opportunities/new" className="btn btn-primary">
            <Plus size={13} /> Add opportunity
          </Link>
        }
      />
      <div className="px-8 py-6 flex items-center gap-3 border-b rule">
        <div className="flex-1 relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input pl-9"
            placeholder="Search funders, programs…"
          />
        </div>
        <div className="flex items-center gap-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-3 py-1.5 text-[12px] rounded-sm transition-colors",
                filter === t ? "bg-ink text-paper" : "text-muted hover:bg-[#EFE9DA]"
              )}
            >
              {t === "all" ? "All" : typeLabel(t)}
            </button>
          ))}
        </div>
      </div>
      <div className="px-8 py-8 grid grid-cols-2 gap-5">
        {filtered.map((o) => {
          const hasApp = applications.find((a) => a.opportunity_id === o.id);
          const days = daysUntil(o.deadline);
          const urgent = days < 30 && days >= 0;
          return (
            <Link
              href={`/opportunities/${o.id}`}
              key={o.id}
              className="paper-card p-6 hover:bg-[#FBF8F1] transition-colors block"
            >
              <div className="flex items-start justify-between mb-3">
                <TypePill type={o.type} />
                <div className={cn("eyebrow", urgent && "text-accent")}>
                  {relativeDeadline(o.deadline)} · {formatDate(o.deadline)}
                </div>
              </div>
              <h3 className="font-display text-2xl leading-tight">{o.program}</h3>
              <div className="text-sm text-muted mt-1">{o.funder}</div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5"><Globe size={12} /> {o.geography}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={12} /> {o.award}</span>
              </div>
              <div className="mt-4 text-xs text-ink/80">
                <span className="text-muted">Eligibility:</span>{" "}
                {o.eligibility.slice(0, 2).join(" · ")}
                {o.eligibility.length > 2 && <span className="text-muted"> · +{o.eligibility.length - 2} more</span>}
              </div>
              <div className="mt-5 pt-4 border-t rule flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="chip chip-sage">Eligible</span>
                  <span className="text-muted">{o.sections.length} sections · ${o.fee} fee</span>
                </div>
                <span className="text-xs flex items-center gap-1 text-ink">
                  {hasApp ? "Open application" : "Start application"} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
