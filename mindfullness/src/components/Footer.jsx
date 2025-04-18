import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-circle"></span>
              <span className="logo-text">Mindful Space</span>
            </Link>
            <p className="footer-tagline">
              Your daily companion for mindfulness and mental wellness.
            </p>
          </div>

          <div className="footer-links">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mood-tracker">Mood Tracker</Link></li>
              <li><Link to="/meditations">Guided Meditations</Link></li>
              <li><Link to="/breathing">Breathing Exercises</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for tips on mindfulness and wellbeing.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                aria-label="Email address"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Mindful Space. All rights reserved.</p>
          <div className="social-links">
            <a href="https://twitter.com" aria-label="Twitter">
              <span className="icon">𝕏</span>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <span className="icon">📷</span>
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <span className="icon">▶️</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer