const { body, validationResult } = require('express-validator');

/**
 * Validation rules for contact form
 */
const contactValidationRules = [
  // Name validation
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .matches(/^[A-Za-z\s.'-]+$/).withMessage('Name contains invalid characters'),
  
  // Email validation
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 }).withMessage('Email must be less than 100 characters'),
  
  // Subject validation
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 2, max: 200 }).withMessage('Subject must be between 2 and 200 characters'),
  
  // Message validation
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
];

/**
 * Middleware to check for validation errors
 */
const validateContact = (req, res, next) => {
  // Run validation
  const errors = validationResult(req);
  
  // If there are errors, return them
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  // No errors, continue to the next middleware
  next();
};

module.exports = {
  contactValidationRules,
  validateContact
};