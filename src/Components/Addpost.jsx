import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthService from '../appwrite/Auth'
import DatabaseServicee from '../appwrite/PicConfig'
import { ID } from 'appwrite'
import { useNavigate } from 'react-router-dom'
import PuppiesPlaying from '../assets/Pics/PuppiesPlaying.jpg'
import { MapPin } from 'lucide-react'
import About from '../Footer/About'

// things to do 
// create post by extracting the value and sending to the appwrite
// use react hook form for submitting 
// create a object and Add value 
function Addpost() {
const {register , handleSubmit , formState: {errors} } = useForm()
const [userId, setUserId] = useState("")
const navigate = useNavigate()
const [loading , setloading] = useState(false)
const [city , setcity] = useState("")
const [state , setstate] = useState("")
const [location , setlocation] = useState("")
const [Email , setEmail] = useState("")
const [success , setsuccss] = useState(false)



useEffect(() => {
const GetCurrentUser = async () => {
  try {
    const response = await AuthService.GetCurrentUser()
    setUserId(response.$id) // setting the user id 
    setEmail(response.email)
    console.log("Current user fetching sucessfully!" , response)
  } catch (error) {
    console.error("Error while fetchting the current user" , error)
    setloading(false)
    
  }
}
GetCurrentUser()
} , [])


const Fetchlocation = () => {
navigator.geolocation.getCurrentPosition(async(position) => {
  const lat = position.coords.latitude
  const lon = position.coords.longitude

  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=2d700d74c5b248c4afdf47eabe6e22e2`)
  const data = await response.json()
 console.log(data)
  const compontents = data.results[0]?.components
  setcity(compontents.city)
  setstate(compontents.state)
  setlocation(compontents.city)
})
}

const handle = async (data) => {

try {
  setloading(true)
 const File = data?.PetImage?.[0]
const uploadedFile = await DatabaseServicee.uploadFile(File )
const FileId = uploadedFile.$id

  const newpost = {
    PostId: ID.unique(),
    UserId: userId,
    Petname: data?.Petname,
    About: data?.About,
    Location: location ,
    PetImage: FileId,
    Gender: data?.Gender,
    isVaccinated: Boolean(data?.isVaccinated),
    AGE: data?.AGE,
    Breed: data?.Breed,
    Size: data?.Size,
    AnimalType: data?.AnimalType,
    Neutered: Boolean(data?.Neutered),
    Email: Email
  }
  
  
   await DatabaseServicee.CreatePost(newpost)
      console.log("Post created successfully" , newpost)
      navigate('/')
   setTimeout(() => {
  navigate('/')
  setloading(false)
}, 3000)
setsuccss(true)

} catch (error) {
  console.error("error while submitting the form" , error)
  setloading(false)
}
   
}

  return (
    <div>
      <div className='relative shadow-xl' >
        <img
        src={PuppiesPlaying}
        className='object-cover'
        alt= 'Help a Pet Find a Loving Home 🐾"'
        />
       <div className='absolute top-7 text-white pl-33 pt-17 ' >
         <h1 className='text-3xl font-rubik'>Help a Pet Find a Loving Home 🐾</h1>
        <h3 className='text-x font-rubik'>Fill in the details to list your pet for adoption</h3>
       </div>
      </div>
    <div className="text-center shadow-2xl ">

      <form onSubmit={handleSubmit(handle)}>
        <p className='font-rubik pt-11 pb-3'>Petname *</p>
        <input placeholder='Enter Petname ' 
        className='bg-white p-2 shadow-sm w-67 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none
        '
         type='text'
        {...register("Petname" , {
          required: "petname is required!",
        })}
        />
        <p className='font-rubik pt-4 pb-3'>About</p>
        {errors.Petname && (<p style={{color: "red"}}>{errors.Petname.message}</p>)}
      <textarea
  placeholder="Describe your pet's personality, likes, and any special needs"
  className="bg-white p-3 h-22 w-110 shadow-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
  {...register("About", {
    required: "About is required"
  })}
/>
        {errors.About && (<p style={{color: "red"}}>{errors.About.message}</p>)}
         <p className='font-rubik '>Location</p>
         <div  className='font-rubik p-3 pr-1 flex  justify-center'>
          <button type='button' className='flex items-center bg-yellow-600 text-white p-2 rounded-2xl  '  onClick={() => Fetchlocation()} >Use My Current Location  </button>
           
         </div>
         <div className='flex justify-center pr-1'>
           <p id='Location' className='font-rubik flex p-1'>
          {city}  , {state}   <MapPin  className=''/>
         </p>
         </div>
        <p className='p-2 font-rubik '>Pet Image * </p>
         <input type='file'
         accept='image/*'
         placeholder='Enter a Cute Photo'
         className='bg-white p-2 shadow-sm'
          {...register("PetImage" , {
            required: "PetImage is required!"
          })}
         />
         {errors.File && (<p style={{color: "red"}}>{errors.File.message}</p>)}


         <p className='font-rubik p-3'>Age</p>
         <input
         type='number'
         className='bg-white shadow-sm p-3 w-67  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
         placeholder='Enter Age'
         {...register("AGE" , {
          required: "AGE is required!"
         })}
         />
             {errors.Age && (<p style={{color: "red"}}>{errors.Age.message}</p>)}
             <p className='font-rubik p-3'>Breed</p>
         <input
         type='text' 
         className='bg-white p-3 shadow-sm w-69 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
         placeholder='Enter breed (e.g., Golden Retriever)'
         {...register("Breed"  , {
          required: "Breed is required!"
         })}
         />
          {errors.Breed && (<p style={{color: "red"}}>{errors.Breed.message}</p>)}
          <p className='font-rubik p-3'>Size</p>
         <input
         type='text'
         className='bg-white shadow-sm p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
         placeholder='Size'
         {...register("Size" , {
          required: "Size is required!"
         })}
         />
          {errors.Size && (<p style={{color: "red"}}>{errors.Size.message}</p>)}

          <p className="font-rubik p-2">Gender?</p>

<div className="flex justify-center gap-6 items-center pl-2">
  {/* Male Option */}
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="Gender"
      value="Male"
      id="Male"
      className="accent-yellow-500 w-4 h-4"
      {...register("Gender", {
        required: "Gender is required!",
      })}
    />
    <label htmlFor="Male" className="text-gray-800 font-medium">
      Male
    </label>
  </div>

  {/* Female Option */}
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="Gender"
      value="Female"
      id="Female"
      className="accent-yellow-500 w-4 h-4"
      {...register("Gender", {
        required: "Gender is required!",
      })}
    />
    <label htmlFor="Female" className="text-gray-800 font-medium">
      Female
    </label>
  </div>
</div>
<p className="font-rubik pt-4 pb-1">Vaccinated?</p>

<div className="flex gap-6  justify-center items-center pl-2 ">
  {/* No Option */}
  <label htmlFor="no" className="flex items-center space-x-2 text-gray-800 font-medium">
    <input
      type="radio"
      name="Vaccinated"
      value="No"
      id="no"
      className="accent-yellow-500 w-4 h-4"
      {...register("isVaccinated", {
        required: "Vaccinated is required!",
      })}
    />
    <span>No</span>
  </label>

  {/* Yes Option */}
  <label htmlFor="yes" className="flex items-center space-x-2 text-gray-800 font-medium">
    <input
      type="radio"
      name="Vaccinated"
      value="Yes"
      id="yes"
      className="accent-yellow-500 w-4 h-4"
      {...register("isVaccinated", {
        required: "Vaccinated is required!",
      })}
    />
    <span>Yes</span>
  </label>
</div>
<div className="mt-4">
  <label htmlFor="AnimalType" className="block mb-2 font-rubik font-semibold text-gray-800">
    Animal Type
  </label>
  <select
    id="AnimalType"
    className="w-69 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
    {...register("AnimalType", {
      required: "Animal Type is required!",
    })}
  >
    <option value="" className='font-rubik'>-- Select --</option>
    <option value="Dog" className='font-rubik'>Dog</option>
    <option value="Cat" className='font-rubik'>Cat</option>
    <option value="Other" className='font-rubik'>Other</option>
  </select>
  </div>


  <p className="font-rubik mb-2 font-semibold text-gray-800 p-1 pt-5">Neutered?</p>

  <div className="flex justify-center gap-6 items-center ">
    {/* Yes Option */}
    <label htmlFor="yes" className="flex items-center gap-2 font-rubik text-gray-700">
      <input
        type="radio"
        name="Neutered"
        value="yes"
        id="yes"
        className="accent-yellow-500 w-4 h-4"
        {...register("Neutered", {
          required: "This info is required!",
        })}
      />
      <span>Yes</span>
    </label>

    {/* No Option */}
    <label htmlFor="No" className="flex items-center gap-2 font-rubik text-gray-700">
      <input
        type="radio"
        name="Neutered"
        value="No"
        id="No"
        className="accent-yellow-500 w-4 h-4"
        {...register("Neutered", {
          required: "This info is required!",
        })}
      />
      <span>No</span>
    </label>
  </div>

{errors.Neutered && (<p style={{color: "red"}}>{errors.Neutered.message}</p>)}
 <p className='p-3 font-rubik'>Contact Details</p>
 <input
 type='text'
 name='Email'
 placeholder='Enter Email'
 className='font-rubik p-3 bg-white  shadow-sm w-69 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
value={Email}
readOnly
{...register("Email" , {
  required: "Email is required!"
})}
 />
 {errors.Email && (<p style={{color: "red"}}>{errors.Email.message}</p>)}

       <div className="flex justify-center w-full pt-6 p-7 ">
  <button className="bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-700 transition">
    Submit
  </button>
</div>

      </form>
     <div className="flex justify-center w-full pt-6 p-7">
  {loading ? (
    <div className="flex justify-center items-center gap-2">
      <div className="w-5 h-5 border-4 border-white border-t-yellow-500 rounded-full animate-spin"></div>
      <span className="text-yellow-600 font-semibold">Submitting...</span>
    </div>
  ) : success ? (
    <span className="text-green-600 font-semibold text-lg">🎉 Post submitted successfully!</span>
  ) : (
    <button
      type="submit"
      className="bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-700 transition"
    >
      Submit
    </button>
  )}
</div>

    </div>
   <About/>
    </div>
  )
}

export default Addpost