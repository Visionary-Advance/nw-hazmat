'use client';
import React from 'react';

const ATCButton = () => {
  return (
    <button className="relative w-[150px] h-10 cursor-pointer flex items-center rounded-[10px] active:scale-95 border border-[#17795E] bg-[#209978] overflow-hidden transition-all duration-300 hover:bg-[#17795E] active:border-[#146c54] group">
      <span className="translate-x-[22px] text-white font-semibold transition-all duration-300 group-hover:text-transparent">
        Add To Cart
      </span>
      <span className="absolute right-0 h-full w-[39px] translate-x-[109px] flex items-center justify-center bg-[#17795E] transition-all duration-300 group-hover:translate-x-0 group-hover:w-[148px] group-active:bg-[#146c54]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 35 35"
          className="w-5 fill-white"
        >
          <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
          <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
          <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
        </svg>
      </span>
    </button>
  );
};

export default ATCButton;
