import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate short network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page-container">
      {/* Top Header */}
      <div className="contact-header-section">
        <span className="contact-badge">GET IN TOUCH</span>
        <h1 className="contact-headline">Let's Connect & Collaborate</h1>
        <p className="contact-description">
          Have an inquiry, a project proposal, or want to discuss full-stack web development?
          Feel free to reach out via the form or through the channels below.
        </p>
      </div>

      {/* Main 2-Column Arranged Grid */}
      <div className="contact-grid">
        {/* Left Column: Direct Info & Social Cards */}
        <div className="contact-info-column">
          <div className="contact-info-card">
            <h2 className="info-card-title">Contact Information</h2>
            <p className="info-card-subtitle">
              Feel free to contact me directly through email or connect on professional platforms.
            </p>

            <div className="info-items-list">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <span className="info-label">Location</span>
                  <span className="info-value">CHARUSAT Campus, Changa, Gujarat, India</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-details">
                  <span className="info-label">Email</span>
                  <a href="mailto:harsh.jethva@example.com" className="info-link">
                    harsh.jethva@example.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🎓</div>
                <div className="info-details">
                  <span className="info-label">Academics</span>
                  <span className="info-value">B.Tech IT (Sem 5) • CSPIT / CHARUSAT</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">💻</div>
                <div className="info-details">
                  <span className="info-label">GitHub</span>
                  <a
                    href="https://github.com/Harsh-jethva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    github.com/Harsh-jethva
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Availability Card */}
            <div className="availability-callout">
              <div className="callout-indicator">
                <span className="pulse-dot"></span>
                <strong>Currently Available</strong>
              </div>
              <p>Open for full-stack internships, collaborative open-source projects, and technical discussions.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="contact-form-column">
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-badge">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your message regarding{' '}
                  <em>"{formData.subject || 'Inquiry'}"</em> has been received.
                </p>
                <p className="success-subnote">
                  A response will be sent to <strong>{formData.email}</strong> shortly.
                </p>
                <button type="button" className="btn-primary reset-btn" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form-inner" onSubmit={handleSubmit}>
                <h2 className="form-card-title">Send a Message</h2>

                <div className="form-field">
                  <label htmlFor="contact-name">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Project Collaboration / Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">
                    Message <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-send-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message ✉'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
