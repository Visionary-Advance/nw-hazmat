'use client'
import { useState } from 'react';
import Link from 'next/link';
import GoButton from './Go-Button';
import { services } from '../data/ServicesData';

export default function ServiceList() {
  const [hoveredId, setHoveredId] = useState(null);
  const [pos, setPos] = useState({ x: -50, y: 0 });

 
  return (
    <div className="bg-white relative w-10/12 mx-auto rounded-3xl">
      <div className="relative">
        {services.map((item) => (
          <Link
            key={item.slug}
            href={`/services/`+ item.slug}
            className="grid grid-cols-1 group lg:grid-cols-[auto_1fr_1fr_auto] py-3 border-b w-11/12 mx-auto border-black last:border-b-0 items-center relative"
          
          >
            {/* IMAGE */}
            <div className="col-span-1 rounded-xl mx-auto w-auto pb-2 lg:pb-0">
              <img className='rounded-xl' src={item.img} alt={item.icon + " Icon"} width={150} height={70} />
            </div>

            {/* Title */}
            <div className="ps-5">
              <h2 className="text-3xl  group-hover:text-red-600 lg:text-left text-center lg:text-5xl fjalla-one">
                {item.title}
              </h2>
            </div>

            {/* Description */}
            <div className="lg:w-6/12 text-left ms-auto me-2">
              <p>{item.shortDescription}</p>
            </div>

            {/* Go Button */}
            <div className="mx-auto">
              <GoButton />
            </div>

            {/* Hover Image - Inside Each Link */}
            {hoveredId === item.slug && (
              <img
                src={item.img}
                alt={item.title + " Image"}
                width={200}
                height={150}
                className="pointer-events-none absolute w-52 h-auto object-cover rounded-lg shadow-lg transition duration-300 hidden md:block"
                style={{
                  left: `${pos.x /5}px`,   // slight right offset
                  top: `${pos.y /5 }px`,    // slight upward offset
                  maxWidth: '50% ',
                  transform: 'translate(200%, -50%)', // Center the image exactly
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
