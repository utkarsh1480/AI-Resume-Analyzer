import React from 'react'
import { useForm} from "react-hook-form"
import { Link } from 'react-router-dom';
import { z } from "zod";
import {zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useAuth } from '../Hooks/Auth.hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Circles } from "react-loader-spinner";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Login() {

  const navigate = useNavigate();
     
  const {isLoading, handlelogin} = useAuth();
    const {
    register,handleSubmit,formState: { errors }} = useForm({
      resolver: zodResolver(loginSchema)
    });
  
  const onSubmit = async (data) => {
    try {
      await handlelogin(data)
      toast.success("Login successful", {
         duration: 3000 ,
        style: {
        background: "white",
        border: "5px solid black",    
        color: "green"
        }
        });
      navigate('/');
    } catch (error) {
      toast.error("Invalid email or password", {
         duration: 3000 ,
        
        style: {
        background: "red",
        color: "white",
        border: "5px solid black",
        }
        });
      // console.error(error);
    }
  };
//    if (isLoading) {
//     return (
//         <div>
//             <h1>Loading...</h1>
//         </div>
//     );
// }
if (isLoading) {
  return (
   <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
>
  <Circles
    height="40"
    width="40"
    color="#4fa94d"
    visible={true}
  />
</div>
  );
} else{
  return (
  <div className="min-h-screen bg-[#111113] flex items-center justify-center px-6">
    <div className="w-full max-w-xl">

      <h1 className="text-white text-7xl font-extrabold mb-16">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10"
      >

        {/* Email */}

        <div>
          <label className="block text-white text-3xl font-semibold mb-5">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
            {...register("email")}
            className="
              w-full
              h-24
              rounded-3xl
              bg-white
              px-10
              text-3xl
              text-gray-700
              placeholder:text-gray-400
              outline-none
              focus:ring-4
              focus:ring-pink-500/30
            "
          />

          {errors.email && (
            <p className="text-red-400 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="block text-white text-3xl font-semibold mb-5">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            {...register("password")}
            className="
              w-full
              h-24
              rounded-3xl
              bg-white
              px-10
              text-3xl
              text-gray-700
              placeholder:text-gray-400
              outline-none
              focus:ring-4
              focus:ring-pink-500/30
            "
          />

          {errors.password && (
            <p className="text-red-400 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}

        <button
          type="submit"
          className="
            w-full
            h-24
            rounded-3xl
            bg-[#ff2b6d]
            hover:bg-pink-600
            text-white
            text-3xl
            font-bold
            transition
            duration-300
            shadow-lg
            shadow-pink-500/30
          "
        >
          Login
        </button>

      </form>

      <p className="text-center text-gray-400 text-2xl mt-10">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#ff2b6d] font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

    </div>
  </div>
)
}
}

export default Login