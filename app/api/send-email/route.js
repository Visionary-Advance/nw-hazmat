// For Next.js App Router (app/api/send-email/route.js)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { recaptchaToken, from, to, reply_to, subject, html, text, attachments } = await request.json();

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
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
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

    // Build email options
    const emailOptions = {
      from,
      to,
      reply_to,
      subject,
      html,
      text,
    };

    // Add attachments if present
    if (attachments && attachments.length > 0) {
      emailOptions.attachments = attachments.map(att => ({
        filename: att.filename,
        content: Buffer.from(att.content, 'base64'),
        content_type: att.content_type,
      }));
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
