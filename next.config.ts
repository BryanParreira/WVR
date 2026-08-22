import type { NextConfig } from "next"

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com;
  style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com;
  img-src 'self' blob: data: https://cdn.sanity.io https://hcaptcha.com https://*.hcaptcha.com;
  font-src 'self';
  frame-src https://hcaptcha.com https://*.hcaptcha.com;
  connect-src 'self' https://*.supabase.co https://api.sanity.io wss://*.supabase.co https://hcaptcha.com https://*.hcaptcha.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          // The CDN in front of this site (Hostinger) is not deploy-aware — unlike
          // Vercel, it doesn't auto-purge on new deploys. Next's default long
          // s-maxage on static HTML then leaves it serving a page that references
          // stale chunk hashes from a previous build until the year-long TTL expires.
          // Keep HTML revalidating often so a new deploy is picked up within minutes.
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      // Turbopack runtime reuses the same filename across builds but changes content,
      // which breaks caching entirely: a cached copy from a previous deploy can point
      // at a chunk that no longer exists post-deploy (404) or has different content.
      // Force revalidation on every request instead of trusting any cached copy.
      // Applies to all static chunks, not just turbopack-prefixed ones — the same
      // filename-reuse behavior affects regular numbered chunks too.
      {
        source: "/_next/static/chunks/:name*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, must-revalidate",
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
