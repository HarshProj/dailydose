"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const jwt = localStorage.getItem('auth-token');
    if (jwt) {
      setToken(true);
      getuser(jwt);
    } else {
      setToken(false);
    }
  }, []);

  const getuser = async (jwt: string) => {
    try {
      const res = await fetch(`${backendurl}/api/auth/getuser`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': jwt,
        },
      });
      const info = await res.json();
      if (info._id) setId(info._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const profile = () => {
    if (token && id) {
      router.push(`/Profile/${id}`);
    }
  };

  return (
    <ul className="pl-6 flex gap-5 items-center border-1 shadow-md w-[60%] max-sm:w-[95%] h-24">
      <li>Home</li>
      <li>About</li>

      {token ? (
        <>
          <li onClick={profile} className="cursor-pointer">Profile</li>
          <li><Link href="/Create">Create Post</Link></li>
        </>
      ) : (
        <li>
          <Link href="/Login">Login</Link> / <Link href="/Signup">Signup</Link>
        </li>
      )}
    </ul>
  );
};
