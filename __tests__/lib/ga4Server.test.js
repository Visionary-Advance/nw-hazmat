// __tests__/lib/ga4Server.test.js
import { sendServerPurchase } from '@/lib/ga4Server';
import { getGaIds } from '@/lib/analytics';

const paymentIntent = {
  id: 'pi_123',
  created: 1761200000,
  currency: 'usd',
  amount: 25372,
  amount_received: 25372,
  metadata: {
    orderSource: 'card_payment',
    shippingCost: '15.5',
    items: JSON.stringify([{ id: 'prod_1', name: 'Spill Kit', price: 119.11, quantity: 2 }]),
    gaClientId: '111.222',
    gaSessionId: '1761199000',
  },
};

describe('sendServerPurchase', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_PUBLIC_GA_ID: 'G-TEST123', GA_API_SECRET: 'secret' };
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 204 });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('sends a purchase keyed on the PaymentIntent id and the browser client_id', async () => {
    await expect(sendServerPurchase(paymentIntent)).resolves.toBe(true);

    const [url, init] = global.fetch.mock.calls[0];
    expect(url).toContain('measurement_id=G-TEST123');
    expect(url).toContain('api_secret=secret');

    const body = JSON.parse(init.body);
    expect(body.client_id).toBe('111.222');
    expect(body.events[0].name).toBe('purchase');
    expect(body.events[0].params).toMatchObject({
      transaction_id: 'pi_123',
      currency: 'usd',
      value: 253.72,
      shipping: 15.5,
      session_id: 1761199000,
      items: [{ item_id: 'prod_1', item_name: 'Spill Kit', price: 119.11, quantity: 2 }],
    });
  });

  it('falls back to an anonymous client_id when GA was blocked in the browser', async () => {
    const { gaClientId, gaSessionId, ...metadata } = paymentIntent.metadata;
    await sendServerPurchase({ ...paymentIntent, metadata });

    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.client_id).toMatch(/^\d+\.1761200000$/);
    expect(body.events[0].params.session_id).toBeUndefined();
  });

  it('skips when the API secret is not configured', async () => {
    delete process.env.GA_API_SECRET;
    await expect(sendServerPurchase(paymentIntent)).resolves.toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('never throws when GA is unreachable', async () => {
    global.fetch.mockRejectedValue(new Error('network down'));
    await expect(sendServerPurchase(paymentIntent)).resolves.toBe(false);
  });
});

describe('getGaIds', () => {
  const originalEnv = process.env;

  function withCookies(cookie) {
    global.document = { cookie };
  }

  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_PUBLIC_GA_ID: 'G-TEST123' };
  });

  afterEach(() => {
    process.env = originalEnv;
    delete global.document;
  });

  it('reads client and session ids from GS2 cookies', () => {
    withCookies('foo=bar; _ga=GA1.1.111.222; _ga_TEST123=GS2.1.s1761199000$o3$g1$t1761199100');
    expect(getGaIds()).toEqual({ gaClientId: '111.222', gaSessionId: '1761199000' });
  });

  it('reads the session id from the older GS1 cookie format', () => {
    withCookies('_ga=GA1.1.111.222; _ga_TEST123=GS1.1.1761199000.3.1.1761199100.0.0.0');
    expect(getGaIds()).toEqual({ gaClientId: '111.222', gaSessionId: '1761199000' });
  });

  it('returns undefined ids when GA cookies are missing', () => {
    withCookies('foo=bar');
    expect(getGaIds()).toEqual({ gaClientId: undefined, gaSessionId: undefined });
  });
});
