import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
          <div className="font-heading text-xl sm:text-2xl">Grant-Right</div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
            <Button asChild>
              <Link href="/sign-up">
                <span className="hidden sm:inline">Start free</span><span className="sm:hidden">Start</span> <ArrowRight size={13} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 sm:pt-24 pb-12 sm:pb-16">
        <div className="eyebrow mb-5">A grant workspace for working artists</div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-prose2">
          Stop re-typing your bio in fifty-word increments.
        </h1>
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-prose2 leading-relaxed">
          Grant-Right is a workspace built around the way artists actually apply: a versioned
          kit of statements, CV, works, projects, and references — projected into each funder's
          prompts and limits by a Claude-powered draft that{" "}
          <span className="text-foreground italic">amplifies your voice</span> instead of flattening it.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Button asChild>
            <Link href="/dashboard">
              Enter the prototype <ArrowRight size={13} />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Prototype seeded with Mira Okonkwo, a fictional Brooklyn-based sculptor, applying to MacDowell, Creative Capital, NYSCA/NYFA, FCA Emergency, and Rijksakademie.
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
      <h3 className="font-heading text-2xl leading-tight mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
    </div>
  );
}
