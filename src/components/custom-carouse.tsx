/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";
import holder from "../../public/bg.jpg";
import { CircleChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function CustomCarousel(params: any) {
  const { data } = params;
  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {data?.map((item: any, index: number) =>
            item?.title ? (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/5 "
              >
                <div className=" bg-bg p-4 dark:bg-bgd rounded-md  ">
                  <div className="">
                    <h4 className="text-md font-semibold line-clamp-1">
                      {item.title}
                    </h4>
                    <small className="line-clamp-1">{item.description}</small>
                  </div>
                  <div className="flex aspect-square items-center justify-center  rounded-md">
                    <img
                      className="hover:opacity-80 duration-150 rounded-sm"
                      src={item?.imageUrls[0]}
                      alt="Image"
                    ></img>
                  </div>
                  <div className="flex justify-end items-center hover:translate-x-2  duration-150">
                    <Link
                      className="bg-bg dark:bg-bgd  rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary"
                      href={`/crises/${item?.id}`}
                    >
                      Read More
                      <CircleChevronRight className="text-primary ml-5 " />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ) : (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/5 "
              >
                <div className=" bg-bg p-4 dark:bg-bgd rounded-md  ">
                  <div className="">
                    <h4 className="text-md font-semibold ">{item.firstName}</h4>
                    <small className="line-clamp-2">{item.description}</small>
                  </div>
                  <div className="flex aspect-square items-center justify-center  rounded-md">
                    <div className="relative h-[180px] w-full">
                      <Image
                        className="rounded-sm object-cover opacity-80 hover:opacity-100"
                        src={item?.avatar || holder}
                        layout="fill"
                        alt="crisis image"
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <span>
                      <span className="font-medium"> Joined: </span>
                      <span className="px-2 bg-primary/10 rounded-md text-sm font-medium">
                        {" "}
                        {format(new Date(item?.createdAt), "MMMM, dd, yyyy")}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-end items-center hover:translate-x-2  duration-150">
                    <Link
                      className="bg-bg dark:bg-bgd  rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary"
                      href={`/volunteers/${index}`}
                    >
                      Read More
                      <CircleChevronRight className="text-primary ml-5 " />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="absolute -bottom-8 right-12 hidden lg:block">
          <CarouselPrevious className="bg-bg  dark:bg-bgd text-primary" />
          <CarouselNext className="bg-bg  dark:bg-bgd text-primary" />
        </div>
      </Carousel>
    </div>
  );
}
