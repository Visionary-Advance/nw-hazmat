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

  return (
    <>
    
      {/* Top Bar */}
      <div className="w-full flex bg-black justify-center p-2 lg:justify-end pe-5">
        <Link href={"tel:555-555-555"}>
          <Button text={<span className="flex font-bold items-center gap-2"><FaPhone /> 24 Hour Emergency</span>} color="hover:bg-white hover:text-black bg-red-600 text-white" />
        </Link>
      </div>

      {/* Header */}
      <header className="w-full flex lg:flex-row items-center justify-between bg-white shadow-lg px-6 py-4">
      <HeaderLogo />
        {/* Desktop Navigation */}
        <nav className="text-black hidden ms-auto lg:flex fjalla-one text-xl space-x-6">
          <Link href="/services/hazmat-services">Services</Link>
          <Link href="#">About</Link>
          <Link href="#">Training</Link>
          <Link href="/shop">Shop</Link>
          <Link href="#">Contact</Link>
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
