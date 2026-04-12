import { Link } from 'react-router-dom';
import bannerImg from '../assets/imgs/banner.webp';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bg-image" style={{ backgroundImage: `url(${bannerImg})` }}></div>
      <div className="hero__bg-overlay"></div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__badge glass-panel">
            <span className="hero__badge-text">Exclusive Annual Membership</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">Ultimate Hair Care</span>
            <span className="hero__title-line">for Lasting</span>
            <span className="hero__title-line hero__title-accent">Health & Beauty</span>
          </h1>

          <p className="hero__desc">
            Welcome to the Silk &amp; Shine Club — an exclusive annual membership offering a
            transformative journey in hair care, backed by the clinical expertise of
            Everlast Wellness.
          </p>

          <div className="hero__actions">
            <Link to="/for-women" className="btn-primary hero-btn">
              For Women
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/for-men" className="btn-outline hero-btn outline-light">For Men</Link>
          </div>

          <div className="hero__stats glass-panel">
            <div className="hero__stat">
              <div className="hero__stat-value">10+</div>
              <div className="hero__stat-label">Years Experience</div>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <div className="hero__stat-value">∞</div>
              <div className="hero__stat-label">Unlimited Visits</div>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <div className="hero__stat-value">1 yr</div>
              <div className="hero__stat-label">Full Membership</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
