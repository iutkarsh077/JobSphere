"use client";

import { useRouter } from "next/navigation";
import { UserDetails } from "../../../../actions/AdminUserDetails";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import JobCard from "./_components/JobCard";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { toast } from "@/components/ui/use-toast";

const AllJobs = () =>{
    const [getUserDetails, setGetUserDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState<any[]>();
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

  useEffect(() => {
    const getJobs = async () => {
      try {
        setIsLoading(true);
        const jobData1 = await GetLatestJobs();
        if (!jobData1.status) {
          throw new Error("Failed to get jobs");
        }
        setJobData(jobData1.getAllLatestJobs);
      } catch (error) {
        toast({
          title: "Something went wrong!",
          duration: 2000,
          description: "Please refresh the Page",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, []);


  if(isLoading){
    return <Spinner size="lg" color="primary" />
  }
    return (
        <div className="w-full">
            <Link href="/addJobs"><Button>Add Jobs</Button></Link>
        {
          getUserDetails.role == "admin" ? (<Link href="/addJobs"><Button>All Jobs</Button></Link>) : ("")
        }
        <div className="grid grid-cols-1 md:grid-cols-2 ml-14 mr-14 md:gap-x-5">
          {jobData?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
    </div>
    )
}

export default AllJobs;