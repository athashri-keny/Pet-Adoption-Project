import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Navbar() {
  const Authstatus = useSelector((state) => state.Auth.status) // checking the current state of the user

const NavItem = [
  {
    name: "home",
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
   name: "Addpost",
   link: "/add-post",
   active: Authstatus
  },
  {
    name: "Your Post",
    link: "/post",
    active: Authstatus
  }
]

  return (
    <>
    <div className="w-full bg-blue-800 flex justify-end text-white p-4 space-x-4">
      {NavItem.map((item , index) =>
      item.active && (
        <Link
        key={index}
        to={item.link}
        className='text-base bg-blue-400 px-4 py-2 rounded-3xl hover:bg-blue-500 transition'
        >
          {item.name}
        </Link>
      )
      )}  
 </div>
{Authstatus && (
  <li>
   <button>
    Logout
   </button>
  </li>
)}

    </>
  )
}

export default Navbar