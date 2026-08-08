
import React from 'react'
import { useForm} from "react-hook-form"
import { Link } from 'react-router-dom';
import { z } from "zod";
import {zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '../Hooks/Auth.hooks';
import { useNavigate } from 'react-router-dom';
import { Circles } from "react-loader-spinner";

const registerSchema = z.object({
  Username: z.string().min(2, "Username must be at least 2 characters").max(100, "Username must be less than 100 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Register() {

      const navigate = useNavigate();
     const {isLoading, handleregister} = useAuth();

     const {
        register,handleSubmit,formState: { errors }} = useForm({
          resolver: zodResolver(registerSchema)
        });
    
      const onSubmit = async(data) => {
        try {
          await handleregister(data);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };
    
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
}
 return (
  <div className="min-h-screen bg-[#111113] flex items-center justify-center px-6 py-10">
    <div className="w-full max-w-xl">

      {/* Heading */}

      <h1 className="text-white text-7xl font-extrabold mb-14">
        Register
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* Username */}

        <div>
          <label className="block text-white text-3xl font-semibold mb-4">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            {...register("Username")}
            className="
              w-full
              h-24
              rounded-[30px]
              bg-white
              px-10
              text-2xl
              text-gray-700
              placeholder:text-gray-400
              outline-none
              transition-all
              focus:ring-4
              focus:ring-pink-500/30
            "
          />

          {errors.Username && (
            <p className="text-red-400 mt-2">
              {errors.Username.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="block text-white text-3xl font-semibold mb-4">
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
              rounded-[30px]
              bg-white
              px-10
              text-2xl
              text-gray-700
              placeholder:text-gray-400
              outline-none
              transition-all
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
          <label className="block text-white text-3xl font-semibold mb-4">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            autoComplete="new-password"
            {...register("password")}
            className="
              w-full
              h-24
              rounded-[30px]
              bg-white
              px-10
              text-2xl
              text-gray-700
              placeholder:text-gray-400
              outline-none
              transition-all
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

        {/* Register Button */}

        <button
          type="submit"
          className="
            w-full
            h-24
            rounded-[30px]
            bg-[#ff2b6d]
            hover:bg-[#ff1460]
            text-white
            text-3xl
            font-bold
            transition-all
            duration-300
            hover:scale-[1.02]
            shadow-lg
            shadow-pink-500/30
          "
        >
          Register
        </button>

      </form>

      {/* Footer */}

      <p className="text-center text-gray-400 text-2xl mt-10">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#ff2b6d] font-semibold hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}

export default Register