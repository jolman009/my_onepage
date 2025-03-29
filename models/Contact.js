import React, { useState } from 'react';

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form status state
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: null
  });
  
  // Field error state
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = 'Name must be between 2 and 100 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 2 || formData.subject.length > 200) {
      newErrors.subject = 'Subject must be between 2 and 200 characters';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10 || formData.message.length > 5000) {
      newErrors.message = 'Message must be between 10 and 5000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Update status to submitting
    setStatus({
      ...status,
      submitting: true,
      error: null
    });
    
    try {
      // Send form data to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle validation errors from server
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.field] = err.message;
          });
          setErrors(serverErrors);
        }
        
        throw new Error(data.message || 'Failed to send message');
      }
      
      // Success! Update status
      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: null
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      // Set error status
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: error.message
      });
    }
  };
  
  return (
    <div className="contact-form-container">
      <h2 className="section-title">Contact Me</h2>
      
      {/* Success message */}
      {status.submitted && status.success && (
        <div className="success-message">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>Message Sent!</h3>
          <p>Thank you for your message. I'll get back to you as soon as possible.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => setStatus({ ...status, submitted: false })}
          >
            Send another message
          </button>
        </div>
      )}
      
      {/* Error message */}
      {status.submitted && !status.success && (
        <div className="error-message">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h3>Something went wrong</h3>
          <p>{status.error || 'Failed to send your message. Please try again.'}</p>
        </div>
      )}
      
      {/* Contact form */}
      {(!status.submitted || !status.success) && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Your Name"
              disabled={status.submitting}
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Your Email"
              disabled={status.submitting}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
              placeholder="Subject"
              disabled={status.submitting}
            />
            {errors.subject && <div className="error-text">{errors.subject}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Your Message"
              rows="5"
              disabled={status.submitting}
            ></textarea>
            {errors.message && <div className="error-text">{errors.message}</div>}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={status.submitting}
          >
            {status.submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Sending...
              </>
            ) : 'Send Message'}
          </button>
          
          <div className="form-footer">
            <small>Your information will never be shared with third parties.</small>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;