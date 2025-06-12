import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { Phone, Mail, MapPin } from 'lucide-react'
import About from '../Footer/About'

function Apply() {
const [showThankyou , setShowThankyou] = useState(false)

const handleClick = () => {
setShowThankyou(true)
}



  return (

 <div className="bg-white p-10">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
    {/* Left Section - Contact Info */}
    <div>
      <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
      <hr className="mb-4 border-gray-300" />
      <p className="text-gray-600 mb-6">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don’t look even slightly believable.
      </p>

      {/* Phone */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-red-500 text-white p-3 rounded-full">
          <Phone size={20} />
        </div>
        <div>
          <p className="text-gray-500">Call Anytime</p>
          <p className="font-semibold text-black">(800) 123-45789</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-red-500 text-white p-3 rounded-full">
          <Mail size={20} />
        </div>
        <div>
          <p className="text-gray-500">Write Email</p>
          <p className="font-semibold text-black">help@yourcompany.com</p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center gap-4">
        <div className="bg-red-500 text-white p-3 rounded-full">
          <MapPin size={20} />
        </div>
        <div>
          <p className="text-gray-500">Visit Office</p>
          <p className="font-semibold text-black">
            214 Golden Street Round Road New York, USA
          </p>
        </div>
      </div>
    </div>

    {/* Right Section - Form */}
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border rounded-md text-black"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border rounded-md text-black"
        />
        <input
          type="text"
          placeholder="Your Subject"
          className="p-3 border rounded-md text-black"
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          className="p-3 border rounded-md text-black"
        />
      </div>

      <textarea
        placeholder="Your Message"
        className="w-full mt-4 p-3 border rounded-md text-black
         h-40 resize-none"
      ></textarea>
      
        <div className="text-center mt-6">
      {showThankyou ? (
        <p className="text-green-600 text-lg font-semibold">Thank you! We'll get back to you soon. 🐾</p>
      ) : (
        <button
          onClick={() => handleClick()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full font-semibold"
        >
          Submit
        </button>
      )}
    </div>
      
    </div>
  </div>
</div>


  )
}

export default Apply