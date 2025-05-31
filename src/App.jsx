
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Header/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthService from './appwrite/Auth'
import { login, logout } from './Store/authSlice'


function App() {
const [loading , setloading] = useState("")
const dispatch = useDispatch()

useEffect(() => {
  try {
      AuthService.GetCurrentUser()
   .then((userdata)=> {
    if(userdata){
      dispatch(login(userdata))
    } else {
      dispatch(logout())
    }
   })
   .finally(() => setloading(false))
  } catch (error) {
    console.log("Error while fetching the  current user" , error)
  }
}
 , [])

  return !loading ? (

<div>
  <div>
    <Navbar/>
  </div>
  <main>
    <Outlet/>
  </main>
</div>

   ): null 
}

export default App
