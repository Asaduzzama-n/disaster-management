/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCrisis } from "@/lib/api/crisis";
import SearchBar from "@/components/search-bar";

const filtersField = [
  { label: "Severity", options: ["Low", "Medium", "High", "Critical"] },
];

export default function Crises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [crisis, setCrisis] = useState<any>([]);

  const handleSearch = (
    searchTerm: string,
    selectedFilters: Record<string, string>
  ) => {
    setSearchTerm(searchTerm);
    setFilters(selectedFilters);
  };

  const getCrisis = async () => {
    try {
      const response = await getAllCrisis({
        searchTerm,
        severity: filters.severity,
        status: filters.status,
      });
      setCrisis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCrisis();
  }, [searchTerm, filters]);

  console.log(filters.severity, filters.status);

  return (
    <div>
      <div className="w-full md:w-1/2 mx-auto bg-bg dark:bg-bgd p-4 rounded-md my-10 items-center justify-center">
        <SearchBar
          placeholder="Search..."
          filtersField={filtersField}
          onSearch={handleSearch}
        ></SearchBar>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-20 md:my-32">
        {crisis &&
          crisis?.map((crisis: any, index: number) => (
            <div key={index}>
              <Card className="relative bg-bg dark:bg-bgd shadow-none hover:translate-x-1 duration-200 min-h-[300px] flex flex-col justify-between">
                <CardHeader className="text-sm font-medium line-clamp-1">
                  {crisis?.title}
                </CardHeader>

                <CardContent>
                  <div className="relative h-[180px] w-full">
                    <Image
                      className="rounded-sm object-cover"
                      src={crisis?.imageUrls[0] || "/fallback-image.jpg"}
                      layout="fill"
                      alt="crisis image"
                    />
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {crisis?.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link
                    className="bg-bg dark:bg-bgd px-4 py-2 rounded-md text-sm font-medium hover:opacity-80 flex items-center text-primary hover:translate-x-2 duration-200"
                    href={`/crises/${crisis?.id}`}
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
