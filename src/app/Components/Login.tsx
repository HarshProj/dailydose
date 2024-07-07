import React from 'react'

export const Login = () => {
  return (
    <div className='flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center w-full h-screen'>
        <div className="flex  gap-14 flex-col items-center backdrop-blur-sm shadow-xl p-10 rounded-3xl bg-white/30">

        <h1 className="text-2xl">Login</h1>
        <form className='w-[60vh] flex flex-col justify-center items-center gap-10'>
            <div className="flex gap-12 items-center ">

            <label htmlFor="name" >Email:</label>
            <input type="email" id='name' className=' pr-8 p-2 rounded ' />
            </div>
            <div className="flex gap-4 items-center">

            <label htmlFor="password">Password:</label>
            <input type="password"id='password'  className=' pr-8 p-2 rounded ' />
            </div>
            <div className="">
                <button type="submit" className='border border-gray-500 p-3 rounded hover:bg-sky-200 ease-in duration-300'>Submit</button>
            </div>
                <div className="">
                    <span >Dont'have account?</span><a href=""className='text-red-500 ml-2 hover:underline  '>Signup</a>
                </div>
        </form>
        </div>
    </div>
  )
}
