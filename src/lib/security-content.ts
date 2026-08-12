export type SecuritySection = {
  id: "credentials" | "data-handling" | "internal-practices" | "incident-response"
  title: string
  body: string
}

// Single source of truth for security/trust copy — the public /security page
// and the internal /for-sales page both render from this, so a salesperson's
// answers can never drift from what's live on the site.
// Drafted conversationally with the founder — reflects real practice, no
// certifications claimed since none are held.
export const SECURITY_SECTIONS: SecuritySection[] = [
  {
    id: "credentials",
    title: "Credentials & Access",
    body: "We don't take custody of your passwords, API keys, or other secrets as standard practice. When a task requires platform access, we use our own credentials to log in and work directly — including coordinating with your other software vendors when needed — rather than asking you to hand over accounts.",
  },
  {
    id: "data-handling",
    title: "Data Handling",
    body: "We don't retain client data beyond what's actively needed to do the work in front of us. There's no long-term data store of client information sitting on our end.",
  },
  {
    id: "internal-practices",
    title: "Internal Security Practices",
    body: "Every platform and client gets its own separate credentials on our end — we don't reuse logins across accounts. Part of our ongoing work is making sure your website and systems are configured correctly to prevent data exposure, not just handled once and forgotten.",
  },
  {
    id: "incident-response",
    title: "Incident Response",
    body: "If something goes wrong on a system we've touched, we troubleshoot and fix it directly and hands-on. We're a small team, so response isn't routed through a support ticket system — it goes straight to the person who did the work.",
  },
]
