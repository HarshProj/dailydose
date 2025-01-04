// "use client"
// import { headers } from 'next/headers';
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// export const Login = () => {
//   const [user,setuser]=useState({email:"",password:""});
//   const navigate=useNavigate();
//   const handlelogin=async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     console.log(user)
//     const data=await fetch('http://localhost:5000/api/auth/login',
//       {
//         method:'post',
//         headers:{
//         'content-type':'application/json'
//       },body:JSON.stringify(user)}
//     );
//     const token=await data.json();
//     const authtoken=token['auth-token'];
//     console.log(authtoken);
//     localStorage.setItem('auth-token',authtoken);
//     if(authtoken){
//       navigate('/');
//     }
//     else{
//       alert("Invalid credentials")
//     }
//   }
//   const handlechange=(e:any)=>{
//     setuser((prev:any)=>({
//       ...prev,
//       [e.target.name]:e.target.value,
//     }))
//     console.log(user);
//   }
//   return (
//     <div className='flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center w-full h-screen'>
//         <div className="flex  gap-14 flex-col items-center backdrop-blur-sm shadow-xl p-10 rounded-3xl bg-white/30">

//         <h1 className="text-2xl">Login</h1>
//         <form className='w-[60vh] flex flex-col justify-center items-center gap-10'>
//             <div className="flex gap-12 items-center ">

//             <label htmlFor="name" >Email:</label>
//             <input type="email" onChange={handlechange}  id='name' name='email' className=' pr-8 p-2 rounded ' />
//             </div>
//             <div className="flex gap-4 items-center">

//             <label htmlFor="password">Password:</label>
//             <input type="password"id='password' name='password' onChange={handlechange}  className=' pr-8 p-2 rounded ' />
//             </div>
//             <div className="">
//                 <button type="submit" onClick={handlelogin} className='border border-gray-500 p-3 rounded hover:bg-sky-200 ease-in duration-300'>Submit</button>
//             </div>
//                 <div className="">
//                     <span >Dont'have account?</span><Link to="/Signup" className='text-red-500 ml-2 hover:underline  '>Signup</Link>
//                 </div>
//         </form>
//         </div>
//     </div>
//   )
// }
