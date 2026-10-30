// Google Merchant Center product feed (RSS 2.0 + g: namespace), built live from
// Stripe so the feed never drifts from the shop. Register it in Merchant Center
// as a scheduled fetch of https://nwhazmat.com/merchant-feed.xml.
//
// Shipping and returns are deliberately NOT in the feed: checkout uses live UPS
// rates, which Merchant Center models as account-level carrier-calculated
// shipping. Configure both under Merchant Center > Settings instead.
import { getAllProducts } from '@/lib/getProducts';

const SITE_URL = 'https://nwhazmat.com';

// ISR - refresh hourly, same cadence as the product pages
export const revalidate = 3600;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(src) {
  return src.startsWith('/') ? `${SITE_URL}${src}` : src;
}

function tag(name, value) {
  if (value === undefined || value === null || value === '') return '';
  return `      <${name}>${escapeXml(value)}</${name}>\n`;
}

function toFeedItem(product) {
  const images = (product.images?.length ? product.images : [product.image])
    .filter(Boolean)
    .map(absoluteUrl);
  const currency = product.currency?.toUpperCase() || 'USD';
  const meta = product.metadata || {};
  // Google requires GTIN or MPN when the item has one; for house-built kits
  // with neither, identifier_exists=no keeps the item from being disapproved.
  const hasIdentifier = Boolean(meta.gtin || meta.mpn);

  return (
    '    <item>\n' +
    tag('g:id', product.id) +
    tag('g:title', (meta.seoTitle || product.name).slice(0, 150)) +
    tag('g:description', (product.description || product.name).slice(0, 5000)) +
    tag('g:link', `${SITE_URL}/shop/${product.slug}`) +
    tag('g:image_link', images[0]) +
    images.slice(1, 11).map((src) => tag('g:additional_image_link', src)).join('') +
    tag('g:availability', product.inStock ? 'in_stock' : 'out_of_stock') +
    tag('g:price', `${product.price.toFixed(2)} ${currency}`) +
    tag('g:condition', 'new') +
    tag('g:brand', meta.brand || 'NorthWest HazMat') +
    tag('g:gtin', meta.gtin) +
    tag('g:mpn', meta.mpn) +
    (hasIdentifier ? '' : tag('g:identifier_exists', 'no')) +
    tag('g:google_product_category', meta.googleProductCategory) +
    tag('g:product_type', product.category) +
    (product.weight ? tag('g:shipping_weight', `${product.weight} lb`) : '') +
    '    </item>\n'
  );
}

export async function GET() {
  const products = await getAllProducts();

  // Merchant Center disapproves items with no image or no price, so leave
  // them out rather than feed it errors. They show up automatically once a
  // photo/price is added in Stripe.
  const eligible = products.filter((p) => {
    const ok = (p.images?.length || p.image) && p.price > 0;
    if (!ok) console.warn(`[merchant-feed] Skipping "${p.name}" (${p.slug}) — missing image or price.`);
    return ok;
  });

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n' +
    '  <channel>\n' +
    '    <title>NorthWest HazMat Shop</title>\n' +
    `    <link>${SITE_URL}/shop</link>\n` +
    '    <description>Professional hazmat equipment and safety supplies from NorthWest HazMat, Inc.</description>\n' +
    eligible.map(toFeedItem).join('') +
    '  </channel>\n' +
    '</rss>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
