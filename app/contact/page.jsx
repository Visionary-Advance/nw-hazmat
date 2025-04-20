"use client"

import Breadcrumbs from "@/Components/BreadCrumbs"
import CallDropdown from "@/Components/CallDropdown"
import Form from "@/Components/Form"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

export default function Contact() {
  const [openFAQIndex, setOpenFAQIndex] = useState(null)

  const faqData = [
    {
      question: "What types of hazardous materials do you handle?",
      answer: "",
    },
    {
      question: "Do you provide emergency hazmat response services?",
      answer: "",
    },
    {
      question: "How do you ensure compliance with safety regulations?",
      answer:
        "Our team follows OSHA, EPA, and DOT guidelines, using proper safety protocols, equipment, and training to meet all regulatory requirements.",
    },
    {
      question: "Do you offer hazardous waste disposal services?",
      answer: "",
    },
    {
      question: "Can you assist with hazmat training and certification?",
      answer: "",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

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
        <h2 className="text-3xl fjalla-one  mb-4">Frequently Asked Questions</h2>
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
  )
}
