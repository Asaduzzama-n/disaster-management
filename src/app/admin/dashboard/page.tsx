import ChartSection from "@/components/chart-section";
import { getAllDonations } from "@/lib/api/donation";
import { getInventory } from "@/lib/api/inventory";
import React from "react";
import ReportSection from "./report-section";

export default async function AdminDashboard() {
  const result = await getAllDonations();
  const donations = result.data;
  const res = await getInventory();
  const inventories = res.data;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4">
        <div className="bg-bg p-4 dark:bg-bgd rounded-md">
          <ChartSection></ChartSection>
        </div>
        <div className="bg-bg p-4 dark:bg-bgd rounded-md h-full">
          <ReportSection
            donations={donations}
            inventories={inventories}
          ></ReportSection>
        </div>
      </div>
      <div className="bg-bg p-4 dark:bg-bgd rounded-md mt-4">bottom</div>
    </div>
  );
}
