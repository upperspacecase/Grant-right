"use client";
import { useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/Shell";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { Plus, ExternalLink, Edit3, Pencil } from "lucide-react";
import type { CVEntryType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TabKey =
  | "identity"
  | "disciplines"
  | "statements"
  | "cv"
  | "works"
  | "projects"
  | "references"
  | "budgets";

const tabs: { key: TabKey; label: string; desc: string }[] = [
  { key: "identity", label: "Identity & eligibility", desc: "Contact, citizenship, residency, eligibility flags." },
  { key: "disciplines", label: "Disciplines", desc: "Primary, secondary, keywords your practice returns to." },
  { key: "statements", label: "Statements & bios", desc: "Versioned by length and angle. The cached prefix for every draft." },
  { key: "cv", label: "CV", desc: "Typed entries that render to any funder's CV format." },
  { key: "works", label: "Works", desc: "Each with metadata, captions, and image variants." },
  { key: "projects", label: "Projects", desc: "Reusable project descriptions in three lengths." },
  { key: "references", label: "References", desc: "Names, relationships, and last-used dates." },
  { key: "budgets", label: "Budget templates", desc: "Project budgets you reuse across applications." }
];

export default function KitPage() {
  const [tab, setTab] = useState<TabKey>("statements");

  return (
    <>
      <PageHeader
        eyebrow="The Kit"
        title="One profile. Every application."
        subtitle="This is the source of truth for every draft. Edit anything here once and it propagates to every application that uses it. Voice in, voice out."
      />
      {/* Mobile: horizontal tab strip */}
      <div className="md:hidden border-b border-border overflow-x-auto scrollbar-thin">
        <nav className="flex gap-1 px-4 py-3 min-w-max">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-3 py-2 rounded-md text-[12px] whitespace-nowrap",
                tab === t.key ? "bg-foreground text-background" : "text-foreground/80 hover:bg-sand-light"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex">
        <aside className="hidden md:block w-72 shrink-0 border-r border-border p-6 sticky top-0 self-start">
          <div className="eyebrow mb-3">Sections</div>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "block w-full text-left px-3 py-2.5 rounded-md text-[13px]",
                  tab === t.key ? "bg-foreground text-background" : "text-foreground/80 hover:bg-sand-light"
                )}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0 px-4 sm:px-6 md:px-10 py-6 md:py-10">
          {tab === "identity" && <IdentityTab />}
          {tab === "disciplines" && <DisciplinesTab />}
          {tab === "statements" && <StatementsTab />}
          {tab === "cv" && <CVTab />}
          {tab === "works" && <WorksTab />}
          {tab === "projects" && <ProjectsTab />}
          {tab === "references" && <ReferencesTab />}
          {tab === "budgets" && <BudgetsTab />}
        </div>
      </div>
    </>
  );
}

function TabHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 md:mb-8">
      <div className="min-w-0">
        <h2 className="font-heading text-2xl sm:text-3xl leading-tight">{title}</h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-prose2 leading-relaxed">{subtitle}</p>
      </div>
      {action && <div className="flex gap-2 flex-wrap shrink-0">{action}</div>}
    </div>
  );
}

function IdentityTab() {
  const { artist } = useStore();
  return (
    <>
      <TabHeader title="Identity & eligibility" subtitle="Captured once, used by every opportunity's eligibility check and pre-submit validation." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl">
        <Field label="Legal name" defaultValue={artist.legal_name} />
        <Field label="Public name" defaultValue={artist.public_name} />
        <Field label="Pronouns" defaultValue={artist.pronouns} />
        <Field label="Email" defaultValue={artist.email} />
        <Field label="City" defaultValue={artist.city} />
        <Field label="State" defaultValue={artist.state} />
        <Field label="Country" defaultValue={artist.country} />
        <Field label="Citizenship" defaultValue={artist.citizenship} />
        <Field label="Year of birth" defaultValue={String(artist.year_of_birth)} />
        <Field label="Years of practice" defaultValue={String(artist.years_practicing)} />
        <Field label="Tax ID type" defaultValue={artist.tax_id_type} />
        <Field label="Enrolled in degree program?" defaultValue={artist.in_degree_program ? "Yes" : "No"} />
      </div>
      <Card className="mt-8 p-5 max-w-3xl">
        <div className="eyebrow mb-2">Eligibility flags in use</div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>· NYFA Fellowship: NY State ≥2 yrs consecutive — <span className="text-accent">eligible</span></li>
          <li>· Creative Capital: US citizen + 25+ + 5+ yrs practice + not in degree program — <span className="text-accent">eligible</span></li>
          <li>· FCA Emergency Grant: US Tax ID + not in degree program + 36 months since prior FCA — <span className="text-accent">eligible (no prior FCA)</span></li>
          <li>· Jerome Hill Artist Fellowship: MN or NYC resident + 2–10 yrs generative practice — <span className="text-warn">borderline (9 yrs is in range; address verifies)</span></li>
        </ul>
      </Card>
    </>
  );
}

