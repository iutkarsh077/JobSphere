"use client";
import { getCookie } from "@/helpers/getCookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserDetails } from "../../../../actions/AdminUserDetails";
import { Navbar } from "@/components/pages/Navbar";
import { Spinner } from "@nextui-org/spinner";
import AddJobForm from "@/components/pages/AddJobForm";

const AddJobs = () => {
  const [getUserDetails, setGetUserDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
      setIsLoading(true);
    const res = async () => {
      try {
        const myval = await UserDetails();
        setGetUserDetails(myval);
        if (!myval || !myval.status) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
      finally{
        setIsLoading(false);
      }
    };
    res();
  }, []);

  if(isLoading){
    return <Spinner size="lg" color="primary" />
  }


  return (
    <div>
      <AddJobForm/>
    </div>
  );
};

export default AddJobs;
