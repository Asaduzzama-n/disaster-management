import { volunteerColumns } from "@/components/reusable-table/column";
import { DataTable } from "@/components/reusable-table/data-table";
import { getVolunteers } from "@/lib/api/volunteer";
import React from "react";

export default async function VolunteerPage() {
  const result = await getVolunteers("role=VOLUNTEER", "");
  const volunteers = result.data.data;
  console.log(volunteers);
  return (
    <div>
      <DataTable
        data={volunteers}
        columns={volunteerColumns}
        filterableField="email"
      ></DataTable>
    </div>
  );
}
