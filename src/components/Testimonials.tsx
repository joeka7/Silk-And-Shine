import { useState, useCallback, useEffect, useRef } from 'react';
import woman    from '../assets/imgs/woman.webp';
import woman1   from '../assets/imgs/woman-1.webp';
import woman3   from '../assets/imgs/woman-3.webp';
import woman4   from '../assets/imgs/woman-4.webp';
import woman5   from '../assets/imgs/woman-5.webp';
import man2     from '../assets/imgs/man-2.webp';
import menImg   from '../assets/imgs/men.webp';
import '../styles/Testimonials.css';

const testimonials = [
  {
    name: 'Aisha M.',
    role: 'Silk & Shine Club Member',
    text: 'As a working mom, I barely have time for myself, let alone a complicated hair care routine. Silk & Shine Club has been a lifesaver! The treatments are quick, effective, and leave my hair looking amazing.',
    photo: woman,
  },
  {
    name: 'Salma K.',
    role: 'Silk & Shine Member',
    text: 'Their treatments have transformed my hair, making it feel healthier and stronger than ever. The doctors are knowledgeable and take the time to understand my individual needs. I wouldn\'t trust my hair to anyone else.',
    photo: woman1,
  },
  {
    name: 'Maria L.',
    role: 'Silk & Shine Club Member',
    text: 'Moving to Abu Dhabi from a cooler climate, I was concerned about the impact the desert environment would have on my hair. Silk & Shine Club has been my saving grace! My hair has never looked or felt better since moving here.',
    photo: woman3,
  },
  {
    name: 'Mary A.',
    role: 'Silk & Shine Club Member',
    text: 'Between work and taking care of my family, I rarely have time for myself. Silk & Shine Club provides the perfect escape. The treatments are pure indulgence. I always leave feeling refreshed and rejuvenated.',
    photo: woman4,
  },
  {
    name: 'Noora K.',
    role: 'Silk & Shine Member',
    text: 'With my wedding coming up, I wanted to make sure my hair was in perfect condition. Silk & Shine Club has exceeded my expectations! The treatments have given my hair incredible shine and volume.',
    photo: woman5,
  },
  {
    name: 'Alya M.',
    role: 'Silk & Shine Club Member',
    text: 'As an Emirati woman, I value treatments that respect my hair\'s natural beauty and traditions. Silk & Shine Club understands this perfectly. Their treatments are tailored to my specific needs, leaving my hair feeling healthy, strong, and full of life.',
    photo: woman1,
  },
  {
    name: 'Khalid A.',
    role: 'Silk & Shine Club Member',
    text: 'After years of struggling with thinning hair, I finally found a solution at Everlast Wellness. Their hair rejuvenation treatment has made a remarkable difference! My hair feels thicker, stronger, and healthier than it has in years.',
    photo: menImg,
  },
  {
    name: 'Amany R.',
    role: 'Silk & Shine Club Member',
    text: 'I was hesitant to try hair treatments, as I prefer natural solutions. Everlast Wellness put my mind at ease. Their treatments use advanced techniques and nourishing ingredients to stimulate hair growth and improve scalp health.',
    photo: man2,
  },
];

function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return mobile;
}

export default function Testimonials() {
  const isMobile = useIsMobile();
  const CARD_WIDTH = isMobile ? 280 : 380;
  const GAP = 20;

  const total = testimonials.length;
  const [realIndex, setRealIndex] = useState(0);
  const [index, setIndex] = useState(total); // start at first real card
  const [transitioning, setTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setRealIndex(0); setIndex(total); }, [isMobile]);

  const prev = useCallback(() => {
    setTransitioning(true);
    setIndex((i) => i - 1);
  }, []);
  const next = useCallback(() => {
    setTransitioning(true);
    setIndex((i) => i + 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    let newReal = ((index - total) % total + total) % total;
    if (newReal !== realIndex) setRealIndex(newReal);
    // Snap to real position without transition
    setTransitioning(false);
    setIndex(newReal + total);
  }, [index, total, realIndex]);

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testimonials__header">
          <div className="section-label">Happy Members</div>
          <h2 className="section-title">What Our Members Say</h2>
          <p className="section-subtitle">
            Experience exceptional care and results with our expert treatments.
            Join the many satisfied clients who have discovered the power of Silk &amp; Shine Club.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="testimonials__track-wrap">
          <div
            ref={trackRef}
            className="testimonials__track"
            style={{
              transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
              transition: transitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div className="testimonial-card" key={`${i}-${t.name}`}>
                <div className="testimonial-card__quote-mark">"</div>
                <div className="testimonial-card__stars">
                  <span className="testimonial-card__star">★</span>
                  <span className="testimonial-card__star">★</span>
                  <span className="testimonial-card__star">★</span>
                  <span className="testimonial-card__star">★</span>
                  <span className="testimonial-card__star">★</span>
                </div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__footer">
                  <div className="testimonial-card__avatar">
                    <img src={t.photo} alt={t.name} loading="lazy" />
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials__controls">
          <button className="testimonials__btn" onClick={prev} aria-label="Previous">‹</button>
          <div className="testimonials__dots">
            {testimonials.map((_, slideNum) => (
              <button
                key={`slide-${slideNum}`}
                className={`testimonials__dot${slideNum === realIndex ? ' testimonials__dot--active' : ''}`}
                onClick={() => { setTransitioning(true); setIndex(slideNum + total); }}
                aria-label={`Slide ${slideNum + 1}`}
              />
            ))}
          </div>
          <button className="testimonials__btn" onClick={next} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  );
}
