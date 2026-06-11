'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Logo and Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link href="/" aria-label='Home Button'>
            <Image
              src="/img/NorthWest_HazMat_Logo_Small.png"
              alt="NorthWest HazMat Logo"
              width={250}
              height={70}
              className="h-10 w-auto"
            />
            </Link>

          </div>

          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-700" />
              <a href="tel:541-988-9823" className="hover:underline">(541)-988-9823</a>
            </div>
            <div className="flex items-right space-x-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <span>36 West Q Street Springfield, OR 97477</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Social Media:</span>
              <a href="https://www.facebook.com/NorthWestHazMat/" target='_blank' rel='nofollow noreferrer'  className="text-black hover:text-blue-600">
                {/* Facebook Icon (SVG) */}
                <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.62 9.87v-6.99h-2.8V12h2.8V9.7c0-2.76 1.64-4.3 4.15-4.3 1.2 0 2.46.21 2.46.21v2.7h-1.39c-1.37 0-1.8.85-1.8 1.72V12h3.06l-.49 2.88h-2.57v6.99A10 10 0 0 0 22 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        
        {/* Copyright */}
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
          <Link href="/employment-application" className="hover:underline">Careers</Link>
          <Link href="/chain-of-custody" className="hover:underline">Chain of Custody</Link>
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link>
          <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
        </div>
        <div className='text-center lg:pt-0 pt-5 lg:text-right'>
          <p>Copyright © {new Date().getFullYear()} NorthWest Hazmat, INC</p>
          <p>Powered By <Link href="https://www.visionaryadvance.com" target='_blank' rel='nofollow noreferrer' className="text-[#008070] hover:underline">Visionary Advance</Link></p>
        </div>
        </div>
      </div>
    </footer>
  );
}
