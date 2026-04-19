import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

interface FormData {
  name: string;
  countryIso: string;
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

function flagUrl(iso: string): string {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}

const rawCountries: [string, string, string][] = [
  ['AF', '+93',  'Afghanistan'],
  ['AL', '+355', 'Albania'],
  ['DZ', '+213', 'Algeria'],
  ['AS', '+1',   'American Samoa'],
  ['AD', '+376', 'Andorra'],
  ['AO', '+244', 'Angola'],
  ['AI', '+1',   'Anguilla'],
  ['AG', '+1',   'Antigua & Barbuda'],
  ['AR', '+54',  'Argentina'],
  ['AM', '+374', 'Armenia'],
  ['AW', '+297', 'Aruba'],
  ['AU', '+61',  'Australia'],
  ['AT', '+43',  'Austria'],
  ['AZ', '+994', 'Azerbaijan'],
  ['BS', '+1',   'Bahamas'],
  ['BH', '+973', 'Bahrain'],
  ['BD', '+880', 'Bangladesh'],
  ['BB', '+1',   'Barbados'],
  ['BY', '+375', 'Belarus'],
  ['BE', '+32',  'Belgium'],
  ['BZ', '+501', 'Belize'],
  ['BJ', '+229', 'Benin'],
  ['BM', '+1',   'Bermuda'],
  ['BT', '+975', 'Bhutan'],
  ['BO', '+591', 'Bolivia'],
  ['BA', '+387', 'Bosnia & Herzegovina'],
  ['BW', '+267', 'Botswana'],
  ['BR', '+55',  'Brazil'],
  ['VG', '+1',   'British Virgin Islands'],
  ['BN', '+673', 'Brunei'],
  ['BG', '+359', 'Bulgaria'],
  ['BF', '+226', 'Burkina Faso'],
  ['BI', '+257', 'Burundi'],
  ['KH', '+855', 'Cambodia'],
  ['CM', '+237', 'Cameroon'],
  ['CA', '+1',   'Canada'],
  ['CV', '+238', 'Cape Verde'],
  ['KY', '+1',   'Cayman Islands'],
  ['CF', '+236', 'Central African Republic'],
  ['TD', '+235', 'Chad'],
  ['CL', '+56',  'Chile'],
  ['CN', '+86',  'China'],
  ['CO', '+57',  'Colombia'],
  ['KM', '+269', 'Comoros'],
  ['CG', '+242', 'Congo - Brazzaville'],
  ['CD', '+243', 'Congo - Kinshasa'],
  ['CK', '+682', 'Cook Islands'],
  ['CR', '+506', 'Costa Rica'],
  ['CI', '+225', 'Côte d\'Ivoire'],
  ['HR', '+385', 'Croatia'],
  ['CU', '+53',  'Cuba'],
  ['CW', '+599', 'Curaçao'],
  ['CY', '+357', 'Cyprus'],
  ['CZ', '+420', 'Czech Republic'],
  ['DK', '+45',  'Denmark'],
  ['DJ', '+253', 'Djibouti'],
  ['DM', '+1',   'Dominica'],
  ['DO', '+1',   'Dominican Republic'],
  ['EC', '+593', 'Ecuador'],
  ['EG', '+20',  'Egypt'],
  ['SV', '+503', 'El Salvador'],
  ['GQ', '+240', 'Equatorial Guinea'],
  ['ER', '+291', 'Eritrea'],
  ['EE', '+372', 'Estonia'],
  ['SZ', '+268', 'Eswatini'],
  ['ET', '+251', 'Ethiopia'],
  ['FK', '+500', 'Falkland Islands'],
  ['FO', '+298', 'Faroe Islands'],
  ['FJ', '+679', 'Fiji'],
  ['FI', '+358', 'Finland'],
  ['FR', '+33',  'France'],
  ['GF', '+594', 'French Guiana'],
  ['PF', '+689', 'French Polynesia'],
  ['GA', '+241', 'Gabon'],
  ['GM', '+220', 'Gambia'],
  ['GE', '+995', 'Georgia'],
  ['DE', '+49',  'Germany'],
  ['GH', '+233', 'Ghana'],
  ['GI', '+350', 'Gibraltar'],
  ['GR', '+30',  'Greece'],
  ['GL', '+299', 'Greenland'],
  ['GD', '+1',   'Grenada'],
  ['GP', '+590', 'Guadeloupe'],
  ['GU', '+1',   'Guam'],
  ['GT', '+502', 'Guatemala'],
  ['GG', '+44',  'Guernsey'],
  ['GN', '+224', 'Guinea'],
  ['GW', '+245', 'Guinea-Bissau'],
  ['GY', '+592', 'Guyana'],
  ['HT', '+509', 'Haiti'],
  ['HN', '+504', 'Honduras'],
  ['HK', '+852', 'Hong Kong'],
  ['HU', '+36',  'Hungary'],
  ['IS', '+354', 'Iceland'],
  ['IN', '+91',  'India'],
  ['ID', '+62',  'Indonesia'],
  ['IR', '+98',  'Iran'],
  ['IQ', '+964', 'Iraq'],
  ['IE', '+353', 'Ireland'],
  ['IM', '+44',  'Isle of Man'],
  ['IL', '+972', 'Israel'],
  ['IT', '+39',  'Italy'],
  ['JM', '+1',   'Jamaica'],
  ['JP', '+81',  'Japan'],
  ['JE', '+44',  'Jersey'],
  ['JO', '+962', 'Jordan'],
  ['KZ', '+7',   'Kazakhstan'],
  ['KE', '+254', 'Kenya'],
  ['KI', '+686', 'Kiribati'],
  ['XK', '+383', 'Kosovo'],
  ['KW', '+965', 'Kuwait'],
  ['KG', '+996', 'Kyrgyzstan'],
  ['LA', '+856', 'Laos'],
  ['LV', '+371', 'Latvia'],
  ['LB', '+961', 'Lebanon'],
  ['LS', '+266', 'Lesotho'],
  ['LR', '+231', 'Liberia'],
  ['LY', '+218', 'Libya'],
  ['LI', '+423', 'Liechtenstein'],
  ['LT', '+370', 'Lithuania'],
  ['LU', '+352', 'Luxembourg'],
  ['MO', '+853', 'Macau'],
  ['MK', '+389', 'North Macedonia'],
  ['MG', '+261', 'Madagascar'],
  ['MW', '+265', 'Malawi'],
  ['MY', '+60',  'Malaysia'],
  ['MV', '+960', 'Maldives'],
  ['ML', '+223', 'Mali'],
  ['MT', '+356', 'Malta'],
  ['MH', '+692', 'Marshall Islands'],
  ['MQ', '+596', 'Martinique'],
  ['MR', '+222', 'Mauritania'],
  ['MU', '+230', 'Mauritius'],
  ['MX', '+52',  'Mexico'],
  ['FM', '+691', 'Micronesia'],
  ['MD', '+373', 'Moldova'],
  ['MC', '+377', 'Monaco'],
  ['MN', '+976', 'Mongolia'],
  ['ME', '+382', 'Montenegro'],
  ['MS', '+1',   'Montserrat'],
  ['MA', '+212', 'Morocco'],
  ['MZ', '+258', 'Mozambique'],
  ['MM', '+95',  'Myanmar'],
  ['NA', '+264', 'Namibia'],
  ['NR', '+674', 'Nauru'],
  ['NP', '+977', 'Nepal'],
  ['NL', '+31',  'Netherlands'],
  ['AN', '+599', 'Netherlands Antilles'],
  ['NC', '+687', 'New Caledonia'],
  ['NZ', '+64',  'New Zealand'],
  ['NI', '+505', 'Nicaragua'],
  ['NE', '+227', 'Niger'],
  ['NG', '+234', 'Nigeria'],
  ['NU', '+683', 'Niue'],
  ['MP', '+1',   'Northern Mariana Islands'],
  ['NO', '+47',  'Norway'],
  ['OM', '+968', 'Oman'],
  ['PK', '+92',  'Pakistan'],
  ['PW', '+680', 'Palau'],
  ['PS', '+970', 'Palestine'],
  ['PA', '+507', 'Panama'],
  ['PG', '+675', 'Papua New Guinea'],
  ['PY', '+595', 'Paraguay'],
  ['PE', '+51',  'Peru'],
  ['PH', '+63',  'Philippines'],
  ['PL', '+48',  'Poland'],
  ['PT', '+351', 'Portugal'],
  ['PR', '+1',   'Puerto Rico'],
  ['QA', '+974', 'Qatar'],
  ['RE', '+262', 'Réunion'],
  ['RO', '+40',  'Romania'],
  ['RU', '+7',   'Russia'],
  ['RW', '+250', 'Rwanda'],
  ['BL', '+590', 'Saint Barthélemy'],
  ['SH', '+290', 'Saint Helena'],
  ['KN', '+1',   'Saint Kitts & Nevis'],
  ['LC', '+1',   'Saint Lucia'],
  ['MF', '+590', 'Saint Martin'],
  ['VC', '+1',   'Saint Vincent & the Grenadines'],
  ['WS', '+685', 'Samoa'],
  ['SM', '+378', 'San Marino'],
  ['ST', '+239', 'São Tomé & Príncipe'],
  ['SA', '+966', 'Saudi Arabia'],
  ['SN', '+221', 'Senegal'],
  ['RS', '+381', 'Serbia'],
  ['SC', '+248', 'Seychelles'],
  ['SL', '+232', 'Sierra Leone'],
  ['SG', '+65',  'Singapore'],
  ['SX', '+1',   'Sint Maarten'],
  ['SK', '+421', 'Slovakia'],
  ['SI', '+386', 'Slovenia'],
  ['SB', '+677', 'Solomon Islands'],
  ['SO', '+252', 'Somalia'],
  ['ZA', '+27',  'South Africa'],
  ['KR', '+82',  'South Korea'],
  ['SS', '+211', 'South Sudan'],
  ['ES', '+34',  'Spain'],
  ['LK', '+94',  'Sri Lanka'],
  ['SD', '+249', 'Sudan'],
  ['SR', '+597', 'Suriname'],
  ['SJ', '+47',  'Svalbard'],
  ['SE', '+46',  'Sweden'],
  ['CH', '+41',  'Switzerland'],
  ['SY', '+963', 'Syria'],
  ['TW', '+886', 'Taiwan'],
  ['TJ', '+992', 'Tajikistan'],
  ['TZ', '+255', 'Tanzania'],
  ['TH', '+66',  'Thailand'],
  ['TG', '+228', 'Togo'],
  ['TK', '+690', 'Tokelau'],
  ['TO', '+676', 'Tonga'],
  ['TT', '+1',   'Trinidad & Tobago'],
  ['TN', '+216', 'Tunisia'],
  ['TR', '+90',  'Turkey'],
  ['TM', '+993', 'Turkmenistan'],
  ['TC', '+1',   'Turks & Caicos Islands'],
  ['TV', '+688', 'Tuvalu'],
  ['UG', '+256', 'Uganda'],
  ['UA', '+380', 'Ukraine'],
  ['AE', '+971', 'United Arab Emirates'],
  ['GB', '+44',  'United Kingdom'],
  ['US', '+1',   'United States'],
  ['UY', '+598', 'Uruguay'],
  ['UZ', '+998', 'Uzbekistan'],
  ['VU', '+678', 'Vanuatu'],
  ['VA', '+379', 'Vatican City'],
  ['VE', '+58',  'Venezuela'],
  ['VN', '+84',  'Vietnam'],
  ['VI', '+1',   'Virgin Islands (US)'],
  ['WF', '+681', 'Wallis & Futuna'],
  ['YE', '+967', 'Yemen'],
  ['ZM', '+260', 'Zambia'],
  ['ZW', '+263', 'Zimbabwe'],
];

interface CountryEntry {
  iso: string;
  code: string;
  name: string;
  flagUrl: string;
  label: string;
  example: string;
}

const countryCodes: CountryEntry[] = rawCountries.map(([iso, code, name]) => ({
  iso,
  code,
  name,
  flagUrl: flagUrl(iso),
  label: `(${code}) ${name}`,
  example: `${code} XXX XXXX`,
}));

function CountrySelect({ iso, onChange }: { iso: string; onChange: (iso: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = countryCodes.find((c) => c.iso === iso);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={`country-select${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="country-select__trigger"
        onClick={() => setOpen((o) => !o)}
      >
        {selected && (
          <img
            src={selected.flagUrl}
            alt={selected.iso}
            className="country-select__flag"
            width={22}
            height={16}
          />
        )}
        <span className="country-select__code">{selected?.code ?? ''}</span>
        <span className="country-select__arrow" />
      </button>
      {open && (
        <div className="country-select__dropdown">
          {countryCodes.map((c) => (
            <button
              type="button"
              key={c.iso}
              className={`country-select__option${c.iso === iso ? ' active' : ''}`}
              onClick={() => {
                onChange(c.iso);
                setOpen(false);
              }}
            >
              <img
                src={c.flagUrl}
                alt={c.iso}
                className="country-select__flag"
                width={20}
                height={15}
              />
              <span className="country-select__name">{c.name}</span>
              <span className="country-select__dial">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const socials = [
  { name: 'Snapchat',  icon: 'fa-brands fa-snapchat',    href: 'https://www.snapchat.com/add/everlastwmc' },
  { name: 'TikTok',   icon: 'fa-brands fa-tiktok',       href: 'https://www.tiktok.com/@everlastwellness' },
  { name: 'Instagram',icon: 'fa-brands fa-instagram',    href: 'https://www.instagram.com/everlastwellness/' },
  { name: 'YouTube',  icon: 'fa-brands fa-youtube',      href: 'https://www.youtube.com/channel/UC8BxCEjG34knpcKLoFLNUgg' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in',  href: 'https://www.linkedin.com/company/everlastwellnessmc/' },
];

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

async function detectCountryByIP(): Promise<string | null> {
  try {
    const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    const text = await res.text();
    const match = text.match(/loc=(\w{2})/);
    return match ? match[1].toUpperCase() : null;
  } catch {
    return null;
  }
}

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us — Silk & Shine Club';
  }, []);

  const [form, setForm] = useState<FormData>({
    name: '',
    countryIso: 'AE',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    detectCountryByIP().then((iso) => {
      if (iso && countryCodes.some((c) => c.iso === iso)) {
        setForm((prev) => ({ ...prev, countryIso: iso }));
      }
    });
  }, []);

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: `${countryCodes.find((c) => c.iso === form.countryIso)?.code ?? ''} ${form.phone}`,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', countryIso: 'AE', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
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
                  <div className="contact-info__item-icon"><i className="fa-solid fa-phone"></i></div>
                  <div>
                    <div className="contact-info__item-label">Phone</div>
                    <div className="contact-info__item-value">
                      <a href="tel:+971600551615">+971 600 551 615</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__item-icon"><i className="fa-solid fa-envelope"></i></div>
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
                  <div className="contact-info__item-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div>
                    <div className="contact-info__item-label">Address</div>
                    <div className="contact-info__item-value">
                      446 Al Khaleej Al Arabi St<br />
                      Al Bateen · Abu Dhabi · UAE
                    </div>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__item-icon"><i className="fa-solid fa-clock"></i></div>
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
                  <a href={s.href} key={s.name} className="contact-info__social-link" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                    <i className={s.icon}></i>
                  </a>
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
                    <CountrySelect
                      iso={form.countryIso}
                      onChange={(iso) => setForm((prev) => ({ ...prev, countryIso: iso }))}
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`form-input${errors.phone ? ' error' : ''}`}
                      placeholder={countryCodes.find((c) => c.iso === form.countryIso)?.example ?? 'Phone number'}
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
                    <i className="fa-solid fa-check"></i> Message sent! We'll be in touch with you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="form-error-msg">
                    <i className="fa-solid fa-xmark"></i> Something went wrong. Please try again or email us directly.
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
