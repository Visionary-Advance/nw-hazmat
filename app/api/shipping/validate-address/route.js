// app/api/shipping/validate-address/route.js
import { NextResponse } from 'next/server';
import { validateAddress } from '@/lib/ups/addressValidation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATE_NAME_TO_CODE = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA',
  kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO',
  montana: 'MT', nebraska: 'NE', nevada: 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH',
  oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI', wyoming: 'WY',
  'district of columbia': 'DC',
};

function toStateCode(input) {
  if (!input) return '';
  const trimmed = String(input).trim();
  if (trimmed.length === 2) return trimmed.toUpperCase();
  return STATE_NAME_TO_CODE[trimmed.toLowerCase()] || trimmed.toUpperCase();
}

export async function POST(request) {
  try {
    const { street, city, state, zipCode, country } = await request.json();

    const result = await validateAddress({
      street,
      city,
      state: toStateCode(state),
      zipCode,
      country: country || 'US',
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('Address validation error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Address validation unavailable',
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
