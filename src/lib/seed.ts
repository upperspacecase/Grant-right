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

// Mid-career visual artist persona — Mira Okonkwo
// Sculpture + installation working with salvaged industrial materials.
// MFA Yale 2018, NYFA Fellowship 2022, Yaddo 2023.

export const artist: ArtistProfile = {
  id: "artist_mira",
  legal_name: "Mira Adaeze Okonkwo",
  public_name: "Mira Okonkwo",
  pronouns: "she/her",
  email: "studio@miraokonkwo.com",
  city: "Brooklyn",
  state: "NY",
  country: "USA",
  citizenship: "US Citizen",
  tax_id_type: "SSN",
  year_of_birth: 1989,
  in_degree_program: false,
  years_practicing: 9,
  websites: ["https://miraokonkwo.com"],
  socials: [
    { label: "Instagram", url: "https://instagram.com/mira.okonkwo" },
    { label: "Are.na", url: "https://are.na/mira-okonkwo" }
  ],
  disciplines: {
    primary: "Sculpture",
    secondary: ["Installation", "Video"],
    keywords: ["post-industrial", "salvage", "ecological mourning", "steel", "textile", "Rust Belt"]
  },
  headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"
};

export const statements: StatementVariant[] = [
  {
    id: "st_as_50",
    kind: "artist_statement",
    length_bucket: 50,
    angle: "general",
    body: "I make sculptures from the steel and fabric the Rust Belt left behind. Salvaged beams, mill rags, conveyor pulls — restitched into bodies that won't dissolve quietly. The work asks what we owe a landscape after the work that built it leaves.",
    updated_at: "2026-04-02"
  },
  {
    id: "st_as_100",
    kind: "artist_statement",
    length_bucket: 100,
    angle: "general",
    body: "I make sculptures and room-scale installations from materials sourced inside closed steel mills and textile plants across western Pennsylvania and the Ohio Valley. I work with rolling-mill remnants, fabric scraps from defunct cotton mills, and conveyor pulls — restitched, riveted, hung — into figures that refuse the tidy narrative of the post-industrial. The pieces are part archive, part body. They sit between mourning and refusal: the landscape didn't die, it was unmade, and the materials still have a position on the matter.",
    updated_at: "2026-04-02"
  },
  {
    id: "st_as_250",
    kind: "artist_statement",
    length_bucket: 250,
    angle: "general",
    body: "I make sculptures and room-scale installations from materials sourced inside closed steel mills and textile plants across western Pennsylvania and the Ohio Valley. The work begins in the buildings themselves: walking the floors of Carrie Furnace, the Aliquippa Works, the Cannon Mills sites in North Carolina, with permission from the families and stewards still tied to them. I gather rolling-mill remnants, fabric scraps, and the leather-and-canvas conveyor pulls that moved coke through ovens for sixty years.\n\nBack in the studio, the pieces are restitched, riveted, and hung — sometimes into figures, more often into something halfway between an animal and a flag. I am interested in the half-life of labor: the way a place keeps performing the work that was extracted from it long after the workers are gone. Steel that has been hot once does not behave like new steel. Fabric that has held coal dust for forty years is no longer cloth in the ordinary sense. The work catalogues this — not as nostalgia, and not as elegy, but as evidence.\n\nThe pieces are made to be installed in rooms where the floor and walls show. I avoid plinths. The relationship between the salvaged object and the building it now sits in is part of the piece. What I am after, finally, is a way of mourning that doesn't tidy the body up first.",
    updated_at: "2026-04-12"
  },
  {
    id: "st_bio_50",
    kind: "bio",
    length_bucket: 50,
    angle: "general",
    body: "Mira Okonkwo (b. 1989) is a Brooklyn-based sculptor working with salvaged steel and textile from closed mills across the Rust Belt. She holds an MFA from Yale and has been a fellow at Yaddo and the New York Foundation for the Arts.",
    updated_at: "2026-03-20"
  },
  {
    id: "st_bio_150",
    kind: "bio",
    length_bucket: 100,
    angle: "general",
    body: "Mira Okonkwo (b. 1989, Pittsburgh) is a sculptor based in Brooklyn whose work draws on materials gathered inside closed steel mills and textile plants across the Rust Belt. Her room-scale installations have been shown at SculptureCenter, the Mattress Factory, and the Carnegie Museum of Art's Forum gallery. She holds an MFA from Yale School of Art (2018) and a BA in Studio Art from Bard College. She was a 2022 NYSCA/NYFA Artist Fellow in Craft/Sculpture and a 2023 Yaddo Fellow. Her work is in the collection of the Mattress Factory.",
    updated_at: "2026-03-20"
  },
  {
    id: "st_bio_250",
    kind: "bio",
    length_bucket: 250,
    angle: "general",
    body: "Mira Okonkwo (b. 1989, Pittsburgh) is a sculptor and installation artist based in Brooklyn. Her practice is grounded in fieldwork inside the closed industrial sites of the Rust Belt — the Carrie Furnace in Rankin, PA; the former Aliquippa Works; the Cannon Mills facilities in North Carolina — where she works with stewards and former workers' families to gather rolling-mill remnants, textile scraps, and conveyor materials. Back in the studio, she restitches and rivets these into room-scale installations that sit between figure and flag.\n\nSolo exhibitions include 'Half-Life Garments' (SculptureCenter, 2024) and 'After the Furnace' (Mattress Factory, 2022). Group exhibitions include the Carnegie Museum of Art Forum series, the Cleveland Triennial, and Prospect.6 in New Orleans. Reviews have appeared in Artforum, ArtAsiaPacific, and The Brooklyn Rail.\n\nShe holds an MFA from Yale School of Art (2018) and a BA in Studio Art from Bard College (2011). Honors include a 2022 NYSCA/NYFA Artist Fellowship in Craft/Sculpture, a 2023 Yaddo Fellowship, and a 2024 Joan Mitchell Foundation Painters & Sculptors finalist nomination. Her work is in the collection of the Mattress Factory and the Carnegie Museum of Art.",
    updated_at: "2026-03-20"
  }
];

