import { crisisColumns } from "@/components/reusable-table/column";
import { DataTable } from "@/components/reusable-table/data-table";
import { DialogTrigger } from "@/components/ui/dialog";
import { getAllCrisis } from "@/lib/api/crisis";

export default async function CrisesPage() {
  const result = await getAllCrisis();
  console.log(result.data.data);
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
