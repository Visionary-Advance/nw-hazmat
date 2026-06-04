// lib/ups/addressValidation.js
// UPS Street-Level Address Validation (XAV).

import { getUpsAccessToken } from './auth';

function normalizeCandidate(c) {
  const akf = c?.AddressKeyFormat;
  if (!akf) return null;
  const lines = Array.isArray(akf.AddressLine) ? akf.AddressLine : [akf.AddressLine];
  return {
    street: (lines || []).filter(Boolean).join(' '),
    city: akf.PoliticalDivision2 || '',
    state: akf.PoliticalDivision1 || '',
    zipCode:
      akf.PostcodePrimaryLow && akf.PostcodeExtendedLow
        ? `${akf.PostcodePrimaryLow}-${akf.PostcodeExtendedLow}`
        : akf.PostcodePrimaryLow || '',
    country: akf.CountryCode || 'US',
  };
}

export async function validateAddress({ street, city, state, zipCode, country = 'US' }) {
  if (!street || !city || !state || !zipCode) {
    return { valid: false, reason: 'missing_fields', suggestions: [] };
  }

  const token = await getUpsAccessToken();
  const baseUrl = process.env.UPS_BASE_URL;

  const body = {
    XAVRequest: {
      AddressKeyFormat: {
        AddressLine: [street],
        PoliticalDivision2: city,
        PoliticalDivision1: state,
        PostcodePrimaryLow: String(zipCode).split('-')[0],
        CountryCode: country,
      },
    },
  };

  // requestoption=3: validation + classification (residential vs commercial)
  const res = await fetch(`${baseUrl}/api/addressvalidation/v2/3`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      transId: `nwh-xav-${Date.now()}`,
      transactionSrc: 'nwhazmat-checkout',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    // UPS CIE (sandbox) returns 9264030 for unsupported test states. Treat it as a
    // soft "skip" so dev/checkout still works against unsupported test addresses.
    if (res.status === 400 && text.includes('9264030')) {
      return {
        valid: null,
        reason: 'sandbox_unsupported_state',
        classification: 'unknown',
        suggestions: [],
      };
    }
    throw new Error(`UPS Address Validation failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const xav = data?.XAVResponse;
  if (!xav) throw new Error('UPS Address Validation: empty response');

  const candidates = Array.isArray(xav.Candidate) ? xav.Candidate : xav.Candidate ? [xav.Candidate] : [];
  const suggestions = candidates.map(normalizeCandidate).filter(Boolean);

  // Classification: 0=Unknown, 1=Commercial, 2=Residential
  const classCode = xav.AddressClassification?.Code;
  const classification =
    classCode === '1' ? 'commercial' : classCode === '2' ? 'residential' : 'unknown';

  if (xav.NoCandidatesIndicator !== undefined) {
    return { valid: false, reason: 'no_candidates', classification, suggestions: [] };
  }
  if (xav.ValidAddressIndicator !== undefined) {
    return { valid: true, reason: 'valid', classification, suggestions };
  }
  if (xav.AmbiguousAddressIndicator !== undefined) {
    return { valid: false, reason: 'ambiguous', classification, suggestions };
  }
  return { valid: false, reason: 'unknown', classification, suggestions };
}
