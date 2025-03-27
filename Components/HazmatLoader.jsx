'use client';

export default function HazmatLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-[110px] h-[110px] -rotate-45 animate-spinShrink">
        {/* White */}
        <div className="absolute w-1/2 h-1/2 bottom-0 left-0 bg-white border border-black animate-popIn delay-[0.6s]"></div>
        {/* Blue */}
        <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-[#0072ce] border border-black animate-popIn"></div>
        {/* Red */}
        <div className="absolute w-1/2 h-1/2 top-0 right-0 bg-[#ce0000] border border-black animate-popIn delay-[0.2s]"></div>
        {/* Yellow */}
        <div className="absolute w-1/2 h-1/2 bottom-0 right-0 bg-[#ffce00] border border-black animate-popIn delay-[0.4s]"></div>
      </div>
    </div>
  );
}