export const cv: CVEntry[] = [
  { id: "cv1", type: "education", title: "MFA, Sculpture", org: "Yale School of Art", location: "New Haven, CT", date: "2018" },
  { id: "cv2", type: "education", title: "BA, Studio Art", org: "Bard College", location: "Annandale-on-Hudson, NY", date: "2011" },
  { id: "cv3", type: "exhibition_solo", title: "Half-Life Garments", org: "SculptureCenter", location: "Long Island City, NY", date: "2024" },
  { id: "cv4", type: "exhibition_solo", title: "After the Furnace", org: "Mattress Factory", location: "Pittsburgh, PA", date: "2022" },
  { id: "cv5", type: "exhibition_group", title: "Prospect.6: The Future Is Present, The Harbinger Is Home", org: "Prospect New Orleans", location: "New Orleans, LA", date: "2024" },
  { id: "cv6", type: "exhibition_group", title: "Forum 91: Material Witness", org: "Carnegie Museum of Art", location: "Pittsburgh, PA", date: "2023" },
  { id: "cv7", type: "exhibition_group", title: "FRONT Triennial", org: "Cleveland Museum of Art", location: "Cleveland, OH", date: "2022" },
  { id: "cv8", type: "residency", title: "Yaddo Fellow", org: "Yaddo", location: "Saratoga Springs, NY", date: "2023" },
  { id: "cv9", type: "residency", title: "Bemis Center Fellow", org: "Bemis Center for Contemporary Arts", location: "Omaha, NE", date: "2020" },
  { id: "cv10", type: "grant", title: "NYSCA/NYFA Artist Fellowship, Craft/Sculpture", org: "New York Foundation for the Arts", location: "New York, NY", date: "2022" },
  { id: "cv11", type: "grant", title: "Rema Hort Mann Foundation Emerging Artist Grant, finalist", org: "Rema Hort Mann Foundation", location: "New York, NY", date: "2021" },
  { id: "cv12", type: "press", title: "“Mira Okonkwo’s Half-Life Garments”, Artforum review", org: "Artforum", date: "2024", url: "https://artforum.com" },
  { id: "cv13", type: "press", title: "“A Sculptor of the Unmade Landscape”, The Brooklyn Rail", org: "The Brooklyn Rail", date: "2024" },
  { id: "cv14", type: "press", title: "Studio visit feature", org: "ArtAsiaPacific", date: "2023" },
  { id: "cv15", type: "talk", title: "Visiting artist lecture", org: "Tyler School of Art, Temple University", date: "2024" },
  { id: "cv16", type: "talk", title: "Panel: Industrial Heritage and Contemporary Practice", org: "College Art Association Conference", date: "2024" },
  { id: "cv17", type: "teaching", title: "Adjunct critic, Sculpture", org: "Yale School of Art", date: "2022–2024" },
  { id: "cv18", type: "collection", title: "Permanent collection", org: "Mattress Factory", date: "2022" },
  { id: "cv19", type: "collection", title: "Permanent collection", org: "Carnegie Museum of Art", date: "2024" }
];

