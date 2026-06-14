"use client"

import { useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { contactSchema, type ContactFormData } from "@/lib/validations"
import { cn } from "@/lib/utils"

const D = {
  bg:      "var(--canvas-soft)",
  surface: "var(--surface)",
  border:  "var(--hairline)",
  ink:     "var(--ink)",
  body:    "var(--body)",
  muted:   "var(--muted)",
  dim:     "var(--muted-soft)",
  error:   "var(--error)",
}

type FormState = "idle" | "submitting" | "success" | "error"

const serviceOptions = [
  { value: "ai-automation",     label: "AI & Automation"       },
  { value: "cybersecurity",     label: "Zero Trust Security"   },
  { value: "digital-marketing", label: "GEO & Marketing"       },
  { value: "custom-software",   label: "Custom Software"       },
  { value: "web-development",   label: "Web Development"       },
  { value: "data-intelligence", label: "Data Intelligence"     },
  { value: "other",             label: "Other / Not Sure"      },
]

const planToService: Record<string, ContactFormData["service"]> = {
  foundation: "web-development",
  growth:     "ai-automation",
  ecosystem:  "other",
}

const planLabels: Record<string, string> = {
  foundation: "Foundation plan",
  growth:     "Growth plan",
  ecosystem:  "Ecosystem plan",
}

function useFormContext(): { service?: ContactFormData["service"]; planLabel?: string } {
  const params  = useSearchParams()
  const plan    = params.get("plan")
  const service = params.get("service") as ContactFormData["service"] | null
  if (service && serviceOptions.some(o => o.value === service)) return { service }
  if (plan && planToService[plan]) return { service: planToService[plan], planLabel: planLabels[plan] }
  return {}
}

// Shared dark field styles
const fieldBase = cn(
  "flex w-full rounded-[8px] border px-4 py-3 text-[15px] transition-colors duration-150 outline-none",
  "focus:ring-1",
)
const fieldStyle = {
  background:  D.bg,
  border:      `1px solid ${D.border}`,
  color:       D.ink,
}

const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""

export function ContactForm() {
  const [formState,    setFormState]    = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const { service: preselected, planLabel } = useFormContext()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver:      zodResolver(contactSchema),
    defaultValues: preselected ? { service: preselected } : undefined,
  })

  async function onSubmit(data: ContactFormData) {
    if (HCAPTCHA_SITE_KEY && !captchaToken) {
      setErrorMessage("Please complete the captcha before submitting.")
      setFormState("error")
      return
    }
    setFormState("submitting")
    setErrorMessage("")
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...data, captchaToken }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? "Something went wrong. Please try again.")
      }
      setFormState("success")
      reset()
      setCaptchaToken(null)
      captchaRef.current?.resetCaptcha()
    } catch (err) {
      setFormState("error")
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.")
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)" }}>
          <CheckCircle className="h-6 w-6" style={{ color: "#34d399" }} />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold mb-1.5" style={{ color: D.ink }}>
            Message received.
          </h3>
          <p className="text-[14px] max-w-xs leading-[1.55]" style={{ color: D.muted }}>
            We&apos;ll review your project details and respond within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setFormState("idle")}
          className="mt-1 h-9 px-4 rounded-[7px] text-[13px] font-medium transition-colors duration-150"
          style={{ background: "var(--ink-faint)", border: `1px solid ${D.border}`, color: D.body }}
          onMouseEnter={e => (e.currentTarget.style.color = D.ink)}
          onMouseLeave={e => (e.currentTarget.style.color = D.body)}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        {...register("honeypot")}
      />

      {/* Plan context badge */}
      {planLabel && (
        <div className="flex items-center gap-2 rounded-[8px] px-3 py-2.5"
          style={{ background: "var(--ink-faint)", border: `1px solid ${D.border}` }}>
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: D.dim }} />
          <span className="text-[13px]" style={{ color: D.muted }}>
            Inquiring about the{" "}
            <span className="font-medium" style={{ color: D.body }}>{planLabel}</span>
          </span>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[13px] font-medium" style={{ color: D.body }}>
            Full Name
          </label>
          <input
            id="name"
            placeholder="Alex Johnson"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={fieldBase}
            style={fieldStyle}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[12px]" style={{ color: D.error }}>{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[13px] font-medium" style={{ color: D.body }}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={fieldBase}
            style={fieldStyle}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[12px]" style={{ color: D.error }}>{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <label htmlFor="company" className="text-[13px] font-medium" style={{ color: D.body }}>
          Company{" "}
          <span className="font-normal" style={{ color: D.dim }}>(optional)</span>
        </label>
        <input
          id="company"
          placeholder="Acme Corp"
          autoComplete="organization"
          className={fieldBase}
          style={fieldStyle}
          {...register("company")}
        />
      </div>

      {/* Service — chip grid */}
      <div className="space-y-3">
        <label className="text-[13px] font-medium" style={{ color: D.body }}>
          Service of Interest
        </label>
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {serviceOptions.map(opt => {
                const sel = field.value === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => field.onChange(opt.value)}
                    className="flex items-center gap-2 rounded-[8px] px-3 py-2.5 text-left text-[13px] leading-[1.3] transition-all duration-150"
                    style={{
                      background:  sel ? "var(--ink-subtle)" : "var(--ink-faint)",
                      border:      `1px solid ${sel ? "var(--primary-border)" : D.border}`,
                      color:       sel ? D.ink : D.muted,
                    }}
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-150"
                      style={{ background: sel ? D.ink : D.dim }} />
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}
        />
        {errors.service && (
          <p className="text-[12px]" style={{ color: D.error }}>{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-[13px] font-medium" style={{ color: D.body }}>
          Project Details
        </label>
        <textarea
          id="message"
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(fieldBase, "resize-none")}
          style={fieldStyle}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[12px]" style={{ color: D.error }}>{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {formState === "error" && (
        <div className="flex items-start gap-3 rounded-[8px] px-4 py-3 text-[13px]"
          style={{ border: "1px solid rgba(207,45,86,0.25)", background: "rgba(207,45,86,0.05)", color: D.error }}>
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Captcha — only renders when site key is configured */}
      {HCAPTCHA_SITE_KEY && (
        <div>
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            theme="dark"
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="group flex w-full items-center justify-center gap-2.5 h-12 rounded-[9px] text-[15px] font-medium transition-all duration-150 disabled:opacity-60"
        style={{ background: D.ink, color: "var(--canvas)" }}
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-center text-[12px]" style={{ color: D.dim }}>
        By submitting, you agree to our{" "}
        <a href="/privacy" className="transition-colors duration-150 underline underline-offset-4"
          style={{ color: D.muted }}
          onMouseEnter={e => (e.currentTarget.style.color = D.body)}
          onMouseLeave={e => (e.currentTarget.style.color = D.muted)}>
          Privacy Policy
        </a>
        . We never spam.
      </p>
    </form>
  )
}
