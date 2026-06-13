"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { contactSchema, type ContactFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FormState = "idle" | "submitting" | "success" | "error"

const serviceOptions = [
  { value: "ai-automation",    label: "AI & Agentic Automation" },
  { value: "cybersecurity",    label: "Proactive Cybersecurity" },
  { value: "digital-marketing",label: "Digital Marketing & GEO" },
  { value: "custom-software",  label: "Custom Software Development" },
  { value: "web-development",  label: "High Performance Web Dev" },
  { value: "data-intelligence",label: "Data Intelligence" },
  { value: "other",            label: "Other / Not Sure Yet" },
]

// Map pricing plan IDs → service values
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
  const params   = useSearchParams()
  const plan     = params.get("plan")
  const service  = params.get("service") as ContactFormData["service"] | null
  if (service && serviceOptions.some(o => o.value === service)) {
    return { service }
  }
  if (plan && planToService[plan]) {
    return { service: planToService[plan], planLabel: planLabels[plan] }
  }
  return {}
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { service: preselected, planLabel } = useFormContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: preselected ? { service: preselected } : undefined,
  })

  async function onSubmit(data: ContactFormData) {
    setFormState("submitting")
    setErrorMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? "Something went wrong. Please try again.")
      }
      setFormState("success")
      reset()
    } catch (err) {
      setFormState("error")
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.")
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(31,138,101,0.08)] border border-[rgba(31,138,101,0.16)]">
          <CheckCircle className="h-7 w-7 text-success" />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold text-ink mb-1">Message received.</h3>
          <p className="text-[14px] text-body max-w-sm">
            We&apos;ll review your project details and respond within 24 hours.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setFormState("idle")} className="mt-2">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        {...register("honeypot")}
      />

      {/* Plan context badge — shown when arriving from pricing page */}
      {planLabel && (
        <div className="flex items-center gap-2 rounded-[8px] bg-canvas-soft border border-hairline px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/30 flex-shrink-0" />
          <span className="text-[13px] text-body">
            Inquiring about the <span className="font-medium text-ink">{planLabel}</span>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Alex Johnson"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[13px] text-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[13px] text-error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company <span className="text-muted-soft">(optional)</span></Label>
        <Input
          id="company"
          placeholder="Acme Corp"
          autoComplete="organization"
          {...register("company")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service of Interest</Label>
        <select
          id="service"
          aria-invalid={!!errors.service}
          className={cn(
            "flex h-11 w-full rounded-[8px] border border-hairline bg-surface px-4 py-3 text-[16px] text-ink transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...register("service")}
        >
          <option value="" disabled>Select a service...</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.service && (
          <p className="text-[13px] text-error">{errors.service.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Details</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[13px] text-error">{errors.message.message}</p>
        )}
      </div>

      {formState === "error" && (
        <div className="flex items-start gap-3 rounded-[8px] border border-[rgba(207,45,86,0.2)] bg-[rgba(207,45,86,0.05)] px-4 py-3 text-[14px] text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="ink"
        size="lg"
        className="w-full"
        disabled={formState === "submitting"}
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>

      <p className="text-[13px] text-muted text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-ink transition-colors">
          Privacy Policy
        </a>
        . We never spam.
      </p>
    </form>
  )
}
