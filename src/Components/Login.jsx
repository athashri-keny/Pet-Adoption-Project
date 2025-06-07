import React from 'react'
import {  useForm } from 'react-hook-form'
import { useNavigate ,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthService from '../appwrite/Auth'
import { useState } from 'react'
import { login } from '../Store/authSlice'

function Login() {
const {register , handleSubmit , formState:{errors}} = useForm()
const navigate = useNavigate()
const [error , seterror] = useState("")
const dispatch = useDispatch()


const HandleLogin =  async(data) => {
   seterror("")
   try {
    const userdata = await AuthService.LoginUser(data)
    if (userdata) {
      dispatch(login(userdata))
      navigate('/')
     console.log("user logged in Sucessfully" , userdata)
    }
   } catch (error) {
    console.log("Error while loggin in " , seterror(error))
   }
}

  
  return (
    <>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
    <form  onSubmit = {handleSubmit(HandleLogin)}className="space-y-5">
      <input
        type="email"
        placeholder="Enter your Email"
        {...register("email" , {
          required: "Email is required!",
           pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address"
    }
        })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Enter your Password"
        {...register("password" , {
          required: "password is required!", 
        })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <Link
      to='/signup' 
      >
      <button> Dont Have An Account ? Signup Here!</button>
      </Link>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default Login