"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AuthForm } from "@/components/auth-form";
import { signupSchema } from "@/lib/schema";
import React from "react";

type SignUpFormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  role?: string;
};

export default function SignUp() {
  const { register } = useAuth();

  const onSubmit = async (data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role: "VOLUNTEER";
  }) => {
    const { ...userData } = data;
    userData.role = "VOLUNTEER";
    try {
      await register(userData);
    } catch (error) {
      throw new Error("Something went wrong when creating user.");
    }
  };

  return (
    <div className="mt-32">
      <AuthForm
        isSignUp={true}
        //@ts-ignore
        onSubmit={onSubmit}
        schema={signupSchema}
      ></AuthForm>
    </div>
  );
}
