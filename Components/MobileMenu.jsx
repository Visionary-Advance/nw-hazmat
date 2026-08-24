'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { useState } from 'react';
import { services } from '@/data/ServicesData';

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const listVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <IoMdClose className="w-8 h-8" />
          </button>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6 text-center"
          >
            {/* Spill response leads the mobile menu too (punch list #7). */}
            <motion.li variants={itemVariants}>
              <Link
                href="/24-hour-spill-response-oregon"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-red-600 text-white text-2xl rounded-lg px-6 py-3"
              >
                24-Hour Spill Response
              </Link>
            </motion.li>

            {/* Equipment Dropdown */}
            <motion.li
              variants={itemVariants}
              className="text-white text-3xl flex flex-col items-center"
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowForward size={24} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="mt-2 space-y-2 overflow-hidden"
                  >
                    <li>
                      <Link
                        href="/services"
                        onClick={() => setMenuOpen(false)}
                        className="text-white text-xl underline"
                      >
                        All services
                      </Link>
                    </li>
                    {services.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/services/${item.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="text-white text-xl"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Other Mobile Menu Items */}
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/training" onClick={() => setMenuOpen(false)}>
                Training
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/shop" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
