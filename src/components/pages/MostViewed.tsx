"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

export function MostViewed() {
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
                const jobData = jobData1.getAllLatestJobs?.slice(7, 14).reverse();
                  setJobData(jobData);
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

  if(!jobData){
    return(
      <div className="flex items-center justify-center">

        </div>
    )
  }

  const data2 = jobData.map((job) => ({
    id: job.id,
    slug: job.slug,
    category: job.jobTitle,
    title: job.salary,
    src: job.image,
    content: <DummyContent description={job.jobDescription as string} image={job.image} />,
  }));
  
  const cards = data2.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));


  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 lg:pl-0 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
      Your Next Opportunity.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ description, image }: {description: string, image: string}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        {description}
      </p>
      <img
        src={image}
        alt="Job related visual representation"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg"
      />
    </div>
  );
};
