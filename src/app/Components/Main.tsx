import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'

export const Main = () => {
  const [posts,setPosts]=useState([]);
  const [like,setLike]=useState(false);
  useEffect(()=>{
    fetchallposts();
    console.log(posts)
  },[])
  useEffect(()=>{
    fetchallposts();
  },[like])
  const fetchallposts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/post/getposts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setPosts(data);
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
  return (
    <div className='flex w-full h-full flex-col items-center '>
    <Navbar/>
    <div className="w-[60%] h-full flex-col flex shadow-lg">
      {posts.map((e:any)=>(
    <div className="pl-3 border w-full h-full mt-5">
      <div className="w-full h-10" key={e.username}>{e.username}</div>
      <div className="w-full h-20 " key={e.description}>{e.description}</div>
      <div className="h-10 flex">
        <div className="" key={e.likes.length}>{e.likes.length}</div>
         
        <div className="ml-2 cursor-pointer" onClick={()=>liked(e._id)}>Likes</div>
        
      </div>
    </div>
      ))}
    </div>
    </div>
  )
}
