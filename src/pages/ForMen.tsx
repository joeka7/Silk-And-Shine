import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import '../styles/pages.css';

const membershipDetails = [
  {
    icon: '🔬',
    title: 'Access to Latest Hair Care Technologies',
    desc: 'Revitalise your hair with advanced laser, PRP, and bioregenerative therapies. Boost hair growth and density with cutting-edge clinical protocols.',
  },
  {
    icon: '📊',
    title: 'Ongoing Consultations & Progress Tracking',
    desc: 'Regular consultations and assessments track your progress, align efforts with your goals, and identify improvement areas for effective outcomes.',
  },
  {
    icon: '🗓️',
    title: 'Priority Scheduling for Appointments',
    desc: 'Priority scheduling streamlines your access to appointments, reducing wait times and optimising resource allocation for your convenience.',
  },
];

const benefits = [
  {
    icon: '♾️',
    title: 'Unlimited Access to Advanced Treatments',
    desc: 'Unlimited access to the latest in hair restoration technologies, allowing consistent care for optimal results. Treatments are customised for individual needs, ensuring targeted support for every hair type and condition.',
  },
  {
    icon: '💡',
    title: 'Exclusive, Cutting-Edge Technology',
    desc: 'Our protocols integrate state-of-the-art equipment like laser therapies, PRP infusions, and bioregenerative scalp treatments. Special focus is given to growth-stimulating and follicle-strengthening technologies.',
  },
  {
    icon: '🧘',
    title: 'Professional Care for Stress-Related Hair Issues',
    desc: 'Our therapies target stress impacts with scalp tension release and deep tissue nourishment. Gentle scalp massages and stress-relief treatments reduce inflammation, improve circulation, and promote stronger, resilient hair.',
  },
  {
    icon: '⚗️',
    title: 'Hormonal Balance Support',
    desc: 'We offer targeted therapies for hormonal imbalances caused by aging, medical treatments, or lifestyle. Treatments include hormone-supportive scalp serums and nutrient infusions to combat DHT and hormone-related hair issues.',
  },
  {
    icon: '🤝',
    title: 'Gender-Neutral Care and Inclusivity',
    desc: 'The Club offers treatments for both men and women, tailoring hair care to gender-specific needs. Our treatments address the unique structural and hormonal hair needs optimising for thickness, volume, and texture enhancement.',
  },
  {
    icon: '💎',
    title: 'Value and Quality Assurance',
    desc: 'This membership offers exceptional value, granting access to premium hair care and technology at a fraction of individual session costs. Backed by Everlast Wellness, the Silk & Shine Club ensures top-quality care and clinical excellence.',
  },
  {
    icon: '✦',
    title: 'Ultimate Hair Care Experience',
    desc: 'The Silk & Shine Club is more than a membership; it is a dedicated support system for hair and scalp health, providing members with the assurance of consistent, high-quality care.',
  },
];

export default function ForMen() {
  useEffect(() => {
    document.title = 'For Men — Silk & Shine Club Hair Membership';
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
            <span>For Men</span>
          </nav>
          <div className="section-label">Men's Programme</div>
          <h1 className="page-hero__title">Silk &amp; Shine Club<br />For Men</h1>
          <p className="page-hero__desc">
            At Silk &amp; Shine, we understand the unique challenges men face — stress, irregular sleep,
            and poor diet. Our specialised treatments address thinning, receding hairlines, and
            maintaining a strong, healthy, confident look.
          </p>
        </div>
      </section>

      {/* Membership Details */}
      <section className="membership-detail section">
        <div className="container">
          <div className="membership-detail__intro">
            <div>
              <div className="section-label">Membership Details</div>
              <h2 className="section-title">Join Silk &amp; Shine Club<br />and Get Unlimited Care</h2>
              <p className="section-subtitle" style={{ marginBottom: '32px' }}>
                Unlimited visits and treatments based on personalised hair care needs.
                Whether you're battling dandruff, hair loss, or simply seeking a healthy, lustrous mane —
                our treatments are tailored to you.
              </p>
              <Link to="/contact" className="btn-primary">Get Your Membership →</Link>
            </div>
            <div className="membership-detail__points">
              {membershipDetails.map((m) => (
                <div className="membership-detail__point" key={m.title}>
                  <div className="membership-detail__point-icon-wrap">{m.icon}</div>
                  <div>
                    <div className="membership-detail__point-title">{m.title}</div>
                    <div className="membership-detail__point-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-grid">
        <div className="container">
          <h2 className="benefits-grid__title">Benefits of the Silk &amp; Shine Club Membership</h2>
          <div className="benefits-grid__grid">
            {benefits.map((b) => (
              <div className="benefit-full-card" key={b.title}>
                <div className="benefit-full-card__icon">{b.icon}</div>
                <h3 className="benefit-full-card__title">{b.title}</h3>
                <p className="benefit-full-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-section__inner">
            <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Membership For Men</h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
              Join the Silk &amp; Shine Club to unlock the future of hair care, where science,
              technology, and premium treatments come together to deliver unparalleled results.
            </p>
            <div className="pricing-section__card">
              <div className="pricing-section__price">
                <span className="pricing-section__currency">AED</span>
                <span className="pricing-section__amount">3,500</span>
                <span className="pricing-section__period">/ year</span>
              </div>
              <p className="pricing-section__gift">🎁 + Special Gift included on membership</p>
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Your Membership Today →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
