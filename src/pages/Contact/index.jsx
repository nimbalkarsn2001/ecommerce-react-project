import React, { useState } from 'react';
import '../../styles/Pages.css';

/**
 * Contact Page
 * Contact form and information
 */
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="page-content">
      <h1>📞 Contact Us</h1>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          {submitted && <div className="alert alert-success">Thank you! We'll get back to you soon.</div>}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <h3>📧 Email</h3>
            <p>support@ecommercehub.com</p>
          </div>
          <div className="contact-info">
            <h3>📞 Phone</h3>
            <p>1-800-SHOP-NOW</p>
          </div>
          <div className="contact-info">
            <h3>📍 Address</h3>
            <p>123 Commerce Street<br />Shop City, SC 12345</p>
          </div>
          <div className="contact-info">
            <h3>🕐 Hours</h3>
            <p>Monday - Friday: 9 AM - 6 PM<br />Saturday: 10 AM - 4 PM<br />Sunday: Closed</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
