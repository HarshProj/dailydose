import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
interface User {
  name: string;
  work: string;
}

interface Post {
  _id: string;
  userid: string;
  username: string;
  description: string;
  likes: any[];
}
export const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [like, setLike] = useState(false);
  const [user, setUser] = useState('');
  const [data, setData] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
    fetchallposts();
    console.log(posts)}
    else{
      navigate('/');
    }
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
    setData(info);
  }
  }
  const fetchallposts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/post/getposts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filter =data.filter((fil:any)=>fil.userid==id);
      setPosts(filter);
      // setuser(filter[0].username);
      setUser(filter[0].username);
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
    setLike(!like);
  }
}
  const logout=()=>{
    if(localStorage.getItem('auth-token')){
      localStorage.removeItem('auth-token');
      navigate('/')
    }
  }
  return (
    <div className='flex w-full h-full flex-col items-center '>
        <div className="w-[60%] h-full flex-col flex shadow-lg">
            <div className="">

            <div className="relative h-[30vh]">
            <div className=" absolute top-2 right-5">
                <button className='py-2 px-4 text-sm bg-gray-400 rounded-2xl' onClick={logout}>Logout</button></div>
           <div className="h-[20vh] bg-slate-300 "></div>
            <div className="absolute bottom-0 left-8 w-[20vh] h-[20vh] rounded-full border "></div>
            <div className=" absolute bottom-2 right-5">
                <button className='py-2 px-4 text-sm bg-gray-400 rounded-2xl'><Link to='/updateuser'></Link> edit</button></div>
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
    <div className="pt-5 pl-5 border w-full h-full mt-5">
      <div className="w-full h-10">{e.username}</div>
      <div className="w-full h-20 ">{e.description}</div>
      <div className="h-10 flex">
        <div className="">{e.likes.length}</div>
         
        <div className="ml-2 cursor-pointer" onClick={()=>liked(e._id)}>Likes</div>
      </div>
        
    </div>
      ))}
        </div>
            </div>
    </div>
  )
}
