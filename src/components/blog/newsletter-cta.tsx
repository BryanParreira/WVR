import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function NewsletterCta() {
  return (
    <div className="card-hover mt-16 rounded-[14px] border border-hairline bg-surface p-10 text-center">
      <p className="caption-uppercase mb-3 text-muted">Stay current</p>
      <h2 className="display-sm mb-3 text-ink">No noise. Just signal.</h2>
      <p className="mx-auto mb-7 max-w-sm text-[14px] leading-[1.6] text-body">
        New articles on AI systems, security hardening, and performance
        engineering — delivered when they matter.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-[8px] bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity duration-150 hover:opacity-80"
      >
        Get in touch
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
