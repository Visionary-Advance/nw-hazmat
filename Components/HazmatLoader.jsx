'use client';

export default function HazmatLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative flex items-center justify-center space-x-4 lg:space-x-8 animate-pulseColorScale">
        {/* Northwest Text */}
        <span className="text-4xl lg:text-7xl antonio">NorthWest</span>

        {/* Spinning + Pulsing Hazmat Logo */}
        <div className="relative w-[40px] sm:w-[55px] lg:w-[110px] h-[40px] sm:h-[55px] lg:h-[110px] -rotate-45 animate-logoSpin">
          {/* White */}
          <div className="absolute w-1/2 h-1/2 bottom-0 left-0 bg-white  border border-black"></div>
          {/* Blue */}
          <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-[#0072ce] border border-black"></div>
          {/* Red */}
          <div className="absolute w-1/2 h-1/2 top-0 right-0 bg-[#ce0000] border border-black"></div>
          {/* Yellow */}
          <div className="absolute w-1/2 h-1/2 bottom-0 right-0 bg-[#fff218] border border-black"></div>
        </div>

        {/* Hazmat Text */}
        <span className=" text-4xl lg:text-7xl antonio">HazMat</span>
      </div>
    </div>
  );
}
