import Link from "next/link"
import type { Post } from "@/lib/blog-posts"

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <div className="mt-4 mb-14">
      <p className="caption-uppercase mb-4 text-muted">Related reading</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-hover group flex flex-col gap-1.5 rounded-[10px] border border-hairline bg-surface p-5"
          >
            <span className="caption-uppercase text-muted">{post.category}</span>
            <span className="text-[14px] font-medium leading-[1.35] text-ink transition-opacity duration-150 group-hover:opacity-75">
              {post.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
