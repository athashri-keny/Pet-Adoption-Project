import React from 'react'
import Button from '../Container/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logout } from '../../Store/authSlice'

function Logout() {
const dispatch = useDispatch()
const [error , seterror] = useState("")
const navigate = useNavigate()

const handleLogout =  async() => {
    seterror("")
        const user = await AuthService.GetCurrentUser()
        console.log("Current user" , user)
try {
 await AuthService.LogoutUser()
    dispatch(logout())
     console.log("User Loggout Sucessfully!")
} catch (error) {
    console.error( "error while logging out" , error)
}
}

  return (
  <button onClick={handleLogout} className="bg-white hover:bg-red-500 rounded-4xl p-2 transition duration-300">
  Logout
</button>

  )
}

export default Logout