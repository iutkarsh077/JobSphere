"use client";
import React, { useState } from "react";
import Link from "next/link";
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
import ThemeSwitcher from "../parts/ThemeSwitcher";
import { LogoutUser } from "@/services/logoutUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Navbar({ UserDetails }: { UserDetails: any }) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await LogoutUser();
      if (res.status == false) {
        throw new Error("Failed To Logout");
      }
      router.push("/");
    } catch (error) {
      // console.log(error);
      
    }
  };

  return (
    <nav className="bg-white min-w-full shadow-lg example dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm">
                <img
                  src="/images/car1.jpeg"
                  className="rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm"
                  alt="Logo"
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
          <div
            className={`${
              UserDetails == null ? "hidden" : "hidden md:flex space-x-8"
            }`}
          >
            <Link
              href="/"
              className={`dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 ${
                pathname === "/" ? "text-black" : "text-gray-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 ${
                pathname === "/search" ? "text-black" : "text-gray-500"
              }`}
            >
              Search
            </Link>
          </div>

          {/* Right: User Profile */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <div className="hidden md:flex items-center space-x-2">
              {UserDetails && (
                <img
                  src={UserDetails.profile}
                  className={`${
                    !UserDetails.profile ? "hidden" : "h-8 w-8 rounded-full"
                  }`}
                  alt="User Profile"
                />
              )}
              {UserDetails ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    {UserDetails.name || "User"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="hover:cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              {UserDetails ? (
                <Dialog>
                  <DialogTrigger className="w-full text-white bg-black rounded-md p-2">
                    {/* <span className="sr-only">Open</span> Accessibility for screen readers */}
                    <span className="block text-center bg-black pl-2 pr-2">
                      Jump
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-center mb-4">
                        Lets Go
                      </DialogTitle>
                      <DialogDescription className="text-center mt-4 flex flex-col gap-y-4">
                        <Link href="/">
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3 py-2  text-white bg-black hover:bg-black rounded-md"
                          >
                            Home
                          </Button>
                        </Link>
                        <Link href="/search">
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3 py-2  hover:bg-black text-white bg-black rounded-md"
                          >
                            Search
                          </Button>
                        </Link>

                        <Link href="/profile">
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3 py-2 hover:bg-black  text-white bg-black rounded-md"
                          >
                            Profile
                          </Button>
                        </Link>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link
                  href="/login"
                  className="bg-black rounded-md focus:outline-none"
                >
                  <Button className="bg-black hover:bg-black text-white px-4 py-2 rounded-md focus:outline-none">
                    Login
                  </Button>
                </Link>
              )}
            </div>{" "}
          </div>
        </div>
      </div>
    </nav>
  );
}
