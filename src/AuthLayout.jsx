import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function AuthLayout({children , authentication = true}) {
const AuthStatus = useSelector((state) => state.Auth.status ) // true or false 
const navigate = useNavigate()
const [loader , setloader] = useState(true)

// the user is not login
  useEffect(() => {
    if (authentication && !AuthStatus) { 
      navigate("/login")
    } else if (!authentication && AuthStatus) {
      navigate("/") // user is logged in 
    }
    setloader(false)
  }, [authentication, AuthStatus, navigate])


  return (
   loader ? <h1>loading... </h1>: <>{children}</>
  ) 
}

export default AuthLayout