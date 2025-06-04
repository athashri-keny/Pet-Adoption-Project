import React from 'react'
import CoverImg from '../assets/Pics/CoverImg.jpg'
import { Link, } from 'react-router-dom'
import DogPic from '../assets/Pics/DogPic.jpg'
import { Dog } from 'lucide-react'
import { HeartPlus } from 'lucide-react'
import { PartyPopper } from 'lucide-react'
import LandlingPagePic from '../assets/Pics/LandlingPagePic.jpg'

function LandingPage() {


  return (
    <div className='relative w-full h-[400px] ' >
      <div>
        <img src= {CoverImg} className='object-auto'/>
      </div>
      <div className=' absolute left-0 top-0 inline-block mt-47 pl-30 '>
        <h1 className='text-7xl font-rubik pb-5 text-white'>Ready to Adopt !</h1>
        <p className='font-rubik text-xl text-white pb-10'> Find your perfect furry friend. Adopt,<br></br> don’t shop — give a pet a loving home today!</p>
          <Link
          to={'/puppies'}
          className='text-3xl font-rubik text-white p-4 rounded-4xl bg-yellow-500'>Adopt Now </Link>
          </div>
          {/* Below  */}
          <div >
          <div className='flex p-15 justify-between gap-6 pl-10 '> {/* Main div */}
            <div className='font-rubik  rounded-2xl '>
          <div className="flex justify-between gap-6 px-10 py-6">
  <div className="font-rubik rounded-2xl shadow-lg p-4 w-1/3">
    <div className="flex items-center gap-2 mb-2">
      <Dog className="text-yellow-500 w-7 h-7" />
      <h2 className="text-yellow-500 text-xl">Grooming Services</h2>
    </div>
    <p className="text-gray-700">Treat your furry friend to a refreshing grooming session! From baths and haircuts to nail trimming.
</p>
  </div>
  <div className="font-rubik rounded-2xl shadow-lg p-4 w-1/3">
    <div className="flex items-center gap-2 mb-2">
      <HeartPlus className="text-yellow-500 w-7 h-7" />
      <h2 className="text-yellow-500 text-xl">Veterinary 24/7</h2>
    </div>
    <p className="text-gray-700">We provide expert medical care for your pets—from routine check-ups to emergency treatments.
</p>
  </div>
  <div className="font-rubik rounded-2xl shadow-lg p-4 w-1/3">
    <div className="flex items-center gap-2 mb-2">
      <PartyPopper className="text-yellow-500 w-7 h-7" />
      <h2 className="text-yellow-500 text-xl">Fun Activities</h2>
    </div>
    <p className="text-gray-700">Let your pets play, explore, and socialize! We offer safe and engaging </p>
  </div>
</div>
</div>
</div>
          </div>
          {/* About US */}
          <div className='flex items-start '>
           <img
           src= {DogPic}
           className='object-cover w-140 h-140 p-4 ml-3 mt-3.5' 
           />
         <div className='ml-50 mt-21'>
            <h2 className='text-3xl font-rubik text-yellow-400 pb-3.5'>
            About us
           </h2>
             <h2 className='text-4xl mb-4 font-rubik'>The Best Pet for You!</h2>
           <p className='mt-2 text-gray-700 max-w-md font-rubik'>
              Looking for the perfect companion? Whether it's a loyal dog, a playful cat, or a cuddly rabbit, we help you find the pet that matches your lifestyle and personality.
           </p>
          <p className='mt-8 text-gray-700  max-w-md  font-rubik'>
  Begin your journey to a loving bond with your new furry friend today!
          </p>
         </div>
          </div>
         <div className=' inline-block'>
            <img
         src= {LandlingPagePic}
         className='object-auto mt-7'
         />
       <h1 className=''> Want a pet For your Loved Ones</h1>
       <p> Apply here today NOw !</p>
       <button className='text-3xl font-rubik text-white p-4 rounded-4xl bg-yellow-500'> Apply Today</button>
         </div>
      </div>
  )
}

export default LandingPage