'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GoButton from './Go-Button';

export default function ServiceList() {
  const [hoveredId, setHoveredId] = useState(null);
  const [pos, setPos] = useState({ x: -50, y: 0 });

  const service = [
    {
      id: "hazmat-services",
      title: "Hazmat Services",
      img: "/Img/Hazmat-Services.jpg",
      icon: "/Img/Hazmat.png",
      description: "Expert hazmat handling, containment, and disposal to protect your environment and ensure safety.",
    },
    {
      id: "lab-services",
      title: "Lab Services",
      img: "/Img/Lab-Testing.jpg",
      icon: "/Img/Lab.png",
      description: "Accurate asbestos testing and lab analysis to identify hazards and ensure safe removal.",
    },
    {
      id: "mold-remediation",
      title: "Mold Remediation",
      img: "/Img/Mold-Remi.jpg",
      icon: "/Img/Mold.png",
      description: "Professional mold removal to prevent health risks, improve air quality, and protect property.",
    },
    {
      id: "soil-remidiation",
      title: "Soil Remediation",
      img: "/Img/Soil-Remidiation.jpg",
      icon: "/Img/Soil.png",
      description: "Effective soil remediation services to restore contaminated ground for safe use.",
    },
    {
      id: "bio-hazard-cleanup",
      title: "Bio Hazard Cleanup",
      img: "/Img/Cleanup.jpg",
      icon: "/Img/Bio.png",
      description: "Safe and thorough biohazard cleanup to remove health risks and contamination.",
    },
    {
      id: "management-and-consulting",
      title: "Management & Consulting",
      img: "/Img/Managment-Services.jpg",
      icon: "/Img/Management.png",
      description: "Expert consulting and project management for safety and environmental solutions.",
    },
    {
      id: "dedication-services",
      title: "Dedication Services",
      img: "/Img/Dedication-Services.jpg",
      icon: "/Img/Dedicated.png",
      description: "Committed to delivering safe, high-quality solutions for every project.",
    },
  ];

  return (
    <div className="bg-white relative w-10/12 mx-auto rounded-3xl">
      <div className="relative">
        {service.map((item) => (
          <Link
            key={item.id}
            href={item.id}
            className="grid grid-cols-1 group lg:grid-cols-[auto_1fr_1fr_auto] py-3 border-b w-11/12 mx-auto border-black last:border-b-0 items-center relative"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setPos({ x: 0, y: 0 });
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            {/* ICON */}
            <div className="col-span-1 mx-auto w-auto pb-2 lg:pb-0">
              <Image src={item.icon} alt={item.icon + " Icon"} width={70} height={70} />
            </div>

            {/* Title */}
            <div className="ps-5">
              <h2 className="text-3xl  group-hover:text-red-600 lg:text-left text-center lg:text-5xl fjalla-one">
                {item.title}
              </h2>
            </div>

            {/* Description */}
            <div className="lg:w-6/12 text-left ms-auto me-2">
              <p>{item.description}</p>
            </div>

            {/* Go Button */}
            <div className="mx-auto">
              <GoButton />
            </div>

            {/* Hover Image - Inside Each Link */}
            {hoveredId === item.id && (
              <Image
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
