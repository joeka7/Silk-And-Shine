import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const socials = [
  { label: 'SC', name: 'Snapchat' },
  { label: 'TT', name: 'TikTok' },
  { label: 'IG', name: 'Instagram' },
  { label: 'YT', name: 'YouTube' },
  { label: 'FB', name: 'Facebook' },
  { label: 'LI', name: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo-mark">Silk <span>&</span> Shine</div>
            <div className="footer__logo-sub">Club · By Everlast Wellness</div>
            <p className="footer__brand-desc">
              An exclusive annual membership offering a transformative journey in hair care,
              backed by over 10 years of clinical excellence at Everlast Wellness Medical Center.
            </p>
            <div className="footer__social">
              {socials.map((s) => (
                <a key={s.name} href="#" className="footer__social-link" aria-label={s.name}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer__col-title">Navigation</div>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/for-women" className="footer__link">For Women</Link>
              <Link to="/for-men" className="footer__link">For Men</Link>
              <Link to="/about" className="footer__link">About</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer__col-title">Contact</div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📧</span>
              <span>customer.service@everlastwellness.com</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              <span>+971 600 551 615</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              <span>446 Al Khaleej Al Arabi St · Al Bateen · Abu Dhabi · UAE</span>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="footer__col-title">Working Hours</div>
            <div className="footer__hours">
              <div className="footer__hours-row">
                <span className="footer__hours-day">Saturday</span>
                <span className="footer__hours-time">1:00 PM – 9:30 PM</span>
              </div>
              <div className="footer__hours-row">
                <span className="footer__hours-day">Sun – Fri</span>
                <span className="footer__hours-time">8:30 AM – 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__bottom-text">
            © 2024 Silk &amp; Shine Club. All rights reserved. By{' '}
            <a href="https://everlastwellness.com" target="_blank" rel="noopener noreferrer">
              Everlast Wellness Medical Center
            </a>
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
