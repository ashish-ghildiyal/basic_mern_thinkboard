import ratelimit from "../config/upstash.js";

// Middleware function for rate limiting
/* A rate limiter controls how many requests a user (or IP) can make to your server within a certain time frame.
    For example:
    “Allow a maximum of 100 requests per minute per IP.”
    If a client exceeds that, the server rejects requests with a 429 Too Many Requests error.  
*/
export const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limiter");
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
    } catch (error) {
        console.error("Rate Limiter Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}