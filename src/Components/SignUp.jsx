import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link,  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthService from '../appwrite/Auth'
import { login } from '../Store/authSlice'


function SignUp() {
const {register , handleSubmit , formState:{errors}} = useForm()
const navigate = useNavigate()
const dispatch = useDispatch()
const [error , seterror] = useState("")


const handlesignup =  async(data) => {
  try {
    seterror("")
    const userdata = await AuthService.CreateAccount(data)
    console.log("user signup Sucessfully" , userdata)
 if (userdata) {
     dispatch(login(data)) // updating the Store
     navigate('/')
 }
  } catch (error) {
    seterror(error.message)
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
    <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>
    <form className="space-y-5" onSubmit={handleSubmit(handlesignup)}>
     <input
  type="email"
  placeholder="Enter your Email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address"
    }
  })}
  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
    {errors.email && (
      <p style={{color: "red"}}>{errors.message}</p>
    )}
      <input
        type="password"
        placeholder="Enter your Password"
        {...register("password" , {
          required: "Password is required"
        })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && (
        <p style={{color: "red"}}>{errors.message}</p>
      )}
     <Link to={'/login'}>
      <button>Already Have An Account? Login</button>
     </Link>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Create Account
      </button>
    </form>
  </div>
</div>
  )
}

export default SignUp