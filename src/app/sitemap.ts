import type { MetadataRoute } from "next"
import { POSTS } from "@/lib/blog-posts"
import { CASE_STUDIES } from "@/lib/case-studies"

const BASE = "https://webvisionrank.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const blogUrls: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const caseStudyUrls: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudyUrls,
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogUrls,
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
