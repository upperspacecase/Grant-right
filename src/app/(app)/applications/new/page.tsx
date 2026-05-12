"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/Shell";
import { TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { formatDate, relativeDeadline } from "@/lib/format";
import { ArrowRight, Search, Plus } from "lucide-react";

export default function NewApplicationPage() {
  const { opportunities, applications } = useStore();
  const [q, setQ] = useState("");
  const choices = opportunities.filter(
    (o) =>
      !applications.find((a) => a.opportunity_id === o.id) &&
      (!q || `${o.funder} ${o.program}`.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <>
      <PageHeader
        eyebrow="New application"
        title="Pick an opportunity to apply to"
        subtitle="Start from an opportunity already in your library, or add a new one if you've found a call we don't have yet."
        actions={
          <Link href="/opportunities/new" className="btn btn-ghost">
            <Plus size={13} /> Add new opportunity
          </Link>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="relative max-w-xl mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input pl-9"
            placeholder="Search opportunities you haven't started yet…"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-5xl">
          {choices.map((o) => (
            <Link
              href={`/applications/new-from/${o.id}`}
              key={o.id}
              className="paper-card p-5 hover:bg-[#FBF8F1] block"
            >
              <div className="flex items-start justify-between mb-2">
                <TypePill type={o.type} />
                <div className="eyebrow">{relativeDeadline(o.deadline)}</div>
              </div>
              <div className="font-display text-xl leading-tight">{o.program}</div>
              <div className="text-xs text-muted mt-1">{o.funder} · {formatDate(o.deadline)}</div>
              <div className="mt-4 text-xs flex items-center gap-1 text-ink">
                Start drafting <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
