const BASE = "https://webvisionrank.com"

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Ld({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Organization (root layout) ───────────────────────────────────────────────
export function OrganizationJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${BASE}/#organization`,
    name: "WebVisionRank",
    alternateName: "WVR",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo.svg`,
      width: 66,
      height: 52,
    },
    image: `${BASE}/opengraph-image`,
    description:
      "AI/cybersecurity agency leading with Agentic AI automation and Zero Trust cybersecurity — backed by web development, custom software, marketing, and data intelligence.",
    slogan: "AI Powered. Security First. Elite Engineering.",
    foundingDate: "2024",
    areaServed: "Worldwide",
    email: "support@webvisionrank.com",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61576118574498",
      "https://www.instagram.com/webvisionrank/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@webvisionrank.com",
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
    knowsAbout: [
      "Agentic AI",
      "AI Automation",
      "Large Language Models",
      "LLM Pipeline Development",
      "Multi-Agent Systems",
      "RAG (Retrieval-Augmented Generation)",
      "Generative Engine Optimization",
      "Zero Trust Security",
      "Penetration Testing",
      "Cybersecurity",
      "Custom Software Development",
      "Web Development",
      "Digital Marketing",
      "Search Engine Optimization",
      "Next.js",
      "TypeScript",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "WebVisionRank Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & Agentic Automation",
            description:
              "Custom AI agents, LLM pipelines, multi-agent orchestration systems, and workflow automation that eliminate repetitive work and scale operations without scaling headcount.",
            url: `${BASE}/services#ai-automation`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Proactive Cybersecurity",
            description:
              "Zero Trust architecture design, penetration testing, continuous vulnerability monitoring, and security audits. Built in, never bolted on.",
            url: `${BASE}/services#cybersecurity`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Generative Engine Optimization (GEO)",
            description:
              "AI-powered SEO and GEO that makes your brand visible to both Google and AI search engines like ChatGPT, Perplexity, and Google Gemini.",
            url: `${BASE}/services#digital-marketing`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description:
              "Bespoke full-stack web and mobile applications, API design, microservices, and SaaS products built to exact specifications.",
            url: `${BASE}/services#custom-software`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High Performance Web Development",
            description:
              "Sub-second load times, perfect Lighthouse scores, and conversion-optimized interfaces built with Next.js.",
            url: `${BASE}/services#web-development`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Intelligence",
            description:
              "Custom analytics dashboards, predictive modeling, data pipeline architecture, and business intelligence reporting.",
            url: `${BASE}/services#data-intelligence`,
          },
        },
      ],
    },
  }} />
}

// ─── LocalBusiness (root layout) — real MN clients, competing for local search
// alongside the remote/worldwide ProfessionalService positioning above. No
// street address is set since none is publicly listed — only what's real.
export function LocalBusinessJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#localbusiness`,
    name: "WebVisionRank",
    url: BASE,
    image: `${BASE}/opengraph-image`,
    email: "support@webvisionrank.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "MN",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "Minnesota",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61576118574498",
      "https://www.instagram.com/webvisionrank/",
    ],
  }} />
}

