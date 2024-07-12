import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [user,setuser]=useState({email:"",password:"",name:"",cpassword:""});
  const navigate=useNavigate();
  const handlesignup=async (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log(user);
    const {email,name,password,cpassword}=user;
    if(password===cpassword){
    const data=await fetch('http://localhost:5000/api/auth/createuser',
      {
        method:'post',
        headers:{
        'content-type':'application/json'
      },body:JSON.stringify({email,name,password})}
    );
    const token=await data.json();
    const authtoken=token['auth-token'];
    console.log(authtoken);
    localStorage.setItem('auth-token',authtoken);
  
    if(authtoken){
      navigate('/');
    }
    else{
      alert("Invalid credentials")
    }
  }
  else{
    alert("Password did not matched")
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
    <div className='flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center w-full h-screen'>
        <div className="flex  gap-14 flex-col items-center  backdrop-blur-sm shadow-xl p-10 rounded-3xl bg-white/30">

        <h1 className="text-2xl">Signup</h1>
        <form className='w-[60vh] flex flex-col justify-center items-center gap-10'>
            <div className="flex gap-12 items-center ">

            <label htmlFor="name" >Name:</label>
            <input type="email" onChange={handlechange}  name='name' id='name' className=' pr-8 p-2 rounded ' />
            </div>
            <div className="flex gap-12 items-center ">

            <label htmlFor="name" >Email:</label>
            <input type="email" onChange={handlechange} name='email' id='name' className=' pr-8 p-2 rounded ' />
            </div>
            <div className="flex gap-4 items-center">

            <label htmlFor="password">Password:</label>
            <input type="password" onChange={handlechange} id='password' name='password'  className=' pr-8 p-2 rounded ' />
            </div>
            <div className="flex gap-4 items-center">

            <label htmlFor="cpassword">Confirm Password:</label>
            <input type="password" onChange={handlechange} id='cpassword' name='cpassword'  className=' pr-8 p-2 rounded ' />
            </div>
            <div className="">
                <button type="submit" onClick={handlesignup} className='border border-gray-500 p-3 rounded hover:bg-sky-200 ease-in duration-300'>Submit</button>
            </div>
                <div className="">
                    <span >Already have one?</span><Link to="/Login" className='text-red-500 ml-2 hover:underline  '>Login</Link>
                </div>
        </form>
        </div>
    </div>
  )
}
