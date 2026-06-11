// app/privacy-policy/page.jsx
import Breadcrumbs from '@/Components/BreadCrumbs';

export const metadata = {
  title: 'Privacy Policy | NorthWest HazMat Oregon',
  description:
    'Read the NorthWest HazMat, Inc. privacy policy. Learn how we collect, use, and protect the personal information you share with our Oregon hazmat and mold remediation team.',
  alternates: {
    canonical: 'https://nwhazmat.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | NorthWest HazMat',
    description:
      'How NorthWest HazMat, Inc. collects, uses, and protects your personal information.',
    url: 'https://nwhazmat.com/privacy-policy',
    siteName: 'NorthWest HazMat, Inc.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'June 2026';

  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold fjalla-one mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

          <p>
            NorthWest HazMat, Inc. (&ldquo;NorthWest HazMat,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This
            Privacy Policy explains what information we collect when you use
            nwhazmat.com, how we use it, and the choices you have.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Information We Collect</h2>
          <p>
            We collect information you voluntarily provide through our contact
            forms, quote requests, employment application, and online store
            checkout. This may include your name, email address, phone number,
            mailing or shipping address, and any details you include in a
            message. When you make a purchase, payment information is processed
            securely by our payment provider (Stripe); we do not store full
            payment card numbers on our servers.
          </p>
          <p>
            We also automatically collect limited technical and usage data (such
            as IP address, browser type, and pages visited) through analytics
            tools to help us understand how the site is used and to improve it.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to inquiries, quote requests, and service calls.</li>
            <li>To process and fulfill orders placed through our online store.</li>
            <li>To review employment applications you submit.</li>
            <li>To improve our website, products, and services.</li>
            <li>To comply with legal and regulatory obligations.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-3">Sharing of Information</h2>
          <p>
            We do not sell your personal information. We share information only
            with trusted service providers who help us operate our business
            (such as payment processing, email delivery, and shipping carriers),
            and only as needed to provide our services or as required by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Cookies &amp; Analytics</h2>
          <p>
            Our website uses cookies and similar technologies for essential site
            functionality and analytics. You can control cookies through your
            browser settings, though disabling them may affect how the site
            functions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Data Security</h2>
          <p>
            We use reasonable administrative and technical safeguards to protect
            your information. However, no method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Your Choices</h2>
          <p>
            You may request access to, correction of, or deletion of the
            personal information we hold about you by contacting us using the
            details below.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-3">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{' '}
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
