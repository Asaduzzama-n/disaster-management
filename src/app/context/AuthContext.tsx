"use client";
import { instance } from "@/lib/axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  error: string | null;
  loading: boolean;
  setLoading: any;
  setError: any;
  setUser: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const response = await instance.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password }
      );

      const { userData, accessToken } = response.data.data;
      console.log(userData);
      setUser(userData);
      setLoading(false);
      localStorage.setItem("accessToken", accessToken);
      toast.success(`Welcome ${userData.firstName + " " + userData.lastName}`);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await instance.post(
        "http://localhost:5000/api/v1/auth/sign-up",
        userData
      );
      toast.success("Registration Complete please login to continue");
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Registration failed. Please try again.");

      setError("Registration failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        error,
        loading,
        setLoading,
        setError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
