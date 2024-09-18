import ChartSection from "@/components/chart-section";
import CustomCarousel from "@/components/custom-carouse";
import { crisesDummyData } from "@/lib/data";
import { CircleChevronRight, CirclePlus, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center  items-center w-full p-4 rounded-md mx-auto bg-bg dark:bg-bgd my-4">
        <div className="grid  sm:grid-cols-3 gap-4 sm:gap-10 items-center justify-center text-center">
          <div className=" p-2 ">
            <h3 className="text-lg font-semibold">Active Volunteers</h3>
            <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
            <p className="text-primary font-semibold">3543</p>
          </div>
          <div className=" p-2 ">
            {" "}
            <h3 className="text-lg font-semibold">Total Donations</h3>
            <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
            <p className="text-primary font-semibold"> $ 3424233543</p>
          </div>
          <div className=" p-2 ">
            {" "}
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
            <p className="text-primary font-semibold">$ 342423</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5  rounded-md">
        <div className="dark:bg-bgd bg-bg rounded-md">
          <ChartSection></ChartSection>
        </div>
        <div className="text-center dark:bg-bgd bg-bg flex items-center p-2 sm:p-4 rounded-md">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Be the Change in Times of Crisis.
            </h2>
            <br />
            <p className="text-md font-semibold">
              When disaster strikes, your{" "}
              <span className="text-primary font-semibold text-2xl sm:text-3xl">
                actions
              </span>{" "}
              can save lives. Whether it’s volunteering on the ground or
              contributing from afar, you have the power to turn despair into
              hope.
            </p>
            <br />
            <div className=" text-center py-10 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center">
              <Link
                className="bg-primary/15  p-2 rounded-md text-md font-semibold hover:opacity-80 flex items-center justify-center text-primary w-[180px]"
                href={"/donation"}
              >
                Donate Now
                <HeartHandshake className="ml-2 h-5" />
              </Link>
              <span className="font-semibold my-2 md:mx-2 ">OR</span>
              <Link
                className="bg-primary/15  p-2  rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary w-[180px]"
                href={"/signup"}
              >
                Join As Volunteer
                <CirclePlus className="ml-2 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="my-20 lg:my-32">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="text-xl sm:text-3xl font-semibold text-primary">
            Featured Crises
          </h1>
          <Link
            className="bg-bg dark:bg-bgd px-4 py-2 rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary"
            href={"/crisis"}
          >
            View More
            <CircleChevronRight className="text-primary ml-2 h-5" />
          </Link>
        </div>
        <div>
          <CustomCarousel data={crisesDummyData}></CustomCarousel>
        </div>
      </div>
      {/* Volunteers Carousel will go here */}
      <div className=" my-20 lg:my-32">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="text-xl sm:text-3xl font-semibold text-primary">
            Volunteers
          </h1>
          <Link
            className="bg-bg dark:bg-bgd px-4 py-2 rounded-md text-md font-semibold hover:opacity-80 flex items-center text-primary"
            href={"/volunteer"}
          >
            View More
            <CircleChevronRight className="text-primary ml-2 h-5" />
          </Link>
        </div>
        <div>
          <CustomCarousel data={crisesDummyData}></CustomCarousel>
        </div>
      </div>
    </div>
  );
}
