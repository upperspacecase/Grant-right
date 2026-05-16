"use client";
import Link from "next/link";
import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useStore } from "@/lib/store";
import { StatusPill, TypePill } from "@/components/Pill";
import { SectionEditor } from "@/components/SectionEditor";
import { cn } from "@/lib/cn";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Download,
  ExternalLink,
  Send,
  GripVertical,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { currency, daysUntil, formatDate } from "@/lib/format";
import { getMockDraft } from "@/lib/mockDrafts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
      <div className="border-b border-border bg-muted/60">
        <div className="px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5">
          <Link href="/applications" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mb-3">
            <ArrowLeft size={12} /> All applications
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <TypePill type={opp.type} />
                <StatusPill status={app.status} />
                {anonymous && <Badge variant="primary">Anonymous review</Badge>}
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl leading-tight">{opp.program}</h1>
              <div className="text-sm text-muted-foreground mt-1">{opp.funder} · {opp.geography}</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button asChild variant="ghost" size="sm">
                <a href={opp.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={12} /> <span className="hidden sm:inline">Official call</span><span className="sm:hidden">Call</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm">
                <Download size={12} /> <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">PDF</span>
              </Button>
              <Button size="sm">
                <Send size={12} /> <span className="hidden sm:inline">Pre-submit check</span><span className="sm:hidden">Check</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Left rail: opportunity meta */}
        <aside className="col-span-12 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6 space-y-5 sm:space-y-6 bg-muted/40 lg:min-h-[calc(100vh-200px)]">
          <div>
            <div className="eyebrow mb-3">Deadline</div>
            <div className="font-heading text-3xl text-primary leading-none">{daysUntil(opp.deadline)}</div>
            <div className="text-xs text-muted-foreground mt-1">days · {formatDate(opp.deadline)}</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Award</div>
            <div className="text-sm">{opp.award}</div>
            <div className="text-xs text-muted-foreground mt-1">{opp.fee ? `${currency(opp.fee)} application fee` : "Free application"}</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Submitted via</div>
            <div className="text-sm">{opp.platform}</div>
            <div className="text-xs text-muted-foreground mt-1">V1 export → copy-paste. V2 direct API submit (where supported).</div>
          </div>

          <div>
            <div className="eyebrow mb-2">Eligibility</div>
            <ul className="space-y-1.5 text-xs">
              {opp.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 size={11} className="text-accent shrink-0 mt-0.5" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-2">Funder's stated values</div>
            <ul className="space-y-1.5 text-xs text-foreground/80">
              {opp.values.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="size-1 rounded-full bg-foreground mt-2 shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-muted-foreground mt-2 italic">Passed to Claude to calibrate every draft.</div>
          </div>
        </aside>

        {/* Center: sections */}
        <main className="col-span-12 lg:col-span-6 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 min-w-0">
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
        <aside className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-border p-4 sm:p-6 space-y-5 bg-muted/40 lg:min-h-[calc(100vh-200px)]">
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
    <Card className="overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="eyebrow">Work samples</div>
          <div className="text-sm mt-1">{opp.work_sample_spec}</div>
        </div>
        <Button variant="ghost" size="sm">Reorder · {app.work_sample_slots.length} selected</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-5">
        {app.work_sample_slots.map((slot: any, i: number) => {
          const w = works.find((x) => x.id === slot.work_id);
          if (!w) return null;
          return (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-border relative">
                <Image src={w.image} alt={w.title} fill className="object-cover" sizes="200px" />
                <div className="absolute top-1 left-1 text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded-md font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-2.5">
                <div className="italic text-xs leading-tight">{w.title}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{w.year} · {w.medium}</div>
              </div>
            </Card>
          );
        })}
        {Array.from({ length: Math.max(0, 5 - app.work_sample_slots.length) }).map((_, i) => (
          <button key={`empty-${i}`} className="aspect-square rounded-xl border border-border bg-card flex items-center justify-center text-xs text-muted-foreground hover:bg-muted">
            + Add slot
          </button>
        ))}
      </div>
    </Card>
  );
}

