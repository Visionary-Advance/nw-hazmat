'use client';

import React from 'react';
import { Phone } from 'lucide-react';

const PHONE = '541-988-9823';

const CallToInquireButton = ({ width = '' }) => {
  return (
    <a
      href={`tel:${PHONE}`}
      onClick={(e) => e.stopPropagation()}
      className={`${width} relative px-2 h-10 cursor-pointer flex items-center rounded-2xl active:scale-95 border border-[#1d4ed8] bg-[#2563eb] overflow-hidden transition-all duration-300 hover:bg-[#1d4ed8] active:border-[#1e40af] group`}
    >
      <span className="mx-auto text-lg text-white font-semibold transition-all duration-300 group-hover:text-transparent">
        Call to Inquire
      </span>
      <span className="absolute right-0 h-full w-full translate-x-full flex items-center justify-center bg-[#1d4ed8] transition-all duration-300 group-hover:translate-x-0 group-active:bg-[#1e40af]">
        <Phone className="w-5 h-5 text-white" />
      </span>
    </a>
  );
};

export default CallToInquireButton;
