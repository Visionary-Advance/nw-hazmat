'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaPhone, FaChevronDown } from 'react-icons/fa'

export default function CallDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      name: 'Eric Ruby',
      title: 'Director Of Operations',
      phone: '(541)-556-3000',
    },
    {
      name: 'Mike Haas',
      title: 'Operations Manager',
      phone: '555-555-5555',
    },
    {
      name: 'Office Manager',
      title: 'Office',
      phone: '(541)-988-9823',
    },
  ]

  return (
    <div className="bg-red-600 text-white rounded-lg p-4 w-11/12 lg:max-w-7xl mx-auto shadow-lg">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 ">
          <FaPhone className="w-5 h-5 rotate-90" />
          <span className='text-2xl fjalla-one'>Give Us a Call</span>
        </div>
        <FaChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        

        <div className="space-y-2 mt-2">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="grid grid-cols-3 p-2 gap-4 text-sm md:text-base"
            >
              <span className='font-bold lg:text-2xl'>{contact.name}</span>
              <span className="text-center lg:text-2xl ">{contact.title}</span>
              <Link className='text-right' href={"tel: " + contact.phone}>
              <span className=" lg:text-2xl">{contact.phone}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