function BudgetSection({ app }: { app: any }) {
  const total = app.budget_lines.reduce((s: number, l: any) => s + l.amount, 0);
  const confirmed = app.budget_lines.filter((l: any) => l.status === "confirmed").reduce((s: number, l: any) => s + l.amount, 0);
  const toRaise = total - confirmed;
  return (
    <Card className="overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="eyebrow">Budget</div>
          <div className="text-sm mt-1">Itemized, with status flags. Activities in narrative must map to lines here.</div>
        </div>
        <div className="text-left sm:text-right text-xs shrink-0">
          <div className="font-mono text-lg text-foreground">${total.toLocaleString()}</div>
          <div className="text-muted-foreground">${confirmed.toLocaleString()} confirmed · ${toRaise.toLocaleString()} to raise</div>
        </div>
      </div>
      <ul>
        {app.budget_lines.map((l: any, i: number) => {
          const variant: "default" | "accent" | "warn" | "primary" =
            l.status === "confirmed"
              ? "accent"
              : l.status === "pending"
              ? "warn"
              : l.status === "to_raise"
              ? "primary"
              : "default";
          return (
            <li key={i} className="px-4 sm:px-5 py-3 border-b border-border last:border-0 text-sm">
              <div className="hidden sm:grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 text-xs text-muted-foreground">{l.category}</div>
                <div className="col-span-6">{l.description}</div>
                <div className="col-span-1">
                  <Badge variant={variant} className="text-[9px]">{l.status?.replace("_", " ")}</Badge>
                </div>
                <div className="col-span-2 text-right font-mono">${l.amount.toLocaleString()}</div>
              </div>
              <div className="sm:hidden">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="text-xs text-muted-foreground">{l.category}</div>
                  <div className="font-mono text-sm shrink-0">${l.amount.toLocaleString()}</div>
                </div>
                <div className="text-sm">{l.description}</div>
                <div className="mt-1.5">
                  <Badge variant={variant} className="text-[9px]">{l.status?.replace("_", " ")}</Badge>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function ReferencesSection({ app, references }: { app: any; references: any[] }) {
  const refs = app.references_used.map((id: string) => references.find((r) => r.id === id)).filter(Boolean);
  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="eyebrow">References</div>
        <div className="text-sm mt-1">{refs.length} reference{refs.length === 1 ? "" : "s"} selected. Funder will contact them directly.</div>
      </div>
      <ul className="px-5 py-3">
        {refs.map((r: any) => (
          <li key={r.id} className="py-2 border-b border-border last:border-0 text-sm">
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.title}, {r.org}</div>
          </li>
        ))}
      </ul>
    </Card>
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
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={14} className="text-accent" />
        <div className="eyebrow">Pre-submit check</div>
      </div>
      <ul className="space-y-2 text-xs">
        {issues.map((i) => (
          <li key={i.text} className="flex items-start gap-2">
            {i.ok ? (
              <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle size={12} className="text-primary mt-0.5 shrink-0" />
            )}
            <span className={cn(i.ok ? "text-foreground" : "text-primary")}>{i.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-[10px] text-muted-foreground leading-relaxed">
        Hard-fails (word limits, file naming, anonymity violations) block submit until resolved.
      </div>
    </Card>
  );
}

function KitDock() {
  const [open, setOpen] = useState(true);
  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3 flex items-center justify-between border-b border-border"
      >
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-muted-foreground" />
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
    </Card>
  );
}

function Asset({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="px-2.5 py-2 hover:bg-muted flex items-center gap-2 rounded-md cursor-grab">
      <GripVertical size={11} className="text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <div className="text-foreground truncate">{label}</div>
        <div className="text-[10px] text-muted-foreground truncate">{detail}</div>
      </div>
    </li>
  );
}
