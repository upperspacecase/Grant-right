"use client";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/Shell";
import { StatusPill, TypePill } from "@/components/Pill";
import { useStore } from "@/lib/store";
import { profileCompleteness } from "@/lib/seed";
import { currency, formatDate, relativeDeadline, daysUntil, typeLabel } from "@/lib/format";

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

      <div className="px-8 py-8 grid grid-cols-12 gap-6">
        {/* Stats strip */}
        <div className="col-span-12 grid grid-cols-4 gap-4">
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
        <section className="col-span-8">
          <SectionHeader title="Upcoming deadlines" link="/applications" />
          <div className="paper-card divide-y rule">
            {upcoming.map(({ a, o }) => {
              const days = daysUntil(o.deadline);
              const urgent = days < 30;
              return (
                <Link
                  href={`/applications/${a.id}`}
                  key={a.id}
                  className="grid grid-cols-12 items-center gap-4 px-5 py-4 hover:bg-[#FBF8F1] transition-colors"
                >
                  <div className="col-span-1 text-center">
                    <div className={`text-2xl font-display ${urgent ? "text-accent" : "text-ink"}`}>{days}</div>
                    <div className="eyebrow text-[9px]">days</div>
                  </div>
                  <div className="col-span-6">
                    <div className="font-display text-[17px] leading-tight">{o.program}</div>
                    <div className="text-xs text-muted mt-1">{o.funder} · {o.geography}</div>
                  </div>
                  <div className="col-span-2 text-xs">
                    <TypePill type={o.type} />
                  </div>
                  <div className="col-span-2 text-xs">
                    <StatusPill status={a.status} />
                  </div>
                  <div className="col-span-1 text-right text-muted">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Right rail */}
        <aside className="col-span-4 space-y-6">
          {/* Completeness */}
          <div className="paper-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">Kit completeness</div>
              <div className="font-display text-2xl">{completeness.pct}%</div>
            </div>
            <div className="h-1.5 bg-rule rounded-full overflow-hidden mb-4">
              <div className="h-full bg-ink" style={{ width: `${completeness.pct}%` }} />
            </div>
            <ul className="space-y-1.5 text-[12px]">
              {completeness.checks.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span className={`size-3 rounded-full ${c.done ? "bg-sage" : "bg-rule"}`} />
                  <span className={c.done ? "text-ink" : "text-muted"}>{c.label}</span>
                </li>
              ))}
            </ul>
            <Link href="/kit" className="btn btn-ghost mt-4 w-full justify-center">
              Edit kit <ArrowRight size={13} />
            </Link>
          </div>

          {/* Voice mode */}
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-accent" />
              <div className="eyebrow">Voice-preserving mode</div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Drafts recombine your existing language before generating new prose. Per the Foundation
              for Contemporary Arts: <em>"AI has a flattening effect on artist statements. FCA cares
              more about voice than perfect writing."</em>
            </p>
            <Link href="/settings" className="text-xs underline text-ink mt-3 inline-block">Adjust drafting behavior</Link>
          </div>

          {/* Pre-submit warnings */}
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-warn" />
              <div className="eyebrow">Needs your attention</div>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="text-ink font-medium">Creative Capital — Impact & Audiences</span>
                <div className="text-muted mt-0.5">Section empty. 150-word limit; deadline in {daysUntil("2026-04-06") < 0 ? "—" : daysUntil("2026-04-06") + " days"}.</div>
              </li>
              <li>
                <span className="text-ink font-medium">MacDowell — references</span>
                <div className="text-muted mt-0.5">Not required this cycle. Skipping.</div>
              </li>
              <li>
                <span className="text-ink font-medium">FCA wait period</span>
                <div className="text-muted mt-0.5">No prior FCA award. Eligible.</div>
              </li>
            </ul>
          </div>
        </aside>

        {/* Recommended */}
        <section className="col-span-12 mt-4">
          <SectionHeader title="Recommended for you" subtitle="Filtered by your eligibility: NY State resident, US citizen, 25+, 9 years practice, not in a degree program." link="/opportunities" />
          <div className="grid grid-cols-3 gap-4">
            {recommended.slice(0, 3).map((o) => (
              <Link href={`/opportunities/${o.id}`} key={o.id} className="paper-card p-5 hover:bg-[#FBF8F1] transition-colors block">
                <div className="flex items-start justify-between mb-3">
                  <TypePill type={o.type} />
                  <div className="eyebrow">{relativeDeadline(o.deadline)}</div>
                </div>
                <div className="font-display text-lg leading-tight">{o.program}</div>
                <div className="text-xs text-muted mt-1">{o.funder} · {o.geography}</div>
                <div className="mt-4 text-xs text-ink">{o.award}</div>
                <div className="mt-3 text-xs text-muted flex items-center gap-1">
                  Match: <span className="text-sage">Eligible</span> · {o.sections.length} sections to write
                </div>
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
    <div className="paper-card p-5">
      <div className="eyebrow mb-2">{label}</div>
      <div className={`font-display text-3xl ${accent ? "text-accent" : "text-ink"} leading-none`}>{value}</div>
      <div className="text-xs text-muted mt-2">{subtitle}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="font-display text-xl">{title}</h2>
        {subtitle && <div className="text-xs text-muted mt-1 max-w-prose2">{subtitle}</div>}
      </div>
      {link && (
        <Link href={link} className="text-xs text-ink underline">
          See all
        </Link>
      )}
    </div>
  );
}
