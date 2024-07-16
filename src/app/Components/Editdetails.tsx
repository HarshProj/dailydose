import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface User {
    name: string;
    work: string;
    _id:string
  }
  
export const Editdetails = () => {
    const [data, setData] = useState<User | null>(null);
  const [user,setuser]=useState({work:""});
    const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('auth-token')){
      navigate('/')
    }
    // console.log(token);
    getuser();
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
    setData(info);
    setuser({work:info.work})
  }
  }
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
    alert("Updated");
    navigate(`/profile/${data?._id}`);
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
            <div className="text-xl font-medium ml-5">Add details</div>
        <button className=' py-3 px-4 border-2 bg-teal-400 rounded bor mr-5' onClick={handleclick}>Post</button>
        </div>
        <input type="text" placeholder="What's going on ?" onChange={handlechange}name="work" value={user.work} className='w-full  p-10 focus:outline-none' />
    </form>
    </>
  )
}
