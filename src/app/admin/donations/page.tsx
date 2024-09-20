import { donationColumns } from "@/components/reusable-table/column";
import { DataTable } from "@/components/reusable-table/data-table";
import { getAllDonations } from "@/lib/api/donation";

import React from "react";

export default async function AdminDonationPage() {
  const donations = await getAllDonations();
  const { data } = donations;
  return (
    <div className="">
      <DataTable
        data={data}
        columns={donationColumns}
        filterableField="donorEmail"
      ></DataTable>
    </div>
  );
}
