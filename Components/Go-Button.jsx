export default function GoButton() {
    return (
      <button className="relative w-14 h-14 overflow-hidden outline-none bg-transparent rotate-180 cursor-pointer border-0 group">
        {/* Before layer */}
        <span className="absolute inset-[7px] rounded-full border-4 border-black transition-opacity duration-[400ms] delay-[80ms] group-hover:opacity-0 group-hover:scale-70 group-hover:transition-[opacity,transform] group-hover:duration-[400ms] group-hover:ease-[cubic-bezier(0.165,0.84,0.44,1)]"></span>
  
        {/* After layer */}
        <span className="absolute inset-[7px] rounded-full border-4 border-red-600 scale-[1.3] opacity-0 transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:transition-[opacity,transform] group-hover:duration-[400ms] group-hover:delay-[80ms] group-hover:ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
  
        {/* Icon box */}
        <div className="flex absolute top-0 left-0 translate-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-x-14">
          <span className="block w-5 h-5 mt-[17px] mx-[18px] rotate-180 fill-black">
            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
            </svg>
          </span>
          <span className="block w-5 h-5 mt-[17px] mx-[18px] rotate-180 fill-red-600">
            <svg viewBox="0 0 46 40">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
            </svg>
          </span>
        </div>
      </button>
    );
  }
  