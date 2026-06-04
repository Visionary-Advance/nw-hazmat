// app/api/shipping/ups/route.js
import { NextResponse } from 'next/server';
import { getUpsGroundRate } from '@/lib/ups/rating';

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

function flatTierFallback(items) {
  let totalWeight = 0;
  let requiresFreight = false;
  for (const item of items) {
    const weight = parseFloat(item.weight) || 0;
    totalWeight += weight * (item.quantity || 1);
    if (item.metadata?.shipping_class === 'freight' || item.category === 'simulator') {
      requiresFreight = true;
    }
  }
  const orderTotal = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  let cost;
  if (requiresFreight) cost = 200;
  else if (totalWeight > 50) cost = 25 + (totalWeight - 50) * 0.5;
  else if (totalWeight > 10) cost = 15;
  else cost = 8.99;
  if (orderTotal >= 1000) cost = 0;
  return Math.round(cost * 100) / 100;
}

export async function POST(request) {
  try {
    const { items, shippingAddress } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items in cart' }, { status: 400 });
    }

    const destination = {
      street: shippingAddress?.address || shippingAddress?.street || '',
      city: shippingAddress?.city || '',
      state: toStateCode(shippingAddress?.state),
      zipCode: shippingAddress?.zipCode || shippingAddress?.zip || '',
      country: shippingAddress?.country || 'US',
    };

    if (!destination.zipCode || !destination.state) {
      return NextResponse.json(
        { success: false, error: 'Destination state and ZIP required' },
        { status: 400 }
      );
    }

    // Freight items skip UPS — go straight to flat-tier freight pricing.
    const hasFreight = items.some(
      (i) => i.metadata?.shipping_class === 'freight' || i.category === 'simulator'
    );
    if (hasFreight) {
      return NextResponse.json({
        success: true,
        source: 'flat_tier_freight',
        rates: [
          {
            id: 'freight',
            displayName: 'Freight Shipping',
            amount: flatTierFallback(items),
            currency: 'USD',
            transitDays: null,
          },
        ],
      });
    }

    try {
      const rate = await getUpsGroundRate({ items, destination });
      return NextResponse.json({
        success: true,
        source: 'ups',
        rates: [
          {
            id: rate.serviceCode,
            displayName: rate.displayName,
            amount: rate.amount,
            currency: rate.currency,
            transitDays: rate.transitDays,
          },
        ],
      });
    } catch (upsErr) {
      console.error('UPS rating failed, falling back to flat tier:', upsErr.message);
      return NextResponse.json({
        success: true,
        source: 'flat_tier_fallback',
        rates: [
          {
            id: 'fallback_ground',
            displayName: 'Standard Ground',
            amount: flatTierFallback(items),
            currency: 'USD',
            transitDays: null,
          },
        ],
        warning: 'Live carrier rates unavailable',
      });
    }
  } catch (err) {
    console.error('Shipping route error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate shipping' },
      { status: 500 }
    );
  }
}
