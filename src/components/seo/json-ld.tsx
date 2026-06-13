export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebVisionRank",
    url: "https://webvisionrank.com",
    logo: "https://webvisionrank.com/logo.png",
    description:
      "Hybrid AI tech agency specializing in Agentic AI automation, proactive cybersecurity, generative engine optimization (GEO), and elite custom software development.",
    email: "support@webvisionrank.com",
    sameAs: [
      "https://twitter.com/webvisionrank",
      "https://linkedin.com/company/webvisionrank",
      "https://github.com/webvisionrank",
    ],
    knowsAbout: [
      "Agentic AI",
      "AI Automation",
      "Large Language Models",
      "Generative Engine Optimization",
      "Zero Trust Security",
      "Cybersecurity",
      "Custom Software Development",
      "Web Development",
      "Digital Marketing",
      "SEO",
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
              "Custom AI agents, LLM pipelines, multi agent orchestration systems, and workflow automation that eliminate repetitive work and scale operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Proactive Cybersecurity",
            description:
              "Zero Trust architecture design, penetration testing, continuous vulnerability monitoring, and security audits.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Generative Engine Optimization (GEO)",
            description:
              "AI powered SEO and generative engine optimization that makes your brand visible to both Google and AI search engines like ChatGPT, Perplexity, and Gemini.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description:
              "Bespoke full stack web and mobile applications, API design, microservices, and SaaS products built to exact specifications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "High Performance Web Development",
            description:
              "Sub-second load times, perfect Lighthouse scores, and conversion-optimized interfaces built with Next.js and React.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Intelligence",
            description:
              "Custom analytics dashboards, predictive modeling, data pipeline architecture, and business intelligence reporting.",
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebVisionRank",
    url: "https://webvisionrank.com",
    description:
      "Hybrid AI tech agency bridging Agentic AI automation, proactive cybersecurity, and elite custom development.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://webvisionrank.com/services",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServicePageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WebVisionRank Services",
    description: "AI automation, cybersecurity, GEO, and custom development services.",
    url: "https://webvisionrank.com/services",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI & Agentic Automation", url: "https://webvisionrank.com/services#ai-automation" },
      { "@type": "ListItem", position: 2, name: "Proactive Cybersecurity", url: "https://webvisionrank.com/services#cybersecurity" },
      { "@type": "ListItem", position: 3, name: "Digital Marketing & GEO", url: "https://webvisionrank.com/services#digital-marketing" },
      { "@type": "ListItem", position: 4, name: "Custom Software Development", url: "https://webvisionrank.com/services#custom-software" },
      { "@type": "ListItem", position: 5, name: "High Performance Web Dev", url: "https://webvisionrank.com/services#web-development" },
      { "@type": "ListItem", position: 6, name: "Data Intelligence", url: "https://webvisionrank.com/services#data-intelligence" },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PricingFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these one time project fees or recurring?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project based fees. Ongoing support and maintenance can be added as a monthly retainer — pricing depends on scope.",
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
          text: "WebVisionRank is a hybrid AI tech agency that specializes in Agentic AI automation, proactive cybersecurity, generative engine optimization (GEO), and elite custom software development.",
        },
      },
      {
        "@type": "Question",
        name: "What is Generative Engine Optimization (GEO)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generative Engine Optimization (GEO) is the practice of optimizing your digital presence so that AI-powered search engines like ChatGPT, Perplexity, and Google Gemini surface and recommend your brand. WebVisionRank specializes in GEO for businesses.",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
