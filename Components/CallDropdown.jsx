'use client'
import Link from 'next/link'
import { FaPhone } from 'react-icons/fa'

export default function CallDropdown() {
  const contacts = [
    {
      name: 'Eric Ruby',
      title: 'Director Of Operations',
      phone: '541-556-3000',
    },
    {
      name: 'Sarah Crites',
      title: 'Office Manager',
      phone: '541-988-9823',
    },
  ]

  return (
    <div className="bg-red-600 text-white rounded-lg p-4 w-11/12 lg:max-w-7xl mx-auto shadow-lg">
      <div className="flex items-center  space-x-2 mb-4">
        <FaPhone className="w-5 h-5 rotate-90" />
        <span className='text-2xl fjalla-one'>Give Us a Call</span>
      </div>

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
  )
}