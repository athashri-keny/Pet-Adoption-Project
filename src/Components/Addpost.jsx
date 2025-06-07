import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthService from '../appwrite/Auth'
import DatabaseServicee from '../appwrite/PicConfig'
import { ID } from 'appwrite'
import { useNavigate } from 'react-router-dom'

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


useEffect(() => {
const GetCurrentUser = async () => {
  try {
    const response = await AuthService.GetCurrentUser()
    setUserId(response.$id) // setting the user id 
    setEmail(response.email)
    console.log("Current user fetching sucessfully!" , response)
  } catch (error) {
    console.error("Error while fetchting the current user" , error)
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
    Email: data?.Email
  }
  
  
   await DatabaseServicee.CreatePost(newpost)
      console.log("Post created successfully" , newpost)
      navigate('/')

} catch (error) {
  console.error("error while submitting the form" , error)
}
}

  return (
    <div className=''>
    <div className=" ">
      <form onSubmit={handleSubmit(handle)}>
        <p >Petname</p>
        <input placeholder='Enter Petname' 
        className='bg-white p-5 '
         type='text'
        {...register("Petname" , {
          required: "petname is required!",
        })}
        />
        <p>About</p>
        {errors.Petname && (<p style={{color: "red"}}>{errors.Petname.message}</p>)}
        <input placeholder='Enter Info about pet' 
        type='text'
        className='bg-white'
        {...register("About" , {
          required: "About is required"
        })}    
        />
        {errors.About && (<p style={{color: "red"}}>{errors.About.message}</p>)}
         <div>
          <button type='button' onClick={() => Fetchlocation()}>Fetch Your Current Location</button>
         <p id='Location'>
          {city}
          {state}
         </p>
         </div>
        <p>Pet Image</p>
         <input type='file'
         accept='image/*'
         className='bg-white'
          {...register("PetImage" , {
            required: "PetImage is required!"
          })}
         />
         {errors.File && (<p style={{color: "red"}}>{errors.File.message}</p>)}
         <p>Age</p>
         <input
         type='text'
         className='bg-white'
         placeholder='Enter Age'
         {...register("AGE" , {
          required: "AGE is required!"
         })}
         />
             {errors.Age && (<p style={{color: "red"}}>{errors.Age.message}</p>)}
         <input
         type='text'
         className='bg-white'
         placeholder='Breed'
         {...register("Breed"  , {
          required: "Breed is required!"
         })}
         />
          {errors.Breed && (<p style={{color: "red"}}>{errors.Breed.message}</p>)}
         <input
         type='text'
         className='bg-white'
         placeholder='Size'
         {...register("Size" , {
          required: "Size is required!"
         })}
         />
          {errors.Size && (<p style={{color: "red"}}>{errors.Size.message}</p>)}
          <p>Gender? </p>
          <input
          type='radio'
          name='Gender'
          value= "Male"
          id='Male'
          {...register('Gender' , {
            required: "Gender is required!"
          })}
          />
          <label htmlFor='Male'> Male</label>
           {errors.gender && (<p style={{color: "red"}}>{errors.gender.message}</p>)}
           <input
           type='radio'
           name='gender'
           value= 'Female'
           id='Female'
           {...register("Gender" , {
            required: "Gender is required!"
           })}
           />
           <label htmlFor='Female'> Female </label>
         <p>Vaccinated?</p>
        <input 
         type="radio" 
         name="Vaccinated" 
         value="No" 
         id="no"
         {...register("isVaccinated" , {
          required: "Vaccinated is required!"
         })}
         />
  <label for="no">No</label>
  <input 
         type="radio" 
         name="Vaccinated" 
          value="Yes" 
          id="yes"
          {...register("isVaccinated" , {
            required: "Vaccinated is required!"
          })}
  />
   <label for="yes">Yes</label>
  <label htmlFor="AnimalType">Animal Type</label>
<select
  id="AnimalType"
  className="p-2 border rounded"
  {...register("AnimalType", {
    required: "Animal Type is required!",
  })}
>
  <option value="">-- Select --</option>
  <option value="Dog">Dog</option>
  <option value="Cat">Cat</option>
  <option value="Other">Other</option>
</select>

<p>Neutered?</p>
<input
type='radio'
name='Neutered'
value="yes"
id='yes'
{...register("Neutered" , {
  required: "This info is required!"
})}
/>
<label for ="yes"> Yes</label>
<input
type='radio'
name='Neutered'
value= "No"
id='No'
{...register("Neutered" , {
  required: "This info is required!"
})}
/>
<label for = "No">No</label>
{errors.Neutered && (<p style={{color: "red"}}>{errors.Neutered.message}</p>)}
 <p>Contact Details</p>
 <input
 type='text'
 name='email'
 placeholder='Enter Email'
value={Email}
{...register("Email" , {
  required: "Email is required!"
})}
 />
          <button className='bg-red-600'> Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Addpost