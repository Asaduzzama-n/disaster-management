/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import Link from "next/link";

type SignUpFormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type FormValue = SignUpFormValues & LoginFormValues;

type FormProps = {
  isSignUp?: boolean;
  onSubmit: (data: SignUpFormValues | LoginFormValues) => void;
  schema: any;
};

export const AuthForm: React.FC<FormProps> = ({
  isSignUp,
  onSubmit,
  schema,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-4/5 md:w-[420px] rounded-md mx-auto p-4 bg-bg dark:bg-bgd "
    >
      <div>
        {isSignUp ? (
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            SIGN UP
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-primary text-center my-5">
            Login
          </h2>
        )}
      </div>
      {isSignUp && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm "
              placeholder="First Name"
            />
            <small className="text-red-500 ">{errors.firstName?.message}</small>
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Last Name"
            />
            <small className="text-red-500 ">{errors.lastName?.message}</small>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
          placeholder="example@gmail.com"
          type="email"
        />
        <small className="text-red-500 ">{errors.email?.message}</small>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          {...register("password")}
          className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm "
          placeholder="Password"
          type="password"
        />
        <small className="text-red-500 ">{errors.password?.message}</small>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-40 bg-primary/15 p-2 mt-5  font-semibold text-primary rounded-sm"
        >
          {isSignUp ? "Signup" : "Login"}
        </button>
      </div>

      <div className="flex items-center justify-center">
        {isSignUp ? (
          <small className="font-medium">
            Already have an account?{" "}
            <Link className="text-primary ml-1" href={"/login"}>
              Login
            </Link>
          </small>
        ) : (
          <small className="font-medium">
            Don't have an account?
            <Link className="text-primary ml-1" href={"/signup"}>
              Signup
            </Link>
          </small>
        )}
      </div>
    </form>
  );
};
