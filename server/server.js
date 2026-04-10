'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 4000;

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
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
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

  const recipient = process.env.RECIPIENT_EMAIL || 'customer.service@everlastwellness.com';

  const mailOptions = {
    from:    `"Silk & Shine Club" <${process.env.SMTP_USER}>`,
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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f0ece4; padding: 40px; border-radius: 12px;">
        <h2 style="color: #c9a84c; margin-bottom: 4px;">Silk &amp; Shine Club</h2>
        <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">New Contact Form Submission</p>
        <hr style="border: none; border-top: 1px solid rgba(201,168,76,0.2); margin: 24px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 100px;">Name</td>
            <td style="padding: 10px 0; color: #f0ece4; font-size: 14px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px;">Phone</td>
            <td style="padding: 10px 0; color: #f0ece4; font-size: 14px;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; color: #c9a84c; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #c9a84c;">${escapeHtml(email)}</a></td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 24px 0;" />
        <p style="color: #888; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
        <p style="color: #d0c8b8; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 32px 0 16px;" />
        <p style="color: #555; font-size: 12px; text-align: center;">© Silk &amp; Shine Club · Everlast Wellness Medical Center · Abu Dhabi, UAE</p>
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
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}
