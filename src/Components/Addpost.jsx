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

useEffect(() => {
const GetCurrentUser = async () => {
  try {
    const response = await AuthService.GetCurrentUser()
    setUserId(response.$id) // setting the user id 
    console.log("Current user fetching sucessfully!" , response)
  } catch (error) {
    console.error("Error while fetchting the current user" , error)
  }
}
GetCurrentUser()
} , [])

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
    Location: data?.Location,
    PetImage: FileId,
    Gender: data?.Gender,
    Vaccinated: data?.Vaccinated,
    AGE: data?.AGE,
    Breed: data?.Breed,
    Size: data?.Size,
    AnimalType: data?.AnimalType
  }
  
   await DatabaseServicee.CreatePost(newpost)
      console.log("Post created successfully" , newpost)
      navigate('/')

} catch (error) {
  console.error("error while submitting the form" , error)
}
}

  return (
    <div className='flex '>
    <div className="">
      <form onSubmit={handleSubmit(handle)}>
        <input placeholder='Enter Petname' 
        className='bg-white'
         type='text'
        {...register("Petname" , {
          required: "petname is required!",
        })}
        />
        {errors.Petname && (<p style={{color: "red"}}>{errors.Petname.message}</p>)}
        <input placeholder='Enter Info about pet' 
        type='text'
        className='bg-white'
        {...register("About" , {
          required: "About is required"
        })}    
        />
        {errors.About && (<p style={{color: "red"}}>{errors.About.message}</p>)}
        <input placeholder='Enter Location'
            className='bg-white'
         type='text'
         {...register("Location" , {
          required: "Location is required!"
         })}
         />
         {errors.Location && (<p style={{color: "red"}}>{errors.Location.message}</p>)}
         <input type='file'
         accept='image/*'
         className='bg-white'
          {...register("PetImage" , {
            required: "PetImage is required!"
          })}
         />
         {errors.File && (<p style={{color: "red"}}>{errors.File.message}</p>)}
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
         {...register("Vaccinated" , {
          required: "Vaccinated is required!"
         })}
         />
  <label for="no">No</label>
  <input 
         type="radio" 
         name="Vaccinated" 
          value="Yes" 
          id="yes"
          {...register("Vaccinated" , {
            required: "Vaccinated is required!"
          })}
  />
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

  <label for="yes">Yes</label>
          <button className='bg-red-600'> Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Addpost