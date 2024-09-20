"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AuthForm } from "@/components/auth-form";
import { instance } from "@/lib/axios";
import { signinSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type loginFormValues = {
  password: string;
  email: string;
};

export default function Login() {
  const { login, error } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      throw new Error("Something went wrong when login.");
    }
  };
  return (
    <div className="mt-32">
      <AuthForm
        isSignUp={false}
        onSubmit={onSubmit}
        schema={signinSchema}
      ></AuthForm>
    </div>
  );
}
