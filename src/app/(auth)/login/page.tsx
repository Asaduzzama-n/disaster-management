"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AuthForm } from "@/components/auth-form";
import { signinSchema } from "@/lib/schema";
import React from "react";

type loginFormValues = {
  password: string;
  email: string;
};

export default function Login() {
  const { login } = useAuth();

  const onSubmit = async (data: loginFormValues) => {
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
