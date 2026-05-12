import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b rule">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="font-display text-2xl">Grant-Right</div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-muted hover:text-ink">Sign in</Link>
            <Link href="/sign-up" className="btn btn-primary">
              Start free <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <div className="eyebrow mb-5">A grant workspace for working artists</div>
        <h1 className="font-display text-6xl leading-[1.05] max-w-prose2">
          Stop re-typing your bio in fifty-word increments.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-prose2 leading-relaxed">
          Grant-Right is a workspace built around the way artists actually apply: a versioned
          kit of statements, CV, works, projects, and references — projected into each funder's
          prompts and limits by a Claude-powered draft that{" "}
          <span className="text-ink italic">amplifies your voice</span> instead of flattening it.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Link href="/dashboard" className="btn btn-primary">
            Enter the prototype <ArrowRight size={13} />
          </Link>
          <Link href="/sign-up" className="btn btn-ghost">Sign up</Link>
        </div>
        <div className="mt-4 text-xs text-muted">
          Prototype seeded with Mira Okonkwo, a fictional Brooklyn-based sculptor, applying to MacDowell, Creative Capital, NYSCA/NYFA, FCA Emergency, and Rijksakademie.
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24 grid grid-cols-3 gap-8">
        <Feature
          eyebrow="01 / The Kit"
          title="One profile, all the lengths"
          body="Statements in 50, 100, 250, 500-word variants. Bios in three lengths. CV entries as typed records, not a Word doc. Works with captions that render to each funder's metadata spec."
        />
        <Feature
          eyebrow="02 / Calibrated drafts"
          title="Voice in, draft out"
          body="Claude drafts each section from your kit, recombining your existing language first. Then tailors to the funder's prompt, length, type, and stated values. Diffable. Never blackbox."
        />
        <Feature
          eyebrow="03 / Submission discipline"
          title="No auto-disqualifications"
          body="Hard fails before submit: word counts, file naming, anonymity rules, eligibility flags, prior-award wait periods. Export PDF in the funder's exact format."
        />
      </section>

      <footer className="border-t rule">
        <div className="max-w-6xl mx-auto px-8 py-8 text-xs text-muted flex items-center justify-between">
          <div>© 2026 Grant-Right · A research prototype</div>
          <div>Grounded in: MacDowell · Creative Capital · NYFA · FCA · Rijksakademie</div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h3 className="font-display text-2xl leading-tight mb-3">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