// ─── WebSite (root layout) ────────────────────────────────────────────────────
export function WebSiteJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: "WebVisionRank",
    url: BASE,
    description:
      "Hybrid AI tech agency bridging Agentic AI automation, proactive cybersecurity, and elite custom development.",
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/services`,
      },
      "query-input": "required name=search_term_string",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  }} />
}

// ─── Services page ─────────────────────────────────────────────────────────────
export function ServicePageJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}/services#webpage`,
    name: "Services — WebVisionRank",
    url: `${BASE}/services`,
    description: "AI automation, cybersecurity, GEO, and custom development services.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: "WebVisionRank Services",
      itemListElement: [
        {
          "@type": "ListItem", position: 1,
          item: {
            "@type": "Service",
            name: "AI & Agentic Automation",
            description: "Custom AI agents, LLM pipelines, multi-agent orchestration systems, and workflow automation.",
            url: `${BASE}/services#ai-automation`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
        {
          "@type": "ListItem", position: 2,
          item: {
            "@type": "Service",
            name: "Proactive Cybersecurity",
            description: "Zero Trust architecture design, penetration testing, continuous vulnerability monitoring.",
            url: `${BASE}/services#cybersecurity`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
        {
          "@type": "ListItem", position: 3,
          item: {
            "@type": "Service",
            name: "Generative Engine Optimization (GEO)",
            description: "AI-powered SEO and GEO that surfaces your brand in AI search engines like ChatGPT and Perplexity.",
            url: `${BASE}/services#digital-marketing`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
        {
          "@type": "ListItem", position: 4,
          item: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Bespoke full-stack apps, APIs, microservices, and SaaS products built to exact specs.",
            url: `${BASE}/services#custom-software`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
        {
          "@type": "ListItem", position: 5,
          item: {
            "@type": "Service",
            name: "High Performance Web Development",
            description: "Sub-second load times, perfect Lighthouse scores, and conversion-optimized interfaces.",
            url: `${BASE}/services#web-development`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
        {
          "@type": "ListItem", position: 6,
          item: {
            "@type": "Service",
            name: "Data Intelligence",
            description: "Custom dashboards, predictive modeling, data pipeline architecture, and BI reporting.",
            url: `${BASE}/services#data-intelligence`,
            provider: { "@id": `${BASE}/#organization` },
          },
        },
      ],
    },
  }} />
}

// ─── Pricing page — FAQPage + Product/PriceSpecification ──────────────────────
// FAQ items are passed in from the page so schema can never drift from the
// visible on-page FAQ content — a schema/content mismatch is exactly what
// Google's structured-data guidelines flag as spam.
export function PricingFaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <>
      <Ld schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${BASE}/pricing#faq`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Pricing", item: `${BASE}/pricing` },
          ],
        },
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }} />
      <Ld schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "WebVisionRank Pricing Plans",
        url: `${BASE}/pricing`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Product",
              name: "Foundation Plan — WebVisionRank",
              description: "Essential digital infrastructure: high-performance website, basic SEO & GEO, security hardening, and ongoing post-launch support. Billed monthly.",
              url: `${BASE}/pricing`,
              brand: { "@id": `${BASE}/#organization` },
              offers: {
                "@type": "Offer",
                price: "1500",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                seller: { "@id": `${BASE}/#organization` },
                url: `${BASE}/contact?plan=foundation`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Product",
              name: "Growth Plan — WebVisionRank",
              description: "AI-powered marketing and automation: everything in Foundation plus AI content pipeline, advanced GEO, CRM integration, and priority support. Billed monthly.",
              url: `${BASE}/pricing`,
              brand: { "@id": `${BASE}/#organization` },
              offers: {
                "@type": "Offer",
                price: "2500",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                seller: { "@id": `${BASE}/#organization` },
                url: `${BASE}/contact?plan=growth`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Product",
              name: "Ecosystem Plan — WebVisionRank",
              description: "Full-stack digital transformation: custom AI agents, Zero Trust security architecture, bespoke software, and dedicated retainer support. Billed monthly.",
              url: `${BASE}/pricing`,
              brand: { "@id": `${BASE}/#organization` },
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: "5000",
                  priceCurrency: "USD",
                  description: "Custom scope — starting at $5,000/mo",
                },
                availability: "https://schema.org/InStock",
                seller: { "@id": `${BASE}/#organization` },
                url: `${BASE}/contact?plan=ecosystem`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Product",
              name: "Enterprise Plan — WebVisionRank",
              description: "Tailored engagements for organizations needing scale, compliance, or infrastructure beyond standard tiers: dedicated account team, custom SLAs, and multi-year contract options.",
              url: `${BASE}/pricing`,
              brand: { "@id": `${BASE}/#organization` },
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  description: "Custom quote based on scope",
                },
                availability: "https://schema.org/InStock",
                seller: { "@id": `${BASE}/#organization` },
                url: `${BASE}/contact?plan=enterprise`,
              },
            },
          },
        ],
      }} />
    </>
  )
}

// ─── About page ───────────────────────────────────────────────────────────────
export function AboutPageJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/about#webpage`,
    name: "About WebVisionRank — Hybrid AI Tech Agency",
    url: `${BASE}/about`,
    description:
      "WebVisionRank is a hybrid AI tech agency at the intersection of Agentic AI automation, Zero Trust cybersecurity, and elite custom software development.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "About", item: `${BASE}/about` },
      ],
    },
    about: { "@id": `${BASE}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  }} />
}

// ─── Contact page ─────────────────────────────────────────────────────────────
export function ContactPageJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE}/contact#webpage`,
    name: "Contact WebVisionRank — Start Your Project",
    url: `${BASE}/contact`,
    description: "Start your AI, cybersecurity, or web development project with WebVisionRank. Response within 24 hours.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE}/contact` },
      ],
    },
    mainEntity: {
      "@id": `${BASE}/#organization`,
    },
  }} />
}

