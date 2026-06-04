// lib/sanityWrite.js
// Server-side write client. Never import this in a client component — the token
// has Editor permissions and must stay on the server.

import { createClient } from '@sanity/client';

let _client;
export function getWriteClient() {
  if (!_client) {
    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) throw new Error('SANITY_WRITE_TOKEN missing');
    _client = createClient({
      projectId: 'myt6kdu8',
      dataset: 'production',
      apiVersion: '2024-01-01',
      token,
      useCdn: false, // writes never use the CDN
    });
  }
  return _client;
}

const ORDER_COUNTER_ID = 'counter.orders';

// Atomically increment the order counter and return the new number.
// Self-heals: creates the counter doc starting at 1000 if it doesn't exist yet.
export async function nextOrderNumber() {
  const client = getWriteClient();

  await client.createIfNotExists({
    _id: ORDER_COUNTER_ID,
    _type: 'counter',
    value: 1000,
  });

  const result = await client
    .patch(ORDER_COUNTER_ID)
    .inc({ value: 1 })
    .commit({ returnDocuments: true });

  return result.value;
}
