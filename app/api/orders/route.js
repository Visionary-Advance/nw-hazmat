import { NextResponse } from 'next/server';
import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email/orderEmails';
import { createUpsShipment } from '@/lib/ups/shipping';
import { getWriteClient, nextOrderNumber } from '@/lib/sanityWrite';
import { sendAlert } from '@/lib/email/alertEmail';

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
    const orderData = await request.json();

    const requiredFields = ['customerInfo', 'items', 'total'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const { customerInfo } = orderData;
    const requiredCustomerFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredCustomerFields) {
      if (!customerInfo[field]) {
        return NextResponse.json({ error: `Missing customer field: ${field}` }, { status: 400 });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Atomic order number from Sanity counter
    const orderNumber = await nextOrderNumber();

    // Best-effort UPS shipment creation. Failures don't break the order.
    let labels = [];
    let shipmentTrackingNumber;
    try {
      const shipment = await createUpsShipment({
        items: orderData.items,
        destination: {
          street: customerInfo.address,
          apartment: customerInfo.apartment,
          city: customerInfo.city,
          state: toStateCode(customerInfo.state),
          zipCode: customerInfo.zipCode,
          country: customerInfo.country || 'US',
        },
        customer: customerInfo,
      });
      shipmentTrackingNumber = shipment.shipmentTrackingNumber;
      labels = shipment.labels;
    } catch (shipErr) {
      console.error(`[UPS LABEL FAILED] order=${orderNumber}`, shipErr.message);
    }

    // Build the Sanity order document. Note the schema splits customer info
    // (person) from shippingAddress (location) — different from the form shape.
    const orderDoc = {
      _type: 'order',
      orderNumber,
      status: 'pending',
      customer: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        company: customerInfo.company || '',
        phone: customerInfo.phone || '',
      },
      shippingAddress: {
        street: customerInfo.address,
        apartment: customerInfo.apartment || '',
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country || 'US',
      },
      items: orderData.items.map((it) => ({
        _key: String(it.id || it.name).slice(0, 64) + '-' + Math.random().toString(36).slice(2, 8),
        productId: String(it.id || ''),
        name: it.name,
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1,
      })),
      subtotal: Number(orderData.subtotal) || 0,
      shippingCost: Number(orderData.shippingCost) || 0,
      total: Number(orderData.total) || 0,
      paymentIntentId: orderData.paymentIntentId || '',
      paymentMethod: orderData.paymentMethod || 'card',
      ...(shipmentTrackingNumber ? { shipmentTrackingNumber } : {}),
      createdAt: new Date().toISOString(),
    };

    let savedOrder;
    try {
      savedOrder = await getWriteClient().create(orderDoc);
    } catch (sanityErr) {
      console.error(
        `[ORDER PERSIST FAILED] orderNumber=${orderNumber} pi=${orderData.paymentIntentId}`,
        sanityErr.message
      );
      // A paid order that didn't save is the worst case — alert immediately so it
      // can be recovered manually from Stripe. Continue to email regardless.
      sendAlert({
        subject: 'Paid order failed to save to Sanity',
        severity: 'critical',
        error: sanityErr,
        context: {
          orderNumber,
          paymentIntentId: orderData.paymentIntentId || 'n/a',
          customerEmail: customerInfo.email,
          total: orderData.total,
        },
      });
    }

    // Email payload uses the form-shape (customerInfo flat) since that's what the
    // templates were built for. Add orderNumber + tracking so emails show the right info.
    const emailOrder = {
      ...orderData,
      id: orderNumber,
      shipmentTrackingNumber,
    };

    const emailResults = await Promise.allSettled([
      sendOrderConfirmation(emailOrder),
      sendOrderNotification(emailOrder, labels),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        const which = i === 0 ? 'confirmation' : 'notification';
        console.error(`[ORDER EMAIL FAILED:${which}] order=${orderNumber}`, r.reason);
        sendAlert({
          subject: `Order email failed to send (${which})`,
          severity: 'error',
          error: r.reason instanceof Error ? r.reason : new Error(String(r.reason)),
          context: { orderNumber, which, customerEmail: customerInfo.email },
        });
      }
    });

    return NextResponse.json({
      success: true,
      orderId: orderNumber,
      orderNumber,
      sanityId: savedOrder?._id || null,
      shipmentTrackingNumber: shipmentTrackingNumber || null,
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    sendAlert({
      subject: 'Order creation failed (POST /api/orders)',
      severity: 'critical',
      error,
    });
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumberParam = searchParams.get('id') || searchParams.get('orderNumber');
    const client = getWriteClient();

    if (orderNumberParam) {
      const num = parseInt(orderNumberParam, 10);
      const order = await client.fetch(
        `*[_type == "order" && orderNumber == $num][0]`,
        { num }
      );
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    const orders = await client.fetch(
      `*[_type == "order"] | order(createdAt desc)[0...100]`
    );
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
