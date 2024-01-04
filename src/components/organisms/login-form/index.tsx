"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { LoginFormProps } from "@/types/types";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useLoginUser } from "@/api/mutations/login-user";
import { loginSchema } from "@/validation-schema";
import { useRouter } from "next/router";
import { UserRoutes } from "@/constants/routes";

export const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [view, setView] = useState(false);
  const router = useRouter();
  const methods = useForm({ resolver: yupResolver(loginSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const { mutate: loginuser } = useLoginUser();

  const onSubmit = (data: LoginFormProps) => {
    console.log("data", data); 
    loginuser(data, {
      onSuccess: () => {
        reset();
        // router.push(UserRoutes.PROPERTYLIST.absolutePath);
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors?.email && (
                <p className="text-[red] text-xs mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <div className="absolute right-4 top-[45px] cursor-pointer">
              {!view ? <BsEye onClick={()=> setView(true)} color="#555555" size={18} /> 
              : <BsEyeSlash onClick={()=> setView(false)} color="#555555" size={18} />}
              </div>
              <input
                type={!view ? "password" : "text"}
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors?.password && (
                <p className="text-[red] text-xs mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 px-5 rounded focus:outline-none focus:shadow-outline "
            >
              Log In
            </button>
          </form>
        </FormProvider>
        <div className="text-center mt-3 text-sm">
          <span>
            Not a member?{" "}
            <span
              onClick={handleLogin}
              className="text-black font-semibold cursor-pointer"
            >
              Register
            </span>
          </span>
        </div>
      </div>
    </main>
  );
};
