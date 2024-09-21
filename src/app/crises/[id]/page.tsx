/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import bg from "../../../../public/bg.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { getSingleCrisis } from "@/lib/api/crisis";

interface CrisisPageProps {
  params: {
    id: string;
  };
}

export default async function CrisisPage({ params }: CrisisPageProps) {
  const { id } = params;

  const result = await getSingleCrisis(Number(id));
  const crisis = result.data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
      <div className="bg-bg dark:bg-bgd p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <img
              className="rounded-md w-full h-full opacity-70 hover:opacity-100 duration-500"
              src={crisis?.imageUrls[0]}
              alt="bg"
            ></img>
          </div>
          <div>
            <img
              className="rounded-md w-full h-full opacity-70 hover:opacity-100 duration-500"
              src={crisis?.imageUrls[1]}
              alt="bg"
            ></img>
          </div>
        </div>
        <div className=" mt-4 ">
          <img
            className="max-h-80 rounded-md w-full h-full opacity-70 hover:opacity-100 duration-500"
            src={crisis?.imageUrls[2] || bg}
            alt="bg"
          ></img>
        </div>
      </div>
      <div className="bg-bg dark:bg-bgd p-4 rounded-md relative">
        <h2 className="text-xl font-medium">{crisis.title}</h2>
        <br />
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>{crisis.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
        <br />
        <div>
          <span className="text-md font-medium"> Locations: </span>
          {crisis.locations?.map((location: any) => (
            <span
              className="mr-4 mb-2 rounded-full text-center bg-primary/15 px-4 text-sm font-semibold"
              key={location}
            >
              {location}
            </span>
          ))}
        </div>
        <br />
        <p className="font-medium my-2">{crisis.requiredHelp}</p>

        <p className="my-4">
          <span className="text-md font-medium">Severity:</span>{" "}
          <span className="bg-primary/15 px-4 py-1 rounded-full text-sm font-semibold">
            {crisis.severity}
          </span>
        </p>
        <p>
          <span className="text-md font-medium ">Status:</span> {crisis.status}
        </p>
        <br />
        <p>
          <span className="text-md font-medium ">Approve By: </span>
          <span className="text-md font-semibold">{crisis.approvedBy}</span>
        </p>
        <br />

        <div className="flex justify-center items-center mt-5">
          <Link
            className="bg-primary/15  p-2 rounded-md text-md font-semibold hover:opacity-80 flex items-center justify-center text-primary w-[180px]"
            href={"/donation"}
          >
            Donate Now
            <HeartHandshake className="ml-2 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
