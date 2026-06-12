import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Sliding window: 5 requests per 60 seconds per IP
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: false,
  prefix: "wvr:rl",
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier)
  return { success, limit, reset, remaining }
}
