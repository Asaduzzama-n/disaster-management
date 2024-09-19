"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { donationCreateSchema } from "@/lib/schema";

export default function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(donationCreateSchema),
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="w-4/5 mx-auto">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="name">
            Name
          </label>
          <br />
          <input
            placeholder=""
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("name")}
          />
          <br />
          <small className="text-red-500 ">{errors.name?.message}</small>
        </div>

        <div className="my-2 ">
          <label className="font-semibold text-md" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className="outline-none focus:outline-none bg-primary/15 p-2 rounded-md my-1 w-full"
            {...register("email")}
          />
          <br />
          <small className="text-red-500 ">{errors.email?.message}</small>
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
