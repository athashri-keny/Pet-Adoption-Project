import React, { useEffect, useState } from 'react'
import CoverImg from '../assets/Pics/CoverImg.jpg'
import { Link, useNavigate, } from 'react-router-dom'
import DogPic from '../assets/Pics/DogPic.jpg'
import { Dog } from 'lucide-react'
import { HeartPlus } from 'lucide-react'
import { PartyPopper } from 'lucide-react'
import LandlingPagePic from '../assets/Pics/LandlingPagePic.jpg'
import firstpic from '../assets/Pics/firstpic.jpg'
import Secondpic from  '../assets/Pics/Secondpic.jpg'
import ThirdPic from '../assets/Pics/ThirdPic.jpg'
import { PawPrint } from 'lucide-react'
import { Cat } from 'lucide-react'
import DatabaseServicee from '../appwrite/PicConfig'
import About from '../Footer/About'



function LandingPage() {
const [posts , setposts] = useState([])
const navigate = useNavigate()

useEffect(() => {
const FetchPost = async() => {
  try {
    const response = await DatabaseServicee.GetPostLandingPage()
    setposts(response.documents) 
    console.log(response)
  } catch (error) {
    console.error("Error while fetching the posts ")
  }
}
FetchPost()
} , [])




  return (
    <div className='relative w-full  ' >
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
         <div className="relative">
  <div className="absolute inset-0 bg-black opacity-30"></div>
  <img
    src={LandlingPagePic}
    className="w-full h-auto object-cover"
    alt="Pet Landing"
  />
  <div className="absolute inset-0 z-20 flex flex-col items-start justify-center p-10 left-9">
    <p className="text-white text-3xl font-rubik mb-4">
      Apply here today Now!
    </p>

    <h1 className="text-2xl font-semibold text-white font-rubik mb-4">
      Want a pet for your Loved Ones?
    </h1>

    <button className="text-2xl font-rubik text-white p-4 rounded-3xl bg-yellow-500">
      Apply Today
    </button>
  </div>
</div>
<div className="p-9">
     <div className="flex items-center justify-center mt-12 mb-20 gap-4">
    <h1 className="text-4xl font-rubik ">
    Pet Adoption Process
  </h1>
      <PawPrint className="w-10 h-10 text-yellow-500" />
</div>
  <div className="flex gap-6 items-center">
    <div className="text-center">
      <img src={firstpic} className="object-cover w-110 h-80 rounded-3xl" alt="Find your pet" />
      <p className="mt-2 text-2xl font-rubik pb-8" >Find Your Pet</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>on error dolorum et harum consequuntur re
      </p>
    </div>
    <div className="text-center">
      <img src={Secondpic} className="object-cover w-110 h-80 rounded-3xl" alt="Know your pet" />
      <p className="mt-2 text-2xl font-rubik pb-8 ">Know Your Pet</p>
       <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>on error dolorum et harum consequuntur re
      </p>
    </div>
    <div className="text-center">
      <img src={ThirdPic} className="object-cover  w-110 h-80 rounded-3xl" alt="Take your pet home" />
      <p className="mt-2 text-2xl font-rubik pb-8">Take Your Pet Home</p>
       <p >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>on error dolorum et harum consequuntur re
      </p>
    </div>
  </div>
  </div>
 <div className='text-center text-4xl p-16 font-rubik'>
  <h1 className='flex justify-center items-center gap-2'>
    Our Todays Featured Pets
    <Cat className='mt-1 w-10 h-10 text-yellow-400' />
  </h1>
</div>

<div>

  <div className='pl-33  '>
   <div className='p-3.5 flex content-evenly gap-29  '>
  {posts.map((post) => ( 
      <div>
         <img
        src={DatabaseServicee.GetFilePreview(post.PetImage)}
        className="object-cover w-64 h-64 rounded-3xl"
      />
      <div>
 <h1 className='font-rubik  text-2xl p-3 mb-1 '>{post.Petname}</h1>
 <p className='font-rubik  p-3 mb-9'>{post.About}</p>
      <button onClick={() => (navigate(`/puppies/post/${post.PostId} `))} className='bg-yellow-400 hover:bg-yellow-600 transition-all duration-300 text-white rounded-full px-4 py-2 shadow-md hover:scale-105"'>Learn More </button>
      </div>
 </div>
  )
)}
   </div>
  </div>

</div>

      </div>
  )
}

export default LandingPage