"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });

  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, name, password, cpassword } = user;

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      const result = await response.json();

      if (response.ok) {
        const authToken = result["auth-token"];
        if (authToken) {
          localStorage.setItem("auth-token", authToken);
          router.push("/");
        }
      } else {
        alert(result.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center w-full h-screen">
      <div className="flex flex-col gap-8 items-center backdrop-blur-sm shadow-xl p-10 rounded-3xl bg-white/30">
        <h1 className="text-2xl font-semibold">Signup</h1>
        <form
          className="w-[60vh] flex flex-col justify-center items-center gap-6"
          onSubmit={handleSignup}
        >
          <div className="flex gap-6 items-center">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              id="name"
              className="p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-6 items-center">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              className="p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-6 items-center">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={handleChange}
              id="password"
              name="password"
              className="p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-6 items-center">
            <label htmlFor="cpassword">Confirm Password:</label>
            <input
              type="password"
              onChange={handleChange}
              id="cpassword"
              name="cpassword"
              className="p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="border border-gray-500 p-3 rounded hover:bg-sky-200 transition duration-300"
          >
            Submit
          </button>
        </form>

        <div>
          <span>Already have an account?</span>
          <Link href="/Login" className="text-red-500 ml-2 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
