import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config({
    path: 'backend/config/config.env'
});
// Create a new ratelimiter, that allows 5 requests per 10 seconds

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });

  export default ratelimit;