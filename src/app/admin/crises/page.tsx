import { crisisColumns } from "@/components/reusable-table/column";
import { DataTable } from "@/components/reusable-table/data-table";

import { getAllCrisis } from "@/lib/api/crisis";

export default async function CrisesPage() {
  const result = await getAllCrisis();

  const crises = result.data.data;
  return (
    <div>
      <DataTable
        columns={crisisColumns}
        data={crises}
        filterableField="title"
      ></DataTable>
      <div></div>
    </div>
  );
}
