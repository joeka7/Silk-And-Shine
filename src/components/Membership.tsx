import clubCardImg from '../assets/imgs/aljameela-club-card.webp';
import '../styles/Membership.css';

const benefits = [
  { icon: 'fa-solid fa-infinity', title: 'Unlimited Access', desc: 'Unlimited visits and treatments based on your personalised hair care needs.' },
  { icon: 'fa-solid fa-microscope', title: 'Cutting-Edge Technology', desc: 'Laser therapies, PRP infusions, and bioregenerative scalp treatments.' },
  { icon: 'fa-solid fa-spa', title: 'Stress-Related Care', desc: 'Scalp tension release, deep tissue nourishment, and stress-relief treatments.' },
  { icon: 'fa-solid fa-flask', title: 'Hormonal Balance', desc: 'Targeted therapies including hormone-supportive scalp serums.' },
  { icon: 'fa-solid fa-chart-bar', title: 'Progress Tracking', desc: 'Regular consultations track your progress and keep treatment aligned.' },
  { icon: 'fa-solid fa-calendar-days', title: 'Priority Scheduling', desc: 'Streamlined access to appointments with reduced wait times.' },
];

export default function Membership() {
  return (
    <section className="membership section">
      <div className="container">
        <div className="membership__intro">
          <div className="membership__intro-text">
            <div className="section-label">Membership</div>
            <h2 className="section-title">The Silk &amp; Shine Club VIP Experience</h2>
            <p className="section-subtitle">
              Experience luxury, perks, and high-quality care. Find the membership that unlocks your hair\'s potential.
            </p>
          </div>
          <div className="membership__card-visual glass-panel">
             <img src={clubCardImg} alt="Aljameela Club Card VIP" className="vip-card-img" loading="lazy" />
          </div>
        </div>

        <div className="membership__benefits">
          {benefits.map((b) => (
            <div className="benefit-item glass-panel" key={b.title}>
              <span className="benefit-item__icon"><i className={b.icon}></i></span>
              <div>
                 <h4 className="benefit-item__title">{b.title}</h4>
                 <p className="benefit-item__desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
