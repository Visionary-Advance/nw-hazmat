// For Next.js App Router (app/api/send-email/route.js)
import { Resend } from 'resend';
import { sendAlert } from '@/lib/email/alertEmail';

let _resend;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured');
    _resend = new Resend(key);
  }
  return _resend;
}

// Sender and recipient are fixed server-side so this route can't be used as an open relay.
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'noreply@mail.visionaryadvance.com';
const TO_EMAIL = 'office@nwhazmat.com';

const MAX_LEN = { name: 200, phone: 50, email: 254, businessName: 200, type: 100, message: 5000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const clean = (s, max) => String(s ?? '').trim().slice(0, max);
const safe = (s) => String(s ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

export async function POST(request) {
  try {
    const body = await request.json();
    const { recaptchaToken } = body;
    const name = clean(body.name, MAX_LEN.name);
    const phone = clean(body.phone, MAX_LEN.phone);
    const email = clean(body.email, MAX_LEN.email);
    const businessName = clean(body.businessName, MAX_LEN.businessName);
    const type = clean(body.type, MAX_LEN.type);
    const message = clean(body.message, MAX_LEN.message);

    if (!name || !email || !EMAIL_RE.test(email)) {
      return Response.json({ error: 'Name and a valid email are required' }, { status: 400 });
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      console.error('reCAPTCHA token missing');
      return Response.json({ error: 'reCAPTCHA verification required' }, { status: 400 });
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
          response: String(recaptchaToken),
        }).toString(),
      }
    );
    const recaptchaData = await recaptchaResponse.json();

    console.log('reCAPTCHA verification result:', {
      success: recaptchaData.success,
      score: recaptchaData.score,
      action: recaptchaData.action,
    });

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error('reCAPTCHA verification failed:', recaptchaData);
      return Response.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Subject is a header: strip line breaks so it can't be used for header injection.
    const subject = `New Contact Form Submission from ${name.replace(/[\r\n]+/g, ' ')}`;

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #B91C1C;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Phone Number:</strong> ${safe(phone)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Business Name:</strong> ${safe(businessName)}</p>
        <p><strong>Type:</strong> ${safe(type)}</p>
        <p><strong>Message:</strong><br><span style="white-space: pre-wrap;">${safe(message)}</span></p>
      </div>
    `;

    const text = `New Contact Submission\n\nName: ${name}\nPhone Number: ${phone}\nEmail: ${email}\nBusiness Name: ${businessName}\nType: ${type}\nMessage: ${message}\n`;

    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      // A dropped contact submission = lost business. Alert with enough to follow up.
      sendAlert({
        subject: 'Contact form email failed to send',
        severity: 'critical',
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
        context: { name, phone: phone || '—', email, type: type || '—' },
      });
      return Response.json({ error: 'Email send failed' }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error('API error:', error);
    sendAlert({ subject: 'Contact route crashed (POST /api/send-email)', severity: 'critical', error });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
