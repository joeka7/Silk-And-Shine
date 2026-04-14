import '../styles/Features.css';
import clubImg from '../assets/imgs/our-approach.webp';

const features = [
  {
    num: '01',
    title: 'Comprehensive Health',
    desc: 'Transform hair resilience and vitality through scientifically designed treatments that target root causes of hair damage, thinning, and scalp conditions.',
  },
  {
    num: '02',
    title: 'Regular Maintenance',
    desc: 'Prevent further damage with routine visits, safeguarding against hair thinning and scalp issues before they become serious concerns.',
  },
  {
    num: '03',
    title: 'Clinical Support',
    desc: 'Each treatment is part of a strategic regimen designed for maximum and lasting effectiveness, tracked by our expert medical team.',
  },
];

export default function Features() {
  return (
    <section className="features section">
      <div className="container">
        <div className="features__split">
          <div className="features__content">
            <div className="section-label">Our Approach</div>
            <h2 className="section-title">The Three Pillars of<br />Silk &amp; Shine Care</h2>
            <p className="features__subtitle">
              A clinically-backed approach to hair health designed for consistent,
              transformative, and lasting results.
            </p>
            <div className="features__list">
              {features.map((f) => (
                <div className="feature-item" key={f.num}>
                  <div className="feature-item__number">{f.num}</div>
                  <div className="feature-item__text">
                    <h3 className="feature-item__title">{f.title}</h3>
                    <p className="feature-item__desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="features__visual">
            <div className="features__image-wrapper glass-panel">
              <img src={clubImg} alt="Our Approach to Silk & Shine Care" loading="lazy" />
              <div className="features__image-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
