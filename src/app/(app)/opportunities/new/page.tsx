"use client";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { Plus, Trash2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewOpportunityPage() {
  const [sections, setSections] = useState([
    { prompt: "", limit_unit: "words", limit_value: 500 }
  ]);
  return (
    <>
      <PageHeader
        eyebrow="New opportunity"
        title="Add a call"
        subtitle="Paste the call URL or upload the PDF — we extract the prompts, limits, eligibility, and deadlines automatically. Edit anything that came out wrong."
      />
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-3xl">
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-primary" />
            <div className="eyebrow">Smart import (recommended)</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input className="flex-1" placeholder="Paste the call URL (e.g. https://creative-capital.org/...)" />
            <Button className="shrink-0 justify-center">
              Extract <ArrowRight size={13} />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Claude reads the page and proposes a structured opportunity record. You confirm or edit. Works for SlideRoom, Submittable, NYFA, and funder sites with public guidelines.
          </div>
        </Card>

        <div className="divider-dots mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <Field label="Funder" placeholder="e.g. Headlands Center for the Arts" />
          <Field label="Program name" placeholder="e.g. Artist in Residence 2026" />
          <Field label="Type" placeholder="residency / project_grant / fellowship / emergency / festival" />
          <Field label="Geography" placeholder="Sausalito, CA, USA" />
          <Field label="Deadline (ISO)" placeholder="2026-09-15" />
          <Field label="Award description" placeholder="6-week residency, $500/wk stipend" />
          <Field label="Application fee" placeholder="$25" />
          <Field label="Platform" placeholder="Submittable / SlideRoom / Custom" />
        </div>

        <div>
          <div className="field-label">Eligibility rules (one per line)</div>
          <Textarea
            className="min-h-24"
            placeholder={"Working artists at any career stage\nNot enrolled in a degree program\nUS-based"}
          />
        </div>

        <div className="mt-6">
          <div className="field-label">Funder's stated values (one per line)</div>
          <Textarea
            className="min-h-24"
            placeholder={"Time and space for sustained practice\nCommunity engagement\nProjects with realistic feasibility"}
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-xl">Sections to write</h3>
            <Button
              onClick={() => setSections([...sections, { prompt: "", limit_unit: "words", limit_value: 500 }])}
              variant="ghost"
            >
              <Plus size={13} /> Add section
            </Button>
          </div>
          <div className="space-y-3">
            {sections.map((s, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3 mb-2">
                  <span className="eyebrow mt-1">Section {i + 1}</span>
                  <button
                    onClick={() => setSections(sections.filter((_, j) => j !== i))}
                    className="ml-auto text-muted-foreground hover:text-primary"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <Textarea
                  className="min-h-20 mb-3"
                  placeholder="Paste the prompt exactly as it appears in the call…"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Limit unit" placeholder="words / chars / minutes / pages" />
                  <Field label="Limit value" placeholder="500" />
                  <Field label="Required?" placeholder="yes / no" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-2">
          <Button asChild variant="ghost">
            <Link href="/opportunities">Cancel</Link>
          </Button>
          <Button>Save opportunity <ArrowRight size={13} /></Button>
        </div>
      </div>
    </>
  );
}

function Field({ label, placeholder, defaultValue }: { label: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <Input placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  );
}
