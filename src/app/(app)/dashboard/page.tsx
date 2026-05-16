"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/Shell";
import { StatusPill, TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { profileCompleteness } from "@/lib/seed";
import { currency, relativeDeadline, daysUntil } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { applications, opportunities, artist } = useStore();
  const completeness = profileCompleteness();
  const upcoming = [...applications]
    .map((a) => ({ a, o: opportunities.find((o) => o.id === a.opportunity_id)! }))
    .filter((p) => p.a.status !== "submitted" && p.a.status !== "awarded" && p.a.status !== "declined")
    .sort((x, y) => new Date(x.o.deadline).getTime() - new Date(y.o.deadline).getTime());

  const recommended = opportunities.filter((o) => !applications.find((a) => a.opportunity_id === o.id));

  return (
    <>
      <PageHeader
        eyebrow={`Welcome back, ${artist.public_name.split(" ")[0]}`}
        title="Your grant year, at a glance"
        subtitle="The next deadlines, what's in draft, what needs your attention. Everything below is ranked by what could disqualify your submission if you don't get to it."
      />

      <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-6">
        {/* Stats strip */}
        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Stat label="Open applications" value={String(applications.filter((a) => a.status === "drafting").length)} subtitle="In your workspace" />
          <Stat label="Next deadline" value={upcoming[0] ? relativeDeadline(upcoming[0].o.deadline) : "—"} subtitle={upcoming[0]?.o.program ?? "Nothing on deck"} />
          <Stat label="Kit completeness" value={`${completeness.pct}%`} subtitle={`${completeness.done} of ${completeness.total} sections`} />
          <Stat
            label="Total awarded in 2025–26"
            value={currency(8000)}
            subtitle="1 award · NYSCA/NYFA Fellowship"
            accent
          />
        </div>

        {/* Upcoming deadlines */}
        <section className="col-span-12 lg:col-span-8">
          <SectionHeader title="Upcoming deadlines" link="/applications" />
          <Card className="divide-y divide-border overflow-hidden">
            {upcoming.map(({ a, o }) => {
              const days = daysUntil(o.deadline);
              const urgent = days < 30;
              return (
                <Link
                  href={`/applications/${a.id}`}
                  key={a.id}
                  className="grid grid-cols-12 items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-muted transition-colors"
                >
                  <div className="col-span-2 sm:col-span-1 text-center">
                    <div className={`text-xl sm:text-2xl font-heading ${urgent ? "text-primary" : "text-foreground"}`}>{days}</div>
                    <div className="eyebrow text-[9px]">days</div>
                  </div>
                  <div className="col-span-10 sm:col-span-6">
                    <div className="font-heading text-[16px] sm:text-[17px] leading-tight">{o.program}</div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">{o.funder} · {o.geography}</div>
                    <div className="flex sm:hidden items-center gap-2 mt-2">
                      <TypePill type={o.type} />
                      <StatusPill status={a.status} />
                    </div>
                  </div>
                  <div className="hidden sm:block col-span-2 text-xs">
                    <TypePill type={o.type} />
                  </div>
                  <div className="hidden sm:block col-span-2 text-xs">
                    <StatusPill status={a.status} />
                  </div>
                  <div className="hidden sm:block col-span-1 text-right text-muted-foreground">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </Card>
        </section>

        {/* Right rail */}
        <aside className="col-span-12 lg:col-span-4 space-y-5 md:space-y-6">
          {/* Completeness */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">Kit completeness</div>
              <div className="font-heading text-2xl">{completeness.pct}%</div>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden mb-4">
              <div className="h-full bg-foreground" style={{ width: `${completeness.pct}%` }} />
            </div>
            <ul className="space-y-1.5 text-[12px]">
              {completeness.checks.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span className={`size-3 rounded-full ${c.done ? "bg-accent" : "bg-border"}`} />
                  <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="ghost" className="mt-4 w-full">
              <Link href="/kit">
                Edit kit <ArrowRight size={13} />
              </Link>
            </Button>
          </Card>

          {/* Voice mode */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-primary" />
              <div className="eyebrow">Voice-preserving mode</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drafts recombine your existing language before generating new prose. Per the Foundation
              for Contemporary Arts: <em>&ldquo;AI has a flattening effect on artist statements. FCA cares
              more about voice than perfect writing.&rdquo;</em>
            </p>
            <Link href="/settings" className="text-xs underline text-foreground mt-3 inline-block">Adjust drafting behavior</Link>
          </Card>

          {/* Pre-submit warnings */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-warn" />
              <div className="eyebrow">Needs your attention</div>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="text-foreground font-medium">Creative Capital — Impact & Audiences</span>
                <div className="text-muted-foreground mt-0.5">Section empty. 150-word limit; deadline in {daysUntil("2026-04-06") < 0 ? "—" : daysUntil("2026-04-06") + " days"}.</div>
              </li>
              <li>
                <span className="text-foreground font-medium">MacDowell — references</span>
                <div className="text-muted-foreground mt-0.5">Not required this cycle. Skipping.</div>
              </li>
              <li>
                <span className="text-foreground font-medium">FCA wait period</span>
                <div className="text-muted-foreground mt-0.5">No prior FCA award. Eligible.</div>
              </li>
            </ul>
          </Card>
        </aside>

        {/* Recommended */}
        <section className="col-span-12 mt-2 md:mt-4">
          <SectionHeader title="Recommended for you" subtitle="Filtered by your eligibility: NY State resident, US citizen, 25+, 9 years practice, not in a degree program." link="/opportunities" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {recommended.slice(0, 3).map((o) => (
              <Link href={`/opportunities/${o.id}`} key={o.id} className="block">
                <Card className="p-5 hover:bg-muted transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <TypePill type={o.type} />
                    <div className="eyebrow">{relativeDeadline(o.deadline)}</div>
                  </div>
                  <div className="font-heading text-lg leading-tight">{o.program}</div>
                  <div className="text-xs text-muted-foreground mt-1">{o.funder} · {o.geography}</div>
                  <div className="mt-4 text-xs text-foreground">{o.award}</div>
                  <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                    Match: <span className="text-accent">Eligible</span> · {o.sections.length} sections to write
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({ label, value, subtitle, accent }: { label: string; value: string; subtitle: string; accent?: boolean }) {
  return (
    <Card className="p-5">
      <div className="eyebrow mb-2">{label}</div>
      <div className={`font-heading text-3xl ${accent ? "text-primary" : "text-foreground"} leading-none`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-2">{subtitle}</div>
    </Card>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="font-heading text-xl">{title}</h2>
        {subtitle && <div className="text-xs text-muted-foreground mt-1 max-w-prose2">{subtitle}</div>}
      </div>
      {link && (
        <Link href={link} className="text-xs text-foreground underline">
          See all
        </Link>
      )}
    </div>
  );
}
