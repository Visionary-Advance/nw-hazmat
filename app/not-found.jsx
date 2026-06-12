import Link from 'next/link';
import { Home, Phone, ShoppingBag, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | NorthWest HazMat',
  description:
    'The page you are looking for could not be found. Explore NorthWest HazMat services, training, and shop, or contact our 24/7 emergency response team.',
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/services/hazmat-services', label: 'Services', Icon: Wrench },
  { href: '/shop', label: 'Shop', Icon: ShoppingBag },
  { href: '/contact', label: 'Contact', Icon: Phone },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <p className="text-7xl sm:text-9xl font-bold fjalla-one text-[#17795E] leading-none">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold fjalla-one text-gray-900">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn&apos;t find the page you were looking for. It may have
          been moved or no longer exists. Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <nav
          aria-label="Helpful links"
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {quickLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#17795E] transition-all"
            >
              <Icon className="w-7 h-7 text-[#17795E]" />
              <span className="font-semibold text-gray-800">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Primary actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#17795E] hover:bg-[#146c54] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <a
            href="tel:1-800-597-1323"
            className="border-2 border-[#17795E] text-[#17795E] hover:bg-[#17795E] hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            24/7 Emergency: 1-800-597-1323
          </a>
        </div>
      </div>
    </main>
  );
}
