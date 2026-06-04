// lib/ups/auth.js
// UPS OAuth2 client_credentials flow with in-memory token cache.
// Tokens last ~4 hours; we refresh 60s before expiry.

let cached = null; // { token: string, expiresAt: number }

export async function getUpsAccessToken() {
  const now = Date.now();
  if (cached && cached.expiresAt - 60_000 > now) {
    return cached.token;
  }

  const clientId = process.env.UPS_CLIENT_ID;
  const clientSecret = process.env.UPS_CLIENT_SECRET;
  const baseUrl = process.env.UPS_BASE_URL;

  if (!clientId || !clientSecret || !baseUrl) {
    throw new Error('UPS credentials missing (UPS_CLIENT_ID / UPS_CLIENT_SECRET / UPS_BASE_URL)');
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${baseUrl}/security/v1/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`UPS auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const expiresInSec = Number(data.expires_in) || 14_400;

  cached = {
    token: data.access_token,
    expiresAt: now + expiresInSec * 1000,
  };

  return cached.token;
}

export function _resetUpsTokenCache() {
  cached = null;
}
