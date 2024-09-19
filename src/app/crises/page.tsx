import SearchSection from "@/components/search-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { crisesDummyData } from "@/lib/data";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import bg from "../../../public/bg.jpg";
import Image from "next/image";

export default function Crises() {
  return (
    <div>
      <div className="w-full md:w-1/2 mx-auto  bg-bg dark:bg-bgd p-4 rounded-md my-10 items-center justify-center">
        <SearchSection></SearchSection>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-20 md:my-32">
        {crisesDummyData?.map((crisis, index) => (
          <div key={index}>
            <Card className=" relative  bg-bg dark:bg-bgd shadow-none hover:translate-x-1 duration-200">
              <CardHeader className="text-sm font-medium line-clamp-1">
                {crisis.title}
              </CardHeader>

              <CardContent>
                <Image className="rounded-md" src={bg} alt="bg"></Image>
                <CardDescription className="line-clamp-2 mt-2">
                  {crisis.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link
                  className="bg-bg dark:bg-bgd px-4 py-2 rounded-md text-sm font-medium hover:opacity-80 flex items-center text-primary hover:translate-x-2 duration-200"
                  href={"/crisis"}
                >
                  View More
                  <CircleChevronRight className="text-primary ml-2 h-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
