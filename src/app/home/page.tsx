import ChartSection from "@/components/chart-section";
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
            <div className=" text-center py-10">
              <Link
                className="bg-primary/30  px-4 py-2 rounded-md text-md font-semibold "
                href={"/donation"}
              >
                Donate Now
              </Link>
              <span className="font-semibold mx-2">OR</span>
              <Link
                className="bg-primary/30 px-4 py-2 rounded-md text-md font-semibold "
                href={"/signup"}
              >
                Join As Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Crises Carousel will go here */}
      <div></div>
      {/* Volunteers Carousel will go here */}
      <div></div>
    </div>
  );
}
