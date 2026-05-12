"use client";
import Link from "next/link";
import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/Shell";
import { StatusPill, TypePill } from "@/components/Pill";
import { SectionEditor } from "@/components/SectionEditor";
import { cn } from "@/lib/cn";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Download,
  ExternalLink,
  Send,
  GripVertical,
  X,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { currency, daysUntil, formatDate, relativeDeadline, typeLabel } from "@/lib/format";
import { getMockDraft } from "@/lib/mockDrafts";

export default function ApplicationWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { applications, opportunities, works, references, updateApplicationSection } = useStore();
  const app = applications.find((a) => a.id === id);
  if (!app) return notFound();
  const opp = opportunities.find((o) => o.id === app.opportunity_id);
  if (!opp) return notFound();

  const anonymous = opp.id === "opp_nyfa";

  return (
    <>
      <div className="border-b rule bg-[#FBF8F1]/60">
        <div className="px-8 pt-6 pb-5">
          <Link href="/applications" className="text-xs text-muted hover:text-ink flex items-center gap-1 mb-3">
            <ArrowLeft size={12} /> All applications
          </Link>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TypePill type={opp.type} />
                <StatusPill status={app.status} />
                {anonymous && <span className="chip chip-accent">Anonymous review</span>}
              </div>
              <h1 className="font-display text-3xl leading-tight">{opp.program}</h1>
              <div className="text-sm text-muted mt-1">{opp.funder} · {opp.geography}</div>
            </div>
            <div className="flex items-center gap-2">
              <a href={opp.url} target="_blank" rel="noreferrer" className="btn btn-ghost text-xs">
                <ExternalLink size={12} /> Official call
              </a>
              <button className="btn btn-ghost text-xs">
                <Download size={12} /> Export PDF
              </button>
              <button className="btn btn-primary text-xs">
                <Send size={12} /> Pre-submit check
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Left rail: opportunity meta */}
        <aside className="col-span-3 border-r rule p-6 space-y-6 bg-[#FBF8F1]/40 min-h-[calc(100vh-200px)]">
          <div>
            <div className="eyebrow mb-3">Deadline</div>
            <div className="font-display text-3xl text-accent leading-none">{daysUntil(opp.deadline)}</div>
            <div className="text-xs text-muted mt-1">days · {formatDate(opp.deadline)}</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Award</div>
            <div className="text-sm">{opp.award}</div>
            <div className="text-xs text-muted mt-1">{opp.fee ? `${currency(opp.fee)} application fee` : "Free application"}</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Submitted via</div>
            <div className="text-sm">{opp.platform}</div>
            <div className="text-xs text-muted mt-1">V1 export → copy-paste. V2 direct API submit (where supported).</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Eligibility</div>
            <ul className="space-y-1.5 text-xs">
              {opp.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 size={11} className="text-sage shrink-0 mt-0.5" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-2">Funder's stated values</div>
            <ul className="space-y-1.5 text-xs text-ink/80">
              {opp.values.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="size-1 rounded-full bg-ink mt-2 shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-muted mt-2 italic">Passed to Claude to calibrate every draft.</div>
          </div>
        </aside>

        {/* Center: sections */}
        <main className="col-span-6 p-8 space-y-6">
          {opp.sections.map((spec) => {
            const sec = app.sections.find((s) => s.key === spec.key) ?? {
              key: spec.key,
              content: "",
              last_edited: "—",
              versions: []
            };
            return (
              <SectionEditor
                key={spec.key}
                spec={spec}
                section={sec}
                anonymous={anonymous}
                values={opp.values}
                mockDraft={getMockDraft(opp.id, spec.key)}
                onChange={(content) => updateApplicationSection(app.id, spec.key, content)}
              />
            );
          })}

          {/* Work samples */}
          <WorkSamples app={app} opp={opp} works={works} />

          {/* Budget */}
          {app.budget_lines.length > 0 && <BudgetSection app={app} />}

          {/* References */}
          {app.references_used.length > 0 && <ReferencesSection app={app} references={references} />}
        </main>

        {/* Right rail: kit + checklist */}
        <aside className="col-span-3 border-l rule p-6 space-y-5 bg-[#FBF8F1]/40 min-h-[calc(100vh-200px)]">
          <PreSubmitChecklist app={app} opp={opp} />
          <KitDock />
        </aside>
      </div>
    </>
  );
}

function WorkSamples({
  app,
  opp,
  works
}: {
  app: any;
  opp: any;
  works: any[];
}) {
  return (
    <div className="paper-card">
      <div className="px-5 py-4 border-b rule flex items-center justify-between">
        <div>
          <div className="eyebrow">Work samples</div>
          <div className="text-sm mt-1">{opp.work_sample_spec}</div>
        </div>
        <button className="btn btn-ghost text-xs">Reorder · {app.work_sample_slots.length} selected</button>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5">
        {app.work_sample_slots.map((slot: any, i: number) => {
          const w = works.find((x) => x.id === slot.work_id);
          if (!w) return null;
          return (
            <div key={i} className="paper-card overflow-hidden">
              <div className="aspect-square bg-rule relative">
                <Image src={w.image} alt={w.title} fill className="object-cover" sizes="200px" />
                <div className="absolute top-1 left-1 text-[10px] bg-ink text-paper px-1.5 py-0.5 rounded-sm font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-2.5">
                <div className="font-serif italic text-xs leading-tight">{w.title}</div>
                <div className="text-[10px] text-muted mt-1">{w.year} · {w.medium}</div>
              </div>
            </div>
          );
        })}
        {Array.from({ length: Math.max(0, 5 - app.work_sample_slots.length) }).map((_, i) => (
          <button key={`empty-${i}`} className="aspect-square paper-card flex items-center justify-center text-xs text-muted hover:bg-[#FBF8F1]">
            + Add slot
          </button>
        ))}
      </div>
    </div>
  );
}

