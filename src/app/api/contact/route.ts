import { type NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"

// Rate limiting — only active when Upstash env vars are present
async function applyRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return { allowed: true }
  }
  try {
    const { checkRateLimit } = await import("@/lib/rate-limit")
    const { success, reset } = await checkRateLimit(ip)
    if (!success) {
      return { allowed: false, retryAfter: Math.ceil((reset - Date.now()) / 1000) }
    }
    return { allowed: true }
  } catch {
    // Fail open — don't block legitimate users if Redis is unreachable
    return { allowed: true }
  }
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip = getClientIp(req)
  const { allowed, retryAfter } = await applyRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { message: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
      }
    )
  }

  // 2. Parse body
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 })
  }

  // 3. Verify hCaptcha token (only when secret key is configured)
  if (process.env.HCAPTCHA_SECRET_KEY) {
    const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : ""
    if (!captchaToken) {
      return NextResponse.json({ message: "Captcha verification required." }, { status: 400 })
    }
    try {
      const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret:   process.env.HCAPTCHA_SECRET_KEY,
          response: captchaToken,
        }).toString(),
      })
      const verifyData = await verifyRes.json() as { success: boolean }
      if (!verifyData.success) {
        return NextResponse.json({ message: "Captcha verification failed. Please try again." }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ message: "Could not verify captcha. Please try again." }, { status: 503 })
    }
  }

  // 4. Validate with Zod
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { message: "Validation failed.", errors: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, company, service, message, honeypot } = result.data

  // Escape all user input before HTML interpolation to prevent injection in email
  function h(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
  }
  const sName    = h(name)
  const sEmail   = h(email)
  const sCompany = company ? h(company) : "—"
  const sMessage = h(message)

  // 5. Honeypot check
  if (honeypot && honeypot.length > 0) {
    // Return 200 to fool bots — do nothing
    return NextResponse.json({ message: "Message received." }, { status: 200 })
  }

  // 6. Store in Supabase (if configured)
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
      await supabase.from("contact_submissions").insert({
        name,
        email,
        company: company ?? null,
        service,
        message,
        ip_hash: Buffer.from(ip).toString("base64"),
        created_at: new Date().toISOString(),
      })
    } catch (err) {
      console.error("[contact] Supabase insert failed:", err)
      // Non-fatal — still respond success to user; log for ops review
    }
  }

  // 7. Send email notification
  if (process.env.CONTACT_EMAIL_TO) {
    const serviceLabel: Record<string, string> = {
      "ai-automation":    "AI & Agentic Automation",
      "cybersecurity":    "Proactive Cybersecurity",
      "digital-marketing":"Digital Marketing & GEO",
      "custom-software":  "Custom Software Development",
      "web-development":  "High Performance Web Dev",
      "data-intelligence":"Data Intelligence",
      "other":            "Other / Not Sure Yet",
    }

    const subject = `New inquiry: ${serviceLabel[service] ?? service} — ${name.replace(/[\r\n]/g, " ")}`
    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company ?? "Not provided"}`,
      `Service: ${serviceLabel[service] ?? service}`,
      `\nMessage:\n${message}`,
      `\nSubmitted: ${new Date().toUTCString()}`,
    ].join("\n")

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#141210;border-radius:12px 12px 0 0;padding:32px 40px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6760;font-family:'Courier New',monospace;">WebVisionRank</p>
            <h1 style="margin:0;font-size:22px;font-weight:600;color:#f0ede8;letter-spacing:-0.015em;">New project inquiry</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 40px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              <tr><td style="padding-bottom:20px;border-bottom:1px solid #ebebeb;">
                <p style="margin:0 0 3px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;font-family:'Courier New',monospace;">Name</p>
                <p style="margin:0;font-size:15px;color:#111827;font-weight:500;">${sName}</p>
              </td></tr>
              <tr><td style="padding:20px 0;border-bottom:1px solid #ebebeb;">
                <p style="margin:0 0 3px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;font-family:'Courier New',monospace;">Email</p>
                <a href="mailto:${sEmail}" style="margin:0;font-size:15px;color:#0891b2;font-weight:500;text-decoration:none;">${sEmail}</a>
              </td></tr>
              <tr><td style="padding:20px 0;border-bottom:1px solid #ebebeb;">
                <p style="margin:0 0 3px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;font-family:'Courier New',monospace;">Company</p>
                <p style="margin:0;font-size:15px;color:#111827;">${sCompany}</p>
              </td></tr>
              <tr><td style="padding:20px 0;border-bottom:1px solid #ebebeb;">
                <p style="margin:0 0 3px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;font-family:'Courier New',monospace;">Service of interest</p>
                <p style="margin:0;font-size:15px;color:#111827;font-weight:500;">${h(serviceLabel[service] ?? service)}</p>
              </td></tr>
              <tr><td style="padding:20px 0 32px;">
                <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;font-family:'Courier New',monospace;">Project details</p>
                <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;white-space:pre-wrap;">${sMessage}</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 40px 32px;">
            <a href="mailto:${sEmail}?subject=Re: Your inquiry — WebVisionRank"
               style="display:inline-block;background:#141210;color:#f0ede8;font-size:13px;font-weight:500;padding:11px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;">
              Reply to ${sName} →
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#f7f7f4;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e5e0;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via webvisionrank.com/contact · ${new Date().toUTCString()}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Try n8n webhook first
    if (process.env.N8N_WEBHOOK_URL) {
      console.log("[contact] firing n8n webhook...")
      try {
        const res = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company: company ?? null,
            service: serviceLabel[service] ?? service,
            message,
            subject,
            submitted_at: new Date().toISOString(),
          }),
        })
        console.log("[contact] n8n response status:", res.status)
        if (!res.ok) {
          const body = await res.text()
          console.error("[contact] n8n webhook error:", res.status, body)
        }
      } catch (err) {
        console.error("[contact] n8n webhook failed:", err)
      }
    } else if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            subject,
            from_name: name,
            email,
            replyto: email,
            message: textBody,
          }),
        })
        const data = await res.json() as { success: boolean; message?: string }
        if (!data.success) console.error("[contact] Web3Forms error:", data.message)
      } catch (err) {
        console.error("[contact] Web3Forms failed:", err)
      }
    } else if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("REPLACE")) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: "WebVisionRank <noreply@webvisionrank.com>",
          to: process.env.CONTACT_EMAIL_TO,
          replyTo: email,
          subject,
          html: htmlBody,
          text: textBody,
        })
      } catch (err) {
        console.error("[contact] Resend failed:", err)
      }
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const nodemailer = await import("nodemailer")
        const transporter = nodemailer.default.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })
        await transporter.sendMail({
          from: `"WebVisionRank" <${process.env.GMAIL_USER}>`,
          to: process.env.CONTACT_EMAIL_TO,
          replyTo: email,
          subject,
          html: htmlBody,
          text: textBody,
        })
      } catch (err) {
        console.error("[contact] Nodemailer failed:", err)
      }
    }
  }

  return NextResponse.json(
    { message: "Message received. We'll be in touch within 24 hours." },
    { status: 200 }
  )
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 })
}
