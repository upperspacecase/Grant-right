"use client";
import { create } from "zustand";
import {
  applications as seedApplications,
  artist as seedArtist,
  awards as seedAwards,
  budgetTemplates as seedBudgets,
  cv as seedCv,
  opportunities as seedOpps,
  projects as seedProjects,
  references as seedRefs,
  statements as seedStatements,
  works as seedWorks
} from "./seed";
import type {
  Application,
  ArtistProfile,
  AwardHistory,
  BudgetTemplate,
  CVEntry,
  Opportunity,
  Project,
  Reference,
  StatementVariant,
  Work
} from "./types";

interface Store {
  artist: ArtistProfile;
  statements: StatementVariant[];
  cv: CVEntry[];
  works: Work[];
  projects: Project[];
  references: Reference[];
  awards: AwardHistory[];
  budgetTemplates: BudgetTemplate[];
  opportunities: Opportunity[];
  applications: Application[];
  updateArtist: (patch: Partial<ArtistProfile>) => void;
  updateStatement: (id: string, body: string) => void;
  updateApplicationSection: (appId: string, sectionKey: string, content: string) => void;
  setApplicationStatus: (appId: string, status: Application["status"]) => void;
  addApplication: (app: Application) => void;
  addOpportunity: (opp: Opportunity) => void;
}

export const useStore = create<Store>((set) => ({
  artist: seedArtist,
  statements: seedStatements,
  cv: seedCv,
  works: seedWorks,
  projects: seedProjects,
  references: seedRefs,
  awards: seedAwards,
  budgetTemplates: seedBudgets,
  opportunities: seedOpps,
  applications: seedApplications,
  updateArtist: (patch) => set((s) => ({ artist: { ...s.artist, ...patch } })),
  updateStatement: (id, body) =>
    set((s) => ({
      statements: s.statements.map((st) => (st.id === id ? { ...st, body, updated_at: new Date().toISOString().slice(0, 10) } : st))
    })),
  updateApplicationSection: (appId, sectionKey, content) =>
    set((s) => ({
      applications: s.applications.map((a) =>
        a.id === appId
          ? {
              ...a,
              sections: a.sections.map((sec) =>
                sec.key === sectionKey ? { ...sec, content, last_edited: new Date().toISOString().slice(0, 10) } : sec
              ),
              updated_at: new Date().toISOString().slice(0, 10)
            }
          : a
      )
    })),
  setApplicationStatus: (appId, status) =>
    set((s) => ({
      applications: s.applications.map((a) => (a.id === appId ? { ...a, status } : a))
    })),
  addApplication: (app) => set((s) => ({ applications: [...s.applications, app] })),
  addOpportunity: (opp) => set((s) => ({ opportunities: [...s.opportunities, opp] }))
}));
