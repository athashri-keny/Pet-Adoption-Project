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
    PetImage: FileId
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
          <button className='bg-red-600'> Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Addpost