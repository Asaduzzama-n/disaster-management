import ChartSection from "@/components/chart-section";

export default function Donation() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full ">
        {/* Left section */}
        <div className="flex flex-col justify-between my-5 min-h-full">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center text-center p-2 rounded-md bg-bg dark:bg-bgd lg:h-40">
            <div className="p-2">
              <h3 className="text-lg font-semibold">Donations Count</h3>
              <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
              <p className="text-primary font-semibold">3543</p>
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">Donations</h3>
              <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
              <p className="text-primary font-semibold">$ 3424233543</p>
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">Total Expenses</h3>
              <div className="w-24 mx-auto h-0.5 rounded-md my-2 bg-primary/15"></div>
              <p className="text-primary font-semibold">$ 342423</p>
            </div>
          </div>

          <div className="bg-bg dark:bg-bgd rounded-md flex-1 mt-5">
            <ChartSection />
          </div>
        </div>

        {/* Right section */}
        <div className="bg-bg dark:bg-bgd p-4 rounded-md my-5 flex-1 min-h-full">
          Donation Form
        </div>
      </div>
      <div className=" h-96 bg-bg dark:bg-bgd mt-10 p-4">
        ALL TIME DONATIONS
      </div>
    </div>
  );
}
