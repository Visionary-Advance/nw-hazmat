# NorthWest HazMat Website - Development Documentation

## Project Overview
This is a Next.js 15 website for NorthWest HazMat, Inc., a female-owned environmental hazmat and mold remediation company serving Eugene-Springfield, Oregon and Lane County since 2000.

**Live Site:** https://nwhazmat.com
**Framework:** Next.js 15 (App Router)
**Styling:** Tailwind CSS
**E-commerce:** Stripe Integration
**Analytics:** Vercel Analytics

---

## Recent SEO Improvements (2025)

### Problem Addressed
The site was experiencing SEO issues because all pages shared the same metadata from the root layout. This caused:
- Duplicate title tags across all pages
- Poor search engine rankings
- Lack of page-specific optimization

### Solution Implemented
We refactored the codebase to leverage Next.js 15's server-side metadata generation while maintaining client-side interactivity.

#### Key Changes:

1. **Separated Client and Server Components**
   - Created `*Client.jsx` files for pages that need `"use client"` directive
   - Kept page.jsx files as server components to export metadata
   - This follows Next.js 15 best practices

2. **Added Page-Specific Metadata**
   Files updated:
   - `app/about/page.jsx` → Now exports metadata + renders `AboutClient`
   - `app/services/page.jsx` → Complete rewrite with metadata
   - `app/shop/page.jsx` → Exports metadata + renders `ShopClient`
   - `app/contact/page.jsx` → Exports metadata + renders `ContactClient`

3. **Dynamic Product Pages with Server-Side Metadata**
   - Created `lib/getProducts.js` - Server-side function to fetch Stripe products
   - Created `app/shop/[slug]/ProductPageClient.jsx` - Client component for interactivity
   - Updated `app/shop/[slug]/page.jsx` with:
     - `generateMetadata()` function for dynamic SEO
     - `generateStaticParams()` for static generation
     - Server component that fetches product data

#### Benefits:
- ✅ Each page now has unique, optimized title and description
- ✅ Product pages have dynamic metadata based on actual product data
- ✅ Better SEO rankings with page-specific keywords
- ✅ Open Graph and Twitter Card tags for social sharing
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Maintains all client-side interactivity (animations, cart, forms)

---

## Architecture Pattern

### Server Components (page.jsx)
```javascript
// app/about/page.jsx
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us...",
  description: "...",
  // ... other metadata
};

export default function About() {
  return <AboutClient />;
}
```

### Client Components (*Client.jsx)
```javascript
// app/about/AboutClient.jsx
"use client";

import { motion } from "framer-motion";
// ... other client-side imports

export default function AboutClient() {
  // All client-side logic, state, effects
  return (
    // JSX with animations, interactions, etc.
  );
}
```

---

## Directory Structure

```
nw-hazmat/
├── app/
│   ├── about/
│   │   ├── page.jsx              # Server component with metadata
│   │   └── AboutClient.jsx       # Client component
│   ├── contact/
│   │   ├── page.jsx              # Server component with metadata
│   │   └── ContactClient.jsx     # Client component
│   ├── shop/
│   │   ├── page.jsx              # Server component with metadata
│   │   ├── ShopClient.jsx        # Client component
│   │   └── [slug]/
│   │       ├── page.jsx          # Dynamic server component
│   │       └── ProductPageClient.jsx  # Client component
│   ├── services/
│   │   └── page.jsx              # Server component with metadata
│   ├── layout.js                 # Root layout with global metadata
│   ├── page.js                   # Homepage
│   ├── robots.js                 # Dynamic robots.txt
│   └── sitemap.js                # Dynamic sitemap.xml
├── Components/                    # Reusable components
├── data/                         # Static data (ServicesData, TrainingData)
├── hooks/                        # Custom React hooks
├── lib/
│   └── getProducts.js            # Server-side Stripe fetching
├── public/                       # Static assets
└── claude.md                     # This file
```

---

## Key Files Explained

### `lib/getProducts.js`
Server-side utility to fetch products from Stripe API. Used for:
- Generating metadata in `generateMetadata()`
- Generating static paths in `generateStaticParams()`
- Fetching product data for product pages

**Important:** This runs on the server only, not exposed to client.

### `app/shop/[slug]/page.jsx`
Dynamic route for product pages. Features:
- `generateMetadata()` - Creates SEO-friendly metadata for each product
- `generateStaticParams()` - Pre-renders product pages at build time
- Server component that fetches product and passes to client

### `app/layout.js`
Root layout with:
- Global metadata (used as fallback)
- Font configuration
- Structured data for LocalBusiness
- Analytics integration

### `app/robots.js`
Generates robots.txt dynamically:
- Allows all user agents
- Blocks API routes, Next.js internals, admin areas
- Points to sitemap.xml

