"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { GetLatestJobs } from "@/services/GetLatestJobs";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

export function AppleCardsCarousel() {
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
                const myjob = jobData1.getAllLatestJobs?.slice(15, 21).reverse();
                  setJobData(myjob);
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
      Unlock Your Potential.
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


// const data = [
//   {
//     category: "Software Developer",
//     title: "Hello I am utkarsh singh.",
//     src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },

//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     content: <DummyContent />,
//   },
// ];
