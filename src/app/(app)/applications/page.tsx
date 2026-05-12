"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { StatusPill, TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { Plus, ArrowRight, Filter } from "lucide-react";
import { formatDate, relativeDeadline, daysUntil } from "@/lib/format";
import { cn } from "@/lib/cn";

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
          <Link href="/applications/new" className="btn btn-primary">
            <Plus size={13} /> New application
          </Link>
        }
      />
      <div className="px-8 py-5 border-b rule flex items-center gap-3">
        <Filter size={13} className="text-muted" />
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-1.5 text-[12px] rounded-sm capitalize",
              tab === t ? "bg-ink text-paper" : "text-muted hover:bg-[#EFE9DA]"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-8 py-2">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 eyebrow border-b rule">
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
            className="grid grid-cols-12 gap-4 px-4 py-4 border-b rule items-center hover:bg-[#FBF8F1]"
          >
            <div className="col-span-5">
              <div className="font-display text-lg leading-tight">{o.program}</div>
              <div className="text-xs text-muted mt-0.5">{o.funder}</div>
            </div>
            <div className="col-span-2"><TypePill type={o.type} /></div>
            <div className="col-span-2"><StatusPill status={a.status} /></div>
            <div className="col-span-2 text-xs">
              <div>{formatDate(o.deadline)}</div>
              <div className="text-muted">{relativeDeadline(o.deadline)}</div>
            </div>
            <div className="col-span-1 text-right text-muted"><ArrowRight size={14} /></div>
          </Link>
        ))}
      </div>
    </>
  );
}
