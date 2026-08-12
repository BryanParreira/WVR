export const NEEDS_REAL_DATA = "{{NEEDS_REAL_DATA"

export function isPlaceholder(value: string): boolean {
  return value.startsWith(NEEDS_REAL_DATA)
}

export type CaseStudyResult = {
  label: string
  value: string
}

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  summary: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  quote?: { content: string; name: string; role: string }
}

// Only real, paying clients get a case study entry — see AGENTS trust rules.
// Narrative fields (challenge/solution) and result values are marked
// {{NEEDS_REAL_DATA: ...}} until the real engagement details are supplied.
// Format needed per field: challenge/solution in your own words (a few
// sentences each), results as short label + real, verifiable value.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ridgeline-roofing-mn",
    client: "Ridgeline Roofing MN",
    industry: "Construction",
    summary:
      "Ridgeline Roofing MN came to us with a functioning website (built by another company) but almost no social presence, no automation in their day-to-day operations, and no one managing security or the rest of their tech stack.",
    challenge:
      "Ridgeline's website was already handled elsewhere, so the gap wasn't a build. It was everything around it. Their organic social content wasn't reaching anyone beyond existing followers, manual work was eating time that should've gone into the business, and there was no one actively managing security or the broader tech stack.",
    solution:
      "We became Ridgeline's ongoing tech partner for everything outside the website itself: social media management and organic content strategy, workflow automation to cut down manual admin work, security, and general tech support as needs come up. On the marketing side, that meant a consistent posting strategy built around what actually gets engagement for a local roofing company: before-and-after project content, seasonal storm-response messaging, and local trust signals.",
    results: [
      { label: "Organic social views (avg.)", value: "100 → 2,000/mo" },
      { label: "Organic reach increase", value: "20×" },
    ],
  },
  {
    slug: "superior-cleaning-services",
    client: "Superior Cleaning Services",
    industry: "Facilities",
    summary:
      "Superior Cleaning Services had no online activity at all before working with us. It's a shorter, more recent engagement than Ridgeline's, but organic reach is already building.",
    challenge:
      "Superior Cleaning had zero social media presence: no posting, no content, nothing bringing in views organically to reach potential commercial and residential clients in their service area.",
    solution:
      "We took them from no activity to a consistent schedule of two posts a week, mixing fun, informational videos with real client work, building organic views the same way we did for Ridgeline, without paid ads.",
    results: [
      { label: "Posting cadence", value: "0 → 2×/week" },
    ],
  },
  {
    slug: "tienda-guerrero",
    client: "Tienda Guerrero",
    industry: "Restaurant",
    summary:
      "Tienda Guerrero, a Mexican restaurant, needed an online restaurant website: a real menu and ordering presence, not just a digital business card.",
    challenge:
      "Before working with us, Tienda Guerrero had no way to take orders online. Every order meant a phone call, which meant staff constantly tied up answering the phone instead of running the restaurant.",
    solution:
      "We built Tienda Guerrero's online store and restaurant ordering system from the ground up: a real menu and ordering presence, not just a digital business card.",
    results: [
      { label: "Ordering", value: "Phone → Online" },
    ],
    quote: {
      content: "It brought in a ton of new orders and freed us up from constantly answering the phone.",
      name: "Evelyn",
      role: "Family Member, Tienda Guerrero",
    },
  },
  {
    slug: "abc-driving-school",
    client: "ABC Driving School",
    industry: "Education",
    summary:
      "ABC Driving School needed a website that made it simple for parents and students to sign up for driving instruction.",
    challenge:
      "ABC Driving School needed a fast, mobile-friendly website that made signing up for classes simple for parents and students.",
    solution:
      "We built and optimized ABC Driving School's website from the ground up, with sign-up flow as the core focus.",
    results: [
      { label: "Registrations via site", value: "↑ Increase" },
    ],
    quote: {
      content: "We've seen a noticeable bump in new student registrations directly through the site!",
      name: "Alicia",
      role: "Co-Owner, ABC Driving School",
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

// Homepage stat badges pull only from verified (non-placeholder) case-study
// results, so no unattributed agency-wide number can appear. Returns []
// until real results exist.
export function getVerifiedHomepageStats(): CaseStudyResult[] {
  return CASE_STUDIES.flatMap((c) => c.results)
    .filter((r) => !isPlaceholder(r.value) && !isPlaceholder(r.label))
    .slice(0, 3)
}
