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

const SITUATIONS = {
  suspected: 'I suspect mold but haven\'t confirmed it',
  visible: 'I can see visible mold',
  post_leak: 'After a leak or water damage',
  health: 'Family is having allergic / respiratory symptoms',
  inspection: 'Pre-purchase inspection / real estate',
  other: 'Other / not sure',
};

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'noreply@mail.visionaryadvance.com';
const TO_EMAIL = 'office@nwhazmat.com';

export async function POST(request) {
  try {
    const body = await request.json();
    const { recaptchaToken, name, phone, email, situation, message, source } = body;

    if (!name || !phone) {
      return Response.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    if (!recaptchaToken) {
      return Response.json({ error: 'reCAPTCHA verification required' }, { status: 400 });
    }

    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5)) {
      return Response.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    const situationLabel = SITUATIONS[situation] || situation || 'Not specified';
    const safe = (s) => String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

    const subject = `Mold Lead — ${safe(name)} (${safe(phone)})`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #111;">
        <div style="background:#0f172a;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:22px;">New Mold Remediation Lead</h2>
          <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">Source: ${safe(source || 'mold-services-eugene-oregon')}</p>
        </div>
        <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${safe(phone)}" style="color:#10b981;">${safe(phone)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${safe(email)}" style="color:#10b981;">${safe(email || '—')}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Situation</td><td style="padding:8px 0;">${safe(situationLabel)}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td><td style="padding:8px 0;white-space:pre-wrap;">${safe(message)}</td></tr>` : ''}
          </table>
          <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
            Promised callback window: 1 hour.
          </p>
        </div>
      </div>
    `;

    const text = `New Mold Remediation Lead\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || '—'}\nSituation: ${situationLabel}\n${message ? `\nMessage:\n${message}\n` : ''}\nSource: ${source || 'mold-services-eugene-oregon'}`;

    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email || undefined,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      // A dropped lead = lost business. Alert with enough to follow up by phone.
      sendAlert({
        subject: 'Mold lead email failed to send',
        severity: 'critical',
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
        context: { name, phone, email: email || '—', situation: situationLabel },
      });
      return Response.json({ error: 'Email send failed' }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Lead route error:', err);
    sendAlert({ subject: 'Lead route crashed (POST /api/lead)', severity: 'critical', error: err });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
