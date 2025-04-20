'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  const equipment = [
    { id: 'item1', name: 'Equipment 1' },
    { id: 'item2', name: 'Equipment 2' },
    { id: 'item3', name: 'Equipment 3' },
  ];

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
            {/* Equipment Dropdown */}
            <motion.li
              variants={itemVariants}
              className="text-white text-3xl flex flex-col items-center"
            >
              <button
                onClick={() => setEquipmentOpen(!equipmentOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                Services
                <motion.span
                  animate={{ rotate: equipmentOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowForward size={24} />
                </motion.span>
              </button>

              <AnimatePresence>
                {equipmentOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="mt-2 space-y-2 overflow-hidden"
                  >
                    {equipment.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/services/${item.id}`}
                          onClick={() => setMenuOpen(false)}
                          className="text-white text-xl"
                        >
                          {item.name}
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
              <Link href="/training/hazwoper-40-hour" onClick={() => setMenuOpen(false)}>
                Training
              </Link>
            </motion.li>
            <motion.li variants={itemVariants} className="text-white text-3xl">
              <Link href="/shop" onClick={() => setMenuOpen(false)}>
                Shop
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