function BudgetSection({ app }: { app: any }) {
  const total = app.budget_lines.reduce((s: number, l: any) => s + l.amount, 0);
  const confirmed = app.budget_lines.filter((l: any) => l.status === "confirmed").reduce((s: number, l: any) => s + l.amount, 0);
  const toRaise = total - confirmed;
  return (
    <div className="paper-card">
      <div className="px-5 py-4 border-b rule flex items-center justify-between">
        <div>
          <div className="eyebrow">Budget</div>
          <div className="text-sm mt-1">Itemized, with status flags. Activities in narrative must map to lines here.</div>
        </div>
        <div className="text-right text-xs">
          <div className="font-mono text-lg text-ink">${total.toLocaleString()}</div>
          <div className="text-muted">${confirmed.toLocaleString()} confirmed · ${toRaise.toLocaleString()} to raise</div>
        </div>
      </div>
      <ul>
        {app.budget_lines.map((l: any, i: number) => (
          <li key={i} className="grid grid-cols-12 gap-3 px-5 py-2.5 border-b rule items-center text-sm last:border-0">
            <div className="col-span-3 text-xs text-muted">{l.category}</div>
            <div className="col-span-6">{l.description}</div>
            <div className="col-span-1">
              <span className={cn(
                "chip text-[9px]",
                l.status === "confirmed" && "chip-sage",
                l.status === "pending" && "chip-warn",
                l.status === "to_raise" && "chip-accent"
              )}>{l.status?.replace("_", " ")}</span>
            </div>
            <div className="col-span-2 text-right font-mono">${l.amount.toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReferencesSection({ app, references }: { app: any; references: any[] }) {
  const refs = app.references_used.map((id: string) => references.find((r) => r.id === id)).filter(Boolean);
  return (
    <div className="paper-card">
      <div className="px-5 py-4 border-b rule">
        <div className="eyebrow">References</div>
        <div className="text-sm mt-1">{refs.length} reference{refs.length === 1 ? "" : "s"} selected. Funder will contact them directly.</div>
      </div>
      <ul className="px-5 py-3">
        {refs.map((r: any) => (
          <li key={r.id} className="py-2 border-b rule last:border-0 text-sm">
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted">{r.title}, {r.org}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreSubmitChecklist({ app, opp }: { app: any; opp: any }) {
  const issues = [
    { ok: true, text: "All eligibility flags satisfied" },
    { ok: app.sections.every((s: any) => s.content), text: "All required sections drafted" },
    { ok: true, text: "Work samples within funder's age window" },
    { ok: opp.id !== "opp_creative_capital" || app.budget_lines.length > 0, text: "Budget present (if required)" },
    { ok: opp.id !== "opp_nyfa" || !app.sections.some((s: any) => /Mira|Okonkwo/.test(s.content)), text: "Anonymous: no name in body" },
    { ok: app.fee_paid || opp.fee === 0, text: opp.fee ? `Application fee paid (${currency(opp.fee)})` : "No fee required" }
  ];
  return (
    <div className="paper-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={14} className="text-sage" />
        <div className="eyebrow">Pre-submit check</div>
      </div>
      <ul className="space-y-2 text-xs">
        {issues.map((i) => (
          <li key={i.text} className="flex items-start gap-2">
            {i.ok ? (
              <CheckCircle2 size={12} className="text-sage mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle size={12} className="text-accent mt-0.5 shrink-0" />
            )}
            <span className={cn(i.ok ? "text-ink" : "text-accent")}>{i.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-[10px] text-muted leading-relaxed">
        Hard-fails (word limits, file naming, anonymity violations) block submit until resolved.
      </div>
    </div>
  );
}

function KitDock() {
  const [open, setOpen] = useState(true);
  return (
    <div className="paper-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3 flex items-center justify-between border-b rule"
      >
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-muted" />
          <div className="eyebrow">Kit · drag to use</div>
        </div>
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && (
        <ul className="p-3 space-y-1 text-xs">
          <Asset label="Artist statement — 50w" detail="The shortest variant" />
          <Asset label="Artist statement — 100w" detail="Most-cited length" />
          <Asset label="Artist statement — 250w" detail="For longer prompts" />
          <Asset label="Bio — 50 / 100 / 250" detail="3 variants" />
          <Asset label="Project: Outbuildings" detail="logline / 500w / 1,500w" />
          <Asset label="Project: Carrier Series" detail="In progress" />
          <Asset label="CV (visual arts format)" detail="19 entries · 5-page render" />
          <Asset label="Budget: Outbuildings" detail="9 lines · $84,500" />
        </ul>
      )}
    </div>
  );
}

function Asset({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="px-2.5 py-2 hover:bg-[#FBF8F1] flex items-center gap-2 rounded-sm cursor-grab">
      <GripVertical size={11} className="text-muted" />
      <div className="flex-1 min-w-0">
        <div className="text-ink truncate">{label}</div>
        <div className="text-[10px] text-muted truncate">{detail}</div>
      </div>
    </li>
  );
}
