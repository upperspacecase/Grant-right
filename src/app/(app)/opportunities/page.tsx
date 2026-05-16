"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { Plus, Search, ArrowRight, Globe, DollarSign } from "lucide-react";
import { formatDate, relativeDeadline, daysUntil, typeLabel } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
          <Button asChild>
            <Link href="/opportunities/new">
              <Plus size={13} /> Add opportunity
            </Link>
          </Button>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-border">
        <div className="flex-1 relative w-full sm:max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
            placeholder="Search funders, programs…"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 scrollbar-thin">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-3 py-1.5 text-[12px] rounded-md transition-colors whitespace-nowrap shrink-0",
                filter === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-sand-light"
              )}
            >
              {t === "all" ? "All" : typeLabel(t)}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {filtered.map((o) => {
          const hasApp = applications.find((a) => a.opportunity_id === o.id);
          const days = daysUntil(o.deadline);
          const urgent = days < 30 && days >= 0;
          return (
            <Link href={`/opportunities/${o.id}`} key={o.id} className="block">
              <Card className="p-6 hover:bg-muted transition-colors h-full">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <TypePill type={o.type} />
                  <div className={cn("eyebrow text-right", urgent && "text-primary")}>
                    {relativeDeadline(o.deadline)} · {formatDate(o.deadline)}
                  </div>
                </div>
                <h3 className="font-heading text-2xl leading-tight">{o.program}</h3>
                <div className="text-sm text-muted-foreground mt-1">{o.funder}</div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Globe size={12} /> {o.geography}</span>
                  <span className="flex items-center gap-1.5"><DollarSign size={12} /> {o.award}</span>
                </div>
                <div className="mt-4 text-xs text-foreground/80">
                  <span className="text-muted-foreground">Eligibility:</span>{" "}
                  {o.eligibility.slice(0, 2).join(" · ")}
                  {o.eligibility.length > 2 && <span className="text-muted-foreground"> · +{o.eligibility.length - 2} more</span>}
                </div>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="accent">Eligible</Badge>
                    <span className="text-muted-foreground">{o.sections.length} sections · ${o.fee} fee</span>
                  </div>
                  <span className="text-xs flex items-center gap-1 text-foreground">
                    {hasApp ? "Open application" : "Start application"} <ArrowRight size={12} />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
