import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Container/Button'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'


function Navbar() {
  const Authstatus = useSelector((state) => state.Auth.status) // checking the current state of the user

const NavItem = [
  {
    name: "Home",
    link: "/",
    active: true
  }, // if the user is not logged in 
  {
    name: "Login",
    link: "/login",
    active: !Authstatus
  },
  {
    name: "Signup",
    link: "/signup",
    active: !Authstatus
  },
  // if the user is loggin 
  {
   name: "Post a Pet ",
   link: "/add-post",
   active: Authstatus
  },
  {
    name: "Your Puppies",
    link: "/your-posts",
    active: Authstatus
  },
  {
    name: "Puppies",
    link: '/puppies',
    active: Authstatus || !Authstatus
  }
]

  return (
    <>
    <div className="w-full font-rubik bg-white py-6 px-10 flex items-center justify-between shadow-md">  
    <div className="text-2xl font-bold text-yellow-500 font-rubik">
      Tailwag
    </div>
    <div className="space-x-4">
      {NavItem.map((item, index) =>
        item.active && (
        <NavLink
  key={index}
  to={item.link}
  className={({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
      isActive ? "text-yellow-400 px-4 py-2 rounded-full text-sm " : "text-black"
    } hover:bg-yellow-500 hover:text-white`
  }
>
  {item.name}
</NavLink>
        )
      )}
    </div>
    <div>
      {Authstatus && <Logout />}
    </div>

  </div>
</>
  )
}

export default Navbar