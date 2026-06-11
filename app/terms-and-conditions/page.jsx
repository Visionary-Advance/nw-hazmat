// app/terms-and-conditions/page.jsx
import Breadcrumbs from '@/Components/BreadCrumbs';

export const metadata = {
  title: 'Terms & Conditions | NorthWest HazMat Oregon',
  description:
    'Review the terms and conditions for using the NorthWest HazMat, Inc. website and online store, including orders, shipping, returns, and limitations of liability.',
  alternates: {
    canonical: 'https://nwhazmat.com/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | NorthWest HazMat',
    description:
      'Terms and conditions for using the NorthWest HazMat, Inc. website and online store.',
    url: 'https://nwhazmat.com/terms-and-conditions',
    siteName: 'NorthWest HazMat, Inc.',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'June 2026';

  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold fjalla-one mb-2">Terms &amp; Conditions</h1>
          <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

          <p>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of
            nwhazmat.com and any purchases you make through it. By accessing this
            website or placing an order, you agree to these Terms. If you do not
            agree, please do not use the site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Use of the Website</h2>
          <p>
            You agree to use this website only for lawful purposes. All content,
            including text, images, logos, and product information, is the
            property of NorthWest HazMat, Inc. or its licensors and may not be
            reproduced without permission.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Products &amp; Pricing</h2>
          <p>
            We strive to display product details, availability, and pricing
            accurately, but errors may occur. We reserve the right to correct
            any errors and to change prices or product availability at any time
            without notice. All orders are subject to acceptance and
            confirmation.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Orders, Payment &amp; Shipping</h2>
          <p>
            Payments are processed securely through Stripe. Orders are shipped to
            the address you provide; shipping times and costs are estimated and
            may vary by carrier and destination. Title and risk of loss pass to
            you upon delivery to the carrier.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Returns</h2>
          <p>
            If you have a question or concern about a product you ordered, please
            contact us at{' '}
            <a href="mailto:office@nwhazmat.com" className="text-blue-600 font-semibold">
              office@nwhazmat.com
            </a>{' '}
            so we can help. Certain hazmat and safety items may be
            non-returnable for health and safety reasons.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Professional Services</h2>
          <p>
            Hazmat, mold remediation, asbestos, and related services are
            provided under separate written agreements and estimates. Nothing on
            this website constitutes a binding offer to perform services; scope,
            pricing, and terms are confirmed in your service agreement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, NorthWest HazMat, Inc. is not
            liable for any indirect, incidental, or consequential damages arising
            from your use of this website or products purchased through it. The
            website and its content are provided &ldquo;as is&rdquo; without
            warranties of any kind.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Oregon, without
            regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Contact Us</h2>
          <p>
            Questions about these Terms? Contact us at{' '}
            <a href="mailto:office@nwhazmat.com" className="text-blue-600 font-semibold">
              office@nwhazmat.com
            </a>{' '}
            or{' '}
            <a href="tel:541-988-9823" className="text-blue-600 font-semibold">
              (541) 988-9823
            </a>
            . NorthWest HazMat, Inc., 36 West Q Street, Springfield, OR 97477.
          </p>
        </div>
      </div>
    </>
  );
}
