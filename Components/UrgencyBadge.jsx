'use client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function UrgencyBadge({ text = 'Same-Day Response Available' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full bg-red-600/15 backdrop-blur-md px-4 py-2 text-sm font-semibold text-red-300 border border-red-500/40"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
      </span>
      <Zap className="h-4 w-4" aria-hidden />
      <span>{text}</span>
    </motion.div>
  );
}
