'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    text: "The cost was the same as the local competitors that I called, but the people at Northwest Hazmat were very friendly, which is something I can't say about the competition. The turnaround time for the test results was much quicker than expected. I would definitely recommend Northwest Hazmat.",
    name: "Ryan O.",
  },
  {
    text: "Northwest Hazmat was professional, fast, and affordable. I appreciated how they explained everything clearly.",
    name: "Jessica P.",
  },
  {
    text: "Super friendly staff and fast service. Highly recommend Northwest Hazmat for any testing needs!",
    name: "Mike L.",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? testimonials.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === testimonials.length - 1 ? 0 : index + 1);
  };

  return (
    <section className="my-20 text-center w-11/12 md:w-8/12 mx-auto">
      <h3 className="text-5xl  mb-4 fjalla-one">Hear from Our Clients</h3>

      {/* Star Rating */}
      <div className="flex justify-center text-xl mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>

      {/* Sliding Review */}
      <div className="relative overflow-hidden min-h-[200px]">
        <div
          className="transition duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, display: 'flex' }}
        >
          {testimonials.map((review, i) => (
            <div key={i} className="min-w-full px-4">
              <p className="text-xl italic">“{review.text}”</p>
              <p className="mt-4 font-semibold">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 my-4">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === i ? 'bg-black' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-8 mt-4 text-3xl">
        <button onClick={prevSlide}>
          <FaArrowLeft className="border-2 border-black rounded-full p-2" />
        </button>
        <button onClick={nextSlide}>
          <FaArrowRight className="border-2 border-black rounded-full p-2" />
        </button>
      </div>
    </section>
  );
}
