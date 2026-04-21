'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:4173',  // Vite preview
    'https://silkandshineclub.com',
  ],
  methods: ['POST'],
}));

// ─── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error('SMTP connection error:', err.message);
  else console.log('  ✓  SMTP connected and ready');
});

// ─── Validate contact payload ─────────────────────────────────────────────────
function validateContact({ name, phone, email, message }) {
  const errors = [];
  if (!name  || typeof name  !== 'string' || name.trim().length < 2)    errors.push('Invalid name.');
  if (!phone || typeof phone !== 'string' || phone.trim().length < 5)   errors.push('Invalid phone.');
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email.');
  if (!message || typeof message !== 'string' || message.trim().length < 10) errors.push('Message too short.');
  return errors;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body;

  const errors = validateContact({ name, phone, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const recipient = process.env.EMAIL_TO || 'customer.service@everlastwellness.com';

  const mailOptions = {
    from:    `"Silk & Shine Club" <${process.env.EMAIL_USER}>`,
    to:      recipient,
    replyTo: email,
    subject: `New Contact Form Submission — ${name}`,
    text: `
Name:    ${name}
Phone:   ${phone}
Email:   ${email}

Message:
${message}
    `.trim(),
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; border-radius: 16px; overflow: hidden; border: 1px solid rgba(44,158,138,0.2);">
        <!-- Header with gradient line -->
        <div style="background: linear-gradient(90deg, transparent, #2C9E8A, transparent); height: 2px;"></div>
        <div style="padding: 40px 40px 32px; text-align: center;">
          <img src="https://silkandshineclub.com/logo-white.png" alt="Silk & Shine Club" style="height: 80px; width: auto;" />
          <div style="margin-top: 16px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #2C9E8A;">New Contact Form Submission</div>
        </div>

        <!-- Divider -->
        <div style="margin: 0 40px; height: 1px; background: linear-gradient(90deg, transparent, rgba(44,158,138,0.25), transparent);"></div>

        <!-- Contact details -->
        <div style="padding: 32px 40px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b75; margin-bottom: 4px;">Name</div>
                <div style="font-size: 15px; color: #fcfcfc; font-weight: 500;">${escapeHtml(name)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b75; margin-bottom: 4px;">Phone</div>
                <div style="font-size: 15px; color: #fcfcfc;">${escapeHtml(phone)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b75; margin-bottom: 4px;">Email</div>
                <div style="font-size: 15px;"><a href="mailto:${escapeHtml(email)}" style="color: #2C9E8A; text-decoration: none;">${escapeHtml(email)}</a></div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Message -->
        <div style="margin: 0 40px; padding: 24px; background: #121216; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
          <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #6b6b75; margin-bottom: 12px;">Message</div>
          <div style="font-size: 14px; color: #a0a0ab; line-height: 1.8; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>

        <!-- Footer -->
        <div style="padding: 32px 40px; text-align: center;">
          <div style="margin-bottom: 16px; height: 1px; background: linear-gradient(90deg, transparent, rgba(44,158,138,0.15), transparent);"></div>
          <div style="font-size: 11px; color: #3a3a42; letter-spacing: 0.5px;">
            &copy; ${new Date().getFullYear()} Silk &amp; Shine Club &middot; Everlast Wellness Medical Center &middot; Abu Dhabi, UAE
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦  Silk & Shine server running at http://localhost:${PORT}\n`);
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replaceAll('&',  '&amp;')
    .replaceAll('<',  '&lt;')
    .replaceAll('>',  '&gt;')
    .replaceAll('"',  '&quot;')
    .replaceAll("'",  '&#x27;');
}
