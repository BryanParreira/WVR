import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email too long"),
  company: z
    .string()
    .max(200, "Company name too long")
    .optional(),
  service: z.enum([
    "ai-automation",
    "cybersecurity",
    "digital-marketing",
    "custom-software",
    "web-development",
    "data-intelligence",
    "other",
  ]),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message too long"),
  honeypot: z.string().max(0, "Bot detected").optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
