"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

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
