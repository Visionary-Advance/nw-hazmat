"use client";

import Breadcrumbs from "@/Components/BreadCrumbs";
import CallDropdown from "@/Components/CallDropdown";
import Form from "@/Components/Form";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Contact() {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const faqData = [
    {
      question: "Do you offer hazmat training classes?",
      answer: "Yes, we offer both initial hazmat training and refresher courses for individuals and businesses in Eugene, Oregon and the surrounding Lane County area. Our courses cover OSHA-compliant safety procedures, proper handling of hazardous materials, and real-world scenarios. Classes require a minimum group size of 5 people, and we host the training at one of our approved facilities.",
    },
    {
      question: "Do you provide emergency hazmat response services?",
      answer: "Yes, we offer 24/7 emergency hazmat response services in Lane County and surrounding areas. Our certified team is trained to quickly and safely handle hazardous materials incidents, including chemical spills, biohazards, and contamination threats. If you’re facing a hazardous situation, call us immediately for a rapid response.",
    },
    {
      question: "When should I call a hazmat team?",
      answer:
        "You should call a hazmat team if you encounter chemical spills, biohazards (blood, bodily fluids), asbestos, meth labs, or other potentially dangerous materials.",
    },
    {
      question: "How can I tell if I have mold in my home or business?",
      answer:
        "Common signs include musty odors, visible spots, allergy symptoms, or recent water damage.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We proudly serve Eugene, Oregon, as well as Lane County and surrounding areas. Our hazmat and mold remediation team is ready to respond quickly and professionally. If you're unsure whether we service your location, just give us a call!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <>
      <Breadcrumbs />

      <div className="text-center mb-8">
        <h2 className="fjalla-one font text-5xl">Get In Touch</h2>
        <p className="text-lg">Let us know how we can help you</p>
      </div>

      <CallDropdown />

      <Form />

      {/* FAQ Section */}
      <div className=" w-11/12 lg:max-w-7xl mx-auto mt-12 rounded-lg py-4  ">
        <h2 className="text-3xl fjalla-one  mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-2">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-medium text-black"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openFAQIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQIndex === index
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {faq.answer || "Answer coming soon."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
