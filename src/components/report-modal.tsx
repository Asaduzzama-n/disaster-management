/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/app/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CSVLink } from "react-csv";

export default function ReportModal({ data }: { data: any }) {
  const { user } = useAuth();
  const headers = [
    { label: "Date", key: "day" },
    { label: "Donation", key: "donation" },
    { label: "Expense", key: "expense" },
    { label: "Net Amount", key: "netAmount" },
  ];

  const csvData = data.map((item: any) => ({
    day: item.day,
    donation: item.donation,
    expense: item.expense,
    netAmount: item.donation - item.expense,
  }));
  return (
    <div>
      <Dialog>
        <DialogTrigger className="" asChild>
          <button className="bg-primary/15 p-2 rounded-md text-md font-medium">
            Generate
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader></DialogHeader>
          <div>
            <div>
              <div>
                <h3 className="text-xl font-bold text-primary">
                  ID #TX{Math.floor(Math.random() * 1000000)}DM
                </h3>
                <p className="text-slate-700 font-bold pt-2 ">
                  Created: {new Date().toLocaleString()}
                </p>{" "}
                <p className="text-slate-700 font-bold pt-2 ">
                  Report To: {user?.firstName}
                </p>{" "}
              </div>
              <hr className="my-5" />
              <div className="">
                <div className="flex justify-between items-center border-b-2 border-primary p-2">
                  <p className="text-sm font-semibold"> Date </p>
                  <p className="text-sm font-semibold"> Donation </p>
                  <p className="text-sm font-semibold"> Expense </p>
                  <p className="text-sm font-semibold"> Net Amount </p>
                </div>
                {data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-primary/50 my-2 p-2"
                  >
                    <p className="text-md font-medium">{item.day}</p>
                    <p className="text-md font-medium">{item.donation}</p>
                    <p className="text-md font-medium">{item.expense}</p>
                    <p className="text-md font-medium">
                      {item.donation - item.expense}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <CSVLink
              data={csvData}
              headers={headers}
              filename={`report-${new Date().toISOString().split("T")[0]}.csv`}
              className="bg-primary/15 p-2 rounded-md text-md font-medium"
            >
              Download
            </CSVLink>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
