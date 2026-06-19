import type { NavItem, Service, PricingTier, Testimonial } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const SERVICES: Service[] = [
  {
    id: "ai-automation",
    title: "AI & Agentic Automation",
    description:
      "Deploy autonomous AI agents that eliminate repetitive workflows, surface insights, and scale operations without scaling headcount.",
    icon: "Bot",
    features: [
      "Custom LLM pipeline development",
      "Multi agent orchestration systems",
      "RAG knowledge base integrations",
      "Workflow automation & API chaining",
    ],
    href: "/services#ai-automation",
  },
  {
    id: "cybersecurity",
    title: "Proactive Cybersecurity",
    description:
      "Zero Trust architecture, continuous threat monitoring, and incident response. We build defenses before attackers build exploits.",
    icon: "Shield",
    features: [
      "Zero Trust architecture design",
      "Penetration testing & red teaming",
      "Continuous vulnerability monitoring",
      "Security audits & compliance",
    ],
    href: "/services#cybersecurity",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & GEO",
    description:
      "AI powered SEO, Generative Engine Optimization, and data driven campaigns that put you in front of both humans and AI search.",
    icon: "TrendingUp",
    features: [
      "Generative Engine Optimization (GEO)",
      "AI assisted content strategy",
      "Conversion rate optimization",
      "Performance analytics & attribution",
    ],
    href: "/services#digital-marketing",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Bespoke applications built to exact specifications — from internal tooling to customer-facing SaaS products.",
    icon: "Code2",
    features: [
      "Full stack web & mobile apps",
      "API design & microservices",
      "Database architecture",
      "DevOps & CI/CD pipelines",
    ],
    href: "/services#custom-software",
  },
  {
    id: "web-development",
    title: "High Performance Web Dev",
    description:
      "Sub-second load times, perfect Lighthouse scores, and conversion-optimized interfaces that turn visitors into clients.",
    icon: "Zap",
    features: [
      "Next.js / React applications",
      "Core Web Vitals optimization",
      "Headless CMS integrations",
      "E-commerce & landing pages",
    ],
    href: "/services#web-development",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    description:
      "Transform raw data into actionable intelligence. Custom dashboards, predictive analytics, and automated reporting.",
    icon: "BarChart3",
    features: [
      "Custom analytics dashboards",
      "Predictive modeling",
      "Data pipeline architecture",
      "Business intelligence reporting",
    ],
    href: "/services#data-intelligence",
  },
]

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "foundation",
    name: "Foundation",
    price: 1500,
    description:
      "Essential digital infrastructure for businesses ready to compete online with speed and security.",
    features: [
      "High performance website (up to 10 pages)",
      "Basic SEO & GEO optimization",
      "Security hardening & SSL",
      "Contact form with spam protection",
      "Google Analytics integration",
      "1 month post-launch support",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: 2500,
    description:
      "AI powered marketing and automation for businesses scaling their digital presence and operations.",
    features: [
      "Everything in Foundation",
      "AI content automation pipeline",
      "Advanced GEO & semantic SEO",
      "CRM integration & lead routing",
      "Custom dashboard & reporting",
      "3 months priority support",
      "Monthly strategy calls",
    ],
    cta: "Scale With AI",
    highlighted: true,
  },
  {
    id: "ecosystem",
    name: "Ecosystem",
    price: "5,000+",
    description:
      "Full stack digital transformation — custom AI agents, Zero Trust security, and bespoke software.",
    features: [
      "Everything in Growth",
      "Custom AI agent development",
      "Zero Trust security architecture",
      "Bespoke software/SaaS build",
      "Dedicated Slack channel",
      "Quarterly security audits",
      "12 months retainer support",
    ],
    cta: "Build Your Ecosystem",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marcus T.",
    role: "CEO",
    company: "TechScale Ventures",
    content:
      "WebVisionRank's AI automation cut our operational overhead by 40% in three months. The multi-agent system they built handles tasks we thought required three full-time hires.",
    rating: 5,
    result: "↓ 40% operational cost",
  },
  {
    id: "2",
    name: "Priya K.",
    role: "CTO",
    company: "FinCore Solutions",
    content:
      "Their Zero Trust security audit uncovered vulnerabilities our previous provider missed entirely. The team's depth of knowledge in both AI and cybersecurity is genuinely rare.",
    rating: 5,
    result: "✓ 0 breaches in production",
  },
  {
    id: "3",
    name: "James R.",
    role: "Founder",
    company: "GrowthEdge Agency",
    content:
      "Our organic traffic tripled in six months after the GEO strategy. They understand how LLMs surface content — not just Google. Ahead of the curve.",
    rating: 5,
    result: "↑ 3× organic traffic",
  },
]

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Audit",
    description:
      "Deep-dive into your current systems, goals, and threat landscape. We identify gaps and opportunities before writing a single line of code.",
  },
  {
    step: "02",
    title: "Architecture & Strategy",
    description:
      "Custom roadmap with defined deliverables, timelines, and security requirements. No templates — every plan is purpose-built.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "Agile sprints with weekly demos. Every component is security-reviewed before deployment.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description:
      "Monitored launch, performance benchmarking, and iterative optimization. We don't disappear post-handoff.",
  },
]

export const SITE_CONFIG = {
  name: "WebVisionRank",
  tagline: "AI Powered. Security First. Elite Engineering.",
  description:
    "Hybrid AI tech agency bridging Agentic AI workflows, Proactive Cybersecurity, and Elite Custom Development.",
  url: "https://webvisionrank.com",
  email: "support@webvisionrank.com",
  social: {
    twitter: "https://twitter.com/webvisionrank",
    linkedin: "https://linkedin.com/company/webvisionrank",
    github: "https://github.com/webvisionrank",
  },
}
