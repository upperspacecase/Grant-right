"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Upload, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = [
  { key: "identity", label: "Identity & eligibility" },
  { key: "disciplines", label: "Disciplines" },
  { key: "import", label: "Import your materials" },
  { key: "first_statement", label: "Your first statement" }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  return (
    <div className="min-h-screen bg-paper text-ink flex">
      <aside className="w-72 shrink-0 border-r rule bg-[#FBF8F1] p-8">
        <Link href="/" className="block font-display text-2xl mb-1">Grant-Right</Link>
        <div className="eyebrow mb-8">Set up your kit</div>
        <ol className="space-y-1">
          {steps.map((s, i) => (
            <li
              key={s.key}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-[13px]",
                i === step ? "bg-ink text-paper" : "text-muted"
              )}
            >
              <span
                className={cn(
                  "size-5 rounded-full border flex items-center justify-center text-[10px]",
                  i < step
                    ? "bg-sage text-paper border-sage"
                    : i === step
                    ? "border-paper text-paper"
                    : "border-rule"
                )}
              >
                {i < step ? <Check size={11} /> : i + 1}
              </span>
              {s.label}
            </li>
          ))}
        </ol>
        <div className="mt-12 text-xs text-muted leading-relaxed">
          Setup takes ~10 minutes. You can edit anything later in <Link href="/kit" className="underline">The Kit</Link>.
        </div>
      </aside>

      <main className="flex-1 px-16 py-12 max-w-3xl">
        {step === 0 && <Identity onNext={() => setStep(1)} />}
        {step === 1 && <Disciplines onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Imports onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <FirstStatement onBack={() => setStep(2)} />}
      </main>
    </div>
  );
}

function StepHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="font-display text-3xl leading-tight mb-3">{title}</h2>
      <p className="text-muted text-[15px] max-w-prose2 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Footer({ onNext, onBack, nextLabel = "Continue" }: { onNext?: () => void; onBack?: () => void; nextLabel?: string }) {
  return (
    <div className="flex items-center justify-between border-t rule pt-6 mt-10">
      {onBack ? (
        <button onClick={onBack} className="btn btn-ghost">
          <ArrowLeft size={13} /> Back
        </button>
      ) : (
        <div />
      )}
      {onNext ? (
        <button onClick={onNext} className="btn btn-primary">
          {nextLabel} <ArrowRight size={13} />
        </button>
      ) : (
        <Link href="/dashboard" className="btn btn-primary">
          Enter Grant-Right <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

function Identity({ onNext }: { onNext: () => void }) {
  return (
    <>
      <StepHeader
        eyebrow="Step 1 of 4"
        title="The boring parts that disqualify applications"
        subtitle="Almost half of artist grants reject applications on eligibility before any reviewer reads the proposal. We capture these once and use them to pre-filter opportunities and to fail the pre-submit check before you submit."
      />
      <div className="grid grid-cols-2 gap-5">
        <Field label="Public name" defaultValue="Mira Okonkwo" />
        <Field label="Pronouns" defaultValue="she/her" />
        <Field label="Year of birth" defaultValue="1989" />
        <Field label="Citizenship" defaultValue="US Citizen" />
        <Field label="State of residence" defaultValue="NY" />
        <Field label="Years at this address" defaultValue="6" />
        <Field label="Tax ID type" defaultValue="SSN" />
        <Field label="Years of professional practice" defaultValue="9" />
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1" defaultChecked={false} />
        <span>
          I am currently enrolled in a degree program.{" "}
          <span className="text-muted text-xs">
            Many fellowships (NYFA, Jerome, Creative Capital) disqualify enrolled students.
          </span>
        </span>
      </label>
      <Footer onNext={onNext} />
    </>
  );
}

function Disciplines({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const tags = ["post-industrial", "salvage", "ecological mourning", "steel", "textile", "Rust Belt", "fieldwork"];
  return (
    <>
      <StepHeader
        eyebrow="Step 2 of 4"
        title="What kind of work do you make?"
        subtitle="Used to match opportunities you actually qualify for (NYFA, for instance, splits visual fellowships by discipline) and to angle drafts at each funder's emphasis."
      />
      <div className="space-y-5">
        <Field label="Primary discipline" defaultValue="Sculpture" />
        <div>
          <div className="field-label">Secondary disciplines</div>
          <div className="flex flex-wrap gap-2">
            <span className="chip chip-ink">Installation</span>
            <span className="chip chip-ink">Video</span>
            <button className="chip">+ Add</button>
          </div>
        </div>
        <div>
          <div className="field-label">Keywords your practice keeps returning to</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
            <button className="chip">+ Add</button>
          </div>
          <div className="mt-2 text-xs text-muted">Used by AI drafts to recombine your existing language before generating new prose.</div>
        </div>
      </div>
      <Footer onNext={onNext} onBack={onBack} />
    </>
  );
}

function Imports({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <>
      <StepHeader
        eyebrow="Step 3 of 4"
        title="Pull in what you already have"
        subtitle="Most artists keep their CV in a Word doc, work samples in a Drive folder, and a statement saved as v_FINAL_FINAL.docx. We import from there. Skip any source you don't use."
      />
      <div className="grid grid-cols-2 gap-4">
        <ImportCard
          title="Are.na"
          subtitle="OAuth connect. We pull your channels as draft Works and Projects."
          status="recommended"
        />
        <ImportCard
          title="Artwork Archive"
          subtitle="CSV import of inventory + CV. Best for visual artists already tracking sales."
          status=""
        />
        <ImportCard
          title="Behance / Adobe Portfolio"
          subtitle="OAuth. Pulls case studies + cover images."
          status=""
        />
        <ImportCard
          title="Portfolio URL"
          subtitle="Paste your site. Claude proposes Work entries; you confirm or reject."
          status=""
        />
        <ImportCard
          title="CV (PDF)"
          subtitle="Upload your CV. Claude extracts structured entries you can edit."
          status="recommended"
          icon="upload"
        />
        <ImportCard
          title="Skip — start blank"
          subtitle="Fill in everything yourself. Slowest, most accurate."
          status=""
          icon="skip"
        />
      </div>
      <Footer onNext={onNext} onBack={onBack} nextLabel="Continue" />
    </>
  );
}

function ImportCard({
  title,
  subtitle,
  status,
  icon = "link"
}: {
  title: string;
  subtitle: string;
  status: string;
  icon?: "link" | "upload" | "skip";
}) {
  const Icon = icon === "upload" ? Upload : LinkIcon;
  return (
    <button className="paper-card p-5 text-left hover:bg-[#FBF8F1] transition-colors">
      <div className="flex items-start justify-between mb-2">
        <Icon size={16} className="text-muted" strokeWidth={1.6} />
        {status && <span className="chip chip-sage">Recommended</span>}
      </div>
      <div className="font-display text-lg">{title}</div>
      <div className="text-xs text-muted mt-1 leading-relaxed">{subtitle}</div>
    </button>
  );
}

function FirstStatement({ onBack }: { onBack: () => void }) {
  return (
    <>
      <StepHeader
        eyebrow="Step 4 of 4"
        title="Your first artist statement"
        subtitle="Write one paragraph in your own words, no editing for length. We'll auto-generate 50 / 100 / 250 / 500-word variants you can edit. This is the cached prefix every future AI draft will use — voice in, voice out."
      />
      <div>
        <div className="field-label">A paragraph about your practice, in your own words</div>
        <textarea
          className="textarea min-h-48"
          defaultValue="I make sculptures and room-scale installations from materials sourced inside closed steel mills and textile plants across western Pennsylvania and the Ohio Valley. I work with rolling-mill remnants, fabric scraps from defunct cotton mills, and conveyor pulls — restitched, riveted, hung — into figures that refuse the tidy narrative of the post-industrial. The pieces are part archive, part body. They sit between mourning and refusal: the landscape didn't die, it was unmade, and the materials still have a position on the matter."
        />
        <div className="mt-2 text-xs text-muted">
          Tip: include concrete materials, places, names. The drafting AI is instructed to reuse your phrases before inventing new ones.
        </div>
      </div>
      <Footer onBack={onBack} nextLabel="Finish & enter Grant-Right" />
    </>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <input className="input" defaultValue={defaultValue} />
    </div>
  );
}
