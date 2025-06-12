import React from 'react'
import Location from '../assets/Pics/Location.png'
import Call from '../assets/Pics/Call.png'
import Watch from '../assets/Pics/Watch.png'
import { Instagram , Twitter , Mail , Facebook  } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'

function About() {



  return (
  <div className='text-center bg-[#1D1D1D] '> 
  <div className='flex justify-center items-center gap-2 p-9'>
    <h1 className='text-2xl font-rubik text-white'>Tailwag</h1>
    <div className='text-yellow-500'>
      <PawPrint />
    </div>
  </div>
        <div  className='flex  justify-center gap-8 p-6 '>
    <div className='flex p-13 '>
       <img
      src={Location}
      className='object-cover h-17 w-17 p-2'
      />
      <p className='text-white font-rubik pt-2  '>516 Col Blvd Sonoma<br></br> CA 21202</p>
      </div>
      <div className='flex p-10'>
        <img
        src= {Call}
        className='object-cover h-17 w-17 p-2'
        />
        <p className='text-white font-rubik pt-2'>Office: 2244-2424-2451 <br></br>Inquires: 322-343-246</p>
      </div>
      <div className='flex p-10'>
        <img
        src={Watch}
        className='object-cover h-17 w-17 p-2'
        />
        <p className='text-white font-rubik pt-2'>Mon-Fri: 9am - 8pm <br></br> Sat-Sun: Closed</p>
      </div>
       </div>
          <div className="bg-[#232323] text-white font-rubik px-6 py-8">
  <div className="flex justify-center gap-6 text-[#BDBDBD] mb-6">
    <Link to={'/'} className="cursor-pointer hover:text-white">Home</Link>
    <Link to={'/About'} className="cursor-pointer hover:text-white">About</Link>
    <Link to={'/Puppies'} className="cursor-pointer hover:text-white">Puppies</Link>
    <Link  to =  {'/your-puppies'}className="cursor-pointer hover:text-white">Your Puppies</Link>
    <Link className="cursor-pointer hover:text-white">Contact</Link>
  </div>
  <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#444] pt-4">
    <p className="text-sm text-center md:text-left px-2">
      © Copyright reserved by athashrikeny38@gmail.com
    </p>
    <div className="flex gap-5 mt-3 md:mt-0">
      <Instagram />
      <Twitter />
      <Mail />
      <Facebook />
    </div>
  </div>
</div>

  </div>
  )
}

export default About