export const works: Work[] = [
  {
    id: "wk1",
    title: "Aliquippa Carrier (Conveyor I)",
    year: 2024,
    medium: "Sculpture",
    dimensions: "94 × 38 × 22 in",
    materials: "Salvaged leather-and-canvas conveyor belting from Aliquippa Works, mild steel armature, brass rivets, found mill thread",
    role: "sole",
    description: "Vertical hung form built from a 12-foot section of conveyor that moved coke through the Aliquippa rolling mill from 1958 until plant closure in 1985.",
    short_caption: "Conveyor belting, steel, rivets, 2024.",
    long_caption: "Aliquippa Carrier (Conveyor I), 2024. Salvaged leather-and-canvas conveyor belting from the Aliquippa Works (closed 1985), mild steel armature, brass rivets, found mill thread. 94 × 38 × 22 in. Acquired with permission from the Aliquippa Steel Industry Heritage Corporation. Photo: Charles Benton.",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&q=70",
    tags: ["sculpture", "salvage", "Aliquippa", "conveyor"]
  },
  {
    id: "wk2",
    title: "Half-Life Garments (Mill Series)",
    year: 2024,
    medium: "Installation",
    dimensions: "Dimensions variable, approx. 18 × 12 ft room",
    materials: "Salvaged fabric scraps from Cannon Mills (Concord, NC), cotton thread, hand-forged steel hooks, gallery wall",
    role: "sole",
    description: "Eleven garment-like hangings stitched from textile remnants gathered at the Cannon Mills site in 2023, suspended at irregular heights from forged steel hooks.",
    short_caption: "Installation view, SculptureCenter, 2024.",
    long_caption: "Half-Life Garments (Mill Series), 2024. Salvaged fabric scraps from Cannon Mills, cotton thread, hand-forged steel hooks. Installation view, 'Half-Life Garments,' SculptureCenter, Long Island City, NY. Photo: Kyle Knodell.",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=900&q=70",
    tags: ["installation", "salvage", "Cannon Mills", "textile"]
  },
  {
    id: "wk3",
    title: "Forum 91: Material Witness (group installation contribution)",
    year: 2023,
    medium: "Installation",
    dimensions: "Variable",
    materials: "Salvaged steel plate, rolling-mill scale, archival photographs from Carnegie Library industrial collection",
    role: "sole",
    description: "Floor work made for the Forum 91 group exhibition at the Carnegie Museum of Art, paired with archival images of the same plant before closure.",
    short_caption: "Forum 91, Carnegie Museum of Art, 2023.",
    long_caption: "Untitled (Forum 91 contribution), 2023. Salvaged steel plate, mill scale, archival photographs. Installation view, 'Forum 91: Material Witness,' Carnegie Museum of Art. Photo: Bryan Conley.",
    image: "https://images.unsplash.com/photo-1485815457792-d3d5a9d34c0e?w=900&q=70",
    tags: ["installation", "Carnegie", "Forum"]
  },
  {
    id: "wk4",
    title: "After the Furnace (Suite of Five)",
    year: 2022,
    medium: "Sculpture, suite",
    dimensions: "Each approx. 60 × 24 × 18 in",
    materials: "Rolling-mill remnants, hand-stitched wool, brass",
    role: "sole",
    description: "Five wall-mounted forms developed at Bemis and completed at Mattress Factory in residence.",
    short_caption: "Suite of five sculptures, Mattress Factory, 2022.",
    long_caption: "After the Furnace (Suite of Five), 2022. Rolling-mill remnants, hand-stitched wool, brass. Installation view, 'After the Furnace,' Mattress Factory, Pittsburgh. Photo: Tom Little.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=70",
    tags: ["sculpture", "Mattress Factory"]
  },
  {
    id: "wk5",
    title: "Field Recording, Carrie Furnace (video)",
    year: 2023,
    medium: "Single-channel video",
    dimensions: "12:40 min, color, sound",
    materials: "HD video, field audio",
    role: "sole",
    description: "Twelve-minute slow-pan recording made during a sanctioned walk-through of the Carrie Furnace site with members of Rivers of Steel.",
    short_caption: "Single-channel video, 12:40, 2023.",
    long_caption: "Field Recording, Carrie Furnace, 2023. Single-channel HD video, color, sound, 12:40. Made with Rivers of Steel Heritage Corporation, Rankin, PA.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=70",
    tags: ["video", "Carrie Furnace"]
  },
  {
    id: "wk6",
    title: "Prospect.6 contribution (in situ)",
    year: 2024,
    medium: "Site-specific installation",
    dimensions: "Variable",
    materials: "Salvaged textile from former New Orleans cotton press, steel, water",
    role: "sole",
    description: "Floor and water-tray work made in collaboration with Prospect.6 curatorial team in a former cotton press building.",
    short_caption: "Prospect.6, New Orleans, 2024.",
    long_caption: "Untitled (cotton press), 2024. Salvaged textile, steel, water. Site-specific installation, Prospect.6, New Orleans. Photo: Alex Marks.",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=900&q=70",
    tags: ["installation", "Prospect", "cotton press"]
  }
];

