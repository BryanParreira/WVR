import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Source_Code_Pro } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld"
import { ScrollProgressBar } from "@/components/ui/scroll-progress"
import { SITE_CONFIG } from "@/lib/constants"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const sourceCodePro = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "AI agency",
    "agentic AI",
    "AI automation agency",
    "cybersecurity agency",
    "Zero Trust security",
    "generative engine optimization",
    "GEO agency",
    "web development agency",
    "digital marketing agency",
    "custom software development",
    "LLM pipeline development",
    "AI agents for business",
    "WebVisionRank",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webvisionrank",
    creator: "@webvisionrank",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning prevents next-themes hydration mismatch on class attribute
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${sourceCodePro.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-canvas text-body">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ScrollProgressBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
