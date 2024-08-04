"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "../ui/button";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { toast } from "../ui/use-toast";
import { Loader2 } from 'lucide-react';
import { TruncateWord } from "@/helpers/truncateWords";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";

interface Job {
    id: string;
    jobTitle: string;
    slug: string | null;
    location: string | null;
    companyName: string | null;
    aboutCompany: string | null;
    applicationLink: string | null;
    salary: string | null;
    experience: string | null;
    skills: string[];
    qualificationRequired: string | null;
    jobRole: string | null;
    jobDescription: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface JobResponse {
    message: string;
    status: boolean;
    getAllLatestJobs: Job[];
  }

export default function Carousel() {
    const [jobData, setJobData] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        const getJobs = async () =>{
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
                    description: "Please refresh the Page"
                })
            }finally{
                setIsLoading(false)
            }
        }
        getJobs();
    }, []);

  return (
    <>
    {
        isLoading ? (<div className="h-[400px] w-full  flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </div>) :(<div className="ml-4 mr-4 mt-3">
            <Swiper
              direction={"horizontal"}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper rounded-lg"
            >
              {jobData && jobData.slice(0, 5).map((job: any) => (
                <div key={job.id}>
                  <SwiperSlide className="">
                    <div className="flex justify-center h-full p-3">
                      <div className="mb-4 flex items-center rounded-md  justify-end md:mb-0 md:mr-4 w-1/2">
                        <img
                          src={job.image}
                          alt={`Image for ${job.jobTitle}`}
                          className="w-auto rounded-md"
                        />
                      </div>
      
                      {/* Details */}
                      <div className="md:ml-4 pl-5 w-full md:w-1/2 flex justify-center flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {job.jobTitle}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {TruncateWord(job.jobDescription, 100)}...
                        </p>
                        <div className="text-gray-500 dark:text-gray-400 mb-2">
                          <p>
                            <strong>Location:</strong> {job.location}
                          </p>
                          <p>
                            <strong>Company:</strong> {job.companyName}
                          </p>
                        </div>
                        <Link href={`/${job.slug}`}>
                        <Button className="mt-4 signInbut bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-700  hover:ease-in-out transition-transform duration-500 transform hover:rotate-12 hover:shadow-3xl">
                          Know More
                        </Button></Link>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>)
    }
    </>
  );
}
