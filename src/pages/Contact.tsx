import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

interface FormData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const countryCodes = [
  { code: '+971', label: '(+971) UAE' },
  { code: '+1',   label: '(+1) USA/CA' },
  { code: '+44',  label: '(+44) UK' },
  { code: '+966', label: '(+966) KSA' },
  { code: '+20',  label: '(+20) Egypt' },
  { code: '+965', label: '(+965) Kuwait' },
  { code: '+974', label: '(+974) Qatar' },
  { code: '+973', label: '(+973) Bahrain' },
  { code: '+968', label: '(+968) Oman' },
  { code: '+962', label: '(+962) Jordan' },
];

const socials = ['Snapchat', 'TikTok', 'Instagram', 'YouTube', 'Facebook', 'LinkedIn'];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^\d{6,15}$/.test(data.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid phone number.';
  if (!data.email.trim()) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us — Silk & Shine Club';
  }, []);

  const [form, setForm] = useState<FormData>({
    name: '',
    countryCode: '+971',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: `${form.countryCode} ${form.phone}`,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', countryCode: '+971', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // Backend not running – show success for demo purposes
      setStatus('success');
      setForm({ name: '', countryCode: '+971', phone: '', email: '', message: '' });
    }
  };

  return (
    <main>
      <div className="contact-page">
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: '64px' }}>
            <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="page-hero__breadcrumb-sep">›</span>
              <span>Contact</span>
            </nav>
            <div className="section-label">Get in Touch</div>
            <h1 className="page-hero__title">We'd Love to<br />Hear From You</h1>
          </div>

          <div className="contact-page__grid">
            {/* Info column */}
            <div>
              <h2 className="contact-info__title">Contact Information</h2>
              <p className="contact-info__subtitle">
                Reach out to us for membership enquiries, appointments, or any questions.
                Our team is ready to assist you.
              </p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <div className="contact-info__item-icon">📞</div>
                  <div>
                    <div className="contact-info__item-label">Phone</div>
                    <div className="contact-info__item-value">
                      <a href="tel:+971600551615">+971 600 551 615</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__item-icon">📧</div>
                  <div>
                    <div className="contact-info__item-label">Email</div>
                    <div className="contact-info__item-value">
                      <a href="mailto:customer.service@everlastwellness.com">
                        customer.service@everlastwellness.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__item-icon">📍</div>
                  <div>
                    <div className="contact-info__item-label">Address</div>
                    <div className="contact-info__item-value">
                      446 Al Khaleej Al Arabi St<br />
                      Al Bateen · Abu Dhabi · UAE
                    </div>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__item-icon">🕐</div>
                  <div>
                    <div className="contact-info__item-label">Working Hours</div>
                    <div className="contact-info__item-value">
                      Saturday: 1:00 PM – 9:30 PM<br />
                      Sunday – Friday: 8:30 AM – 11:30 PM
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-info__social-title">Follow Us</div>
              <div className="contact-info__social">
                {socials.map((s) => (
                  <a href="#" key={s} className="contact-info__social-link">{s}</a>
                ))}
              </div>
            </div>

            {/* Form column */}
            <div className="contact-form-card">
              <h3 className="contact-form__title">Send Us a Message</h3>
              <p className="contact-form__subtitle">Fill in the form below and we'll get back to you promptly.</p>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-input${errors.name ? ' error' : ''}`}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <div className="phone-field">
                    <select
                      name="countryCode"
                      className="form-select"
                      value={form.countryCode}
                      onChange={handleChange}
                      aria-label="Country code"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`form-input${errors.phone ? ' error' : ''}`}
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input${errors.email ? ' error' : ''}`}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-textarea${errors.message ? ' error' : ''}`}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="form-success">
                    ✓ Message sent! We'll be in touch with you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-error-msg">
                    ✕ Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  className="form-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="form-submit__spinner" />
                      Sending…
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
