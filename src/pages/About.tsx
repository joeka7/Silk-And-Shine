import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../assets/imgs/EWMC-New-Building.webp';
import clubImg from '../assets/imgs/club.webp';
import appMockup   from '../assets/imgs/responsive_device-i-phone14.webp';
import '../styles/pages.css';

const stats = [
  { value: '10+', label: 'Years of Clinical Excellence' },
  { value: '∞',   label: 'Unlimited Visits' },
  { value: '2',   label: 'Tailored Programmes' },
  { value: '100%', label: 'Personalised Care' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About — Silk & Shine Club by Everlast Wellness';
  }, []);

  return (
    <main>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__content">
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-hero__breadcrumb-sep">›</span>
            <span>About</span>
          </nav>
          <div className="section-label">Our Heritage</div>
          <h1 className="page-hero__title">Silk &amp; Shine Club<br />by Everlast Wellness</h1>
          <p className="page-hero__desc">
            Welcome to the Silk &amp; Shine Club — proudly presented by Everlast Wellness,
            the region's leading aesthetic and medical clinic in Abu Dhabi.
          </p>
        </div>
      </section>

      {/* Building Image Banner */}
      <section className="about-banner">
        <div className="container">
          <div className="about-banner__wrap">
            <img
              src={buildingImg}
              alt="Everlast Wellness Medical Center"
              className="about-banner__img"
              loading="lazy"
            />
            <div className="about-banner__overlay" />
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="about-stats section">
        <div className="container">
          <div className="about-stats__grid">
            {stats.map((s) => (
              <div className="about-stats__item glass-panel" key={s.label}>
                <div className="about-stats__value">{s.value}</div>
                <div className="about-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Text */}
      <section className="about-story section">
        <div className="container about-story__container glass-panel">
          {/* Top — Text */}
          <div className="about-story__text">
            <div className="section-label">The Club</div>
            <h2 className="section-title">A Transformative Journey<br />in Hair Care</h2>
            <div className="about-story__prose">
              <p>
                The Silk &amp; Shine Club is an exclusive annual membership that offers a transformative
                journey in hair care. Designed by the experts at Everlast Wellness,
                this club is perfect for those who want the best for their hair health and vitality.
              </p>
              <p>
                Members gain unlimited access to cutting-edge treatments and protocols tailored
                for both men and women. Each treatment is part of a strategic regimen designed
                for maximum and lasting effectiveness.
              </p>
              <p>
                Everlast Wellness is an aesthetic wellness clinic specialising in dermatological
                and anti-aging treatments and procedures. Our mission is to enhance the health
                and wellness of our local community, supporting the body, mind, and spirit.
              </p>
            </div>
            <div className="about-story__actions">
              <Link to="/contact" className="btn-primary">Join the Club</Link>
              <Link to="/for-women" className="btn-outline">For Women</Link>
              <Link to="/for-men" className="btn-outline">For Men</Link>
            </div>
          </div>
          {/* Bottom — Image */}
          <div className="about-story__image-wrap">
            <img src={clubImg} alt="Silk & Shine Club" className="about-story__image" loading="lazy" />
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="about-app">
        <div className="container">
          <div className="about-app__inner glass-panel">
            <div className="about-app__content">
              <div className="section-label">Mobile Experience</div>
              <h3 className="about-app__title">Everlast Wellness App</h3>
              <p className="about-app__desc">
                Enhance your Silk &amp; Shine Club experience. Book appointments seamlessly,
                track your progress securely, and access exclusive VIP offers directly from your phone.
              </p>
              <div className="about-app__actions">
                <a href="https://apps.apple.com/eg/app/everlast-wellness/id6737142880" className="btn-primary" target="_blank" rel="noopener noreferrer">App Store</a>
                <a href="https://play.google.com/store/apps/details?id=com.everlast.wellness&hl=en&pli=1" className="btn-outline" target="_blank" rel="noopener noreferrer">Google Play</a>
              </div>
            </div>
            <div className="about-app__mockup-wrapper">
              <img
                src={appMockup}
                alt="Everlast Wellness Mobile App Mockup"
                className="about-app__mockup-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
