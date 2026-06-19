export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
  content: Section[]
}

type Section = {
  heading?: string
  body: string
}

export const POSTS: Post[] = [
  {
    slug: "ai-agents-enterprise-automation",
    title: "Why AI Agents Are Replacing Traditional Automation",
    excerpt:
      "Rule-based automation breaks the moment a workflow changes. Agentic AI systems reason about goals, adapt to context, and handle exceptions without human intervention. Here's what that shift means for your operations.",
    category: "AI & Automation",
    date: "2025-06-10",
    readTime: "7 min read",
    featured: true,
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
        body: "The cost of automating a new workflow drops from weeks of engineering to days of prompt engineering and testing. Exception handling — the thing that makes traditional automation brittle — becomes the system's default behavior rather than an afterthought. Teams that adopt agentic workflows are reporting 40–60% reductions in manual processing time within the first quarter.",
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
