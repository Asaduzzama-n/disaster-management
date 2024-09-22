"use client";

import Modal from "@/components/modal";
import { DataTable } from "@/components/reusable-table/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCrisis } from "@/lib/api/crisis";
import { instance } from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Crisis = {
  id: number;
  title: string;
  imageUrls: string[];
  locations: string[];
  severity: string;
  status: string;
  requiredHelp: string;
  approvedBy: string;
  admin: {
    firstName: string;
  };
};

export default function CrisesPage() {
  const [refetch, setRefetch] = useState(false);

  const handleCrisisEdit = async (data: any, id: number) => {
    const crisisUpdatedData: { severity?: string; status?: string } = {};

    if (data?.severity) crisisUpdatedData.severity = data.severity;
    if (data?.status) crisisUpdatedData.status = data.status;

    try {
      await instance.patch(`/crisis/${id}`, crisisUpdatedData);
      toast.success("Crisis updated.");
      setRefetch(true);
    } catch (error) {
      toast.error("Something went wrong please try again.");
    }
  };
  const handleCrisisDelete = async (id: number) => {
    try {
      await instance.delete(`/crisis/${id}`);
      toast.success("Crisis Deleted.");
      setRefetch(true);
    } catch (error) {
      toast.error("Something went wrong please try again.");
    }
  };

  const crisisColumns: ColumnDef<Crisis>[] = [
    {
      accessorKey: "imageUrls",
      header: "Image",
      cell: ({ row }) => {
        const crisis = row.original;
        return (
          <Image
            width={50}
            height={50}
            src={crisis.imageUrls[0]} // Use the first image URL
            alt="Crisis Image"
            className="h-10 w-10 object-cover rounded"
          />
        );
      },
    },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "locations", header: "Locations" },
    {
      accessorKey: "severity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Severity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    { accessorKey: "requiredHelp", header: "Required Help" },
    {
      accessorKey: "approvedBy",
      header: "Approved By",
      cell: ({ row }) => {
        const name = row.original?.admin?.firstName;
        return <p>{name}</p>;
      },
    },
    {
      accessorKey: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const crisis = row.original;

        return (
          <div className="flex items-center space-x-2">
            <Modal
              onSubmit={(data) => handleCrisisEdit(data, crisis.id)}
              trigger="Edit"
              title="Update Crisis"
            >
              <div className="space-y-4">
                <div className="my-5 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium "
                    >
                      Status
                    </label>
                    <Select name="status">
                      <SelectTrigger className="">
                        <SelectValue placeholder="SELECT" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{crisis.status}</SelectLabel>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="APPROVED">APPROVED</SelectItem>
                          <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="severity"
                      className="block text-sm font-medium "
                    >
                      Severity
                    </label>
                    <Select name="severity">
                      <SelectTrigger className="">
                        <SelectValue placeholder="SELECT" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{crisis.severity}</SelectLabel>
                          <SelectItem value="Low">LOW</SelectItem>
                          <SelectItem value="Medium">MEDIUM</SelectItem>
                          <SelectItem value="High">HIGH</SelectItem>
                          <SelectItem value="Critical">CRITICAL</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Modal>
            <button
              className="bg-red-600/30 px-2 rounded-md"
              onClick={() => handleCrisisDelete(crisis.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const [crisisData, setCrisisData] = useState([]);

  const getCrises = async () => {
    const result = await getAllCrisis();

    const crises = result.data.data;
    setCrisisData(crises);
    setRefetch(false);
  };

  useEffect(() => {
    getCrises();
  }, [refetch]);

  return (
    <div>
      <DataTable
        columns={crisisColumns}
        data={crisisData}
        filterableField="title"
      ></DataTable>
      <div></div>
    </div>
  );
}
