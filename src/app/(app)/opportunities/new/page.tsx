"use client";
import { useState } from "react";
import { PageHeader } from "@/components/Shell";
import { Plus, Trash2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

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
      <div className="px-8 py-8 max-w-3xl">
        <div className="paper-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-accent" />
            <div className="eyebrow">Smart import (recommended)</div>
          </div>
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="Paste the call URL (e.g. https://creative-capital.org/...)" />
            <button className="btn btn-primary">
              Extract <ArrowRight size={13} />
            </button>
          </div>
          <div className="mt-2 text-xs text-muted">
            Claude reads the page and proposes a structured opportunity record. You confirm or edit. Works for SlideRoom, Submittable, NYFA, and funder sites with public guidelines.
          </div>
        </div>

        <div className="divider-dots mb-6" />

        <div className="grid grid-cols-2 gap-4 mb-6">
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
          <textarea
            className="textarea min-h-24"
            placeholder={"Working artists at any career stage\nNot enrolled in a degree program\nUS-based"}
          />
        </div>

        <div className="mt-6">
          <div className="field-label">Funder's stated values (one per line)</div>
          <textarea
            className="textarea min-h-24"
            placeholder={"Time and space for sustained practice\nCommunity engagement\nProjects with realistic feasibility"}
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-xl">Sections to write</h3>
            <button
              onClick={() => setSections([...sections, { prompt: "", limit_unit: "words", limit_value: 500 }])}
              className="btn btn-ghost"
            >
              <Plus size={13} /> Add section
            </button>
          </div>
          <div className="space-y-3">
            {sections.map((s, i) => (
              <div key={i} className="paper-card p-4">
                <div className="flex items-start gap-3 mb-2">
                  <span className="eyebrow mt-1">Section {i + 1}</span>
                  <button
                    onClick={() => setSections(sections.filter((_, j) => j !== i))}
                    className="ml-auto text-muted hover:text-accent"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <textarea
                  className="textarea min-h-20 mb-3"
                  placeholder="Paste the prompt exactly as it appears in the call…"
                />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Limit unit" placeholder="words / chars / minutes / pages" />
                  <Field label="Limit value" placeholder="500" />
                  <Field label="Required?" placeholder="yes / no" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-2">
          <Link href="/opportunities" className="btn btn-ghost">Cancel</Link>
          <button className="btn btn-primary">Save opportunity <ArrowRight size={13} /></button>
        </div>
      </div>
    </>
  );
}

function Field({ label, placeholder, defaultValue }: { label: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <input className="input" placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  );
}
