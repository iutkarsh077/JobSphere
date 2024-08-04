"use client";
import { toast } from '@/components/ui/use-toast';
import { GetADedicatedJob } from '@/services/GetADedicatedJob';
import { Spinner } from '@nextui-org/spinner';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import JobPage from './_components/JobPage';
import { Loader2 } from 'lucide-react';

const DedicatedJob = () => {
    const [jobData, setJobData] = useState<any>();
  const  { slug } = useParams();
  console.log(slug);

  useEffect(()=>{
    const getADedicatedJob = async () =>{
        try {
            const res = await GetADedicatedJob(slug as string);
            if(!res.status){
                throw new Error("Data fetching failed");
            }

            const jobData = res.getJob;
            setJobData(jobData);
        } catch (error) {
            console.log(error);
            toast({
                title: "Something wnet wrong!",
                description: "Please refresh the Page",
                duration: 2000
            })
        }
    }
    getADedicatedJob();
  }, []);

  if(!jobData){
    return (
      <div className="h-[400px] w-full  flex items-center justify-center">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
    )
  }
    return (
    <div className='overflow-y-scroll h-screen example'>
      <JobPage jobData={jobData}/>
    </div>
  )
}

export default DedicatedJob
