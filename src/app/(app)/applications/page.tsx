"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { StatusPill, TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { Plus, ArrowRight, Filter } from "lucide-react";
import { formatDate, relativeDeadline } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const tabs = ["all", "drafting", "submitted", "awarded", "declined", "discovered"];

export default function ApplicationsPage() {
  const { applications, opportunities } = useStore();
  const [tab, setTab] = useState<string>("all");

  const rows = applications
    .map((a) => ({ a, o: opportunities.find((o) => o.id === a.opportunity_id)! }))
    .filter((r) => (tab === "all" ? true : r.a.status === tab))
    .sort((x, y) => new Date(x.o.deadline).getTime() - new Date(y.o.deadline).getTime());

  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Every grant, in motion"
        subtitle="Track what's drafted, what's submitted, what's awarded. Sort by deadline. Filter by status."
        actions={
          <Button asChild>
            <Link href="/applications/new">
              <Plus size={13} /> New application
            </Link>
          </Button>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-border flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <Filter size={13} className="text-muted-foreground shrink-0" />
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-1.5 text-[12px] rounded-md capitalize whitespace-nowrap shrink-0",
              tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-sand-light"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-2">
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 eyebrow border-b border-border">
          <div className="col-span-5">Opportunity</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Deadline</div>
          <div className="col-span-1 text-right">Open</div>
        </div>
        {rows.map(({ a, o }) => (
          <Link
            href={`/applications/${a.id}`}
            key={a.id}
            className="block md:grid md:grid-cols-12 md:gap-4 px-4 py-4 border-b border-border md:items-center hover:bg-muted"
          >
            <div className="md:col-span-5">
              <div className="font-heading text-lg leading-tight">{o.program}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{o.funder}</div>
            </div>
            <div className="md:hidden flex items-center gap-2 mt-2 flex-wrap">
              <TypePill type={o.type} />
              <StatusPill status={a.status} />
              <span className="text-[11px] text-muted-foreground ml-auto">
                {formatDate(o.deadline)} · {relativeDeadline(o.deadline)}
              </span>
            </div>
            <div className="hidden md:block md:col-span-2"><TypePill type={o.type} /></div>
            <div className="hidden md:block md:col-span-2"><StatusPill status={a.status} /></div>
            <div className="hidden md:block md:col-span-2 text-xs">
              <div>{formatDate(o.deadline)}</div>
              <div className="text-muted-foreground">{relativeDeadline(o.deadline)}</div>
            </div>
            <div className="hidden md:block md:col-span-1 text-right text-muted-foreground"><ArrowRight size={14} /></div>
          </Link>
        ))}
      </div>
    </>
  );
}
