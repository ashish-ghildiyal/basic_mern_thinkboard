import ratelimit from "../config/upstash.js";

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