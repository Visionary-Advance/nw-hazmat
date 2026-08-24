'use client'


import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "./Button";
import { FaPhone } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderLogo from "./HeaderLogo";
import { useState } from "react";
const MobileMenu = dynamic(() => import ("./MobileMenu"), {ssr:false})

export default function Header() {
   const [menuOpen, setMenuOpen] = useState(false)

   const [showFormsDropdown, setShowFormsDropdown] = useState(false)

  return (
    <>
    
      {/* Top Bar */}
      <div className="w-full flex bg-black justify-center p-2  pe-5">
        <Link href={"tel:1-800-597-1323"}>
          <Button text={<span className="flex text-base lg:text-lg font-bold items-center gap-2"><FaPhone /> 24 Hour Emergency: 1-800-597-1323</span>} color="hover:bg-white hover:text-black bg-red-600 text-white" />
        </Link>
      </div>

      {/* Header */}
      <header className="w-full flex lg:flex-row items-center justify-between bg-white shadow-lg px-6 py-4">
      <HeaderLogo />
        {/* Desktop Navigation */}
        <nav className="text-black hidden ms-auto lg:flex fjalla-one text-xl space-x-6 items-center">
          {/* Spill is the primary growth path, so it gets a visible button
              rather than sitting inside a services dropdown (punch list #7). */}
          <Link
            href="/24-hour-spill-response-oregon"
            className="bg-red-600 hover:bg-black text-white rounded-lg px-4 py-2 duration-200"
          >
            24-Hour Spill Response
          </Link>
          {/* Hubs, not one deep page each. */}
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/training">Training</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/blog">Blog</Link>
          <div
        className="relative"
        onMouseEnter={() => setShowFormsDropdown(true)}
        onMouseLeave={() => setShowFormsDropdown(false)}
      >
        <button className="focus:outline-none">Forms</button>
        {showFormsDropdown && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
            <Link
              href="/employment-application"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Job Application
            </Link>
           <Link
  href="/chain-of-custody"
  className="block px-4 py-2 hover:bg-gray-100"
>
  Chain of Custody
</Link>
          </div>
        )}
      </div>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(true)} className="flex lg:hidden ms-auto text-2xl">
          <GiHamburgerMenu />
        </button>
      </header>

      {/* Mobile Menu */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
