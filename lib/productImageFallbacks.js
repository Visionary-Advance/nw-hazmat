// Local stand-in photos for Stripe products that have no image uploaded
// (punch list #9). Stripe stays the source of truth: a fallback is only used
// when `product.images` comes back empty, so uploading the real photo in Stripe
// silently takes over with no code change.
//
// Jon supplied a generic bucket photo for the 5-gallon spill kit; the other
// SKUs still need real photos before they get an entry here.

const FALLBACK_IMAGES = {
  '5-gallon-spill-kit-bucket': '/img/bucketspillkit2.webp',
};

// Some Stripe product names drift (extra words, punctuation), which changes the
// generated slug. These patterns catch the drift for SKUs we have a photo for.
const FALLBACK_PATTERNS = [
  { test: (slug) => slug.includes('bucket') && slug.includes('spill'), image: '/img/bucketspillkit2.webp' },
  { test: (slug) => slug.includes('5-gallon') && slug.includes('kit'), image: '/img/bucketspillkit2.webp' },
];

export function getFallbackImage(slug) {
  if (!slug) return null;
  if (FALLBACK_IMAGES[slug]) return FALLBACK_IMAGES[slug];
  const match = FALLBACK_PATTERNS.find((p) => p.test(slug));
  return match ? match.image : null;
}

// Fills in `images` / `image` on a transformed product when Stripe has none.
export function withFallbackImage(product) {
  if (Array.isArray(product.images) && product.images.length > 0) return product;
  const fallback = getFallbackImage(product.slug);
  if (!fallback) return product;
  return { ...product, images: [fallback], image: fallback };
}
