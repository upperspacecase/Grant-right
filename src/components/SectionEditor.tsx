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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="eyebrow">{spec.key.replace(/_/g, " ")}</span>
              {spec.required && <Badge variant="warn">Required</Badge>}
              {anonymous && <Badge variant="primary">Anonymous review</Badge>}
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90 max-w-prose2">{spec.prompt}</p>
            {spec.notes && (
              <p className="text-xs text-muted-foreground italic mt-1.5 max-w-prose2">{spec.notes}</p>
            )}
          </div>
          <div className="text-left sm:text-right shrink-0">
            <div className={cn(
              "font-mono text-sm",
              overLimit && "text-primary",
              nearLimit && "text-warn"
            )}>
              {measured}<span className="text-muted-foreground">/{spec.limit_value}</span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{spec.limit_unit}</div>
            <div className="mt-1 h-1 w-24 bg-border rounded-full overflow-hidden sm:ml-auto">
              <div
                className={cn(
                  "h-full transition-all",
                  overLimit ? "bg-primary" : nearLimit ? "bg-warn" : "bg-accent"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 px-4 sm:px-5 pt-3 border-b border-border pb-3 flex-wrap">
        <Button onClick={runDraft} variant="accent" size="sm">
          <Sparkles size={12} /> {section.content ? "Regenerate draft" : "Draft from kit"}
        </Button>
        <div className="flex-1" />
        {section.versions.length > 0 && (
          <Button
            onClick={() => setMode(mode === "history" ? "edit" : "history")}
            variant="ghost"
            size="sm"
          >
            <History size={12} /> {section.versions.length} versions
          </Button>
        )}
        <Button variant="ghost" size="sm">
          <Wand2 size={12} /> Trim to limit
        </Button>
      </div>

      {mode === "edit" && (
        <Textarea
          className="border-0 rounded-none min-h-44 px-4 sm:px-5 py-4 focus:ring-0 focus:outline-none"
          value={section.content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Empty — click Draft from kit to generate, or write directly."
        />
      )}

      {mode === "draft" && (
        <div className="px-4 sm:px-5 py-4">
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
            <Card key={v.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="eyebrow">{v.label}</div>
                <div className="text-xs text-muted-foreground">{v.created_at}</div>
              </div>
              <p className="text-[14px] leading-relaxed text-muted-foreground">{v.content}</p>
              <div className="mt-3 flex justify-end">
                <Button variant="ghost" size="sm">Restore</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="px-4 sm:px-5 py-3 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
        {overLimit ? (
          <>
            <AlertTriangle size={13} className="text-primary" />
            <span>{measured - spec.limit_value} {spec.limit_unit} over limit. Most funders auto-truncate. Trim before submit.</span>
          </>
        ) : nearLimit ? (
          <>
            <AlertTriangle size={13} className="text-warn" />
            <span>Approaching limit. {spec.limit_value - measured} {spec.limit_unit} of headroom.</span>
          </>
        ) : section.content ? (
          <>
            <CheckCircle2 size={13} className="text-accent" />
            <span>Within limit. Last edited {section.last_edited}.</span>
          </>
        ) : (
          <span className="italic">Not started.</span>
        )}
      </div>
    </Card>
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
        <Sparkles size={13} className="text-primary" />
        <div className="eyebrow">Claude draft · two-pass · voice-preserving</div>
        <button className="ml-auto text-muted-foreground hover:text-foreground" onClick={onCancel}>
          <X size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] mb-3 text-muted-foreground">
        <Card className="p-2 bg-sand-light rounded-lg">
          <div className="eyebrow text-[9px] mb-1">Pass 1 · recombine</div>
          Extracted phrases from your 250-word statement, the Outbuildings 1,500-word, and your Aliquippa Carrier long caption.
        </Card>
        <Card className="p-2 bg-sand-light rounded-lg">
          <div className="eyebrow text-[9px] mb-1">Pass 2 · tailor</div>
          Calibrated to: opportunity type, prompt structure, length limit, and the funder's stated values{anonymous ? "; name stripped from body" : ""}.
        </Card>
        <Card className="p-2 bg-sand-light rounded-lg">
          <div className="eyebrow text-[9px] mb-1">Self-check</div>
          Banned verbs absent. No false range. No name-drops without function. Active voice. Specific.
        </Card>
      </div>

      <div className="border border-border rounded-lg p-4 sm:p-5 bg-card text-[15px] sm:text-[17px] leading-relaxed whitespace-pre-line">
        {streaming ? (
          <div className="text-muted-foreground italic">Claude is drafting from your kit…</div>
        ) : (
          renderDiff(content)
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <Badge variant="accent">+ added</Badge>
        <Badge variant="primary">— from your statements / project / captions</Badge>
      </div>

      <div className="mt-4">
        <div className="field-label">Regenerate with feedback</div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            className="flex-1"
            placeholder="e.g. 'more specific about Aliquippa', 'cut the conveyor description', 'lean into urgency'"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button variant="ghost" className="shrink-0">
            <RefreshCcw size={13} /> Regenerate
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-2">
        <Button onClick={onCancel} variant="ghost">Discard</Button>
        <Button onClick={onAccept}>Accept into editor</Button>
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
