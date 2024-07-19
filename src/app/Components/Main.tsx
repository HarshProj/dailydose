import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom';
import {Heart} from "@phosphor-icons/react";
export const Main = () => {
  const [posts,setPosts]=useState([]);
  const [like,setLike]=useState(false);
  const [uid,setuid]=useState('');
  const [ai,setAi]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    fetchallposts();
    console.log(posts)
    getuser();
  },[])
  useEffect(()=>{
    fetchallposts();
  },[like])
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
    setuid(info._id);
  }
  }
  const fetchallposts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/post/getposts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filter = data
      .sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());;
      setPosts(filter);
      console.log(filter)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const liked=async(e:any)=>{
    // e.preventDefault();
    const token = localStorage.getItem('auth-token');
    const id=e;
    console.log(id);
   if (token) {
       
   const post=await fetch(`http://localhost:5000/api/post/like/${id}`,{
       method:'post',
       headers:{
       'content-type':'application/json',
           'auth-token':token
       },
   })
  const {liked}=await post.json();
  // if(liked){
    setLike(!like);
  // }
  // else{
    // setLike(false);
    
  // }
  }
}
const profile=(id:any)=>{
  if(localStorage.getItem('auth-token')){

    navigate(`/profile/${id}`)
  }
}
const handleai=()=>{
  if(localStorage.getItem('auth-token'))
  setAi(!ai);
}
  return (
    <div className=' relative flex w-full h-full flex-col items-center '>
    <Navbar/>
    <div className="w-[60%] h-full flex-col flex shadow-lg">
      {posts.map((e:any)=>(
    <div className="pl-3 border w-full h-full mt-5 ">
      <div className="w-full h-10 cursor-pointer" onClick={()=>{profile(e.userid)}} key={e.username}>{e.username}</div>
      {/* {new Date(e.date).toLocaleDateString()} */}
      <div className="w-full h-20 " key={e.description}>{e.description}</div>
      <div className="h-10 flex items-center w-full relative">
        {/* <div className="cursor-pointer" onClick={()=>liked(e._id)}><Heart size={20} color='#ef4444' weight='fill' /></div> */}
        { e.likes.find((person:any) => person === uid)?<div className="cursor-pointer" onClick={()=>liked(e._id)}><Heart size={20} color='#ef4444' weight='fill' /></div>:<div className="cursor-pointer" onClick={()=>liked(e._id)}><Heart size={20} /></div>}
        <div className="ml-1" key={e.likes.length}>{e.likes.length}</div>
         
        <div className=" h-10 text-sm text-zinc-400 ml-auto mr-3 ">{new Date(e.date).toLocaleTimeString()}</div>
      </div>
    </div>
      ))}
    </div>
    <div className="sticky ml-auto mr-10 bottom-5 h-full"> 
      {ai?<div className="h-[80vh] w-64 border">
        <div className="w-full h-[88%] ">
          <h3 className='h-[10%]'>Chat</h3>
          <div className="w-full p-3 h-[90%] border overflow-y-scroll ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis eligendi numquam laboriosam dicta animi quae eius. Maiores reprehenderit, cum esse explicabo atque ex dolor libero provident exercitationem vel molestiae maxime incidunt rerum dolorum alias saepe, tenetur quis. Recusandae commodi deserunt officia illo, ipsam optio a saepe repudiandae sed ratione! Obcaecati ab ducimus reprehenderit beatae vel.djbfdksdbvs.</div>
        </div>
        <form action="" className='flex gap-1'>
          <input type="text" placeholder='Enetr Your querry here' className='w-[80%] p-3' />
          <button className='bg-lime-400 w-[20%]'>Send</button>
        </form>
      </div>:""}
      <div className="flex justify-end w-full">
        <button className=" rounded-full p-2 bg-gray-500" onClick={handleai}>AI</button>
        </div>
      </div>
    </div>
  )
}
