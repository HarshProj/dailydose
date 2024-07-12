import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  const [token,setToken]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
      setToken(true);
    }
    else{
      setToken(false);
    }
    console.log(token);
  },[token])
  const logout=()=>{
    // if(localStorage.getItem('auth-token')){
      localStorage.removeItem('auth-token');
      setToken(!token);
    // }
  }
  return (
      <ul className=' pl-6 flex gap-5  items-center border-1 shadow-md w-[60%] h-24'>
        <li>Home</li> 
        <li>about</li> 
        {token?(<><li onClick={logout} className='cursor-pointer'>Logout</li><li ><Link to="/createpost"> create post</Link> </li></>) :(<li><Link to={'/Login'}>Login</Link>/<Link to={'/Signup'}>Signup</Link></li>) }
        
      </ul>
  )
}
