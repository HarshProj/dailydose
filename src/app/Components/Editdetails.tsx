import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Editdetails = () => {
    // const [token,setToken]=useState(false);
    
  const [user,setuser]=useState({work:""});
    const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('auth-token')){
      navigate('/')
    }
    // console.log(token);
  },[])
  const handleclick=async (e: React.FormEvent) => {
    e.preventDefault();
     const token = localStorage.getItem('auth-token');
    if (!token) {
        navigate('/');
        return;
    }
    const {work}=user;
    const post=await fetch('http://localhost:5000/api/auth/updateuser',{
        method:'post',
        headers:{
        'content-type':'application/json',
            'auth-token':token
        },
        body:JSON.stringify({work})
    })
   const {msg}=await post.json();
   if(msg){
    alert("Post saved");
    navigate('/');
   }
   else{
    console.log(msg);
    alert("error occured")
   }
  }
  const handlechange=(e:any)=>{
    setuser((prev:any)=>({
      ...prev,
      [e.target.name]:e.target.value,
    }))
    console.log(user);
  }
  return (
    <>
    <form action="" className='w-full h-[50vh] flex flex-col'>
        <div className="h-[10vh] flex items-center justify-between">
            <div className="text-xl font-medium ml-5">Create Post</div>
        <button className=' py-3 px-4 border-2 bg-teal-400 rounded bor mr-5' onClick={handleclick}>Post</button>
        </div>
        <input type="text" placeholder="What's going on ?" onChange={handlechange}name="work"  className='w-full  p-10 focus:outline-none' />
    </form>
    </>
  )
}