export const projects: Project[] = [
  {
    id: "proj_outbuildings",
    title: "Outbuildings",
    logline: "A two-year project gathering material from five closed Rust Belt sites, resulting in a touring room-scale installation and an open-source material archive.",
    summary_500:
      "Outbuildings is a two-year project that extends my fieldwork practice to five closed industrial sites across the Rust Belt: the Aliquippa Works (PA), the Cannon Mills facilities (NC), the Sloss Furnaces (AL), the Acme Steel works (Chicago), and the former American Brass campus (CT). At each site I will work with the heritage organizations and former workers' families who steward the buildings to gather material with permission and provenance documentation. Back in the studio, the material will be restitched into a single room-scale installation titled Outbuildings that travels to three venues across the project period. The fieldwork is the work as much as the studio output. Each site visit produces a public conversation — small-scale, on-site, recorded — with the stewards about what the material means to them and to the community. These recordings become a parallel sound piece that travels with the installation. A third component is an open material archive: a public catalogue, hosted at a partner institution, that documents each material's provenance, fabrication history, and the protocol used to gather it. The archive is the part I am most excited about: it makes the project useful to other artists, researchers, and the heritage organizations themselves, and outlives any one exhibition.",
    summary_1500:
      "Outbuildings is a two-year fieldwork-and-studio project that builds on the practice I have developed over the last decade of working with salvaged industrial material. It has three connected outputs: a room-scale installation that tours, a sound piece compiled from on-site conversations, and an open material archive hosted by a partner institution.\n\nThe fieldwork extends to five closed sites: the Aliquippa Works (Aliquippa, PA, closed 1985), the Cannon Mills facilities (Concord, NC, closed 2003), the Sloss Furnaces (Birmingham, AL, closed 1971 and operating as a museum), the Acme Steel works (Chicago, closed 2001), and the former American Brass campus (Waterbury, CT, closed 1986). I have established relationships with the heritage organizations at three of these sites already; the remaining two are in conversation. Each visit will be conducted with formal permission and a provenance protocol that I developed during the Outbuildings pilot at Aliquippa in 2024: material is documented in situ, tagged, and accompanied by an oral history with whoever is willing to speak about it.\n\nThe studio component restitches and rivets this material into a single room-scale installation that travels to three venues across the project period. I am in early conversation with the Mattress Factory (Pittsburgh), the Cleveland Museum of Art, and SculptureCenter (NY) as potential venues. The installation is designed to be reconfigured for each space, with the floor and walls of the host venue treated as part of the work.\n\nThe sound piece is built from the on-site conversations — short, recorded with the stewards' consent, edited into a continuous spatialized score that plays in the installation. The conversations are not narrated or framed. They sit alongside the material as evidence of the same kind.\n\nThe third component, and the one I want to flag specifically, is the open material archive. Hosted by Rivers of Steel as a public catalogue and mirrored at the project venues, the archive documents every material used — its provenance, fabrication history, the protocol used to gather it, the conversation it came with, and the eventual installation context. The archive is designed so that other artists, researchers, and the heritage organizations themselves can use it. It also makes the project legible after it ends. \n\nWhy now: three of the five sites are in active demolition or sale conversations. The material window is closing. The stewards have asked for the work to happen now.\n\nWhy me: the pilot at Aliquippa established the protocol and the relationships. I have spent nine years building a practice around exactly this material, and the heritage organizations involved have asked for the project to expand.",
    themes: ["post-industrial", "salvage", "fieldwork", "archive", "ecological mourning"],
    status: "concept",
    related_work_ids: ["wk1", "wk2", "wk5"]
  },
  {
    id: "proj_carrier_series",
    title: "Carrier Series",
    logline: "A continuation of the conveyor-belt sculpture series that began with Aliquippa Carrier, expanding to three additional sites.",
    summary_500:
      "The Carrier Series extends the conveyor-belt sculpture line I began with Aliquippa Carrier (Conveyor I) in 2024. The conveyor pull — leather-and-canvas belting that moved coke and ore through rolling mills for decades — is unusual material: it absorbed forty years of heat, dust, and motion, and it survives the closure of the mill better than almost anything else on the site. Each piece in the series is vertical, hung, and built from a single uninterrupted section of belting from one site. The next three works will draw from the Sloss Furnaces (Birmingham), the Acme Steel works (Chicago), and the former American Brass campus (Waterbury). The work is studio-based and does not require new fieldwork beyond gathering trips already planned for Outbuildings. Each Carrier piece can be exhibited independently or as part of the Outbuildings installation.",
    summary_1500: "",
    themes: ["sculpture", "salvage", "series"],
    status: "in_progress",
    related_work_ids: ["wk1"]
  }
];

