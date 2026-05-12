"use client";
import { useState } from "react";
import {
  Sparkles,
  RefreshCcw,
  History,
  Wand2,
  CheckCircle2,
  AlertTriangle,
  X
} from "lucide-react";
import { cn } from "@/lib/cn";
import { countWords, countChars } from "@/lib/format";
import type { ApplicationSection, SectionSpec } from "@/lib/types";

interface Props {
  spec: SectionSpec;
  section: ApplicationSection;
  onChange: (content: string) => void;
  mockDraft: string;
  values: string[];
  anonymous?: boolean;
}

export function SectionEditor({ spec, section, onChange, mockDraft, values, anonymous }: Props) {
  const [mode, setMode] = useState<"edit" | "draft" | "history">("edit");
  const [feedback, setFeedback] = useState("");
  const [draftStreaming, setDraftStreaming] = useState(false);

  const measured = spec.limit_unit === "words" ? countWords(section.content) : countChars(section.content);
  const overLimit = measured > spec.limit_value;
  const nearLimit = !overLimit && measured > spec.limit_value * 0.9;
  const pct = Math.min(100, Math.round((measured / spec.limit_value) * 100));

  function runDraft() {
    setMode("draft");
    setDraftStreaming(true);
    setTimeout(() => setDraftStreaming(false), 600);
  }

  function acceptDraft() {
    onChange(mockDraft);
    setMode("edit");
  }

  return (
    <div className="paper-card">
      <div className="px-5 pt-4 pb-3 border-b rule">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="eyebrow">{spec.key.replace(/_/g, " ")}</span>
              {spec.required && <span className="chip chip-warn">Required</span>}
              {anonymous && <span className="chip chip-accent">Anonymous review</span>}
            </div>
            <p className="font-serif text-[15px] leading-relaxed text-ink/90 max-w-prose2">{spec.prompt}</p>
            {spec.notes && (
              <p className="text-xs text-muted italic mt-1.5 max-w-prose2">{spec.notes}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className={cn(
              "font-mono text-sm",
              overLimit && "text-accent",
              nearLimit && "text-warn"
            )}>
              {measured}<span className="text-muted">/{spec.limit_value}</span>
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wider">{spec.limit_unit}</div>
            <div className="mt-1 h-1 w-24 bg-rule rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all",
                  overLimit ? "bg-accent" : nearLimit ? "bg-warn" : "bg-sage"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 px-5 pt-3 border-b rule pb-3">
        <button
          onClick={runDraft}
          className="btn btn-accent text-xs"
        >
          <Sparkles size={12} /> {section.content ? "Regenerate draft" : "Draft from kit"}
        </button>
        <div className="flex-1" />
        {section.versions.length > 0 && (
          <button onClick={() => setMode(mode === "history" ? "edit" : "history")} className="btn btn-ghost text-xs">
            <History size={12} /> {section.versions.length} versions
          </button>
        )}
        <button className="btn btn-ghost text-xs">
          <Wand2 size={12} /> Trim to limit
        </button>
      </div>

      {mode === "edit" && (
        <textarea
          className="textarea border-0 min-h-44 px-5 py-4 focus:shadow-none focus:outline-none"
          style={{ borderRadius: 0 }}
          value={section.content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Empty — click Draft from kit to generate, or write directly."
        />
      )}

      {mode === "draft" && (
        <div className="px-5 py-4">
          <DraftPanel
            content={mockDraft}
            streaming={draftStreaming}
            values={values}
            anonymous={anonymous}
            onAccept={acceptDraft}
            onCancel={() => setMode("edit")}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </div>
      )}

      {mode === "history" && (
        <div className="px-5 py-4 space-y-3">
          {section.versions.map((v) => (
            <div key={v.id} className="paper-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="eyebrow">{v.label}</div>
                <div className="text-xs text-muted">{v.created_at}</div>
              </div>
              <p className="font-serif text-[14px] leading-relaxed text-muted">{v.content}</p>
              <div className="mt-3 flex justify-end">
                <button className="btn btn-ghost text-xs">Restore</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-5 py-3 border-t rule flex items-center gap-3 text-xs text-muted">
        {overLimit ? (
          <>
            <AlertTriangle size={13} className="text-accent" />
            <span>{measured - spec.limit_value} {spec.limit_unit} over limit. Most funders auto-truncate. Trim before submit.</span>
          </>
        ) : nearLimit ? (
          <>
            <AlertTriangle size={13} className="text-warn" />
            <span>Approaching limit. {spec.limit_value - measured} {spec.limit_unit} of headroom.</span>
          </>
        ) : section.content ? (
          <>
            <CheckCircle2 size={13} className="text-sage" />
            <span>Within limit. Last edited {section.last_edited}.</span>
          </>
        ) : (
          <span className="italic">Not started.</span>
        )}
      </div>
    </div>
  );
}

function DraftPanel({
  content,
  streaming,
  values,
  anonymous,
  onAccept,
  onCancel,
  feedback,
  setFeedback
}: {
  content: string;
  streaming: boolean;
  values: string[];
  anonymous?: boolean;
  onAccept: () => void;
  onCancel: () => void;
  feedback: string;
  setFeedback: (s: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={13} className="text-accent" />
        <div className="eyebrow">Claude draft · two-pass · voice-preserving</div>
        <button className="ml-auto text-muted hover:text-ink" onClick={onCancel}>
          <X size={14} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] mb-3 text-muted">
        <div className="paper-card p-2 bg-[#FBF8F1]">
          <div className="eyebrow text-[9px] mb-1">Pass 1 · recombine</div>
          Extracted phrases from your 250-word statement, the Outbuildings 1,500-word, and your Aliquippa Carrier long caption.
        </div>
        <div className="paper-card p-2 bg-[#FBF8F1]">
          <div className="eyebrow text-[9px] mb-1">Pass 2 · tailor</div>
          Calibrated to: opportunity type, prompt structure, length limit, and the funder's stated values{anonymous ? "; name stripped from body" : ""}.
        </div>
        <div className="paper-card p-2 bg-[#FBF8F1]">
          <div className="eyebrow text-[9px] mb-1">Self-check</div>
          Banned verbs absent. No false range. No name-drops without function. Active voice. Specific.
        </div>
      </div>

      <div className="border rule p-5 bg-[#FFFEFA] font-serif text-[17px] leading-relaxed whitespace-pre-line">
        {streaming ? (
          <div className="text-muted italic">Claude is drafting from your kit…</div>
        ) : (
          renderDiff(content)
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="chip chip-sage">+ added</span>
        <span className="chip chip-accent">— from your statements / project / captions</span>
      </div>

      <div className="mt-4">
        <div className="field-label">Regenerate with feedback</div>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="e.g. 'more specific about Aliquippa', 'cut the conveyor description', 'lean into urgency'"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className="btn btn-ghost">
            <RefreshCcw size={13} /> Regenerate
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button onClick={onCancel} className="btn btn-ghost">Discard</button>
        <button onClick={onAccept} className="btn btn-primary">Accept into editor</button>
      </div>
    </div>
  );
}

function renderDiff(text: string) {
  // Naive diff highlighter for prototype.
  // Phrases the artist already wrote (from kit) get marked as "from kit".
  const fromKit = [
    "Outbuildings",
    "Aliquippa Carrier",
    "conveyor belting",
    "rolling-mill remnants",
    "salvage",
    "Rust Belt",
    "Cannon Mills",
    "Carrie Furnace",
    "Rivers of Steel",
    "ecological mourning"
  ];
  const parts: { text: string; kind: "add" | "rm" | "plain" }[] = [];
  let cursor = 0;
  // mark new sentences containing "now" as additions (silly heuristic that demos the diff color)
  const sentenceSplit = text.split(/(?<=\.) /);
  return sentenceSplit.map((s, i) => {
    const isKitEcho = fromKit.some((k) => s.includes(k));
    return (
      <span key={i} className={isKitEcho ? "diff-rm" : ""}>
        {s}{i < sentenceSplit.length - 1 ? " " : ""}
      </span>
    );
  });
}
