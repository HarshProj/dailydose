import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
import {Heart} from "@phosphor-icons/react";
interface User {
  name: string;
  work: string;
  _id: string;
  image:string
}

interface Post {
  description: string;
  username: string;
  userid: string;
  likes: string[];
  date: string;
}
export const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [like, setLike] = useState(false);
  const [user, setUser] = useState(false);
  const [imgc, setImgc] = useState(false);
  const [pic,setPic]=useState('');
  const [url,setUrl]=useState('');
  const [data, setData] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const [del,setdel]=useState(true);
  const [uid,setuid]=useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
    fetchallposts();
    // console.log(posts)
  }
    else{
      navigate('/');
    }
    getuser();
    
  },[])
  useEffect(()=>{
    fetchallposts();
  },[like,del])
  useEffect(()=>{
    // if(data?.image){
      getuser();
      console.log("clicked")
    // }
  },[imgc])
  const getuser=async()=>{
    const jwt=localStorage.getItem('auth-token');
    if(jwt){
    const data=await fetch(`http://localhost:5000/api/auth/getuser/${id}`,{
      headers:{
        'content-type':'application/json',
           'auth-token':jwt
      }
    })
    const {info,diff,ui}=await data.json();
    setData(info);
    // console.log(info,info.image)
    if(diff){
      setUser(true)
      setuid(ui);
    }
    else{
    setUser(false);
    setuid(info._id);
    }
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
      .filter((fil:any) => fil.userid === id)
      .sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());;
      setPosts(filter);
      console.log(filter);
      // setuser(filter[0].username);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  const liked=async(id:any)=>{
    // e.preventDefault();
    const token = localStorage.getItem('auth-token');
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
    setLike(!like);
  }
}
  const logout=()=>{
    if(localStorage.getItem('auth-token')){
      localStorage.removeItem('auth-token');
      navigate('/')
    }
  }
  const deletepost=async(id:string)=>{
    const token = localStorage.getItem('auth-token');
    // console.log(id);
   if (token) {
       
   const post=await fetch(`http://localhost:5000/api/post/deletepost/${id}`,{
       method:'delete',
       headers:{
       'content-type':'application/json',
           'auth-token':token
       },
   })
  const {data}=await post.json();
   console.log(data);
  }
  }
  const handlesubmit=()=>{
    setImgc(!imgc);
  }
  useEffect(()=>{
    if(url)
    handleimg();
  },[url])
  const handleimg=async()=>{
    const token = localStorage.getItem('auth-token');
    if (!token) {
        navigate('/');
        return;
    }
    const post=await fetch('http://localhost:5000/api/auth/updateuser',{
      method:'post',
      headers:{
      'content-type':'application/json',
          'auth-token':token
      },
      body:JSON.stringify({image:url})
  })
 const {msg}=await post.json();
    console.log(msg) 
    if(msg){
      alert("Updated");
      navigate(`/profile/${data?._id}`);
     }
     else{
      console.log(msg);
      alert("error occured")
     }
  }
  const uploadpic = async (e: any) => {
    e.preventDefault();
    console.log(pic);
    const data1 = new FormData();
    data1.append("file", pic);
    data1.append("upload_preset", "e-comm");
    data1.append("cloud_name", "dnjtwhe9o");
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dnjtwhe9o/image/upload", {
        method: "post",
        body: data1,
      });
      
      if (!response.ok) {
        throw new Error('Error uploading image to Cloudinary');
      }
  
      const result = await response.json();
      setUrl(result.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };
  const loadFile = (event:any) => {
    var output = document.getElementById('output'); 
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }
  return (
    <div className='relative flex w-full h-full flex-col items-center '>
      {/* <a href="/hello/">goto</a> */}
      {imgc?
      <div className="absolute w-full h-full flex  justify-center z-10  backdrop-blur-sm cursor-pointer " >
        
        <div className="w-[40vh] h-[40vh] mt-[20vh] rounded-full bg-slate-300 cursor-pointer  "><div className="absolute w-7 ml-auto" onClick={handlesubmit}>X</div> 
          <img  className='w-full h-full rounded-full ' id='output' src={data?.image} alt="" />
        {!user?<form action="" className='w-full h-full flex flex-col items-center justify-center gap-2'>
          <input type="file" accept='image/*' 
            onChange={
              (event:any) => {
                loadFile(event)
                setPic(event.target.files[0])
              }} className='text-sm w-full' />
          <button onClick={uploadpic}>Submit</button>
          
        </form>:""}
        </div>

      </div>
        :""}
        <div className="w-[60%] h-full flex-col flex shadow-lg">
            <div className="">

            <div className="relative h-[30vh]">
            {user?"":<div className=" absolute top-2 right-5">
                <button className='py-2 px-4 text-sm bg-gray-400 rounded-2xl'  onClick={logout}>Logout</button></div>}
           <div className="h-[20vh] bg-slate-300 "></div>
            <div className="absolute bottom-0 left-8 w-[20vh] h-[20vh] flex items-center justify-center rounded-full shadow-sm border cursor-pointer" onClick={handlesubmit}>
              {data?.image?<img src={data?.image} alt="relode" className='w-[20vh] h-[20vh]  rounded-full hover:border-red-400  border-2 transition-all duration-300' />:""}
            </div>
           {user?"": <div className=" absolute bottom-2 right-5">
                <button className='py-2 px-4 text-sm bg-gray-400 rounded-2xl' onClick={()=>{navigate('/updateuser')}}>edit </button></div>}
            </div>

        </div>
        <div className="pt-5 pl-5">
        <div className=" h-[20vh] flex flex-col gap-3">
          
          <div className="text-3xl">{data?.name}</div>
          <div className="text-lg ">{(data?.work)}.</div>
        </div>
          </div>
        <div className=" h-full flex-col flex s">
      {posts.map((e:any)=>(
    <div className="pt-5 pl-5 border w-full h-full mt-5 relative" >
      
      {user?"":<div className=" absolute top-2 right-5">
        <button className='py-2 px-4 text-sm bg-gray-400 rounded-2xl' onClick={()=>{deletepost(e._id);setdel(!del)}}>delete</button></div>}
      <div className="w-full h-10">{e.username}</div>
      <div className="w-full h-20 ">{e.description}</div>
      <div className="h-10 flex">
      { e.likes.find((person:any) => person === uid)?<div className="cursor-pointer" onClick={()=>liked(e._id)}><Heart size={20} color='#ef4444' weight='fill' /></div>:<div className="cursor-pointer" onClick={()=>liked(e._id)}><Heart size={20} /></div>}
      <div className="ml-1" key={e.likes.length}>{e.likes.length}</div>
      </div>
        
    </div>
      
      
      ))}
      
        </div>
            </div>
    </div>
  )
}
