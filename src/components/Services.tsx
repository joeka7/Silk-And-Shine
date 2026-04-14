import { Link } from 'react-router-dom';
import womanImg from '../assets/imgs/woman-4.webp';
import manImg from '../assets/imgs/man-4.webp';
import '../styles/Services.css';

const services = [
  {
    tag: 'For Women',
    title: 'Women\'s Hair Programme',
    desc: 'Our treatments address the unique structural and hormonal hair needs of women, optimising for hair thickness, volume, and texture enhancement. Whether dealing with stress-induced thinning, hormonal changes, or environmental damage — we have a solution for you.',
    link: '/for-women',
    img: womanImg,
    imgAlt: 'Woman with vibrant healthy hair',
  },
  {
    tag: 'For Men',
    title: 'Men\'s Hair Programme',
    desc: 'Treatments designed specifically for men\'s hair, addressing concerns like thinning, receding hairlines, and maintaining a strong, healthy look. We use advanced techniques and premium products to optimise your hair\'s performance.',
    link: '/for-men',
    img: manImg,
    imgAlt: 'Man with healthy styled hair',
  },
];

export default function Services() {
  return (
    <section className="services section">
      <div className="services__bg-text" aria-hidden="true">HAIR</div>
      <div className="container">
        <div className="services__header">
          <div className="services__header-text">
            <div className="section-label">Tailored Programmes</div>
            <h2 className="section-title">Personalised Care<br />for Every Member</h2>
            <p className="section-subtitle">
              Whether you are a man or a woman, our treatments are scientifically
              tailored to your unique biology, lifestyle, and hair goals.
            </p>
          </div>
          <Link to="/about" className="btn-outline">Learn More</Link>
        </div>
        <div className="services__grid">
          {services.map((s) => (
            <Link to={s.link} className="service-card glass-panel" key={s.tag} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="service-card__image">
                <img src={s.img} alt={s.imgAlt} loading="lazy" />
                <div className="service-card__image-overlay" />
                <div className="service-card__tag glass-panel">{s.tag}</div>
              </div>
              <div className="service-card__body">
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__link">
                  View Programme
                  <span className="service-card__link-arrow"><i className="fa-solid fa-arrow-right"></i></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
