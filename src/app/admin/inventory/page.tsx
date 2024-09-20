import { inventoryColumns } from "@/components/reusable-table/column";
import { DataTable } from "@/components/reusable-table/data-table";
import { getInventory } from "@/lib/api/inventory";
import React from "react";

export default async function Inventory() {
  const result = await getInventory();

  const inventories = result.data;
  console.log(inventories);
  return (
    <div>
      <DataTable
        data={inventories}
        columns={inventoryColumns}
        filterableField="title"
      ></DataTable>
    </div>
  );
}
