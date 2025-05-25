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
        <nav className="text-black hidden ms-auto lg:flex fjalla-one text-xl space-x-6">
          <Link href="/services/hazmat-services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/training/hazwoper-40-hour">Training</Link>
          <Link href="/shop">Shop</Link>
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
           <a
  href="/files/Chain_Of_Custody.pdf"
  download
  className="block px-4 py-2 hover:bg-gray-100"
>
  Chain of Custody
</a>
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
