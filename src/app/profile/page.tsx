"use client";
import ImageUploadDialog from "@/components/pages/ImageUploadDialog";
import { Navbar } from "@/components/pages/Navbar";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/helpers/getCookie";
import { Loader2 } from "lucide-react";
import Link from "next/link";
// import { getCookie } from '@/helpers/getCookie';
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [getUserDetails, setGetUserDetails] = useState<any>([]);
  const [isDialogOpenForProfile, setisDialogOpenForProfile] = useState(false);
  const [isDialogOpenForCover, setisDialogOpenForCover] = useState(false);

  const handleUploadClick = () => {
    setisDialogOpenForProfile(true);
  };

  const handleUploadClickForCover = () =>{
    setisDialogOpenForCover(true);
  }

  const handleDialogClose = () => {
    setisDialogOpenForProfile(false);
  };

  const handleDialogCloseCover = () => {
    setisDialogOpenForCover(false);
  };

  
  useEffect(() => {
    const res = async () => {
      const myval = await getCookie();
      setGetUserDetails(myval);
    };
    res();
  }, []);

  if(!getUserDetails){
    return (
      <div className="h-[400px] w-full overflow-hidden flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <div>
      <div className="relative hover:cursor-pointer h-48 md:h-60 lg:h-72 w-full bg-gray-200">
        <img
        onClick={handleUploadClickForCover}
          src={getUserDetails?.coverImage || ""}
          alt=""
          className="w-full h-full object-cover bg-gray-600"
        /> 
      </div>

      <div className="relative flex flex-col items-center -mt-16 md:-mt-20 lg:-mt-24">
        <div className="w-32 h-32 hover:cursor-pointer md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-red-200">
          <img
            src={getUserDetails?.profile || ""}
            onClick={handleUploadClick}
            alt=""
            className={`w-full h-full object-cover bg-gray-400`}
          />
        </div>

        <div className="text-center mt-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {getUserDetails?.name || "User Name"}
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        {
          getUserDetails.role == "admin" ? (<Link href="/addJobs"><Button>Add cars</Button></Link>) : ("")
        }
      </div>

      <ImageUploadDialog
        isOpen={isDialogOpenForProfile}
        onClose={handleDialogClose}
        type={"profile"}
      />

<ImageUploadDialog
        isOpen={isDialogOpenForCover}
        onClose={handleDialogCloseCover}
        type={"cover"}
      />
    </div>
  );
};

export default Profile;
