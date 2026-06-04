// lib/email/alertEmail.js
// Business-critical alerting. Sends an email to a single ops inbox (ALERT_EMAIL)
// when something revenue/lead-impacting fails — failed payment, lost order,
// dropped lead. Also forwards to Sentry so it shows up alongside other errors.
//
// Design rules:
//  - NEVER throws. Alerting must not break the request it's reporting on.
//  - Throttled per (severity+subject) so one bad deploy can't send 500 emails.
//  - No card data is ever included; scrub PII before passing `context`.
import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';

let _resend;
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

// In-memory throttle. Note: serverless instances are ephemeral, so this dedupes
// within a warm instance — good enough to stop tight loops. Sentry handles
// cross-instance grouping.
const THROTTLE_MS = 10 * 60 * 1000; // 10 minutes
const _recent = new Map();

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function contextRows(context) {
  return Object.entries(context || {})
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#64748b;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 10px;font-family:monospace;font-size:13px;">${escapeHtml(
          typeof v === 'object' ? JSON.stringify(v) : v
        )}</td></tr>`
    )
    .join('');
}

/**
 * @param {object}  opts
 * @param {string}  opts.subject   Short, stable summary (used for throttling/grouping).
 * @param {'critical'|'error'|'warning'} [opts.severity]
 * @param {Error}   [opts.error]   The thrown error, if any.
 * @param {object}  [opts.context] Key/value details (order #, route, PI id…). No PII/cards.
 */
export async function sendAlert({ subject, severity = 'error', error, context = {} }) {
  try {
    // Always tell Sentry, even if email is throttled/unconfigured.
    if (error) {
      Sentry.captureException(error, { level: severity === 'warning' ? 'warning' : 'error', extra: context });
    } else {
      Sentry.captureMessage(`${subject}`, { level: severity === 'warning' ? 'warning' : 'error', extra: context });
    }

    const key = `${severity}:${subject}`;
    const now = Date.now();
    const last = _recent.get(key);
    if (last && now - last < THROTTLE_MS) return { throttled: true };
    _recent.set(key, now);
    // Opportunistic prune so the map can't grow unbounded.
    if (_recent.size > 200) {
      for (const [k, t] of _recent) if (now - t > THROTTLE_MS) _recent.delete(k);
    }

    const to = process.env.ALERT_EMAIL;
    const from = process.env.ALERT_FROM_EMAIL || process.env.ORDER_FROM_EMAIL;
    const resend = getResend();
    if (!resend || !to || !from) {
      console.error('[ALERT not emailed — missing ALERT_EMAIL/from/RESEND_API_KEY]', subject, context);
      return { skipped: true };
    }

    const env = process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown';
    const errBlock = error
      ? `<h3 style="margin:20px 0 6px;font-size:15px;">Error</h3>
         <pre style="background:#0f172a;color:#e2e8f0;padding:12px;border-radius:6px;overflow:auto;font-size:12px;white-space:pre-wrap;">${escapeHtml(
           error.stack || error.message || String(error)
         )}</pre>`
      : '';

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111;">
        <div style="background:${severity === 'critical' ? '#7f1d1d' : '#b45309'};color:#fff;padding:16px 20px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:18px;">${escapeHtml(severity.toUpperCase())}: ${escapeHtml(subject)}</h2>
          <p style="margin:6px 0 0;font-size:13px;opacity:.85;">${escapeHtml(env)} · ${new Date().toISOString()}</p>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:none;padding:16px 20px;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">${contextRows(context)}</table>
          ${errBlock}
        </div>
      </div>`;

    const text =
      `${severity.toUpperCase()}: ${subject}\n${env} · ${new Date().toISOString()}\n\n` +
      Object.entries(context || {})
        .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join('\n') +
      (error ? `\n\nError:\n${error.stack || error.message || String(error)}` : '');

    await resend.emails.send({
      from: `NW Hazmat Alerts <${from}>`,
      to,
      subject: `[NW Hazmat ${severity}] ${subject}`,
      html,
      text,
    });
    return { sent: true };
  } catch (e) {
    // Last resort — don't let the alerter itself crash the caller.
    console.error('[ALERT send failed]', e?.message || e);
    return { failed: true };
  }
}
