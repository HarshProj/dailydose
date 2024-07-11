import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'

export const Main = () => {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    fetchallposts();
    console.log(posts)
  },[])
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
  return (
    <div className='flex w-full h-full flex-col items-center '>
    <Navbar/>
    <div className="w-[60%] h-full flex-col flex ">
      {posts.map((e:any)=>(
    <div className="ml-3 w-full h-full mt-5">
      <div className="w-full h-10">{e.username}</div>
      <div className="w-full h-20 ">{e.description}</div>
      <div className="h-12">
        {e.likes.length}
      </div>
    </div>
      ))}
    </div>
    </div>
  )
}
