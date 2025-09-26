// For Next.js App Router (app/api/send-email/route.js)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { from, to, reply_to, subject, html, text } = await request.json();

    const { data, error } = await resend.emails.send({
      from,
      to,
      reply_to,
      subject,
      html,
      text,
    });

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