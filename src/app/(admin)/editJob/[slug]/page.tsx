"use client";
import { getCookie } from "@/helpers/getCookie";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserDetails } from "../../../../../actions/AdminUserDetails";
import { Navbar } from "@/components/pages/Navbar";
import { Spinner } from "@nextui-org/spinner";
import EditJobForm from "@/components/pages/EditJobForm";
import { GetADedicatedJobById } from "@/services/GetADedicatedJob";

const EditJob = () => {
    const { slug } = useParams();
    // console.log(slug);
  const [getUserDetails, setGetUserDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getDedicatedJobDetails, setDedicatedJobDetails] = useState<any>(null);

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

  useEffect(()=>{
    const getEditJob = async () =>{
        try {
            const res = await GetADedicatedJobById(slug);
            // console.log(res);
            setDedicatedJobDetails(res.getJob)
        } catch (error) {
            console.log(error);
        }
    }
    getEditJob();
  }, [])

  return (
    <div>
      {getDedicatedJobDetails ? (
        <EditJobForm jobDetails={getDedicatedJobDetails} />
      ) : (
        <Spinner size="lg" color="primary" />
      )}
    </div>
  );
};

export default EditJob;
