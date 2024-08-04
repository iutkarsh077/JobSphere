"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitcher  from "../parts/ThemeSwitcher";
import { LogoutUser } from "@/services/logoutUser";

export function Navbar({ UserDetails }: { UserDetails: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () =>{
    try {
      const res = await LogoutUser();
      if(res.status == false){
        throw new Error("Failed To Logout");
      }
      router.push("/");
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <nav className="bg-white min-w-full shadow-lg example dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm">
                <img
                  src={"/images/car1.jpeg"}
                  className="rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm"
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-black dark:text-white text-lg"
              >
                JOBSPHERE
              </motion.span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className={`${UserDetails == null ? "hidden" : "hidden md:flex space-x-8"}`}>
            <Link
              href="/"
              className={`dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 ${pathname == "/" ? "text-black" :"text-gray-500"}`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 ${pathname == "/savedJobs" ? "text-black" :"text-gray-500"}`}
            >
              Search
            </Link>
            {/* <Link
              href="/newJobs"
              className={`dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 ${pathname == "/newJobs" ? "text-black" :"text-gray-500"}`}
            >
              Newly Launched
            </Link> */}
          </div>

          {/* Right: User Profile */}

          <div className="flex items-center space-x-4">
          <ThemeSwitcher/>
            <div className={`hidden md:flex items-center space-x-2`}>
              {
                UserDetails && <img
                src={UserDetails?.profile}
                className={`${!UserDetails.profile ? "hidden" :"h-8 w-8 rounded-full"}`}
                width={32}
                height={32}
                alt="User Profile"
              />
              }
              {UserDetails ? (
                <span className="text-gray-700 dark:text-gray-300 mr-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline outline-none">{UserDetails.name || "User"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/profile">
                      <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem></Link>
                      <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                      {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
