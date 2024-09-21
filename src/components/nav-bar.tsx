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
  LayoutDashboard,
  LogIn,
  LogOut,
  UserPen,
  Users,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function NavBar() {
  const { setTheme } = useTheme();

  const handleLogout = () => {};

  const { user } = useAuth();

  return (
    <div className="container">
      <div className="flex justify-between items-center my-2">
        <div className="">
          <Link href={"/home"}>
            {" "}
            <Image className="h-8 w-12" alt="logo" src={logo}></Image>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="mx-4">
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
                <div className="h-40  flex justify-center items-center  mt-5 relative">
                  <div>
                    <Image
                      className="rounded-full w-20 h-20 mx-auto border-2 border-primary"
                      src={user?.avatar}
                      height={20}
                      width={20}
                      alt="avatar"
                    ></Image>
                    <h1 className="text-primary font-semibold text-lg">
                      {user?.firstName}
                    </h1>

                    <p className="text-end text-sm font-medium">
                      {user?.role.toLowerCase()}
                    </p>
                  </div>
                </div>

                <Link
                  className=" font-medium py-4 border-b-2 border-primary/40 flex justify-start items-center w-full  p-1 hover:bg-primary/15"
                  href={"/admin/profile"}
                >
                  <UserPen className="text-primary mx-5 h-4" />
                  Profile
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    className=" font-medium py-4 border-b-2 border-primary/40 flex justify-start items-center w-full  p-1 hover:bg-primary/15"
                    href={"/admin/dashboard"}
                  >
                    <LayoutDashboard className="text-primary mx-5 h-4" />
                    Dashboard
                  </Link>
                )}

                <Link
                  className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                  href={"/crises"}
                >
                  <Ellipsis className="text-primary mx-5 h-4" />
                  Crises
                </Link>

                <Link
                  className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                  href={"/volunteers"}
                >
                  <Users className="text-primary mx-5 h-4" />
                  Volunteers
                </Link>

                <Link
                  className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                  href={"/admin/report"}
                >
                  <ClipboardPlus className="text-primary mx-5 h-4" />
                  Report
                </Link>

                <Link
                  className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                  href={"/donations"}
                >
                  <HeartHandshake className="text-primary mx-5 h-4" />
                  Donations
                </Link>
                {user?.email ? (
                  <button
                    className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                    onClick={() => handleLogout()}
                  >
                    <LogOut className="text-primary mx-5 h-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    className=" font-medium py-4 flex border-b-2 border-primary/40 justify-start items-center w-full  p-1 hover:bg-primary/15"
                    href={"/login"}
                  >
                    <LogIn className="text-primary mx-5 h-4" />
                    Login
                  </Link>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
