"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Next.js Link

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetch(`${backendurl}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    
    const token = await data.json();
    const authToken = token["auth-token"];
    localStorage.setItem("auth-token", authToken);
    
    if (authToken) {
      router.push("/"); // ✅ Next.js navigation
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center w-full h-screen">
      <div className="flex gap-14 flex-col items-center backdrop-blur-sm shadow-xl p-10 rounded-3xl bg-white/30">
        <h1 className="text-2xl">Login</h1>
        <form className="w-[60vh] flex flex-col justify-center items-center gap-10">
          <div className="flex gap-12 items-center">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="pr-8 p-2 rounded" onChange={handleChange} />
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="pr-8 p-2 rounded" onChange={handleChange} />
          </div>
          <button type="submit" onClick={handleLogin} className="border border-gray-500 p-3 rounded hover:bg-sky-200 ease-in duration-300">
            Submit
          </button>
          <div>
            <span>Don't have an account?</span>
            <Link href="/Signup" className="text-red-500 ml-2 hover:underline">Signup</Link> {/* ✅ Next.js Link */}
          </div>
        </form>
      </div>
    </div>
  );
}
