export type OpportunityType =
  | "residency"
  | "project_grant"
  | "fellowship"
  | "emergency"
  | "festival"
  | "prize";

export type LimitUnit = "words" | "chars" | "minutes" | "pages";

export interface SectionSpec {
  key: string;
  prompt: string;
  limit_unit: LimitUnit;
  limit_value: number;
  required: boolean;
  notes?: string;
}

export interface Opportunity {
  id: string;
  funder: string;
  program: string;
  url: string;
  type: OpportunityType;
  geography: string;
  award: string;
  deadline: string; // ISO date
  fee: number;
  platform: string;
  eligibility: string[];
  values: string[]; // funder's stated values (drives AI prompt calibration)
  sections: SectionSpec[];
  work_sample_spec: string;
  notes?: string;
}

export type StatementKind = "artist_statement" | "bio" | "positioning";

export interface StatementVariant {
  id: string;
  kind: StatementKind;
  length_bucket: 50 | 100 | 250 | 500;
  angle: "general" | "discipline" | "project";
  body: string;
  updated_at: string;
}

export type CVEntryType =
  | "education"
  | "exhibition_solo"
  | "exhibition_group"
  | "screening"
  | "residency"
  | "grant"
  | "publication"
  | "press"
  | "talk"
  | "teaching"
  | "collection";

export interface CVEntry {
  id: string;
  type: CVEntryType;
  title: string;
  org: string;
  location?: string;
  date: string;
  url?: string;
  notes?: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  materials: string;
  role: "sole" | "collaborator";
  collaborators?: string[];
  description: string;
  short_caption: string;
  long_caption: string;
  image: string; // url
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  logline: string;
  summary_500: string;
  summary_1500: string;
  themes: string[];
  status: "concept" | "in_progress" | "funded" | "complete";
  related_work_ids: string[];
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  org: string;
  email: string;
  relationship: string;
  last_used?: string;
}

export interface BudgetLine {
  category: string;
  description: string;
  amount: number;
  status?: "confirmed" | "pending" | "to_raise";
}

export interface BudgetTemplate {
  id: string;
  name: string;
  lines: BudgetLine[];
}

export interface AwardHistory {
  id: string;
  funder: string;
  program: string;
  amount: number;
  year: number;
}

export interface ArtistProfile {
  id: string;
  legal_name: string;
  public_name: string;
  pronouns: string;
  email: string;
  city: string;
  state: string;
  country: string;
  citizenship: string;
  tax_id_type: "SSN" | "ITIN" | "EIN" | "Other";
  year_of_birth: number;
  in_degree_program: boolean;
  years_practicing: number;
  websites: string[];
  socials: { label: string; url: string }[];
  disciplines: { primary: string; secondary: string[]; keywords: string[] };
  headshot: string;
}

export interface ApplicationSection {
  key: string;
  content: string;
  generated_from?: string;
  last_edited: string;
  versions: { id: string; content: string; created_at: string; label: string }[];
}

export interface WorkSampleSlot {
  slot_index: number;
  work_id: string;
  caption_override?: string;
}

export type ApplicationStatus =
  | "discovered"
  | "drafting"
  | "ready"
  | "submitted"
  | "awarded"
  | "declined";

export interface Application {
  id: string;
  opportunity_id: string;
  status: ApplicationStatus;
  fee_paid: boolean;
  submitted_at?: string;
  sections: ApplicationSection[];
  work_sample_slots: WorkSampleSlot[];
  budget_lines: BudgetLine[];
  timeline: { date: string; milestone: string }[];
  references_used: string[]; // reference ids
  updated_at: string;
}
