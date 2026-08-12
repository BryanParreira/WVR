export type Post = {
  slug: string
  title: string
  excerpt: string
  // SEO meta description, distinct from the on-page excerpt when a tighter
  // search-snippet phrasing helps. Falls back to excerpt if omitted.
  metaDescription?: string
  category: string
  date: string
  // Only set when content is genuinely revised — the listing shows this
  // instead of the original publish date so evergreen posts don't read as
  // stale just because they weren't recently republished.
  updatedAt?: string
  readTime: string
  featured?: boolean
  // 2-4 sentence extractable summary answering the post's core question,
  // rendered in a distinct callout near the top — this is what AI engines
  // lift cleanly into generated answers. Optional; omit if the post doesn't
  // reduce to a direct-answer format.
  directAnswer?: string
  // Optional FAQ block rendered at the end + FAQPage schema. Only for
  // genuinely question-driven topics — don't force it onto every post.
  faq?: { q: string; a: string }[]
  // Slug into CASE_STUDIES this post should link to, when topically relevant.
  relatedCaseStudy?: string
  content: Section[]
}

type Section = {
  heading?: string
  body: string
}

// Author is always the organization, never an individual — see AGENTS trust
// rules on no personal names/handles in blog content.
export const BLOG_AUTHOR = "WebVisionRank"

