"use client";
import Link from "next/link";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/Shell";
import { TypePill } from "@/components/Pill";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { currency, formatDate, relativeDeadline } from "@/lib/format";
import { useEffect } from "react";

export default function NewFromOpportunity({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { opportunities, applications, addApplication } = useStore();
  const opp = opportunities.find((o) => o.id === id);
  if (!opp) return notFound();
  const safeOpp = opp;

  function start() {
    const newAppId = `app_${Math.random().toString(36).slice(2, 9)}`;
    addApplication({
      id: newAppId,
      opportunity_id: safeOpp.id,
      status: "drafting",
      fee_paid: false,
      sections: safeOpp.sections.map((s) => ({
        key: s.key,
        content: "",
        last_edited: new Date().toISOString().slice(0, 10),
        versions: []
      })),
      work_sample_slots: [],
      budget_lines: [],
      timeline: [],
      references_used: [],
      updated_at: new Date().toISOString().slice(0, 10)
    });
    router.push(`/applications/${newAppId}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="Start application"
        title={opp.program}
        subtitle={`Confirm that you want to start drafting. We'll pre-populate the workspace from your kit. You can change any prefill before submit.`}
      />
      <div className="px-8 py-8 max-w-3xl space-y-6">
        <div className="paper-card p-5">
          <div className="flex items-start justify-between mb-3">
            <TypePill type={opp.type} />
            <div className="eyebrow">{relativeDeadline(opp.deadline)} · {formatDate(opp.deadline)}</div>
          </div>
          <div className="text-sm">{opp.award}</div>
          <div className="text-xs text-muted mt-2">{opp.fee ? `${currency(opp.fee)} application fee — pay at submit.` : "Free to apply."}</div>
        </div>

        <div className="paper-card p-5">
          <div className="eyebrow mb-3">From your kit, we'll auto-populate</div>
          <ul className="space-y-2 text-sm">
            <Auto label={`Bio — ${opp.type === "fellowship" ? "100-word variant" : "250-word variant"}`} />
            <Auto label="CV — rendered to this funder's format" />
            <Auto label="Statement variants matched to each section's length" />
            <Auto label="Eligibility check (already passed)" />
            <Auto label="Work samples ordered by relevance to this funder's emphasis" />
            {opp.id === "opp_creative_capital" && <Auto label="Outbuildings budget template — copied as starting budget" />}
          </ul>
        </div>

        <div className="flex justify-end gap-2">
          <Link href="/applications" className="btn btn-ghost">Cancel</Link>
          <button onClick={start} className="btn btn-primary">
            Start drafting <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </>
  );
}

function Auto({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 size={13} className="text-sage shrink-0 mt-0.5" />
      <span>{label}</span>
    </li>
  );
}
