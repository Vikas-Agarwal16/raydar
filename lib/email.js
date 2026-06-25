import nodemailer from "nodemailer";

// Created once at module load, not per-call — same reasoning as your
// Mongoose connection caching: SMTP handshake is expensive, reuse the
// transporter across invocations instead of reconnecting every send.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendDigestEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Raydar" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error(`Email send failed for ${to}:`, err.message);
    return { ok: false, error: err.message };
  }
}