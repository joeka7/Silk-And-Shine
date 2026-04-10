import { useState } from 'react';
import '../styles/Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__inner">
          <div className="newsletter__bg-orb" />
          <div className="newsletter__text">
            <div className="section-label">Stay Updated</div>
            <h3 className="newsletter__title">Subscribe for Special Offers</h3>
            <p className="newsletter__subtitle">Get exclusive deals and the latest hair care insights delivered to your inbox.</p>
          </div>
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter__input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
          {status === 'success' && (
            <p style={{ fontSize: '0.8rem', color: '#5cd67d', marginTop: '8px', position: 'absolute', bottom: '16px', right: '64px' }}>
              ✓ You're subscribed!
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '0.8rem', color: '#e07070', marginTop: '8px', position: 'absolute', bottom: '16px', right: '64px' }}>
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