export const POSTS: Post[] = [
  {
    slug: "vulnerability-scan-vs-penetration-test",
    title: "Vulnerability Scan vs. Real Penetration Test: Why the Difference Matters for What You're Paying For",
    excerpt:
      "These two get sold interchangeably, and they are not the same service. If you don't know which one you're buying, you're probably overpaying for one or underprotected by the other.",
    metaDescription:
      "The real difference between a vulnerability scan and a penetration test, and what that means for pricing and actual security coverage.",
    category: "Cybersecurity",
    date: "2026-08-12",
    readTime: "6 min read",
    directAnswer:
      "A vulnerability scan is automated software checking your systems against a database of known issues: fast, cheap, and shallow. A penetration test is a person actively trying to break in, chaining weaknesses together the way a real attacker would. A scan tells you what might be wrong. A pentest tells you what's actually exploitable. They're priced differently because they cost differently to deliver, and a lot of 'penetration testing' sold to small businesses is actually just a scan with a PDF wrapper.",
    faq: [
      {
        q: "Is a vulnerability scan enough for a small business?",
        a: "For ongoing baseline hygiene, yes, run scans regularly. But a scan won't tell you if those individually low-severity findings can be chained together into something serious, which is exactly the kind of risk a real test is built to find.",
      },
      {
        q: "How do I know if I'm actually getting a real penetration test?",
        a: "Ask what's included: manual exploitation attempts, not just automated tooling output. A real test comes with a narrative of what was tried and what worked, not just a severity-ranked list pulled from a scanner's database.",
      },
    ],
    content: [
      {
        body: "These two services get sold under the same umbrella constantly, and small businesses end up either paying pentest prices for scan-level work, or assuming a cheap scan covered them when it didn't. The difference isn't marketing language. It's a fundamentally different activity.",
      },
      {
        heading: "What a vulnerability scan actually is",
        body: "A vulnerability scan is software checking your systems against a database of known issues: outdated software versions, missing patches, common misconfigurations. It's automated, it's fast, and it can run on a schedule without much human involvement. That makes it cheap. It's also shallow by design: it flags what's known to be wrong, not what's actually exploitable in your specific environment.",
      },
      {
        heading: "What a real penetration test actually is",
        body: "A penetration test is a person, not just a tool, actively trying to get in. That means chaining findings together the way a real attacker would: a low-severity information leak here, a weak credential there, combined into an actual path to something sensitive. Automated scanners are part of the toolkit, but the value is in the manual work layered on top: the part that finds the things a scanner's database doesn't know to look for yet.",
      },
      {
        heading: "Why this gets sold confusingly",
        body: "Running a scan and repackaging the output as a 'penetration test report' is cheap to deliver and looks similar on paper: same category of PDF, same severity ratings. The tell is in the methodology section, if there is one. If a report doesn't describe what was manually attempted, it's very likely a scan with a different label.",
      },
      {
        heading: "What this means for pricing",
        body: "A scan should cost roughly what automated tooling costs to run and interpret. A real test costs what skilled manual hours cost, because that's what you're actually buying. If two quotes for 'penetration testing' are wildly different in price, ask specifically what's included before assuming the cheaper one is the better deal. It might just be a scan.",
      },
    ],
  },
  {
    slug: "n8n-vs-custom-automation",
    title: "n8n vs. Building Custom: When a No-Code Automation Platform Is the Wrong Choice",
    excerpt:
      "n8n and similar no-code automation tools are genuinely good for a lot of workflows. They're also the wrong tool past a certain point of complexity. Here's how to actually tell the difference before you build on the wrong foundation.",
    metaDescription:
      "When to use n8n or similar no-code automation platforms versus building a custom pipeline, based on real workflow complexity tradeoffs.",
    category: "AI & Automation",
    date: "2026-08-12",
    readTime: "6 min read",
    directAnswer:
      "n8n and similar no-code platforms are the right call when a workflow is linear, has a handful of steps, and doesn't need fine-grained control over error handling or state. They stop being the right call once a workflow needs complex conditional branching, custom retry logic, or has to maintain state across long-running processes. At that point the visual builder gets fought against instead of helping, and a custom pipeline is less work overall, not more.",
    content: [
      {
        body: "No-code automation platforms like n8n solve a real problem: most business automation doesn't need custom software, it needs a handful of steps wired together reliably. For a lot of workflows, that's exactly right. The mistake is treating that as universally true.",
      },
      {
        heading: "Where n8n is genuinely the right call",
        body: "Linear workflows with a clear trigger and a handful of steps (a new lead comes in, gets enriched, gets scored, gets routed to a CRM) are exactly what these platforms are built for. Fast to build, easy to modify without redeploying code, and the visual layout makes it easy for a non-engineer to understand what's happening. For most small-business automation needs, this is the correct starting point, not a compromise.",
      },
      {
        heading: "Where it starts fighting you",
        body: "Complex conditional branching gets ugly fast in a visual builder. Logic that would be a clean function in code becomes a sprawling web of nodes that's harder to read than write. Custom retry and error-handling logic is limited to what the platform exposes, which is rarely enough once failure modes get specific. And anything that needs to maintain state across a long-running, multi-day process tends to get bolted on awkwardly rather than supported natively.",
      },
      {
        heading: "The actual tell",
        body: "The signal isn't complexity in the abstract. It's whether you're spending more time working around the platform's constraints than the automation itself would take to build in code. When debugging a workflow means clicking through a dozen nodes to find where state diverged from what you expected, that's the platform telling you it's the wrong tool for this particular job.",
      },
      {
        heading: "The honest recommendation",
        body: "Start with a no-code platform for anything linear and well-defined. It's faster to ship and easier to hand off. Move to custom code when the workflow's failure modes get specific enough that you need real control over retries, state, and error paths. Most businesses don't need to make this call often, but knowing where the line is saves you from over-building early or hitting a wall later.",
      },
    ],
  },
  {
    slug: "geo-isnt-seo-with-extra-steps",
    title: "GEO Isn't SEO With Extra Steps: The Structural Changes That Actually Matter",
    excerpt:
      "Most GEO advice treats it as SEO plus a checklist item. The actual shift is structural: how content needs to be built changes when the reader is a language model deciding what to cite, not a ranking algorithm deciding what to list.",
    metaDescription:
      "Why Generative Engine Optimization requires structurally different content decisions than traditional SEO, not just additional tactics layered on top.",
    category: "Digital Marketing",
    date: "2026-08-12",
    readTime: "6 min read",
    directAnswer:
      "SEO optimizes for a ranking algorithm parsing signals across a page: backlinks, keyword density, technical health. GEO optimizes for a language model deciding whether a specific passage is worth citing in a generated answer, which rewards self-contained, directly-answering, structurally clear content over content optimized to rank as a whole page. Doing both means treating them as separate disciplines with separate content decisions, not one checklist with an extra item.",
    content: [
      {
        body: "Most GEO content online treats it as SEO with an item added to the checklist: add some schema markup, write more 'authoritative' sentences, done. That undersells what's actually different, and it means a lot of businesses are doing GEO in name only.",
      },
      {
        heading: "The reader changed, not just the ranking factors",
        body: "Traditional SEO optimizes for a ranking algorithm evaluating a whole page against a query: backlinks, keyword relevance, technical performance, all aggregated into a rank. GEO optimizes for a language model deciding, passage by passage, whether a specific chunk of text is worth pulling into a generated answer. That's a different reader with different needs, not the same reader with a longer checklist.",
      },
      {
        heading: "What actually changes structurally",
        body: "Content that performs well for GEO tends to be self-contained at the paragraph level: a passage that directly answers a specific question without requiring the surrounding page for context, because that's the unit a language model is actually evaluating. This is why a well-structured direct-answer block near the top of a piece of content outperforms a page that only builds its argument gradually across 2,000 words the way strong SEO content often does.",
      },
      {
        heading: "Why keyword density stops mattering as much",
        body: "SEO rewards content that signals topical relevance through repeated terms and semantic variation. Language models aren't counting keyword occurrences. They're evaluating whether a passage factually and clearly answers the question being asked. Content that reads like it was written to satisfy a keyword tool often reads as exactly that to a model deciding what's worth citing, and gets passed over for something plainer and more direct.",
      },
      {
        heading: "Doing both without treating them as one thing",
        body: "The right approach isn't picking one. It's recognizing they're separate disciplines that happen to overlap on the same page. Technical SEO foundations (fast load times, clean indexing, working backlinks) still matter for traditional search traffic. Structuring content in direct-answer, self-contained passages is what earns citations from AI engines. Businesses that treat GEO as a checkbox on an SEO audit are the ones falling behind the ones treating it as its own thing.",
      },
    ],
  },
  {
    slug: "zero-trust-legacy-app-retrofit-failures",
    title: "Where Zero Trust Implementations Actually Fail in Small-Business Environments",
    excerpt:
      "Zero Trust sounds clean in a vendor deck. In practice, it runs into the one on-prem application your client's whole business depends on: the one nobody built with per-request auth in mind. Here's what that failure actually looks like.",
    category: "Cybersecurity",
    date: "2026-08-12",
    readTime: "7 min read",
    content: [
      {
        body: "Most Zero Trust content online describes the model, not the implementation. Verify every request, assume breach, least privilege: all correct, all reasonable, and none of it tells you what happens when you actually try to apply it to a small business's real environment. In practice, the model doesn't fail on the concepts. It fails on one specific, boring thing: the legacy line-of-business application nobody wants to touch.",
      },
      {
        heading: "The app nobody wants to touch",
        body: "It's usually an old on-premise system (an internal tool, a scheduling or inventory app, sometimes something closer to an ERP) that's been running for years and that the business genuinely depends on day to day. It was built on the assumption that anyone who could reach it on the local network was trusted. No per-request authentication, no token validation, sometimes a single shared login for the whole office. It works, and nobody wants to be the one who breaks it.",
      },
      {
        heading: "Why buying an identity provider doesn't fix this",
        body: "The instinct is to layer a modern identity provider on top and call the job done. That helps for everything that can actually speak to it: SaaS tools, anything with SSO support. It does nothing for the legacy app itself, because the app was never built to ask 'who is this and are they allowed to do this' on every request. It just trusts the network. An identity provider sitting next to a system that still implicitly trusts the LAN isn't Zero Trust. It's Zero Trust for the parts of the stack that were already easy.",
      },
      {
        heading: "What actually has to happen",
        body: "The honest fix is architectural: the app needs to be re-built or replaced to support real per-request authentication, or it needs to be isolated behind something that can enforce that on its behalf, a properly configured reverse proxy or access broker sitting in front of it, with network segmentation as the containment layer while that work gets planned. Neither of those is a weekend project, and neither is free.",
      },
      {
        heading: "The uncomfortable truth for small businesses",
        body: "Most small businesses are not going to fund a full re-architecture of a system that currently works, just for a security model they read about in a blog post. That's a legitimate budget call, not a failure of judgment. The realistic path is layered mitigation: segment the app onto its own restricted network zone, tighten who and what can reach it, monitor it more closely than you'd otherwise bother to, while being honest with the client that this isn't full Zero Trust, it's damage control around a system that can't participate in it yet. Pretending otherwise is the actual failure mode, not the compromise itself.",
      },
    ],
  },
  {
    slug: "local-first-siem-tradeoffs",
    title: "What a Local-First SIEM Actually Buys You (And What It Costs You)",
    excerpt:
      "Running your own local-first SIEM instead of a managed cloud platform sounds like the more serious, more secure choice. Sometimes it is. It's also a real engineering tradeoff most small teams underestimate. Here's the honest version.",
    category: "Cybersecurity",
    date: "2026-08-12",
    readTime: "6 min read",
    content: [
      {
        body: "I built a local-first SIEM because I wanted full control over where log data lived and how it was analyzed, instead of shipping everything to a third-party platform's cloud. That decision was right for what I needed. It is not automatically right for everyone, and most of the local-first pitch you'll read skips the part where it tells you what you're actually signing up for operationally.",
      },
      {
        heading: "The real case for local-first",
        body: "Data sovereignty is the honest first reason: your logs, including anything sensitive that ends up in them, never leave infrastructure you control. Cost predictability is the second: no per-gigabyte ingest pricing that quietly scales against you as your log volume grows, which is exactly what happens with most managed platforms once you're actually monitoring something seriously. Control is the third: you decide retention windows, detection logic, and tuning, instead of working inside whatever your vendor's platform allows.",
      },
      {
        heading: "What it actually costs you",
        body: "None of that is free. You now own storage scaling as log volume grows. You own tuning every detection rule to cut down noise, which is slow, iterative work that a managed platform's vendor would otherwise be doing for you across thousands of customers' worth of tuning data. You don't get a vendor's threat intel feed by default. And critically, unless you're also running a 24/7 SOC, alerts fire into a system that's only being watched when someone is actually looking at it, which for a small team means real gaps in coverage.",
      },
      {
        heading: "The single point of knowledge problem",
        body: "With a managed SIEM, if the person who configured it leaves, the vendor's platform and support still work. With something you built and run yourself, the operational knowledge of how it's tuned and what its alerts actually mean lives in one place: you. That's a real risk for a small team, not a hypothetical one.",
      },
      {
        heading: "Who this is actually right for",
        body: "Local-first makes sense when you have someone who's genuinely willing to own the operational burden (tuning, storage, watching it) and where data control matters enough to justify that cost. For most small businesses without a dedicated security function, a managed SIEM is the more honest recommendation, even though it's the less exciting answer. The right tool is the one that matches who's actually going to run it, not the one that sounds more serious in a sales conversation.",
      },
    ],
  },
  {
    slug: "default-credentials-recurring-pentest-finding",
    title: "The Pentest Finding That Shows Up in Almost Every Small-Business Engagement",
    excerpt:
      "It's not a zero-day. It's not a sophisticated chain of exploits. Across small-business assessments, the single most common finding is embarrassingly simple, and the reason it keeps happening has nothing to do with technical sophistication.",
    category: "Cybersecurity",
    date: "2026-08-12",
    readTime: "6 min read",
    content: [
      {
        body: "If you want to know what actually puts a small business at risk, don't look at exotic attack chains. Look at what shows up over and over across real engagements. For small-business assessments, that's default or weak credentials, left on admin panels, network gear, and internal services that were installed, configured once, and never touched again.",
      },
      {
        heading: "Where it actually shows up",
        body: "It's rarely the primary website or customer-facing app. Those tend to get at least some attention. It's the router admin page still on the factory password. It's an internal dashboard or management tool installed by a vendor during setup, with credentials that were never rotated because nobody was ever assigned to rotate them. It's a service that was spun up for a one-time task and quietly kept running.",
      },
      {
        heading: "Why it keeps happening",
        body: "This isn't a sophistication problem. It's an ownership problem. Something gets installed, often by a vendor or contractor doing a specific job, and once it works, everyone moves on. Nobody owns the step that comes after 'it works': hardening it, rotating the default credentials, adding it to an inventory so someone actually knows it exists. Small businesses rarely have a security review built into their deployment process, so nothing catches it until an assessment does, or until someone else finds it first.",
      },
      {
        heading: "Why it's not a hard fix",
        body: "The technical fix, once you know about it, is trivial: change the password, close the exposed interface, done. That's exactly what makes this finding frustrating rather than impressive: it requires no clever exploitation, no chained vulnerabilities, just someone checking. Which means it's also one of the cheapest risks a small business can eliminate, if the process gap gets closed instead of just the individual instance.",
      },
      {
        heading: "The actual fix isn't more tools",
        body: "Buying another security product doesn't fix this. What fixes it is a basic asset inventory (knowing what's actually running and internet-reachable) plus a real credential rotation habit, and a re-check step that happens periodically, not just once at deployment. That's process, not technology. It's also exactly the kind of unglamorous work that keeps showing up unfixed, because it's nobody's job by default.",
      },
    ],
  },
  {
    slug: "ai-agents-enterprise-automation",
    title: "Why AI Agents Are Replacing Traditional Automation",
    excerpt:
      "Rule-based automation breaks the moment a workflow changes. Agentic AI systems reason about goals, adapt to context, and handle exceptions without human intervention. Here's what that shift means for your operations.",
    category: "AI & Automation",
    date: "2025-06-10",
    readTime: "7 min read",
    featured: true,
    directAnswer:
      "Traditional automation follows fixed rules and breaks the moment a workflow changes. Agentic AI systems reason about a goal instead, adapting to context and handling exceptions without someone rewriting the rules. The tradeoff: agentic systems need real guardrails, observability, and human-in-the-loop escalation to be production-safe, not just a working demo.",
    content: [
      {
        body: "For the last decade, automation meant scripts. If X happens, do Y. These systems work well in predictable environments — but the moment a document format changes, an API response shifts, or an edge case appears, everything breaks and someone gets paged at 2am.",
      },
      {
        heading: "The difference is reasoning",
        body: "Agentic AI systems don't execute rules. They reason about goals. Given an objective like 'process this invoice and update the ERP', an agent reads the document, identifies the relevant fields, handles missing data by inferring from context, and completes the task — even if the invoice format is one it's never seen before.",
      },
      {
        heading: "Multi-agent orchestration",
        body: "The real power emerges when agents collaborate. An orchestrator agent breaks a complex task into sub-tasks, delegates to specialist agents (a web search agent, a data extraction agent, a writing agent), then synthesizes the results. This mirrors how high-performing human teams actually work.",
      },
      {
        heading: "What this means operationally",
        body: "The cost of automating a new workflow drops from weeks of engineering to days of prompt engineering and testing. Exception handling — the thing that makes traditional automation brittle — becomes the system's default behavior rather than an afterthought instead of something bolted on after the first outage.",
      },
      {
        heading: "The implementation reality",
        body: "Agentic systems require careful design. Guardrails, observability, and human-in-the-loop escalation paths aren't optional — they're what separates a production system from a demo. The organizations that move fastest here are the ones that treat AI agents like they'd treat a new employee: with clear scope, defined authorities, and monitored output until trust is established.",
      },
    ],
  },
  {
    slug: "zero-trust-architecture-2025",
    title: "Zero Trust Architecture: The Security Model That Assumes Nothing",
    excerpt:
      "Perimeter-based security is dead. Zero Trust verifies every request as though it originates from an untrusted network. We break down implementation, common pitfalls, and why this is non-negotiable in 2025.",
    category: "Cybersecurity",
    date: "2025-05-28",
    readTime: "9 min read",
    directAnswer:
      "Zero Trust is a security model built on three principles: verify every user and device explicitly, enforce least-privilege access on every request, and design as if attackers are already inside the network. It replaces the older model of trusting anything already inside the corporate perimeter, a model that stopped making sense once SaaS sprawl, cloud infrastructure, and remote access erased that perimeter.",
    content: [
      {
        body: "The old security model assumed everything inside the corporate network was trustworthy. VPNs extended that perimeter to remote workers. It was a reasonable model in 2005. In 2025, with SaaS sprawl, cloud infrastructure, contractor access, and supply chain attacks, the perimeter doesn't exist anymore.",
      },
      {
        heading: "Never trust, always verify",
        body: "Zero Trust is built on three core principles: verify every user and device explicitly, use least-privilege access for every request, and assume breach — design your systems as if attackers are already inside. This isn't paranoia. It's engineering for the actual threat landscape.",
      },
      {
        heading: "The pillars of implementation",
        body: "A Zero Trust architecture spans identity (strong MFA, continuous authentication), device health (posture checks before access is granted), network segmentation (micro-perimeters around every workload), and data classification (knowing what's sensitive and enforcing access accordingly). Miss any pillar and you have Zero Trust theater.",
      },
      {
        heading: "Where most implementations fail",
        body: "The common failure mode is retrofitting Zero Trust onto legacy architecture. Organizations add an identity provider, check a compliance box, and call it done. But legacy apps that assume network trust can't participate in a Zero Trust model without re-architecture. The unglamorous work is identifying and migrating those systems.",
      },
      {
        heading: "The ROI case",
        body: "A successful Zero Trust deployment doesn't just reduce breach risk — it accelerates secure access for remote teams, simplifies compliance reporting, and reduces the blast radius of any individual credential compromise. For organizations that have experienced a breach, the calculus is obvious. For those that haven't, the question isn't whether to implement Zero Trust but how fast.",
      },
    ],
  },
  {
    slug: "geo-vs-seo-ai-search",
    title: "GEO vs SEO: How to Rank in the Age of AI Search",
    excerpt:
      "ChatGPT, Perplexity, and Google's AI Overviews are changing how information surfaces. Generative Engine Optimization is not SEO rebranded — it's a fundamentally different discipline with different signals.",
    category: "Digital Marketing",
    date: "2025-05-14",
    readTime: "6 min read",
    directAnswer:
      "SEO optimizes content to rank in traditional search results; GEO (Generative Engine Optimization) optimizes content to be cited or quoted by AI systems like ChatGPT, Perplexity, and Google's AI Overviews. The two overlap but reward different things: GEO favors specific, well-structured, directly-answering content over content built primarily around keyword targeting.",
    content: [
      {
        body: "For twenty years, SEO was the game. Keywords, backlinks, technical health, Core Web Vitals. Rank on page one, get traffic. The playbook was well-understood. Then large language models learned to answer questions directly — and a growing share of search intent never produces a click to a website at all.",
      },
      {
        heading: "What GEO actually means",
        body: "Generative Engine Optimization is the practice of structuring content so it's cited, quoted, or used by AI systems — ChatGPT, Perplexity, Claude, Google's AI Overview, Bing Copilot. The signal isn't 'does this rank for a keyword?' It's 'does this get surfaced when an AI answers a question in your domain?'",
      },
      {
        heading: "The signals are different",
        body: "AI systems prioritize authority, specificity, and structure. A well-cited academic tone outperforms keyword-stuffed content. Structured data, clear factual claims, and content that directly answers specific questions get surfaced more reliably than long-form SEO content optimized for broad terms.",
      },
      {
        heading: "What you should be doing now",
        body: "Build entity authority — establish your brand as the definitive source on specific topics within your domain. Use schema markup liberally. Write for questions, not keywords. Create content that answers specific, high-intent queries in clear, quotable prose. Monitor your brand's mentions across AI platforms using tools designed for GEO tracking.",
      },
      {
        heading: "SEO isn't dead",
        body: "Traditional search still drives significant traffic. The winning strategy is doing both — a technical SEO foundation (fast site, clean indexing, solid backlink profile) plus a GEO layer (authority content, entity building, structured data). Organizations that wait to see where AI search settles before acting are ceding ground to competitors who are building authority now.",
      },
    ],
  },
  {
    slug: "core-web-vitals-2025",
    title: "Core Web Vitals in 2025: What Actually Moves the Needle",
    excerpt:
      "INP replaced FID, LCP scoring tightened, and CLS thresholds got stricter. Most advice online is outdated. This is what's working today for sub-second performance on Next.js apps.",
    category: "Web Development",
    date: "2025-04-30",
    readTime: "8 min read",
    directAnswer:
      "Core Web Vitals are Google's three ranking-relevant performance metrics: LCP (largest contentful paint, target under 2.5s), INP (interaction to next paint, which replaced FID as the responsiveness metric in 2024), and CLS (cumulative layout shift). The biggest wins come from optimizing the hero image, minimizing main-thread-blocking JavaScript, and fixing dimension-less images and web fonts that cause layout shift.",
    content: [
      {
        body: "Google's Core Web Vitals are no longer a nice-to-have. They're a ranking factor, and the thresholds have gotten tighter. Most guides you'll find are still referencing FID — a metric Google deprecated in March 2024. INP (Interaction to Next Paint) replaced it, and it measures something harder to optimize.",
      },
      {
        heading: "INP: the new bottleneck",
        body: "FID measured the delay before the browser could start processing an interaction. INP measures the full duration from input to the next paint — including JavaScript execution and rendering. This means heavy client-side React components, large event handlers, and anything that blocks the main thread are now directly measurable liabilities.",
      },
      {
        heading: "LCP: where most sites fail",
        body: "Largest Contentful Paint should be under 2.5 seconds. The biggest lever is your hero image or above-the-fold element. Preload it explicitly, use modern formats (AVIF or WebP), serve from a CDN with correct Cache-Control headers, and ensure it's not blocked by render-blocking scripts. A correctly configured Next.js Image component with `priority` gets you most of the way there.",
      },
      {
        heading: "CLS: the invisible problem",
        body: "Cumulative Layout Shift catches movement that happens after the page loads. The culprits are always the same: images without explicit dimensions, ads and embeds without reserved space, dynamically injected content above existing content, and web fonts causing text reflow. Fix dimensions, use `font-display: optional`, and reserve space for async-loaded content.",
      },
      {
        heading: "The Next.js-specific wins",
        body: "Server Components eliminate client-side JavaScript for static content, directly improving INP. The `next/image` component handles lazy loading, sizing, and format optimization automatically. `next/font` eliminates font-related CLS entirely. Turbopack dramatically reduces development compilation times, which doesn't affect prod scores but does make iterating on performance fixes faster.",
      },
    ],
  },
  {
    slug: "multi-agent-rag-enterprise",
    title: "Building a Multi-Agent RAG System for Enterprise Knowledge",
    excerpt:
      "A single LLM with retrieval augmented generation handles simple Q&A. Enterprise knowledge is messier — conflicting documents, versioned policies, domain-specific terminology. Multi-agent RAG solves this.",
    category: "AI & Automation",
    date: "2025-04-15",
    readTime: "11 min read",
    directAnswer:
      "Multi-agent RAG decomposes retrieval into specialized agents (a routing agent, domain-specific retrieval agents, a synthesis agent, and a validation agent) instead of relying on one retrieval pass from a single model. This matters for enterprise knowledge specifically because it's contradictory, versioned, and scattered across systems in a way a naive single-pass RAG pipeline handles poorly.",
    content: [
      {
        body: "Retrieval Augmented Generation (RAG) connects a language model to a document store. The model doesn't need to memorize your company's policies — it retrieves the relevant document at query time and reasons over it. This works beautifully for simple, well-structured knowledge bases. Enterprise knowledge is rarely simple or well-structured.",
      },
      {
        heading: "The enterprise knowledge problem",
        body: "Real enterprise knowledge is contradictory (last year's policy vs this year's update), domain-specific (jargon that general models don't understand), distributed (in PDFs, SharePoint, Confluence, email threads, Slack), and versioned (the 2023 rate schedule is wrong; the 2024 one applies except for contracts signed before March). A naive RAG pipeline will confidently give wrong answers.",
      },
      {
        heading: "Where multi-agent design helps",
        body: "The solution is to decompose retrieval into specialized agents. A routing agent determines which knowledge domain a query belongs to. Domain-specific retrieval agents search within curated, versioned document sets. A synthesis agent reconciles potentially conflicting retrieved passages and surfaces uncertainty explicitly. A validation agent checks the answer against known facts before delivery.",
      },
      {
        heading: "Chunking strategy matters more than model choice",
        body: "The most impactful variable in RAG quality isn't which embedding model you use — it's how you chunk documents. Semantic chunking (splitting by meaning rather than by token count) dramatically improves retrieval relevance. Parent-child chunking (storing full sections but indexing by sentence) lets you retrieve precise matches while maintaining context in the response.",
      },
      {
        heading: "Evaluation is non-negotiable",
        body: "Production RAG systems need continuous evaluation pipelines. You need to track retrieval accuracy (did we get the right documents?), answer faithfulness (did the model stay grounded in the retrieved content?), and answer relevance (did we actually answer the question?). Without these metrics, you're flying blind, and hallucinations will eventually cause real problems.",
      },
    ],
  },
  {
    slug: "penetration-testing-small-business",
    title: "Penetration Testing Isn't Just for Enterprises Anymore",
    excerpt:
      "Attackers don't discriminate by company size. A focused penetration test on a small business often reveals critical exposures — misconfigured S3 buckets, default credentials, unpatched dependencies — that cost nothing to exploit.",
    category: "Cybersecurity",
    date: "2025-04-02",
    readTime: "5 min read",
    directAnswer:
      "Automated attack tools scan every reachable IP range regardless of company size, so small businesses face the same opportunistic attacks as large ones. A focused small-business penetration test typically runs 3 to 5 days and checks external network exposure, web application vulnerabilities, and social engineering risk. The value is in remediation guidance and a re-test, not just a findings report.",
    content: [
      {
        body: "The assumption that small businesses aren't worth attacking is dangerous and wrong. Automated scanning tools don't target specific companies — they probe every IP range continuously, looking for exposed services and known vulnerabilities. A $2M company with an exposed admin panel is as easy to compromise as a $200M company with the same misconfiguration.",
      },
      {
        heading: "What a small business pentest actually covers",
        body: "A focused penetration test for a small business typically runs 3–5 days and covers external network exposure (publicly accessible services, misconfigured cloud storage, exposed admin interfaces), web application vulnerabilities in customer-facing systems, and social engineering exposure through phishing simulation. The ROI on discovering a critical finding before an attacker does is obvious.",
      },
      {
        heading: "The findings that appear most often",
        body: "After running assessments across dozens of small businesses, the same categories appear repeatedly: S3 buckets with public read access containing sensitive data, default credentials on admin interfaces, outdated WordPress plugins with known CVEs, overly permissive cloud IAM roles, and SSL certificates for subdomains that were forgotten but still accessible. None of these require sophisticated exploitation — they require a checklist.",
      },
      {
        heading: "Remediation over reporting",
        body: "A penetration test is only valuable if findings get fixed. The best testing engagements include remediation guidance prioritized by exploitability and impact, a re-test after fixes are deployed, and documentation that gives your team a baseline to maintain. A PDF report that sits in a folder isn't security — it's a paper trail that you knew about a problem.",
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Maps a post's category to the relevant service page anchor — every post
// links to at least one service page so blog traffic can convert, not just
// accumulate pageviews.
const CATEGORY_TO_SERVICE_HREF: Record<string, string> = {
  "Cybersecurity":      "/services#cybersecurity",
  "AI & Automation":    "/services#ai-automation",
  "Digital Marketing":  "/services#digital-marketing",
  "Web Development":    "/services#web-development",
}

export function getRelatedServiceHref(category: string): string | undefined {
  return CATEGORY_TO_SERVICE_HREF[category]
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const sameCategory = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category)
  const rest = POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category)
  return [...sameCategory, ...rest].slice(0, limit)
}
