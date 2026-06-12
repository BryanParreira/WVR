import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { AnimateIn } from "@/components/ui/animate-in"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WebVisionRank Privacy Policy — how we collect, use, and protect your data.",
}

const EFFECTIVE_DATE = "June 1, 2025"

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-6 bg-canvas">
        <div className="mx-auto max-w-[720px]">
          <AnimateIn>
            <p className="caption-uppercase mb-4">Legal</p>
            <h1 className="display-md text-ink mb-2">Privacy Policy</h1>
            <p className="text-[13px] text-muted mb-14">
              Effective: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1} className="space-y-10 text-[15px] text-body leading-[1.6]">

            <Section title="1. Introduction">
              <p>
                WebVisionRank (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{" "}
                <a href={SITE_CONFIG.url} className="text-ink underline underline-offset-4 hover:text-body transition-colors">{SITE_CONFIG.url}</a>{" "}
                or engage our services. By using our website, you acknowledge that you have read and agree to this Privacy Policy.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <Subsection title="2.1 Information You Provide Directly">
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-ink">Contact Information:</strong> Name, email address, company name, and message content submitted through contact forms.</li>
                  <li><strong className="text-ink">Project Information:</strong> Details about your business or project scope you share during communications.</li>
                  <li><strong className="text-ink">Communications:</strong> Emails or messages you send us directly.</li>
                </ul>
              </Subsection>
              <Subsection title="2.2 Automatically Collected Information">
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-ink">Usage Data:</strong> IP address, browser type, pages visited, time and date of visit, and referring URL.</li>
                  <li><strong className="text-ink">Device Information:</strong> Hardware model, operating system, and browser information.</li>
                  <li><strong className="text-ink">Cookies:</strong> We use strictly necessary cookies for site functionality. See Section 7.</li>
                </ul>
              </Subsection>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use collected information to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Respond to inquiries and provide requested services</li>
                <li>Process and fulfill project engagements</li>
                <li>Improve our website and user experience</li>
                <li>Send transactional communications (project updates, invoices)</li>
                <li>Detect, prevent, and address security incidents or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
            </Section>

            <Section title="4. Legal Basis for Processing (GDPR)">
              <p>If you are in the EEA, we process personal data under these legal bases:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li><strong className="text-ink">Contractual Necessity:</strong> Processing required to fulfill a contract or pre-contractual steps.</li>
                <li><strong className="text-ink">Legitimate Interests:</strong> Operating services, fraud prevention, and security monitoring.</li>
                <li><strong className="text-ink">Legal Obligation:</strong> Where we must comply with applicable law.</li>
                <li><strong className="text-ink">Consent:</strong> Where you have provided explicit consent. You may withdraw at any time.</li>
              </ul>
            </Section>

            <Section title="5. Data Sharing and Disclosure">
              <p>We may share your information only in these circumstances:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li><strong className="text-ink">Service Providers:</strong> Trusted vendors who assist in operating our website (hosting, email, analytics), contractually bound to confidentiality.</li>
                <li><strong className="text-ink">Legal Requirements:</strong> When disclosure is required by law or court order.</li>
                <li><strong className="text-ink">Protection of Rights:</strong> To protect the rights, property, or safety of WebVisionRank or others.</li>
                <li><strong className="text-ink">Business Transfers:</strong> In connection with a merger or acquisition, with appropriate protections.</li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>We retain personal information only as long as necessary to fulfill the purposes in this policy. Contact form submissions are retained for up to 24 months. You may request deletion at any time.</p>
            </Section>

            <Section title="7. Cookies">
              <p>We use strictly necessary cookies for site functionality. We do not use tracking or advertising cookies without your explicit consent. You can configure your browser to refuse cookies, though this may affect site functionality.</p>
            </Section>

            <Section title="8. Security">
              <p>We implement TLS/HTTPS encryption for all data in transit, rate-limiting on all form endpoints, server-side input validation and sanitization, strict Content Security Policy headers, and access controls for stored data. As a cybersecurity-focused agency, we hold ourselves to a higher standard. However, no transmission over the internet is 100% secure.</p>
            </Section>

            <Section title="9. Your Rights">
              <p>Depending on your jurisdiction, you may have rights to access, rectify, erase, port, object to, or restrict processing of your personal data. To exercise these rights, contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-ink underline underline-offset-4 hover:text-body transition-colors">{SITE_CONFIG.email}</a>. We respond within 30 days.
              </p>
            </Section>

            <Section title="10. Children's Privacy">
              <p>Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If we become aware we have done so, we will delete that information promptly.</p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>We may update this Privacy Policy periodically. We will notify you of significant changes by updating the &ldquo;Last Updated&rdquo; date. Continued use of the site after changes constitutes acceptance.</p>
            </Section>

            <Section title="12. Contact Us">
              <p>Questions about this Privacy Policy? Contact us at:</p>
              <address className="not-italic mt-3">
                <strong className="text-ink">WebVisionRank</strong><br />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-ink underline underline-offset-4 hover:text-body transition-colors">{SITE_CONFIG.email}</a><br />
                <a href={SITE_CONFIG.url} className="text-ink underline underline-offset-4 hover:text-body transition-colors">{SITE_CONFIG.url}</a>
              </address>
            </Section>
          </AnimateIn>
        </div>
      </section>
    </SiteLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline pt-8">
      <h2 className="text-[16px] font-semibold text-ink mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-semibold text-ink mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
