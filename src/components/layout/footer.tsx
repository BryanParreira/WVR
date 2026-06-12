import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"

const footerLinks = {
  Services: [
    { label: "AI & Agentic Automation", href: "/services#ai-automation" },
    { label: "Proactive Cybersecurity", href: "/services#cybersecurity" },
    { label: "Digital Marketing & GEO", href: "/services#digital-marketing" },
    { label: "Custom Software", href: "/services#custom-software" },
    { label: "Web Development", href: "/services#web-development" },
    { label: "Data Intelligence", href: "/services#data-intelligence" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const socialLinks = [
  { icon: XIcon, href: SITE_CONFIG.social.twitter, label: "X (Twitter)" },
  { icon: LinkedInIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: GitHubIcon, href: SITE_CONFIG.social.github, label: "GitHub" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    // Cursor footer spec: canvas bg, body text, 64x48px padding
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <span className="text-[15px] font-semibold text-ink">Web</span>
              <span className="text-[15px] font-semibold text-ink">Vision</span>
              <span className="text-[15px] font-semibold text-ink">Rank</span>
            </Link>

            <p className="text-[14px] text-body leading-[1.5] mb-6 max-w-xs">
              Hybrid AI tech agency bridging Agentic AI workflows, Zero-Trust cybersecurity,
              and elite custom development.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-hairline text-muted hover:text-ink hover:border-hairline-strong transition-colors duration-150"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="caption-uppercase mb-4 text-muted">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-body hover:text-ink transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-[13px] text-muted shrink-0">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <Link href={`mailto:${SITE_CONFIG.email}`} className="hover:text-ink transition-colors truncate max-w-[200px] sm:max-w-none">
              {SITE_CONFIG.email}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
