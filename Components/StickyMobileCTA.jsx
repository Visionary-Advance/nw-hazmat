'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function StickyMobileCTA({ phone = '541-988-9823', formAnchor = '#lead-form' }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setShow(y > 500);
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: show ? 0 : 100, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]"
    >
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 transition-colors"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </Link>
        <Link
          href={formAnchor}
          className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-3 px-4 transition-colors"
        >
          Free Estimate
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
