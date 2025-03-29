const express = require('express');
const router = express.Router();
const { 
  submitContactForm, 
  getContactSubmissions, 
  markAsRead 
} = require('../controllers/contactController');
const { 
  contactValidationRules, 
  validateContact 
} = require('../middleware/validation');
const { contactRateLimiter } = require('../middleware/rateLimit');

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact form
 * @access  Public
 */
router.post(
  '/', 
  contactRateLimiter,
  contactValidationRules,
  validateContact,
  submitContactForm
);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions
 * @access  Private (would need authentication in a real app)
 */
router.get('/', getContactSubmissions);

/**
 * @route   PUT /api/contact/:id/read
 * @desc    Mark a contact as read
 * @access  Private (would need authentication in a real app)
 */
router.put('/:id/read', markAsRead);

module.exports = router;
const { 
  submitContactForm, 
  getContactSubmissions, 
  markAsRead 
} = require('../controllers/contactController');
const { 
  contactValidationRules, 
  validateContact 
} = require('../middleware/validation');
const { contactRateLimiter } = require('../middleware/rateLimit');

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact form
 * @access  Public
 */
router.post(
  '/', 
  contactRateLimiter,
  contactValidationRules,
  validateContact,
  submitContactForm
);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions
 * @access  Private (would need authentication in a real app)
 */
router.get('/', getContactSubmissions);

/**
 * @route   PUT /api/contact/:id/read
 * @desc    Mark a contact as read
 * @access  Private (would need authentication in a real app)
 */
router.put('/:id/read', markAsRead);

module.exports = router;