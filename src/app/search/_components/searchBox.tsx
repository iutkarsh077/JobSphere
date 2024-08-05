"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { searchBoxResolver, SearchBoxSchema } from "@/types/Search";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import SearchPageCard from "./Card";
import JobCard from "./Card";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedJobData, setSearchJobData] = useState<any[]>();
  const [jobData, setJobData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);
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

  if (!jobData) {
    return (
      <div className="h-[400px] w-full overflow-hidden flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleSearch = () => {
    const text = searchText.toLowerCase();
    const searchingWord = text.split(" ");

    const filteredJob = jobData.filter((job)=>{
      const jobField = `${job.jobTitle} ${job.jobDescription} ${job.location} ${job.companyName} ${job.slug} ${job.aboutCompany} ${job.applicationLink} ${job.salary}
    ${job.experience} ${job.skills} ${job.qualificationRequired} ${job.Role}`.toLowerCase();

    return searchingWord.every((word) => jobField.includes(word));
    })

    setSearchJobData(filteredJob);
    // console.log(filteredJob);
  };
  

  return (
    <>
      <div className="max-w-md mx-auto mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg ">
        <div className="flex gap-x-3">
          <input
            placeholder="Search here..."
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-900 focus:outline-none"
          />
          <Button
            type="submit"
            onClick={handleSearch}
            className="px-4 py-2 signInbut bg-purple-900 text-white rounded-lg hover:bg-purple-700  hover:ease-in-out flex items-center"
          >
            <FaSearch className="mr-2" />
            Search
          </Button>
        </div>
      </div>
      <div className="w-full">
      {searchText.length === 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 ml-7 mr-7 sm:ml-14 sm:mr-14 md:gap-x-5">
          {jobData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 ml-7 mr-7 sm:ml-14 sm:mr-14 md:gap-x-5">
          {searchedJobData?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div> 
      )}
    </div>
    </>
  );
};

export default SearchBox;
