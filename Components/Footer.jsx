'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Logo and Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link href="/" aria-label='Home Button'>
            <Image
              src="/Img/Northwest-Hazmat-Logo.png"
              alt="NorthWest HazMat Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            </Link>
           
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <a href="tel:541-988-9823" className="hover:underline">(541)-988-9823</a>
            </div>
            <div className="flex items-right space-x-2">
              <span>📍</span>
              <span>36 West Q Street Springfield, OR 97477</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Social Media:</span>
              <Link href="#" className="text-black hover:text-blue-600">
                {/* Facebook Icon (SVG) */}
                <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.62 9.87v-6.99h-2.8V12h2.8V9.7c0-2.76 1.64-4.3 4.15-4.3 1.2 0 2.46.21 2.46.21v2.7h-1.39c-1.37 0-1.8.85-1.8 1.72V12h3.06l-.49 2.88h-2.57v6.99A10 10 0 0 0 22 12" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        
        {/* Copyright */}
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="#" className="hover:underline">About Us</Link>
          <Link href="#" className="hover:underline">Shop</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Terms and Conditions</Link>
          <Link href="#" className="hover:underline">Sitemap</Link>
        </div>
        <div className='text-center lg:pt-0 pt-5 lg:text-right'>
          <p>Copyright © 2025 NorthWest Hazmat, INC</p>
          <p>Powered By <Link href="https://www.visionaryadvance.com" className="text-[#008070] hover:underline">Visionary Advance</Link></p>
        </div>
        </div>
      </div>
    </footer>
  );
}
