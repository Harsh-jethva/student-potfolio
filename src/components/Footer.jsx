import React from 'react'

function Footer({ email = 'harsh.jethva@example.com', copyrightOwner = 'Harsh Jethva' }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="portfolio-footer">
      <div className="footer-container">
        <div className="footer-brand-column">
          <div className="footer-logo">
            <span className="footer-logo-badge">HJ</span>
            <h3>Harsh Jethva</h3>
          </div>
          <p className="footer-tagline">
            B.Tech Information Technology (24IT115) • Developing modern, full-stack web applications.
          </p>
          <div className="footer-course-badge">
            AWD Practical 8 • Performance Optimization & Lazy Loading
          </div>
        </div>

        <div className="footer-links-column">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/tasks">Task Manager</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4>Connect</h4>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${email}`} className="footer-email-link">
                ✉ {email}
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                💻 GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {currentYear} {copyrightOwner}. All rights reserved.</p>
        <p className="footer-subtext">Charotar University of Science & Technology (CHARUSAT)</p>
      </div>
    </footer>
  )
}

// React.memo prevents unnecessary re-renders when parent state (darkMode, user) changes
export default React.memo(Footer)