function DisciplinesTab() {
  const { artist } = useStore();
  return (
    <>
      <TabHeader title="Disciplines" subtitle="Used to filter opportunities and angle drafts. NYFA splits visual fellowships by sub-discipline; this is how we route." />
      <div className="space-y-6 max-w-3xl">
        <Field label="Primary" defaultValue={artist.disciplines.primary} />
        <div>
          <div className="field-label">Secondary</div>
          <div className="flex flex-wrap gap-2">
            {artist.disciplines.secondary.map((s) => (
              <Badge key={s} variant="ink">{s}</Badge>
            ))}
            <button type="button"><Badge>+ Add</Badge></button>
          </div>
        </div>
        <div>
          <div className="field-label">Keywords</div>
          <div className="flex flex-wrap gap-2">
            {artist.disciplines.keywords.map((k) => (
              <Badge key={k}>{k}</Badge>
            ))}
            <button type="button"><Badge>+ Add</Badge></button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatementsTab() {
  const { statements, updateStatement } = useStore();
  const [editing, setEditing] = useState<string | null>(null);

  const groups: { kind: "artist_statement" | "bio"; label: string }[] = [
    { kind: "artist_statement", label: "Artist statement" },
    { kind: "bio", label: "Biography" }
  ];

  return (
    <>
      <TabHeader
        title="Statements & bios"
        subtitle="Authored once at each length the field actually asks for. Edit the body; the AI uses these verbatim wherever they fit, and only generates new prose for length gaps."
        action={
          <Button variant="ghost">
            <Plus size={13} /> New variant
          </Button>
        }
      />
      <div className="space-y-10 max-w-4xl">
        {groups.map((g) => {
          const items = statements.filter((s) => s.kind === g.kind);
          return (
            <section key={g.kind}>
              <div className="flex items-end justify-between mb-3">
                <h3 className="font-heading text-xl">{g.label}</h3>
                <div className="eyebrow">{items.length} variants</div>
              </div>
              <div className="space-y-4">
                {items.map((s) => (
                  <Card key={s.id} className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="ink">{s.length_bucket}w</Badge>
                        <Badge>{s.angle}</Badge>
                        <span className="text-xs text-muted-foreground">Updated {s.updated_at}</span>
                      </div>
                      <button onClick={() => setEditing(editing === s.id ? null : s.id)} className="text-muted-foreground hover:text-foreground">
                        {editing === s.id ? <Edit3 size={14} /> : <Pencil size={14} />}
                      </button>
                    </div>
                    {editing === s.id ? (
                      <Textarea
                        className="min-h-32"
                        defaultValue={s.body}
                        onBlur={(e) => {
                          updateStatement(s.id, e.target.value);
                          setEditing(null);
                        }}
                      />
                    ) : (
                      <p className="text-[17px] leading-relaxed text-foreground whitespace-pre-line">{s.body}</p>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function CVTab() {
  const { cv } = useStore();
  const groups: { type: CVEntryType; label: string }[] = [
    { type: "education", label: "Education" },
    { type: "exhibition_solo", label: "Solo Exhibitions" },
    { type: "exhibition_group", label: "Group Exhibitions" },
    { type: "residency", label: "Residencies & Fellowships" },
    { type: "grant", label: "Grants & Awards" },
    { type: "press", label: "Selected Press" },
    { type: "talk", label: "Lectures & Panels" },
    { type: "teaching", label: "Teaching" },
    { type: "collection", label: "Collections" }
  ];
  return (
    <>
      <TabHeader
        title="CV"
        subtitle="Typed entries — not a Word doc. Renders to any funder's CV format (page limits, anonymous variants, residency-specific filters)."
        action={
          <div className="flex gap-2">
            <Button variant="ghost"><ExternalLink size={13} /> Export PDF</Button>
            <Button><Plus size={13} /> Add entry</Button>
          </div>
        }
      />
      <div className="space-y-8 max-w-3xl">
        {groups.map((g) => {
          const items = cv.filter((c) => c.type === g.type);
          if (!items.length) return null;
          return (
            <section key={g.type}>
              <div className="eyebrow mb-3">{g.label}</div>
              <ul className="border-t border-border">
                {items.map((c) => (
                  <li key={c.id} className="grid grid-cols-12 gap-4 py-3 border-b border-border items-baseline">
                    <div className="col-span-1 text-xs text-muted-foreground">{c.date}</div>
                    <div className="col-span-7">
                      <span className="italic">{c.title}</span>
                      {c.org && <span className="text-muted-foreground">, {c.org}</span>}
                    </div>
                    <div className="col-span-3 text-xs text-muted-foreground">{c.location ?? ""}</div>
                    <div className="col-span-1 text-right">
                      <button className="text-muted-foreground hover:text-foreground"><Pencil size={12} /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

function WorksTab() {
  const { works } = useStore();
  return (
    <>
      <TabHeader
        title="Works"
        subtitle="Every work captured once with full metadata. We auto-render each funder's required caption format (NYFA's title/date/materials/dimensions, Berlinale's PDF context, MacDowell's per-discipline list)."
        action={<Button><Plus size={13} /> Add work</Button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl">
        {works.map((w) => (
          <Card key={w.id} className="overflow-hidden group">
            <div className="aspect-[4/3] bg-sand-light relative overflow-hidden">
              <Image src={w.image} alt={w.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <div className="font-heading text-lg italic leading-tight">{w.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{w.year} · {w.medium}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{w.dimensions}</div>
              <div className="mt-3 text-[11px] text-foreground/80 line-clamp-2">{w.materials}</div>
              <div className="mt-3 flex flex-wrap gap-1">
                {w.tags.slice(0, 3).map((t) => (
                  <Badge key={t} className="text-[9px]">{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ProjectsTab() {
  const { projects } = useStore();
  return (
    <>
      <TabHeader
        title="Projects"
        subtitle="Reusable project containers — logline, 500-word version, 1,500-word version. Pulled into applications and tailored by the AI to each funder's prompt."
        action={<Button><Plus size={13} /> New project</Button>}
      />
      <div className="space-y-6 max-w-4xl">
        {projects.map((p) => (
          <Card key={p.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{p.status.replace("_", " ")}</Badge>
                  {p.themes.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h3 className="font-heading text-2xl leading-tight">{p.title}</h3>
              </div>
              <button className="text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <Variant label="Logline" body={p.logline} />
              <Variant label="500 words" body={p.summary_500} />
              <Variant label="1,500 words" body={p.summary_1500 || "—"} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Variant({ label, body }: { label: string; body: string }) {
  return (
    <div className="border border-border rounded-md p-3 bg-muted/40">
      <div className="eyebrow mb-2">{label}</div>
      <p className="text-[13px] leading-snug text-foreground/90 line-clamp-6">{body}</p>
    </div>
  );
}

function ReferencesTab() {
  const { references } = useStore();
  return (
    <>
      <TabHeader
        title="References"
        subtitle="Names, relationships, last-used dates. The app warns you before you ask the same person twice in a quarter."
        action={<Button><Plus size={13} /> Add reference</Button>}
      />
      <ul className="border-t border-border max-w-3xl">
        {references.map((r) => (
          <li key={r.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
            <div className="col-span-4">
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.title}, {r.org}</div>
            </div>
            <div className="col-span-5 text-sm text-muted-foreground leading-snug">{r.relationship}</div>
            <div className="col-span-2 text-xs text-muted-foreground self-center">{r.last_used ? `Last used ${r.last_used}` : "Not used yet"}</div>
            <div className="col-span-1 text-right self-center">
              <button className="text-muted-foreground hover:text-foreground"><Pencil size={13} /></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function BudgetsTab() {
  const { budgetTemplates } = useStore();
  return (
    <>
      <TabHeader
        title="Budget templates"
        subtitle="Reusable project budgets, with Confirmed / Pending / To Raise status on every line (Creative Capital's format). AI uses these to draft budget narratives where line items must map to project activities."
        action={<Button><Plus size={13} /> New template</Button>}
      />
      <div className="space-y-6 max-w-4xl">
        {budgetTemplates.map((t) => (
          <Card key={t.id} className="p-6">
            <div className="flex items-end justify-between mb-4">
              <h3 className="font-heading text-xl">{t.name}</h3>
              <div className="eyebrow">{t.lines.length} lines · total ${t.lines.reduce((s, l) => s + l.amount, 0).toLocaleString()}</div>
            </div>
            <ul className="border-t border-border">
              {t.lines.map((l, i) => {
                const variant: "default" | "accent" | "warn" | "primary" =
                  l.status === "confirmed"
                    ? "accent"
                    : l.status === "pending"
                    ? "warn"
                    : l.status === "to_raise"
                    ? "primary"
                    : "default";
                return (
                  <li key={i} className="grid grid-cols-12 gap-3 py-2 border-b border-border items-center text-sm">
                    <div className="col-span-3 text-xs text-muted-foreground">{l.category}</div>
                    <div className="col-span-6">{l.description}</div>
                    <div className="col-span-1 text-xs">
                      <Badge variant={variant} className="text-[9px]">{l.status?.replace("_", " ")}</Badge>
                    </div>
                    <div className="col-span-2 text-right font-mono">${l.amount.toLocaleString()}</div>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <Input defaultValue={defaultValue} />
    </div>
  );
}
