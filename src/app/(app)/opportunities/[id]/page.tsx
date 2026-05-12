"use client";
import Link from "next/link";
import { use } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/Shell";
import { TypePill } from "@/components/Pill";
import { currency, formatDate, relativeDeadline, daysUntil, typeLabel } from "@/lib/format";
import { ArrowRight, ExternalLink, CheckCircle2, Calendar, DollarSign, Globe, FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default function OpportunityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { opportunities, applications } = useStore();
  const opp = opportunities.find((o) => o.id === id);
  if (!opp) return notFound();
  const app = applications.find((a) => a.opportunity_id === opp.id);

  return (
    <>
      <PageHeader
        eyebrow={`${typeLabel(opp.type)} · ${opp.funder}`}
        title={opp.program}
        subtitle={`Submission via ${opp.platform} · ${opp.geography} · ${opp.award}`}
        actions={
          <>
            <a href={opp.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <ExternalLink size={13} /> Official call
            </a>
            {app ? (
              <Link href={`/applications/${app.id}`} className="btn btn-primary">
                Open application <ArrowRight size={13} />
              </Link>
            ) : (
              <Link href={`/applications/new?opportunity=${opp.id}`} className="btn btn-primary">
                Start application <ArrowRight size={13} />
              </Link>
            )}
          </>
        }
      />

      <div className="px-8 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <section>
            <h3 className="font-display text-xl mb-3">Eligibility</h3>
            <ul className="space-y-2 text-sm">
              {opp.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-sage mt-1 shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 paper-card p-4 text-sm">
              <div className="eyebrow mb-2">Pre-check against your kit</div>
              <ul className="text-xs space-y-1.5">
                <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-sage" /> All eligibility flags satisfied by your profile.</li>
                <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-sage" /> No conflicting prior-award wait periods.</li>
                <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-sage" /> Work samples available within the funder's age window.</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="font-display text-xl mb-3">What you'll write</h3>
            <ol className="space-y-3">
              {opp.sections.map((s, i) => (
                <li key={s.key} className="paper-card p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="eyebrow">Section {i + 1}</span>
                      <span className="chip">
                        {s.limit_value} {s.limit_unit}
                        {s.limit_unit === "words" ? " max" : s.limit_unit === "chars" ? " char max" : ""}
                      </span>
                      {s.required && <span className="chip chip-warn">Required</span>}
                    </div>
                  </div>
                  <div className="font-serif text-[15px] leading-relaxed text-ink mt-1">{s.prompt}</div>
                  {s.notes && <div className="mt-2 text-xs text-muted italic">{s.notes}</div>}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="font-display text-xl mb-3">Work sample spec</h3>
            <p className="text-sm text-muted leading-relaxed">{opp.work_sample_spec}</p>
          </section>

          <section>
            <h3 className="font-display text-xl mb-3">Funder's stated values</h3>
            <ul className="space-y-2 text-sm">
              {opp.values.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-ink mt-2 shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-muted">
              These values are passed to the drafting AI to calibrate tone, structure, and emphasis.
            </div>
          </section>
        </div>

        <aside className="col-span-4 space-y-5">
          <div className="paper-card p-5">
            <div className="eyebrow mb-3">At a glance</div>
            <ul className="space-y-3 text-sm">
              <Meta icon={<Calendar size={13} />} label="Deadline">{formatDate(opp.deadline)} · <span className="text-accent">{relativeDeadline(opp.deadline)}</span></Meta>
              <Meta icon={<DollarSign size={13} />} label="Award">{opp.award}</Meta>
              <Meta icon={<DollarSign size={13} />} label="Application fee">{opp.fee ? currency(opp.fee) : "Free"}</Meta>
              <Meta icon={<Globe size={13} />} label="Geography">{opp.geography}</Meta>
              <Meta icon={<FileText size={13} />} label="Platform">{opp.platform}</Meta>
            </ul>
          </div>

          <div className="paper-card p-5">
            <div className="eyebrow mb-3">Reused from your kit</div>
            <ul className="text-xs space-y-1.5 text-muted">
              <li>· Bio (auto-selected length for this funder)</li>
              <li>· CV (rendered to {typeLabel(opp.type)} format)</li>
              <li>· Statement variants (50, 100, 250-word)</li>
              <li>· Project descriptions (Outbuildings, Carrier Series)</li>
              <li>· Budget template (if required)</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function Meta({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div>
        <div className="eyebrow">{label}</div>
        <div className="text-ink text-sm">{children}</div>
      </div>
    </li>
  );
}
