import React from "react";
import bg from "../../../../public/bg.jpg";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const crisis = {
  title: "Earthquake in Region B",
  description:
    "Magnitude 6.5 earthquake causing severe damage Magnitude 6.5 earthquake causing severe damage Magnitude 6.5 earthquake causing severe damage Magnitude 6.5 earthquake causing severe damage",
  imageUrls: ["earthquake1.jpg", "earthquake2.jpg"],
  locations: ["Region B", "Region C"],
  severity: "CRITICAL",
  status: "ACTIVE",
  requiredHelp: "Need medical assistance and engineers",
  approvedBy: "Asaduzzaman", // assuming user with ID 2 exists
};

export default function CrisisPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
      <div className="bg-bg dark:bg-bgd p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <Image className="rounded-md" src={bg} alt="bg"></Image>
          </div>
          <div>
            <Image className="rounded-md" src={bg} alt="bg"></Image>
          </div>
        </div>
        <div className=" mt-4 ">
          <Image className="max-h-80 rounded-md" src={bg} alt="bg"></Image>
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
          {crisis.locations?.map((location) => (
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
