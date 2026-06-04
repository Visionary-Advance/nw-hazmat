'use client';

import Breadcrumbs from '@/Components/BreadCrumbs';
import { CartProvider } from '@/Components/CartContext';
import CartButton from '@/Components/CartButton';
import CartSidebar from '@/Components/CartSidebar';
import ProductImageGallery from '@/Components/ProductImageGallery';
import ProductBuyBox from '@/Components/ProductBuyBox';
import ProductFeatureList from '@/Components/ProductFeatureList';
import ProductAccordion from '@/Components/ProductAccordion';
import ProductReviews from '@/Components/ProductReviews';
import RelatedProducts from '@/Components/RelatedProducts';
import MobileBuyBar from '@/Components/MobileBuyBar';

export default function ProductPageClient({ product, relatedProducts = [] }) {
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-2">The product you're looking for could not be found.</p>
        <a href="/shop" className="inline-block mt-4 text-blue-600 underline">← Back to Shop</a>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);

  return (
    <CartProvider>
      <>
        <Breadcrumbs />

        <div className="max-w-7xl mx-auto px-4 pb-24 lg:pb-12">
          {/* Hero: Gallery + Buy Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
            <div>
              <ProductImageGallery images={images} alt={product.name} />
            </div>
            <div>
              <ProductBuyBox product={product} />
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <section aria-labelledby="desc-heading" className="mt-12 max-w-3xl">
              <h2 id="desc-heading" className="text-2xl fjalla-one mb-3 text-gray-900">
                About this product
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </section>
          )}

          {/* What's included */}
          {Array.isArray(product.whatsIncluded) && product.whatsIncluded.length > 0 && (
            <section className="mt-10 max-w-3xl">
              <ProductFeatureList
                title="What's included"
                features={product.whatsIncluded}
              />
            </section>
          )}

          {/* FAQ */}
          {Array.isArray(product.faqs) && product.faqs.length > 0 && (
            <div className="max-w-3xl">
              <ProductAccordion items={product.faqs} />
            </div>
          )}

          {/* Reviews */}
          <div className="max-w-3xl">
            <ProductReviews
              rating={product.reviewsRating}
              count={product.reviewsCount}
              reviews={product.reviews}
            />
          </div>

          {/* Related products */}
          <RelatedProducts products={relatedProducts} />

          {/* Need help CTA */}
          <section className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-900">
              Need help or have questions?
            </h3>
            <p className="text-blue-800 mb-4">
              Our hazmat equipment experts are here to help you find the right products for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:541-988-9823"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Call: (541) 988-9823
              </a>
              <a
                href="/contact"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>

        <MobileBuyBar product={product} />
        <CartButton />
        <CartSidebar />
      </>
    </CartProvider>
  );
}
