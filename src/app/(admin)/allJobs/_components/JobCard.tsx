"use client";
import Link from "next/link";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DeleteJob } from "@/services/DeleteJob";
import { useRouter } from "next/navigation";
const JobCard = ({ job }: { job: any }) => {
    const router = useRouter();
    const handleDeleteJob = async (id: string) =>{
        try {
            const res = await DeleteJob(id);
            if(res.status == false){
                throw new Error("Job Deletion Failed");
            }
            toast({
                title: "Job deleted successfully",
                duration: 2000
            })
            router.refresh();
        } catch (error) {
            console.log(error);
            toast({
                title: "Job deletion Failed",
                duration: 2000
            })
        }
    }
  return (
    <>
    <div className=" mt-10 gap-y-6 flex flex-col md:flex-row w-full bg-white dark:bg-neutral-900 shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="md:w-1/2 h-56 md:h-auto">
        <img
          src={job.image}
          alt={`Image for ${job.jobTitle}`}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Info Section */}
      <div className="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {job.jobTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {job.jobDescription}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 dark:text-gray-400 mb-1">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-1">
            <strong>Company:</strong> {job.companyName}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            <strong>Salary:</strong> {job.salary}
          </p>
         <p className="flex items-center gap-x-4">
         <Link href={job.slug}>
          <button className="py-2 px-4 signInbut bg-purple-900 text-white  rounded-lg hover:bg-purple-700  hover:ease-in-out duration-300">
            Know More
          </button></Link>
          <Dialog>
  <DialogTrigger className="bg-red-600 p-2 rounded-md">Delete</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  <DialogFooter>
      <Button type="submit" className="bg-red-600 hover:bg-red-900 text-white" onClick={()=>handleDeleteJob(job.id)}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
         </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobCard;
