// import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate=useNavigate();
  const [token,setToken]=useState(false);
  const [id,setId]=useState();
  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
      setToken(true);
      // getuser();
      
    }
    else{
      setToken(false);
    }
    // console.log(token,id);
  },[token])
  useEffect(()=>{
    // console.log(id);
    getuser()
  },[])
  const getuser=async()=>{
    const jwt=localStorage.getItem('auth-token');
    if(jwt){
    const data=await fetch("http://localhost:5000/api/auth/getuser",{
      headers:{
        'content-type':'application/json',
           'auth-token':jwt
      }
    })
    const info=await data.json();
    console.log(info)
    setId(info._id);
  }
  }
  const profile=()=>{
    if(localStorage.getItem('auth-token')){

      navigate(`/profile/${id}`)
    }
  }
  
  return (
    
      <ul className=' pl-6 flex gap-5  items-center border-1 shadow-md w-[60%] h-24'>
        <li>Home</li> 
        <li>about</li> 
        
        {token?(<><li onClick={profile} className='cursor-pointer'>profile</li><li ><Link to="/createpost"> create post</Link> </li></>) :(<li><Link to={'/Login'}>Login</Link>/<Link to={'/Signup'}>Signup</Link></li>) }
        
      </ul>
  )
}