export const references: Reference[] = [
  { id: "ref1", name: "Sarah Workneh", title: "Co-Director", org: "Skowhegan School of Painting & Sculpture", email: "sworkneh@example.org", relationship: "Former mentor; wrote prior recommendation for NYSCA/NYFA Fellowship." },
  { id: "ref2", name: "Daniel Tucker", title: "Curator", org: "Mattress Factory", email: "dtucker@example.org", relationship: "Curated 'After the Furnace,' 2022.", last_used: "2024-09-10" },
  { id: "ref3", name: "Naima J. Keith", title: "Vice President of Education and Public Programs", org: "Los Angeles County Museum of Art", email: "nkeith@example.org", relationship: "Studio visit 2023; Prospect.6 curator." },
  { id: "ref4", name: "Ron Baraff", title: "Director of Historic Resources and Facilities", org: "Rivers of Steel Heritage Corporation", email: "rbaraff@example.org", relationship: "Project partner on Outbuildings; co-designed provenance protocol." }
];

export const awards: AwardHistory[] = [
  { id: "aw1", funder: "New York Foundation for the Arts", program: "NYSCA/NYFA Artist Fellowship, Craft/Sculpture", amount: 8000, year: 2022 },
  { id: "aw2", funder: "Bemis Center for Contemporary Arts", program: "Residency stipend", amount: 1750, year: 2020 }
];

export const budgetTemplates: BudgetTemplate[] = [
  {
    id: "bt_outbuildings",
    name: "Outbuildings — two-year project budget",
    lines: [
      { category: "Artist fee", description: "Artist fee, 2 years @ $14,000/yr", amount: 28000, status: "to_raise" },
      { category: "Fieldwork travel", description: "5 sites × 2 visits × $1,200 avg (flights, lodging, ground)", amount: 12000, status: "to_raise" },
      { category: "Site partnership stipends", description: "$2,000 × 5 heritage org partners (provenance, archival permission, conversation recording)", amount: 10000, status: "confirmed" },
      { category: "Materials transport", description: "Freight from sites to studio, est. 5 shipments", amount: 7500, status: "to_raise" },
      { category: "Studio fabrication", description: "Steel, hardware, riveting, stitching supplies", amount: 8500, status: "to_raise" },
      { category: "Sound piece production", description: "Field recordist day rates + post-production studio time", amount: 6000, status: "pending" },
      { category: "Open archive", description: "Web platform build + first-year hosting (in-kind via Rivers of Steel)", amount: 3500, status: "confirmed" },
      { category: "Documentation", description: "Photography of completed work at three venues", amount: 4500, status: "to_raise" },
      { category: "Contingency", description: "8% of variable costs", amount: 4500, status: "to_raise" }
    ]
  }
];

// ----- Opportunities (modelled on real funder prompts/limits from research) -----