### `app/sitemap.js`
Generates sitemap.xml dynamically:
- Core pages (home, about, shop, contact, services)
- Dynamic service pages
- Dynamic training pages
- Proper change frequency and priority

---

## SEO Best Practices Implemented

### 1. Metadata Hierarchy
- Root layout: Global defaults
- Page-level: Specific to each page
- Dynamic pages: Generated from data

### 2. Structured Data
- LocalBusiness schema in root layout
- Product schema on product pages
- ContactPage schema on contact page

### 3. Open Graph & Twitter Cards
All pages include:
- og:title, og:description, og:url
- og:image with proper dimensions
- twitter:card, twitter:title, twitter:description

### 4. Semantic HTML
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text on images
- Descriptive link text

### 5. Performance
- Server-side rendering for SEO
- Static generation where possible
- Client components only where needed

---

## Stripe Integration

### Product Fetching
Products are fetched from Stripe with metadata fields:
- `category` - Product category
- `stock` - Stock status ("0" = out of stock)
- `inventory` - Inventory count
- `weight` - Shipping weight

### API Route
`app/api/products/stripe/route.js` - Fetches products from Stripe
- Used by client-side hooks (`useProducts`)
- Returns transformed product data

### Server-Side Fetching
`lib/getProducts.js` - Fetches products for metadata generation
- Used by server components
- Enables SEO-friendly product pages

---

## TODO: Remaining Pages to Optimize

The following pages still need metadata added:

### Training Pages
- `app/training/[id]/page.jsx` - Dynamic training course pages

### Mold Service Landing Pages
- `app/mold-services-eugene-oregon/page.jsx` - Already has good content, needs metadata export
- `app/emergency-mold-removal-eugene-oregon/page.jsx` - Already has good content, needs metadata export

### Other Pages
- `app/employment-application/page.jsx`
- `app/chain-of-custody/page.jsx`
- `app/checkout/page.jsx`

### Pattern to Follow:
1. Extract client code to `*Client.jsx`
2. Add `export const metadata = {...}` to page.jsx
3. Import and render client component from page.jsx

---

## Environment Variables Required

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
RESEND_API_KEY=re_...
SITE_URL=https://nwhazmat.com
```

---

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Generate sitemap
npm run sitemap

# Run tests
npm test
npm run test:watch
npm run test:coverage
```

---

## SEO Monitoring Recommendations

### Google Search Console
1. Add property for https://nwhazmat.com
2. Submit sitemap: https://nwhazmat.com/sitemap.xml
3. Monitor:
   - Coverage issues
   - Core Web Vitals
   - Search queries
   - Click-through rates

### Key Metrics to Track
- Organic search traffic
- Rankings for local keywords:
  - "hazmat services eugene oregon"
  - "mold remediation lane county"
  - "emergency spill response eugene"
- Page-specific performance in GSC

### Schema Markup Validation
- Use Google's Rich Results Test
- Validate LocalBusiness schema
- Validate Product schema on shop pages

---

## Known Issues & Solutions

### Issue: Product pages not found
**Cause:** Slug mismatch between link and actual product name
**Solution:** `lib/getProducts.js` creates consistent slugs using `createSlug()` function

### Issue: Client component can't export metadata
**Cause:** Next.js metadata API only works in server components
**Solution:** Separate into page.jsx (server) and *Client.jsx (client)

### Issue: Metadata not updating
**Cause:** Cached build or dev server
**Solution:** Clear `.next` folder and restart dev server

---

## Future Improvements

### SEO
- [ ] Add FAQ schema markup
- [ ] Add Review/Rating schema
- [ ] Create blog for content marketing
- [ ] Add image sitemaps
- [ ] Implement breadcrumb structured data

### Technical
- [ ] Convert all <img> to Next.js <Image> component
- [ ] Add proper loading states
- [ ] Implement proper 404 page
- [ ] Add metadata to remaining pages

### Performance
- [ ] Optimize images (WebP, AVIF)
- [ ] Implement ISR (Incremental Static Regeneration) for products
- [ ] Add caching headers
- [ ] Minimize JavaScript bundle size

---

## Support & Resources

- **Next.js Metadata Docs:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Google Search Console:** https://search.google.com/search-console
- **Structured Data Markup:** https://schema.org/
- **Stripe API Docs:** https://stripe.com/docs/api

---

## Changelog

### 2025-01-XX - Major SEO Overhaul
- Refactored all main pages to support page-level metadata
- Created server/client component separation pattern
- Implemented dynamic metadata for product pages
- Added structured data across site
- Created this documentation file

---

**Last Updated:** 2025-01-XX
**Maintained By:** Development Team
**Contact:** info@nwhazmat.com
