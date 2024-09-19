"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlignJustify,
  ClipboardPlus,
  Ellipsis,
  HeartHandshake,
  UserPen,
  Users,
} from "lucide-react";

const navItem = [
  {
    title: "Donation",
    path: "/donation",
  },
  {
    title: "Crises",
    path: "/crises",
  },
];

export default function NavBar() {
  const { setTheme } = useTheme();

  return (
    <div className="w-full  sm:container mx-auto">
      <div className="flex justify-between  items-center my-2">
        <div className="">
          <Link href={"/home"}>
            {" "}
            <Image className="h-8 w-12" alt="logo" src={logo}></Image>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          {navItem.map((item) => (
            <Link className="mx-2 sm:mx-4" key={item.path} href={item.path}>
              {item.title}
            </Link>
          ))}

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="ml-4 flex items-center justify-center">
            <Sheet>
              <SheetTrigger>
                <AlignJustify />
              </SheetTrigger>
              <SheetContent className="p-0 pt-20 " side={"right"}>
                <div className="py-4 border-b-2 border-primary/40 flex justify-start items-center w-full  p-1 hover:bg-primary/15">
                  <UserPen className="text-primary mx-5 h-4" />
                  <Link className=" font-medium " href={"/admin/profile"}>
                    Profile
                  </Link>
                </div>
                <div className="py-4 border-b-2 border-primary/40 flex justify-start items-center w-full  p-1 hover:bg-primary/15">
                  <Ellipsis className="text-primary mx-5 h-4" />
                  <Link className=" font-medium " href={"/admin/crises"}>
                    Crises
                  </Link>
                </div>
                <div className="py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15">
                  <Users className="text-primary mx-5 h-4" />
                  <Link className=" font-medium " href={"/admin/volunteers"}>
                    Volunteers
                  </Link>
                </div>
                <div className="py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15">
                  <ClipboardPlus className="text-primary mx-5 h-4" />
                  <Link className=" font-medium " href={"/admin/report"}>
                    Report
                  </Link>
                </div>
                <div className="py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15">
                  <HeartHandshake className="text-primary mx-5 h-4" />
                  <Link className=" font-medium " href={"/admin/donations"}>
                    Donations
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
