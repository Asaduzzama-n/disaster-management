/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { donationCreateSchema } from "@/lib/schema";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";

export default function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(donationCreateSchema),
  });
  const onSubmit = async (data: any) => {
    const donationData = {
      donorName: data?.donorName,
      donorEmail: data?.donorEmail,
      amount: data?.amount,
      message: data?.email,
    };

    {
      try {
        const result = await instance.post("/donation/", donationData);

        console.log(result.data);
        toast.success("Thank you for donation.");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong please try again.");
      }
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="donorName">
            Name
          </label>
          <br />
          <input
            placeholder=""
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("donorName")}
          />
          <br />
          <small className="text-red-500 ">{errors.donorName?.message}</small>
        </div>

        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="donorEmail">
            Email
          </label>
          <br />
          <input
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("donorEmail")}
          />
          <br />
          <small className="text-red-500 ">{errors.donorEmail?.message}</small>
        </div>
        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="message">
            Message
          </label>
          <br />
          <textarea
            placeholder="Write a message to inspire others."
            rows={5}
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("message")}
          />
          <br />
          <small className="text-red-500 ">{errors.message?.message}</small>
        </div>
        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="amount">
            Amount
          </label>
          <br />
          <input
            type="number"
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("amount")}
          />
          <br />
          <small className="text-red-500 ">{errors.amount?.message}</small>
        </div>
        <div className="flex justify-end items-center">
          <input
            className="w-40 bg-primary/15 p-1 mt-5 rounded-md font-semibold text-primary"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
