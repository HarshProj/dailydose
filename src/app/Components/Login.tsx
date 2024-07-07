import React from 'react'

export const Login = () => {
  return (
    <div className='flex flex-col bg-black items-center justify-center w-full h-screen'>
        <div className="flex flex-col backdrop-blur-sm">

        <h1 className="">Login</h1>
        <form className='h-[50vh] w-[50vh] flex flex-col justify-center items-center gap-10'>
            <div className="flex gap-12">

            <label htmlFor="name">Email:</label>
            <input type="email" className=' border w border-gray-500' />
            </div>
            <div className="flex gap-4">

            <label htmlFor="name">Password:</label>
            <input type="password" className='border border-gray-500' />
            </div>
        </form>
        </div>
    </div>
  )
}
