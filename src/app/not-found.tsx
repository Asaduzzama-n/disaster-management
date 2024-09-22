import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-2xl font-bold">
        Page not found please go back to{" "}
        <Link className="text-primary" href={"/home"}>
          Home
        </Link>{" "}
        page
      </h1>
    </div>
  );
}
