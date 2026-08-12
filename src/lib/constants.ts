import type { NavItem, Service, PricingTier, Testimonial } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Client Results", href: "/case-studies" },
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
    tier: "lead",
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
    tier: "lead",
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
    tier: "secondary",
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
    tier: "secondary",
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
    tier: "secondary",
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
    tier: "secondary",
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
      "High-performance website (up to 10 pages)",
      "Basic SEO & GEO optimization",
      "Security hardening & SSL",
      "Contact form with spam protection",
      "Google Analytics integration & monthly reporting",
      "Ongoing post-launch support",
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
      "Priority support",
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
      "Dedicated retainer support",
    ],
    cta: "Build Your Ecosystem",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom Quote",
    description:
      "Tailored engagements for organizations that need scale, compliance, or infrastructure beyond our standard tiers.",
    features: [
      "Everything in Ecosystem",
      "Dedicated account team & engineering pod",
      "Custom SLAs & compliance support",
      "Multi-year contract options",
      "On-prem / custom infrastructure integrations",
      "Quarterly business reviews with leadership",
    ],
    cta: "Request a Quote",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Cory",
    role: "Owner",
    company: "Ridgeline Roofing MN",
    content:
      "Honestly, WebVisionRank solved so many headaches for us at Ridgeline. They handle our marketing and social media, set up automations that save us hours every week, and locked down our tech security. Whenever a random IT issue pops up, they jump on it immediately. Super reliable team.",
    rating: 5,
    result: "20× organic reach increase",
  },
  {
    id: "2",
    name: "Gerson",
    role: "CEO",
    company: "Superior Cleaning Services",
    content:
      "WebVisionRank made scaling Superior Cleaning so much easier. They dialed in our marketing to bring in a steady stream of new leads, and the automations they built handle most of our client follow-ups automatically. Saves us a ton of admin work every single day!",
    rating: 5,
  },
  {
    id: "3",
    name: "Evelyn",
    role: "Family Member",
    company: "Tienda Guerrero",
    content:
      "WebVisionRank built our online store and restaurant ordering system for Tienda Guerrero here in Austin, and it's been a total game-changer! Our customers love how easy it is to order food and shop online now. It brought in a ton of new orders and freed us up from constantly answering the phone.",
    rating: 5,
  },
  {
    id: "4",
    name: "Alicia",
    role: "Co-Owner",
    company: "ABC Driving School",
    content:
      "WebVisionRank built and optimized our new website for ABC Driving School, and the results speak for themselves. It's super fast, looks great on phones, and makes it really simple for parents and students to sign up. We've seen a noticeable bump in new student registrations directly through the site!",
    rating: 5,
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
    "AI/cybersecurity agency leading with Agentic AI automation and Zero Trust cybersecurity — backed by web development, custom software, marketing, and data intelligence.",
  url: "https://webvisionrank.com",
  email: "support@webvisionrank.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61576118574498",
    instagram: "https://www.instagram.com/webvisionrank/",
  },
}