export const opportunities: Opportunity[] = [
  {
    id: "opp_macdowell",
    funder: "MacDowell",
    program: "Fellowship — Visual Arts, Fall/Winter 2026",
    url: "https://www.macdowell.org/apply/application-guidelines",
    type: "residency",
    geography: "Peterborough, NH, USA",
    award: "2–6 week residency, private studio, room, board, $2,000 travel/stipend",
    deadline: "2026-09-10",
    fee: 30,
    platform: "SlideRoom",
    eligibility: [
      "Working artists at any career stage",
      "No age, degree, or nationality restriction",
      "Single application per 24 months",
      "Work samples must be from the past 4 years"
    ],
    values: [
      "Time and space for artists to create",
      "Egalitarian peer cohort across disciplines",
      "Project specificity (medium, materials, studio needs)"
    ],
    sections: [
      {
        key: "professional_achievements",
        prompt: "List of professional achievements (CV-style summary of education, exhibitions, residencies, grants, publications, talks, teaching, collections).",
        limit_unit: "pages",
        limit_value: 5,
        required: true,
        notes: "Renders from your CV. No re-typing required."
      },
      {
        key: "project_description",
        prompt: "Project description: a specific description of 1–2 paragraphs covering what you will work on, the size and medium of work, list of materials, and any other information that will affect your use of the studio.",
        limit_unit: "chars",
        limit_value: 2500,
        required: true,
        notes: "MacDowell weights logistic specificity highly. Don't promise deliverables."
      }
    ],
    work_sample_spec: "Visual artists: up to 10 still images, made within past 4 years, with title/year/medium/dimensions captions."
  },
  {
    id: "opp_creative_capital",
    funder: "Creative Capital",
    program: "Creative Capital Award 2026 — Round I",
    url: "https://creative-capital.org/creative-capital-award/award-application/",
    type: "project_grant",
    geography: "USA",
    award: "$15,000 – $50,000 plus advisory services",
    deadline: "2026-04-06",
    fee: 25,
    platform: "Custom portal",
    eligibility: [
      "US citizen / permanent resident / Tribal ID / O-1 visa",
      "25 or older",
      "5+ years professional experience",
      "Not enrolled in a degree program"
    ],
    values: [
      "Bold, original projects with a clear urgency",
      "Concise, direct prose; no jargon or 'art-speak'",
      "Audience and impact named, not assumed",
      "Reviewers spend ~30–60 minutes per application; first round is solo, anonymous-adjacent"
    ],
    sections: [
      {
        key: "one_line",
        prompt: "One-Line Project Description.",
        limit_unit: "words",
        limit_value: 50,
        required: true,
        notes: "Also capped at 400 characters. Lead with the concrete."
      },
      {
        key: "project_description",
        prompt: "Project Description: what is the project, why now, why you, methodology, timeline, audience, outcomes.",
        limit_unit: "words",
        limit_value: 500,
        required: true,
        notes: "Also capped at 3,550 characters. Activities here must map to budget in Round II."
      },
      {
        key: "impact_audience",
        prompt: "Impact & Audiences: who the project reaches, how, and what changes because of it.",
        limit_unit: "words",
        limit_value: 150,
        required: true,
        notes: "Also capped at 1,050 characters."
      },
      {
        key: "values_alignment",
        prompt: "Short answer: how does this project demonstrate a bold new vision and urgency?",
        limit_unit: "words",
        limit_value: 100,
        required: true
      }
    ],
    work_sample_spec: "One primary work sample by you as sole author, completed work, recent."
  },
  {
    id: "opp_nyfa",
    funder: "New York Foundation for the Arts",
    program: "2026 NYSCA/NYFA Artist Fellowship — Craft/Sculpture",
    url: "https://www.nyfa.org/awards-grants/nysca-nyfa-artist-fellowship/",
    type: "fellowship",
    geography: "New York State, USA",
    award: "$8,000 unrestricted",
    deadline: "2026-01-22",
    fee: 0,
    platform: "NYFA Submission Manager",
    eligibility: [
      "Age 25 or older",
      "Current resident of New York State for two consecutive years",
      "Not enrolled in a degree program",
      "Previous NYSCA/NYFA Fellows in this discipline may not reapply for 5 years"
    ],
    values: [
      "Anonymous first-round review — no name in body text",
      "Work samples carry the argument; statement provides context",
      "Practice and trajectory, not a single project"
    ],
    sections: [
      {
        key: "work_statement",
        prompt: "Work Statement: a concise statement about your work and practice as a whole.",
        limit_unit: "words",
        limit_value: 100,
        required: true,
        notes: "Anonymous: do not name yourself in the body."
      },
      {
        key: "work_sample_info",
        prompt: "Work Sample Information: briefly describe the context, concept, and execution of your work sample(s).",
        limit_unit: "words",
        limit_value: 250,
        required: true,
        notes: "Per-sample metadata fields (title, date, materials, dimensions) are captured separately."
      }
    ],
    work_sample_spec: "Up to 10 still images. Per-sample required metadata: title, date of completion, materials, dimensions."
  },
  {
    id: "opp_fca_emergency",
    funder: "Foundation for Contemporary Arts",
    program: "Emergency Grant",
    url: "https://www.foundationforcontemporaryarts.org/grants/emergency-grants/guidelines/",
    type: "emergency",
    geography: "USA + territories",
    award: "$500 – $3,000",
    deadline: "2026-06-01",
    fee: 0,
    platform: "Submittable",
    eligibility: [
      "Living in US or US territories with a US Tax ID",
      "Individual artist (not org)",
      "Confirmed, dated public presentation 8–10 weeks out",
      "Not enrolled in any degree program",
      "36-month wait period after prior FCA award"
    ],
    values: [
      "Experimental, time-based, performance-leaning work",
      "Dated, committed opportunity — no speculative framing",
      "Voice matters more than polished writing; AI-flavored prose is a known turn-off"
    ],
    sections: [
      {
        key: "project_narrative",
        prompt: "Project narrative: describe the experimental nature of the project, the venue/context, and the urgency that makes this an emergency.",
        limit_unit: "words",
        limit_value: 500,
        required: true,
        notes: "FCA explicitly warns against AI-flattened narratives. Voice first."
      },
      {
        key: "budget_narrative",
        prompt: "Itemized project budget with brief narrative explaining each line.",
        limit_unit: "words",
        limit_value: 300,
        required: true,
        notes: "Template provided by FCA."
      },
      {
        key: "venue_confirmation",
        prompt: "Confirmation details: venue, dates, contact, supporting documentation.",
        limit_unit: "words",
        limit_value: 150,
        required: true
      }
    ],
    work_sample_spec: "Recent work samples, format appropriate to discipline."
  },
  {
    id: "opp_rijksakademie",
    funder: "Rijksakademie van beeldende kunsten",
    program: "Residency 2027 — Visual Arts",
    url: "https://rijksakademie.nl/en/residency-apply/apply",
    type: "residency",
    geography: "Amsterdam, Netherlands",
    award: "Two-year residency: studio, technical workshops, stipend",
    deadline: "2026-02-01",
    fee: 25,
    platform: "Custom portal",
    eligibility: [
      "Visual artists at any career stage",
      "International — no nationality restriction",
      "Pre-selection is portfolio-only; ~1/3 advance"
    ],
    values: [
      "Portfolio carries the first round; statement carries the second",
      "Community engagement and peer collaboration",
      "Long-form research practice"
    ],
    sections: [
      {
        key: "motivation",
        prompt: "Motivation statement: why now, why Rijksakademie, and how you would engage with the community of resident artists.",
        limit_unit: "words",
        limit_value: 600,
        required: true
      },
      {
        key: "portfolio_descriptions",
        prompt: "Per-work descriptions in your portfolio: context, process, and materials for each piece (entered alongside images).",
        limit_unit: "words",
        limit_value: 120,
        required: true,
        notes: "Per-work; 120-word ceiling per piece."
      },
      {
        key: "artistic_cv",
        prompt: "Artistic CV covering education, exhibitions, and projects over the past 2–3 years.",
        limit_unit: "pages",
        limit_value: 3,
        required: true
      }
    ],
    work_sample_spec: "Portfolio of recent work with per-piece descriptions and an introduction video."
  }
];

