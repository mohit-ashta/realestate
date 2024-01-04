"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { SignUpFormProps } from "@/types/types";
import { useAddNewUser } from "@/api/mutations/add-new-user";
import { signUpSchema } from "@/validation-schema";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignup }) => {
  const [view, setView] = useState(false);
  const methods = useForm({ resolver: yupResolver(signUpSchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const { mutate: addUser, data: response } = useAddNewUser();

  const onSubmit = (data: SignUpFormProps) => {
    addUser(data, {
      onSuccess: () => {
        reset();
        if (handleSignup) {
          handleSignup();
        }
      },
    }); 
  };
  

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors?.name && (
                <p className="text-[red] text-xs mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>
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
              Sign Up
            </button>
          </form>
        </FormProvider>
        <div className="text-center mt-3 text-sm">
          <span>
            Already have account?{" "}
            <span
              onClick={handleSignup}
              className="text-black font-semibold cursor-pointer"
            >
              Login
            </span>
          </span>
        </div>
      </div>
    </main>
  );
};
