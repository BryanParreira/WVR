import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { AnimateIn } from "@/components/ui/animate-in"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "WebVisionRank Terms of Service — governing your use of our website and services.",
}

const EFFECTIVE_DATE = "June 1, 2025"

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-6 bg-canvas">
        <div className="mx-auto max-w-[720px]">
          <AnimateIn>
            <p className="caption-uppercase mb-4">Legal</p>
            <h1 className="display-md text-ink mb-2">Terms of Service</h1>
            <p className="text-[13px] text-muted mb-14">
              Effective: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1} className="space-y-10 text-[15px] text-body leading-[1.6]">

            <Section title="1. Agreement to Terms">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and WebVisionRank (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                By accessing or using our website at <a href={SITE_CONFIG.url} className="text-ink underline underline-offset-4 hover:text-body transition-colors">{SITE_CONFIG.url}</a> or
                engaging our services, you confirm that you are at least 18 years of age, have the legal capacity to enter into binding contracts, and agree to be bound by these Terms.
              </p>
            </Section>

            <Section title="2. Services Description">
              <p>
                WebVisionRank provides digital services including: AI automation and agentic workflow development, cybersecurity consulting and implementation, digital marketing and SEO/GEO, custom software development, web development, and data intelligence. Specific scope, deliverables, timeline, and fees for any engagement are governed by a separate written Statement of Work (&ldquo;SOW&rdquo;).
              </p>
            </Section>

            <Section title="3. Intellectual Property">
              <Subsection title="3.1 Our Property">
                <p>All content on this website — text, graphics, logos, code, and design — is the exclusive property of WebVisionRank, protected by applicable intellectual property laws.</p>
              </Subsection>
              <Subsection title="3.2 Client Work Product">
                <p>Upon full payment, custom deliverables created exclusively for a client will transfer ownership as specified in the applicable SOW. WebVisionRank retains rights to pre-existing tools, frameworks, or methodologies unless explicitly transferred in writing.</p>
              </Subsection>
            </Section>

            <Section title="4. Payment Terms">
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>A non-refundable deposit of 50% is required before work commences</li>
                <li>Remaining balance is due upon project completion before final delivery</li>
                <li>Invoices unpaid within 30 days are subject to a 1.5% monthly late fee</li>
                <li>WebVisionRank may suspend services for accounts with outstanding balances</li>
              </ul>
            </Section>

            <Section title="5. Acceptable Use">
              <p>You agree not to use our website or services to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Violate any applicable law or regulation</li>
                <li>Engage in unauthorized scraping or automated access of our systems</li>
                <li>Transmit viruses, malware, or malicious material</li>
                <li>Attempt to gain unauthorized access to any part of our website or services</li>
                <li>Impersonate any person or entity</li>
                <li>Facilitate illegal activities, including unauthorized access to third-party systems</li>
              </ul>
            </Section>

            <Section title="6. Cybersecurity Services — Specific Terms">
              <p>For clients engaging our cybersecurity services, including penetration testing and security audits:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>All testing requires a separate written authorization specifying scope, systems, and engagement window</li>
                <li>WebVisionRank will only perform authorized testing on systems the client explicitly owns or has written permission to test</li>
                <li>Findings are delivered confidentially and must not be publicly disclosed without mutual written consent</li>
                <li>Client bears sole responsibility for ensuring testing authorization covers all relevant systems</li>
              </ul>
            </Section>

            <Section title="7. Disclaimers and Limitation of Liability">
              <Subsection title="7.1 Disclaimer of Warranties">
                <p>Our website and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, express or implied.</p>
              </Subsection>
              <Subsection title="7.2 Limitation of Liability">
                <p>To the maximum extent permitted by law, WebVisionRank shall not be liable for indirect, incidental, special, consequential, or punitive damages. Our total aggregate liability shall not exceed the total fees paid by you in the three (3) months preceding the claim.</p>
              </Subsection>
            </Section>

            <Section title="8. Confidentiality">
              <p>Both parties agree to keep confidential any non-public, proprietary, or sensitive information disclosed during an engagement. This obligation survives termination for three (3) years.</p>
            </Section>

            <Section title="9. Termination">
              <p>Either party may terminate a service engagement by providing written notice as specified in the applicable SOW. Fees for work completed to the termination date are due and payable. Provisions that by their nature survive termination shall survive.</p>
            </Section>

            <Section title="10. Governing Law and Dispute Resolution">
              <p>These Terms shall be governed by the laws of the United States. Disputes shall first be subject to good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration per AAA rules. Either party may seek injunctive relief in a court of competent jurisdiction.</p>
            </Section>

            <Section title="11. Changes to Terms">
              <p>We reserve the right to modify these Terms at any time. Material changes will be communicated by updating the &ldquo;Last Updated&rdquo; date. Continued use after changes constitutes acceptance.</p>
            </Section>

            <Section title="12. Contact Information">
              <p>Questions about these Terms?</p>
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
