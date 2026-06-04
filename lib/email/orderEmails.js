// lib/email/orderEmails.js
// Server-side order email helpers. Uses Resend SDK directly (no reCAPTCHA needed
// since these fire from a trusted post-payment server flow).

import { Resend } from 'resend';

let _resend;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY missing');
    _resend = new Resend(key);
  }
  return _resend;
}

const fmtMoney = (n) =>
  Number(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function itemsTable(items) {
  const rows = items
    .map(
      (it) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(it.name)}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${it.quantity || 1}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${fmtMoney(it.price)}</td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${fmtMoney((it.price || 0) * (it.quantity || 1))}</td>
        </tr>`
    )
    .join('');
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-family:Arial,sans-serif;font-size:14px;">
      <thead>
        <tr style="background:#f7f7f7;">
          <th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">Item</th>
          <th style="padding:10px;text-align:center;border-bottom:2px solid #ddd;">Qty</th>
          <th style="padding:10px;text-align:right;border-bottom:2px solid #ddd;">Price</th>
          <th style="padding:10px;text-align:right;border-bottom:2px solid #ddd;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function totalsBlock({ subtotal, shippingCost, total }) {
  return `
    <table style="width:100%;border-collapse:collapse;margin:8px 0;font-family:Arial,sans-serif;font-size:14px;">
      <tr><td style="padding:4px 10px;text-align:right;color:#666;">Subtotal:</td><td style="padding:4px 10px;text-align:right;width:120px;">${fmtMoney(subtotal)}</td></tr>
      <tr><td style="padding:4px 10px;text-align:right;color:#666;">Shipping:</td><td style="padding:4px 10px;text-align:right;">${fmtMoney(shippingCost)}</td></tr>
      <tr><td style="padding:8px 10px;text-align:right;font-weight:bold;font-size:16px;border-top:2px solid #ddd;">Total:</td><td style="padding:8px 10px;text-align:right;font-weight:bold;font-size:16px;border-top:2px solid #ddd;">${fmtMoney(total)}</td></tr>
    </table>`;
}

function addressBlock(c) {
  return `
    ${escapeHtml(c.firstName)} ${escapeHtml(c.lastName)}<br>
    ${c.company ? `${escapeHtml(c.company)}<br>` : ''}
    ${escapeHtml(c.address)}${c.apartment ? `, ${escapeHtml(c.apartment)}` : ''}<br>
    ${escapeHtml(c.city)}, ${escapeHtml(c.state)} ${escapeHtml(c.zipCode)}<br>
    ${c.country ? escapeHtml(c.country) : 'US'}`;
}

// ----- Customer confirmation -----

function customerConfirmationHtml(order) {
  const { customerInfo: c, items, subtotal, shippingCost, total, id, shipmentTrackingNumber } = order;
  const trackingBlock = shipmentTrackingNumber
    ? `<div style="background:#eef7ee;border:1px solid #c8e6c9;padding:12px 16px;border-radius:4px;margin:16px 0;">
         <strong>UPS Tracking:</strong> ${escapeHtml(shipmentTrackingNumber)}<br>
         <a href="https://www.ups.com/track?tracknum=${encodeURIComponent(shipmentTrackingNumber)}" style="color:#0a66c2;">Track your package</a>
       </div>`
    : '';
  return `
  <div style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;padding:24px;">
    <h1 style="margin:0 0 8px;font-size:22px;">Thanks for your order, ${escapeHtml(c.firstName)}!</h1>
    <p style="margin:0 0 16px;color:#555;">We've received your order and will get it shipped out shortly.</p>

    <div style="background:#f7f7f7;padding:12px 16px;border-radius:4px;margin:16px 0;">
      <strong>Order #${id}</strong>
    </div>

    ${trackingBlock}

    <h3 style="margin:24px 0 8px;font-size:16px;">Items</h3>
    ${itemsTable(items)}
    ${totalsBlock({ subtotal, shippingCost, total })}

    <h3 style="margin:24px 0 8px;font-size:16px;">Shipping to</h3>
    <p style="margin:0;line-height:1.5;">${addressBlock(c)}</p>

    <p style="margin-top:32px;color:#666;font-size:13px;">
      Questions? Reply to this email or contact us at info@nwhazmat.com.
    </p>
    <p style="margin-top:8px;color:#666;font-size:13px;">— NorthWest HazMat, Inc.</p>
  </div>`;
}

// ----- Internal NW Hazmat notification -----

function notificationHtml(order, hasLabelAttached) {
  const { customerInfo: c, items, subtotal, shippingCost, total, id, paymentIntentId, paymentMethod, shipmentTrackingNumber } = order;
  const trackingBlock = shipmentTrackingNumber
    ? `<div style="background:#eef7ee;border:1px solid #c8e6c9;padding:12px 16px;border-radius:4px;margin:16px 0;">
         <strong>UPS Tracking:</strong> ${escapeHtml(shipmentTrackingNumber)}
         ${hasLabelAttached ? '<br><span style="color:#2e7d32;">✓ Label attached — print and ship.</span>' : ''}
       </div>`
    : `<div style="background:#fff1f0;border:1px solid #ffccc7;padding:12px 16px;border-radius:4px;margin:16px 0;">
         <strong>⚠ UPS label was not generated.</strong> Create one manually in the UPS dashboard.
       </div>`;
  return `
  <div style="font-family:Arial,sans-serif;color:#222;max-width:680px;margin:0 auto;padding:24px;">
    <h1 style="margin:0 0 8px;font-size:22px;">New order received</h1>
    <div style="background:#fffbe6;border:1px solid #ffe58f;padding:12px 16px;border-radius:4px;margin:16px 0;">
      <strong>Order #${id}</strong> · Stripe PI: <code>${escapeHtml(paymentIntentId || 'n/a')}</code> · Method: ${escapeHtml(paymentMethod || 'card')}
    </div>

    ${trackingBlock}

    <h3 style="margin:24px 0 8px;font-size:16px;">Customer</h3>
    <p style="margin:0;line-height:1.5;">
      ${escapeHtml(c.firstName)} ${escapeHtml(c.lastName)}<br>
      <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>
      ${c.phone ? `<br><a href="tel:${escapeHtml(c.phone)}">${escapeHtml(c.phone)}</a>` : ''}
    </p>

    <h3 style="margin:24px 0 8px;font-size:16px;">Ship to</h3>
    <p style="margin:0;line-height:1.5;">${addressBlock(c)}</p>

    <h3 style="margin:24px 0 8px;font-size:16px;">Items</h3>
    ${itemsTable(items)}
    ${totalsBlock({ subtotal, shippingCost, total })}
  </div>`;
}

// Plain-text fallbacks (helpful for spam scores + non-HTML clients)
function itemsText(items) {
  return items
    .map(
      (it) =>
        `  - ${it.name} × ${it.quantity || 1} @ ${fmtMoney(it.price)} = ${fmtMoney((it.price || 0) * (it.quantity || 1))}`
    )
    .join('\n');
}

function customerText(order) {
  const { customerInfo: c, items, subtotal, shippingCost, total, id } = order;
  return `Thanks for your order, ${c.firstName}!

Order #${id}

Items:
${itemsText(items)}

Subtotal: ${fmtMoney(subtotal)}
Shipping: ${fmtMoney(shippingCost)}
Total:    ${fmtMoney(total)}

Shipping to:
${c.firstName} ${c.lastName}
${c.company || ''}
${c.address}${c.apartment ? `, ${c.apartment}` : ''}
${c.city}, ${c.state} ${c.zipCode}

— NorthWest HazMat, Inc.`;
}

function notificationText(order) {
  const { customerInfo: c, items, subtotal, shippingCost, total, id, paymentIntentId } = order;
  return `New order #${id}
Stripe PI: ${paymentIntentId || 'n/a'}

Customer: ${c.firstName} ${c.lastName} <${c.email}>

Ship to:
${c.address}${c.apartment ? `, ${c.apartment}` : ''}
${c.city}, ${c.state} ${c.zipCode}

Items:
${itemsText(items)}

Subtotal: ${fmtMoney(subtotal)}
Shipping: ${fmtMoney(shippingCost)}
Total:    ${fmtMoney(total)}`;
}

// ----- Public senders -----

export async function sendOrderConfirmation(order) {
  const from = process.env.ORDER_FROM_EMAIL;
  const to = order?.customerInfo?.email;
  if (!from) throw new Error('ORDER_FROM_EMAIL missing');
  if (!to) throw new Error('Customer email missing');

  return getResend().emails.send({
    from: `NorthWest HazMat <${from}>`,
    to,
    subject: `Order confirmation #${order.id} — NorthWest HazMat`,
    html: customerConfirmationHtml(order),
    text: customerText(order),
  });
}

export async function sendOrderNotification(order, labels = []) {
  const from = process.env.ORDER_FROM_EMAIL;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!from) throw new Error('ORDER_FROM_EMAIL missing');
  if (!to) throw new Error('ORDER_NOTIFICATION_EMAIL missing');

  const mimeByFormat = { GIF: 'image/gif', PDF: 'application/pdf', PNG: 'image/png', ZPL: 'application/zpl' };
  const attachments = labels
    .filter((l) => l.labelData)
    .map((l, i) => ({
      filename: `ups-label-${order.id}-${i + 1}.${(l.labelFormat || 'gif').toLowerCase()}`,
      content: Buffer.from(l.labelData, 'base64'),
      content_type: mimeByFormat[(l.labelFormat || 'GIF').toUpperCase()] || 'application/octet-stream',
    }));

  return getResend().emails.send({
    from: `NW Hazmat Orders <${from}>`,
    to,
    reply_to: order?.customerInfo?.email,
    subject: `New order #${order.id} — ${order.customerInfo?.firstName || ''} ${order.customerInfo?.lastName || ''}`.trim(),
    html: notificationHtml(order, attachments.length > 0),
    text: notificationText(order),
    ...(attachments.length > 0 ? { attachments } : {}),
  });
}
