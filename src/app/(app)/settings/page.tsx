"use client";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { Check, Sparkles, AlertTriangle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export default function SettingsPage() {
  const [voice, setVoice] = useState<"strict" | "balanced" | "loose">("balanced");
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="How Grant-Right behaves"
        subtitle="Drafting behavior, integrations, billing. The defaults are the recommended settings for working artists."
      />
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-4xl space-y-6 sm:space-y-8">
        <Section title="Drafting behavior" subtitle="The trade-off is between faithful-to-your-voice and willing-to-rewrite. Default is balanced.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { key: "strict", label: "Strict — recombine only", desc: "Pure extractive: every clause is from your kit. Slowest, most faithful." },
              { key: "balanced", label: "Balanced — two-pass (Recommended)", desc: "Pass 1 recombines your language. Pass 2 tailors with new prose only where the prompt requires it." },
              { key: "loose", label: "Loose — full rewrite", desc: "Claude rewrites freely from your kit as raw material. Fastest, most likely to flatten voice." }
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setVoice(opt.key as any)}
                className={cn(
                  "paper-card p-4 text-left",
                  voice === opt.key && "outline outline-2 outline-ink"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display text-base">{opt.label}</div>
                  {voice === opt.key && <Check size={14} className="text-sage" />}
                </div>
                <div className="text-xs text-muted leading-relaxed">{opt.desc}</div>
              </button>
            ))}
          </div>
          <div className="paper-card p-4 mt-4 flex gap-3 text-xs">
            <AlertTriangle size={14} className="text-warn shrink-0 mt-0.5" />
            <div className="text-muted leading-relaxed">
              <strong className="text-ink">FCA's warning, in their own words:</strong> "AI has a flattening effect on artist
              statements and project narratives… FCA cares more about voice than perfect writing." If you're applying
              for an FCA Emergency Grant, default to <strong className="text-ink">Strict</strong>.
            </div>
          </div>
        </Section>

        <Section title="Self-check rules" subtitle="Before any draft is shown to you, Claude runs these checks. Disable any rule that doesn't fit your voice.">
          <ul className="paper-card divide-y rule">
            <Rule label="No banned verbs" detail="explores · investigates · interrogates · examines · juxtaposes" defaultOn />
            <Rule label="No International Art English (IAE) jargon" detail="Long sentences with imprecise nouns; lyrical fog" defaultOn />
            <Rule label="No false range" detail="'ranges from X to Y to Z' when you simply make those things" defaultOn />
            <Rule label="No aspirational hedges" detail="hopes to · seeks to · would like to · aims to" defaultOn />
            <Rule label="No claims the work sample doesn't visibly support" detail="Assertions of complexity reviewers can't see" defaultOn />
            <Rule label="Active voice, first person" detail="'I will photograph the 14 sawmills…' not 'It is hoped that…'" defaultOn />
            <Rule label="Strip name in anonymous sections" detail="For NYFA-style first-round-anonymous reviews" defaultOn />
            <Rule label="Budget lines and narrative must reconcile" detail="Project grants only" defaultOn />
          </ul>
        </Section>

        <Section title="Integrations" subtitle="V2 work. Each integration is independent and optional.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Integration name="Are.na" status="planned" desc="OAuth · import channels as Works and Projects" />
            <Integration name="Artwork Archive" status="planned" desc="CSV import · CV + inventory" />
            <Integration name="Behance / Adobe Portfolio" status="planned" desc="OAuth · case studies as Works" />
            <Integration name="Submittable" status="planned" desc="Two-way API · saved fields + (V2) direct submit" />
            <Integration name="SlideRoom" status="planned" desc="OAuth · direct submit to MacDowell / Yaddo / MFAs" />
            <Integration name="Google Calendar" status="planned" desc="Deadlines + reference notification reminders" />
          </div>
        </Section>

        <Section title="Claude key" subtitle="Use the platform-hosted key (recommended; counts toward your plan), or bring your own Anthropic API key.">
          <div className="paper-card p-5">
            <label className="flex items-start gap-3 mb-4">
              <input type="radio" name="key" defaultChecked className="mt-1" />
              <div>
                <div className="text-sm font-medium">Use Grant-Right's hosted Claude</div>
                <div className="text-xs text-muted">Recommended. 50 drafts/month on the artist plan. Prompt-cached on your kit so each draft costs cents.</div>
              </div>
            </label>
            <label className="flex items-start gap-3">
              <input type="radio" name="key" className="mt-1" />
              <div className="w-full">
                <div className="text-sm font-medium">Bring your own Anthropic API key</div>
                <div className="text-xs text-muted mb-2">Paid directly to Anthropic at API rates.</div>
                <input className="input max-w-md" placeholder="sk-ant-…" type="password" />
              </div>
            </label>
          </div>
        </Section>

        <Section title="Account" subtitle="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
            <Field label="Email" defaultValue="studio@miraokonkwo.com" />
            <Field label="Password" defaultValue="" placeholder="Set a new password" />
            <Field label="Default discipline filter on Opportunities" defaultValue="Visual arts / sculpture / installation" />
            <Field label="Time zone" defaultValue="America/New_York" />
          </div>
          <button className="btn btn-ghost text-xs mt-4 text-accent">Delete account and kit</button>
        </Section>
      </div>
    </>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="font-display text-2xl">{title}</h3>
        {subtitle && <div className="text-sm text-muted mt-1 max-w-prose2">{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function Rule({ label, detail, defaultOn }: { label: string; detail: string; defaultOn?: boolean }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <input type="checkbox" defaultChecked={defaultOn} className="shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm">{label}</div>
        <div className="text-[11px] text-muted truncate">{detail}</div>
      </div>
    </li>
  );
}

function Integration({ name, status, desc }: { name: string; status: string; desc: string }) {
  return (
    <div className="paper-card p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium">{name}</div>
        <span className="chip">{status}</span>
      </div>
      <div className="text-xs text-muted">{desc}</div>
      <button className="text-xs text-muted underline mt-3 hover:text-ink">View V2 plan <ExternalLink size={10} className="inline" /></button>
    </div>
  );
}

function Field({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <input className="input" defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}
