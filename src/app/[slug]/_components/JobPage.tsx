"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { Spinner } from "@nextui-org/spinner";
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { FaLocationDot, FaMoneyBills } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { Loader2 } from "lucide-react";

function JobPage({ jobData }: { jobData: any }) {
  const [jobs, setJobs] = useState<any>([]);
  const toast = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const DESC = jobData?.jobDescription;
  const description = DESC.split("..");
  const title = jobData?.jobTitle || "";
  const companyDetails = jobData?.aboutCompany.split("..");
  const skills = jobData?.skills.split(",");

  useEffect(() => {
    const res = async () => {
      setIsLoading(true);
      try {
        const allJobs = await GetLatestJobs();
        let jobs = allJobs.getAllLatestJobs;
        let len = jobs?.length;
        let startIndex = Math.floor(Math.random() * len! || 6);
        let endIndex = Math.floor(Math.random() * len! || 6);

        if (startIndex > endIndex) {
          [endIndex, startIndex] = [startIndex, endIndex];
        }
        setJobs(jobs?.slice(startIndex, startIndex + 3));
      } catch (error) {
        toast.current.show({
          severity: "info",
          summary: "Rejected",
          detail: "Something went wrong",
          life: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    res();
  }, []);

  if (isLoading) {
    return (
      <div className=" w-full h-[400px] flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="mx-auto p-6 mb-20">
      <div className="lg:flex lg:gap-x-8">
        <div className="lg:w-3/5 shadow-lg dark:bg-[rgba(24,24,27,1)] rounded-xl dark:shadow-gray-800 p-6">
          <div className="lg:min-w-[400px] md:min-w-[300px] min-w-[200px] max-w-full mx-auto mb-8">
            <img
              src={jobData?.image}
              alt="poster"
              className="w-full rounded-[20px] shadow-lg ease-in-out duration-300 hover:cursor-pointer"
              width={500}
              height={500}
            />
            <div className="pt-6 font-semibold pb-4 flex justify-between">
              <h4 className="text-xs font-medium sm:block text-[#34EF95] bg-[#D7FCEA] hidden p-2 rounded-xl">
                {jobData.jobRole}
              </h4>
              <div className="space-x-2">
                
                <Link
                  href={jobData.applicationLink}
                  className="signInbut bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    target="_blank"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          <div className="pb-16">
            <h1 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.8rem] lg:text-[2.4rem] leading-tight space-y-5 font-semibold">
              {title}
            </h1>
            <div className="pt-6">
              <h3 className="text-2xl font-medium mb-4">Details</h3>
              <p className="text-lg font-light text-medium flex-wrap">
                {jobData.companyName} is hiring for {jobData.jobRole}
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Job Description</h3>
              <ul className="text-sm ml-4 pr-4 text-wrap rounded-lg list-outside list-disc">
                {description.map(
                  (item: any, index: number) =>
                    item.length > 0 && (
                      <li key={index} className="p-2 duration-200 text-wrap">
                        {item}.
                      </li>
                    )
                )}
              </ul>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Company Details</h3>
              <ul className="text-sm ml-4 pr-4 text-wrap rounded-lg list-outside list-disc">
                {companyDetails.map(
                  (item: any, index: number) =>
                    item.trim().length > 0 && (
                      <li key={index} className="p-2 duration-200 text-wrap">
                        {item}.
                      </li>
                    )
                )}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Job Role
                  </h3>
                  <p className="text-sm text-black text-wrap dark:text-white mt-1">
                    {jobData.jobRole}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <FaBriefcase className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Experience
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {jobData.experience}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <MdOutlineHomeWork className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Qualifications
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {jobData.qualificationRequired}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <PiExamFill className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Location
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {jobData.location}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <FaLocationDot className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Salary
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {jobData.salary}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <FaMoneyBills className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-500 transition-transform duration-500 transform hover:rotate-3 hover:cursor-pointer">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Skills Required
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 flex-wrap">
                    {skills.join(", ")}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <GiSkills className="text-blue-500 dark:text-blue-300 h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 mt-4 lg:mt-0">
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Similar Jobs
            </h2>
            {jobs.map((job: any, index: number) => (
              <Card key={index} className="w-full">
                <CardHeader className="flex items-center space-x-4">
                  <img
                    src={job.image || "/default-job-image.jpg"}
                    alt="Job Image"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                    <p className="text-sm text-gray-500">{job.companyName}</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {job.jobRole}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {job.location}
                  </p>
                </CardBody>
                <CardFooter>
                  <Link
                    href={`/${job.slug}`}
                    className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Apply Now
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
