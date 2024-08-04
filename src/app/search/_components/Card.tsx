import Link from "next/link";
import React from "react";

const JobCard = ({ job }: { job: any }) => {
  return (
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
          <Link href={job.slug}>
          <button className="py-2 px-4 signInbut bg-purple-900 text-white  rounded-lg hover:bg-purple-700  hover:ease-in-out duration-300">
            Know More
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
