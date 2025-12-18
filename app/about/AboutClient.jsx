"use client";

import Breadcrumbs from "@/Components/BreadCrumbs";
import StatsCard from "@/Components/CountUp";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AboutClient() {
  const values = [
    {
      icon: "/img/Integrity.png",
      title: "Integrity",
      text: "Committed to honesty, transparency, and ethical decision-making, ensuring we always do what's right for our customers, employees, and partners.",
    },
    {
      icon: "/img/Excellence.png",
      title: "Excellence",
      text: "Continuously improve, exceed expectations, and deliver the highest quality in everything we do",
    },
    {
      icon: "/img/Reliability.png",
      title: "Reliability",
      text: "Consistently deliver on our promises, ensuring our customers, employees, and partners can trust us to provide dependable solutions",
    },
    {
      icon: "/img/Transparency.png",
      title: "Transparency",
      text: "Open communication, honesty, and accountability, ensuring our customers, employees, and partners are always informed and confident in our actions.",
    },
  ];

  return (
    <>
      <Breadcrumbs />
      <motion.div
        className="w-10/12 mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl lg:text-8xl text-left mt-16 fjalla-one mb-4">
          About Us
        </h1>
        <p className="text-xl w-11/12 lg:w-8/12">
          NorthWest HazMat is a trusted full-service provider across Oregon and Washington. We offer expert services including hazardous materials handling and disposal, asbestos testing and analysis, soil restoration, biohazard cleanup, waste management consulting,
 and more. Committed to safety, compliance, and sustainable results, we protect communities and businesses throughout the Pacific Northwest.
        </p>
      </motion.div>

      <motion.div
        className="lg:w-10/12 w-11/12 h-72 lg:h-[30rem] relative mb-20 lg:mb-32 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bg-red-600 w-[100%] h-[100%] absolute -top-[3%] -left-[3%] lg:-top-[2%] lg:-left-[1%] rounded-[45px] lg:rounded-[90px] -z-10"></div>
        <Image
          className="rounded-[40px] lg:rounded-[75px] object-cover"
          src="/img/About_Header.jpg"
          alt="Environmental services team"
          fill
          sizes="(max-width: 1024px) 90vw, 80vw"
        />
        <StatsCard
          widths={"lg:w-3/4 w-full"}
          bottom={"-bottom-10"}
          textSize={"lg:text-6xl text-2xl"}
          textSizep={"lg:text-2xl text-md"}
        />
      </motion.div>

      {/* OUR VALUES SECTION */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl fjalla-one">
          Our <span className="text-red-600">Values</span>
        </h2>
        <p className="lg:text-xl w-10/12 md:w-6/12 lg:w-3/12 mx-auto text-lg opacity-50">
          Our solutions are driven by integrity, creativity, and excellence at
          every step.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 w-11/12 lg:w-10/12 mx-auto lg:grid-cols-2 gap-8 mt-10">
        <motion.div
          className="w-10/12 h-72 lg:h-[30rem] relative mt-10 col-span-1 mx-auto"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-red-600 w-[100%] h-[100%] absolute lg:-top-[2%] lg:-left-[2%] -top-[3%] -left-[3%] rounded-[45px] lg:rounded-[90px] -z-10"></div>
          <Image
            className="rounded-[40px] lg:rounded-[75px] object-cover"
            src="/img/Company_Core.png"
            alt="Our company values"
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
          />
        </motion.div>

        {/* CARDS */}
        <div className="col-span-1 flex items-center">
          <motion.ul
            className="flex flex-col h-full justify-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {values.map((item, index) => (
              <motion.li
                key={index}
                className="grid items-center grid-cols-[auto_1fr]"
                variants={itemVariants}
              >
                <div className="col-span-1 relative w-16 h-16">
                  <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div className="col-span-1 ms-5 text-left">
                  <h3 className="text-left text-2xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="w-full lg:w-5/6 text-gray-700">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        {/* CARDS END */}
      </div>

      <div className="grid w-11/12 lg:w-10/12 mt-20 mx-auto text-center grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 my-auto">
          <h2 className="fjalla-one text-4xl">
            <span className="text-red-600">Mission</span> Statement
          </h2>
          <p className=" w-full lg:w-2/3 text-lg mx-auto mt-5">
            Core values serve as the foundation of a company's culture, guiding
            decision-making, interactions, and long-term goals. These values
            define what the organization stands for and help build trust with
            employees, customers, and stakeholders. Common core values include
            integrity, innovation, customer focus, accountability, and teamwork.
            By fostering a strong ethical and performance-driven environment,
            companies ensure consistency in their operations and create a
            positive workplace culture.
          </p>
        </div>
        <div className="w-10/12 h-72 lg:h-[30rem] relative mt-10 col-span-1 mx-auto">
        <div className="bg-red-600 w-[100%] h-[100%] absolute -top-[3%] -left-[3%] lg:-top-[2%] lg:-left-[2%] lg:rounded-[90px] rounded-[45px] -z-10"></div>
          <Image
            className="rounded-[40px] lg:rounded-[75px] object-cover"
            src="/img/Mission.jpg"
            alt="Our mission statement"
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
          />
        </div>
      </div>
    </>
  );
}
