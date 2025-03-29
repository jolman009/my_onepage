const Contact = require('../models/Contact');
const { sendContactNotification, sendUserConfirmation } = require('../config/email');

/**
 * Handle contact form submissions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const submitContactForm = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, subject, message } = req.body;
    
    // Get IP address and user agent for spam detection
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // Create a new contact entry in the database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent
    });
    
    // Send email notification to site owner
    const emailResult = await sendContactNotification({
      name,
      email,
      subject,
      message
    });
    
    // Optionally, send confirmation to user
    if (process.env.SEND_CONFIRMATION === 'true') {
      await sendUserConfirmation({
        name,
        email,
        subject,
        message
      });
    }
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      contactId: contact.id
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.'
    });
  }
};

/**
 * Retrieve all contact submissions (admin only)
 * Note: In a real app, this should be protected by authentication
 */
const getContactSubmissions = async (req, res) => {
  try {
    // Get all contact submissions, newest first
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
    
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact submissions.'
    });
  }
};

/**
 * Mark a contact submission as read
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the contact submission
    const contact = await Contact.findByPk(id);
    
    // If not found, return error
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found.'
      });
    }
    
    // Update isRead status
    contact.isRead = true;
    await contact.save();
    
    res.status(200).json({
      success: true,
      message: 'Contact marked as read.',
      data: contact
    });
    
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status.'
    });
  }
};

module.exports = {
  submitContactForm,
  getContactSubmissions,
  markAsRead
};