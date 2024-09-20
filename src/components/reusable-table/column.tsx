"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Sheet } from "lucide-react";
import { format } from "date-fns";
import Modal from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { useState } from "react";
import { SelectValue } from "@radix-ui/react-select";

export type Donation = {
  id: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  message: string;
};

export const donationColumns: ColumnDef<Donation>[] = [
  { accessorKey: "donorName", header: "Donor Name" },
  { accessorKey: "donorEmail", header: "Donor Email" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "amount", header: "Amount" },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {/* Add more actions as needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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

const handleCrisisEdit = async (data: any, id: number) => {
  console.log("Editing Crisis:", id, data);
};
const handleCrisisDelete = async (id: number) => {
  console.log("FRR", id);
};

export const crisisColumns: ColumnDef<Crisis>[] = [
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
      const name = row.original.admin.firstName;
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
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
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

export type Inventory = {
  id: number;
  name: string;
  type: "RELIEF" | "EXPENSE";
  quantity: number;
  createdBy: string;
  createdAt: Date;
  user: {
    id: number;
    firstName: string;
    lastName?: string;
    phone?: number;
    role: "ADMIN" | "VOLUNTEER";
  };
};

export const inventoryColumns: ColumnDef<Inventory>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "quantity", header: "Quantity" },
  {
    accessorKey: "",
    header: "Created By",
    cell: ({ row }) => {
      const createdBy = row.original.user.firstName;
      return <p>{createdBy}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const created = row.original.createdAt;
      return <p>{format(new Date(created), "mm-d-yyyy, h:mm a")}</p>;
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  role: "ADMIN" | "VOLUNTEER";
  password: string;
  age?: string | null;
  avatar?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const volunteerColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "First Name",
    cell: ({ row }) => {
      const name = row.original.firstName + " " + row.original.lastName;
      return <p>{name}</p>;
    },
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return <p className="font-medium">{role.toLowerCase()}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <p>{format(new Date(createdAt), "MM-dd-yyyy, h:mm a")}</p>;
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
