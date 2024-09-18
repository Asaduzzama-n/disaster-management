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

export default function CustomCarousel(params: any) {
  const { data } = params;
  return (
    <div className="">
      <Carousel>
        <CarouselContent>
          {data?.map((crisis, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 xl:basis-1/5 "
            >
              <div className=" bg-bg p-4 dark:bg-bgd rounded-md  ">
                <div className="">
                  <h4 className="text-md font-semibold line-clamp-1">
                    {crisis.title}
                  </h4>
                  <small className="line-clamp-2">{crisis.description}</small>
                </div>
                <div className="flex aspect-square items-center justify-center  rounded-md">
                  <Image
                    className="hover:opacity-80 duration-150"
                    src={holder}
                    alt="Image"
                  ></Image>
                </div>
                <div className="flex justify-end items-center hover:translate-x-2  duration-150">
                  <Link
                    className="bg-bg dark:bg-bgd  rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary"
                    href={`/crisis/:${crisis.title}`}
                  >
                    Read More
                    <CircleChevronRight className="text-primary ml-5 " />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-8 right-12 hidden lg:block">
          <CarouselPrevious className="bg-bg  dark:bg-bgd text-primary" />
          <CarouselNext className="bg-bg  dark:bg-bgd text-primary" />
        </div>
      </Carousel>
    </div>
  );
}
