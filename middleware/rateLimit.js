const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for contact form submissions
 * Limits to 5 submissions per hour from the same IP
 */
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: {
    success: false,
    message: 'Too many contact requests, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  skipSuccessfulRequests: false // Count successful requests
});

module.exports = {
  contactRateLimiter
};