// ----- Applications (the state we mock for the click-through) -----

export const applications: Application[] = [
  {
    id: "app_macdowell_2026",
    opportunity_id: "opp_macdowell",
    status: "drafting",
    fee_paid: false,
    sections: [
      {
        key: "project_description",
        content:
          "At MacDowell I would continue Outbuildings, a two-year project gathering material from five closed Rust Belt industrial sites and restitching it into a single room-scale installation. The MacDowell residency would cover the early studio phase: testing how three new bodies of material — conveyor belting from the Aliquippa Works, fabric from Cannon Mills, and rolling-mill remnants from Sloss Furnaces — can be combined in a single piece.\n\nThe work is hand-stitched and riveted. Pieces range from 4 to 9 feet in vertical dimension, hung from forged steel hooks. Materials list for the studio: salvaged conveyor belting (already in studio), salvaged textile (already in studio), steel rod and plate stock, brass rivets, heavy-duty industrial sewing machine (will bring my Singer 132K6 from Brooklyn), small forge for steel hooks (will bring portable propane forge with permission). Floor protection required — rolling-mill scale sheds. Studio with a 12 ft ceiling minimum, no plinth needed.\n\nI have completed the Aliquippa fieldwork. The studio time at MacDowell would be the first sustained period to test the three materials together.",
        last_edited: "2026-05-08",
        versions: [
          {
            id: "v1",
            label: "AI initial draft",
            created_at: "2026-05-07",
            content: "At MacDowell I would explore my interdisciplinary practice working at the intersection of post-industrial salvage and contemporary sculpture. My work investigates the residue of American industry through material that ranges from steel to fabric to video."
          },
          {
            id: "v2",
            label: "Edited — added specifics",
            created_at: "2026-05-08",
            content: "Current version above."
          }
        ]
      }
    ],
    work_sample_slots: [
      { slot_index: 0, work_id: "wk2" },
      { slot_index: 1, work_id: "wk1" },
      { slot_index: 2, work_id: "wk6" },
      { slot_index: 3, work_id: "wk4" },
      { slot_index: 4, work_id: "wk3" }
    ],
    budget_lines: [],
    timeline: [],
    references_used: [],
    updated_at: "2026-05-08"
  },
  {
    id: "app_cc_2026",
    opportunity_id: "opp_creative_capital",
    status: "drafting",
    fee_paid: false,
    sections: [
      {
        key: "one_line",
        content:
          "Outbuildings is a two-year project gathering material from five closed Rust Belt industrial sites and restitching it into a touring room-scale installation, a sound piece, and an open material archive.",
        last_edited: "2026-05-09",
        versions: []
      },
      {
        key: "project_description",
        content: "",
        last_edited: "2026-05-01",
        versions: []
      },
      {
        key: "impact_audience",
        content: "",
        last_edited: "2026-05-01",
        versions: []
      },
      {
        key: "values_alignment",
        content: "",
        last_edited: "2026-05-01",
        versions: []
      }
    ],
    work_sample_slots: [{ slot_index: 0, work_id: "wk2" }],
    budget_lines: budgetTemplates[0].lines,
    timeline: [
      { date: "2026-09", milestone: "Aliquippa second visit + Sloss first visit" },
      { date: "2027-02", milestone: "Studio fabrication begins on three Carrier works" },
      { date: "2027-09", milestone: "First installation premiere at Mattress Factory" },
      { date: "2028-04", milestone: "Touring installation opens at SculptureCenter" },
      { date: "2028-09", milestone: "Open material archive launches at Rivers of Steel" }
    ],
    references_used: ["ref2", "ref4"],
    updated_at: "2026-05-09"
  },
  {
    id: "app_nyfa_2026",
    opportunity_id: "opp_nyfa",
    status: "submitted",
    fee_paid: true,
    submitted_at: "2026-01-19",
    sections: [
      {
        key: "work_statement",
        content:
          "Sculptures and room-scale installations made from material gathered inside closed steel mills and textile plants across the Rust Belt. Conveyor belting, mill rags, rolling-mill remnants — restitched into figures that sit between mourning and refusal. The work is not nostalgia. The landscape didn't die, it was unmade, and the materials still have a position on the matter.",
        last_edited: "2026-01-19",
        versions: []
      },
      {
        key: "work_sample_info",
        content:
          "These five works — four sculptures and one installation — trace a single methodology applied across three sites: Aliquippa (PA), Cannon Mills (NC), and the Carrie Furnace (Rankin, PA). Each was produced after a sanctioned site visit with the heritage organization stewarding the building, with formal provenance documentation. The studio process is hand-stitched and riveted; the work is hung from forged steel hooks rather than plinthed. Aliquippa Carrier (Image 1) uses a 12-foot section of conveyor belting that moved coke through the Aliquippa rolling mill from 1958 until plant closure in 1985. Half-Life Garments (Image 2) gathers fabric scraps from the Cannon Mills site into eleven garment-like hangings. Forum 91 (Image 3) was a floor work for Carnegie Museum of Art's Forum group exhibition. After the Furnace (Image 4) is a suite of five wall-mounted forms made during a residency at Bemis. Field Recording (Image 5) is a slow-pan video made during a sanctioned walk-through of the Carrie Furnace site.",
        last_edited: "2026-01-19",
        versions: []
      }
    ],
    work_sample_slots: [
      { slot_index: 0, work_id: "wk1" },
      { slot_index: 1, work_id: "wk2" },
      { slot_index: 2, work_id: "wk3" },
      { slot_index: 3, work_id: "wk4" },
      { slot_index: 4, work_id: "wk5" }
    ],
    budget_lines: [],
    timeline: [],
    references_used: [],
    updated_at: "2026-01-19"
  },
  {
    id: "app_rijks_2027",
    opportunity_id: "opp_rijksakademie",
    status: "discovered",
    fee_paid: false,
    sections: [],
    work_sample_slots: [],
    budget_lines: [],
    timeline: [],
    references_used: [],
    updated_at: "2026-04-22"
  }
];

// ----- Profile completeness helpers -----

export function profileCompleteness() {
  const checks = [
    { label: "Identity & eligibility", done: true },
    { label: "Disciplines", done: true },
    { label: "Artist statement — 50 / 100 / 250 word variants", done: statements.filter(s => s.kind === "artist_statement").length >= 3 },
    { label: "Bio — 50 / 100 / 250 word variants", done: statements.filter(s => s.kind === "bio").length >= 3 },
    { label: "CV (15+ entries)", done: cv.length >= 15 },
    { label: "6+ works with captions", done: works.length >= 6 },
    { label: "2+ reusable projects", done: projects.length >= 2 },
    { label: "4 references", done: references.length >= 4 },
    { label: "Prior awards logged", done: awards.length >= 1 },
    { label: "Budget template", done: budgetTemplates.length >= 1 }
  ];
  const done = checks.filter(c => c.done).length;
  return { checks, done, total: checks.length, pct: Math.round((done / checks.length) * 100) };
}