// ─── GEO: HowTo schemas (powerful for AI-cited answers) ──────────────────────
export function HowToAiAutomationJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to implement AI automation for your business",
    description:
      "A step-by-step guide to deploying AI agents that eliminate repetitive workflows, surface insights, and scale operations — without scaling headcount.",
    totalTime: "PT8W",
    step: [
      {
        "@type": "HowToStep",
        name: "Discovery & workflow audit",
        text: "Identify the most time-consuming, repeatable processes in your business. Common candidates include CRM updates, invoice processing, content creation, and customer support routing.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Select the right LLM and architecture",
        text: "Choose an appropriate language model (GPT-4o, Claude, Gemini) based on task complexity, latency requirements, and cost. Design a multi-agent or single-agent architecture with clear tool definitions.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Build the AI pipeline",
        text: "Develop the LLM pipeline with tool calls, RAG (retrieval-augmented generation) for knowledge base access, and API integrations to your existing systems (CRM, ERP, databases).",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Test with real workflows",
        text: "Run the agent against real historical data and edge cases. Validate accuracy, latency, and cost per run. Implement guardrails and human-in-the-loop checkpoints where needed.",
        position: 4,
      },
      {
        "@type": "HowToStep",
        name: "Deploy and monitor",
        text: "Deploy to production with monitoring, cost tracking, and error alerting. Iterate based on real usage and adjust the agent's scope as it proves out.",
        position: 5,
      },
    ],
  }} />
}

export function HowToGeoJsonLd() {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to optimize your website for Generative Engine Optimization (GEO)",
    description:
      "A step-by-step guide to making your brand visible in AI-powered search engines like ChatGPT, Perplexity, Google Gemini, and Claude.",
    step: [
      {
        "@type": "HowToStep",
        name: "Audit your current AI engine visibility",
        text: "Search for your brand, services, and key questions in ChatGPT, Perplexity, and Google AI Overviews. Document which competitors are cited and why.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Implement structured data (JSON-LD)",
        text: "Add Schema.org markup: Organization, FAQPage, HowTo, Service, and BreadcrumbList. Structured data is one of the strongest signals for AI engine comprehension.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Create authoritative, factual content",
        text: "Write clear, citation-worthy content that directly answers questions your audience asks AI. Use specific facts, statistics, and clear definitions. Avoid marketing language.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Build entity authority",
        text: "Ensure your Organization entity is consistent across your website, Google Business Profile, LinkedIn, Wikipedia (if applicable), and industry directories. Entity consistency is how LLMs recognize you as a trusted source.",
        position: 4,
      },
      {
        "@type": "HowToStep",
        name: "Earn citations from authoritative sources",
        text: "Get your brand mentioned (cited) in industry publications, directories, and authoritative websites. LLMs learn from web-scale training data — citations in credible sources increase your AI engine authority.",
        position: 5,
      },
    ],
  }} />
}

// ─── Blog post — BlogPosting schema ────────────────────────────────────────────
// Author is always the organization — never an individual — matching the
// no-personal-attribution rule for blog content.
export function BlogPostingJsonLd({ post }: {
  post: { title: string; excerpt: string; metaDescription?: string; date: string; updatedAt?: string; slug: string; category: string }
}) {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    url: `${BASE}/blog/${post.slug}`,
    articleSection: post.category,
    author: { "@type": "Organization", name: "WebVisionRank", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "WebVisionRank",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
  }} />
}

// ─── Generic FAQPage schema — used on blog posts ──────────────────────────────
export function BlogFaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }} />
}

// ─── Case study — Article schema (no dedicated CaseStudy type in schema.org) ──
// Only emitted with real, non-placeholder content — a placeholder-marked
// summary would make the schema itself an unverifiable claim.
export function CaseStudyJsonLd({ cs }: {
  cs: { slug: string; client: string; industry: string; summary: string }
}) {
  return <Ld schema={{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cs.client} Case Study`,
    description: cs.summary,
    about: cs.industry,
    url: `${BASE}/case-studies/${cs.slug}`,
    author: { "@type": "Organization", name: "WebVisionRank", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "WebVisionRank",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/case-studies/${cs.slug}` },
  }} />
}
