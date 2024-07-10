import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
      <ul className=' pl-6 flex gap-5  items-center border-1 shadow-md w-[60%] h-24'>
        <li>Home</li> 
        <li>about</li> 
        <li><Link to={'/Login'}>Login</Link>/<Link to={'/Signup'}>Signup</Link></li> 
        <li ></li> 
      </ul>
  )
}
