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
      "Hybrid AI tech agency specializing in Agentic AI automation, proactive cybersecurity, Generative Engine Optimization (GEO), and elite custom software development.",
    slogan: "AI Powered. Security First. Elite Engineering.",
    foundingDate: "2024",
    areaServed: "Worldwide",
    email: "support@webvisionrank.com",
    sameAs: [
      "https://twitter.com/webvisionrank",
      "https://linkedin.com/company/webvisionrank",
      "https://github.com/webvisionrank",
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
export function PricingFaqJsonLd() {
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
        mainEntity: [
          {
            "@type": "Question",
            name: "What does WebVisionRank charge for AI automation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "WebVisionRank's AI automation is available from $2,500 in the Growth plan. The Ecosystem plan starts at $5,000+ for full-scope custom AI agent development.",
            },
          },
          {
            "@type": "Question",
            name: "Are these one-time project fees or recurring?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Project-based fees. Ongoing support and maintenance can be added as a monthly retainer — pricing depends on scope.",
            },
          },
          {
            "@type": "Question",
            name: "Can I start with one service and add more later?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. Most clients start with a focused engagement and expand as they see results. Every project is designed to be extensible.",
            },
          },
          {
            "@type": "Question",
            name: "What does the project timeline look like?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Foundation projects complete in 4–6 weeks. Growth engagements run 8–12 weeks. Ecosystem builds are scoped individually during discovery.",
            },
          },
          {
            "@type": "Question",
            name: "Do you work with startups or only established businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both. The Foundation and Growth tiers deliver strong ROI for resource-constrained teams. The Ecosystem tier is for organizations ready to go all-in.",
            },
          },
          {
            "@type": "Question",
            name: "What is WebVisionRank?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "WebVisionRank is a hybrid AI tech agency specializing in Agentic AI automation, proactive cybersecurity, Generative Engine Optimization (GEO), and elite custom software development.",
            },
          },
          {
            "@type": "Question",
            name: "What is Generative Engine Optimization (GEO)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Generative Engine Optimization (GEO) is the practice of optimizing your digital presence so that AI-powered search engines like ChatGPT, Perplexity, and Google Gemini surface and recommend your brand. Unlike traditional SEO which targets keyword rankings in Google, GEO focuses on being cited as a trusted source by AI models.",
            },
          },
          {
            "@type": "Question",
            name: "How much does AI agent development cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Custom AI agent development is included in the Ecosystem plan starting at $5,000. This includes multi-agent orchestration, LLM pipeline development, and workflow automation tailored to your business processes.",
            },
          },
          {
            "@type": "Question",
            name: "Does WebVisionRank offer cybersecurity services?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. WebVisionRank provides Zero Trust security architecture, penetration testing, continuous vulnerability monitoring, and security audits. The Ecosystem plan includes Zero Trust architecture as standard.",
            },
          },
        ],
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
              description: "Essential digital infrastructure: high-performance website, basic SEO & GEO, security hardening, and 1 month of support.",
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
              description: "AI-powered marketing and automation: everything in Foundation plus AI content pipeline, advanced GEO, CRM integration, and 3 months of priority support.",
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
              description: "Full-stack digital transformation: custom AI agents, Zero Trust security architecture, bespoke software, and 12-month retainer support.",
              url: `${BASE}/pricing`,
              brand: { "@id": `${BASE}/#organization` },
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: "5000",
                  priceCurrency: "USD",
                  description: "Custom scope — starting at $5,000",
                },
                availability: "https://schema.org/InStock",
                seller: { "@id": `${BASE}/#organization` },
                url: `${BASE}/contact?plan=ecosystem`,
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
        text: "Deploy to production with monitoring, cost tracking, and error alerting. Iterate based on real usage. Most businesses see 40% operational cost reduction within 3 months.",
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
