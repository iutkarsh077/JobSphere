"use client";
import { AddJobResolver, AddJobSchema } from "@/types/AddJobSchema";
import { Loader2 } from "lucide-react";
import React, { MouseEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/use-toast";

import axios from "axios";
import { useRouter } from "next/navigation";
import { UserDetails } from "../../../actions/AdminUserDetails";
import { EditJobResolver, EditJobSchema } from "@/types/EditJobSchema";
import { EditJobsAction } from "../../../actions/EditJob";

const EditJobForm = ({jobDetails}: {jobDetails: any}) => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [getUserDetails, setGetUserDetails] = useState<any>([]);

  useEffect(() => {
    const res = async () => {
      const myval = await UserDetails();
      setGetUserDetails(myval);
      if(!myval.status){
        router.push("/");
      }
    };
    res();
  }, []);


  const form = useForm<EditJobSchema>({
    resolver: EditJobResolver,
    defaultValues: {
      Jobid: jobDetails.id,
      jobTitle: jobDetails.jobTitle,
      slug: jobDetails.slug,
      location: jobDetails.location,
      companyName: jobDetails.companyName,
      aboutCompany: jobDetails.aboutCompany,
      applicationLink: jobDetails.applicationLink,
      salary: jobDetails.salary,
      experience: jobDetails.experience,
      skills: jobDetails.skills,
      qualificationRequired: jobDetails.qualificationRequired,
      jobRole: jobDetails.jobRole,
      image: "",
      jobDescription: jobDetails.jobDescription,
    },
  });
  // console.log(jobDetails)
    
  const handleJobUpload = async (data: EditJobSchema) => {
    data.image = imageUrl;
    data.Jobid = jobDetails.id;
    // console.log(data);
    if(!imageUrl){
        toast({
            title: "Image is Required",
            duration: 2000
        })
        return;
    }
    try {
        setIsLoading(true);
        // console.log(data);
        const res = await EditJobsAction(data);
        // console.log(res);
        form.reset();
        toast({
          title: 'Job updated successfully!',
          duration: 2000
      })
    } catch (error) {
        // console.log(error);
        toast({
            title: 'Something went wrong!'
        })
    }finally{
        setIsLoading(false);
    }
  };

  const UploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    try {
      const res = await axios.post("/api/JobImageUpload", formData);
      setImageUrl(res.data.imageUrl);
      setIsImageUploaded(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : null;
    if (
      file?.type === "application/pdf" ||
      file?.type === "application/msword" ||
      file?.type === "video/mp4" ||
      file?.type === "application/x-zip-compressed"
    ) {
      toast({
        title: "Unsupported file type",
        description: "Please upload an image file",
      });
      file = null;
      setSelectedFile("");
      return;
    }
    setSelectedFile(file);
  };

  //   console.log(imageUrl)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Upload Section */}
      <div className="mb-8">
  {/* Display the uploaded image if available */}
  {jobDetails.image && (
    <div className="mb-4 flex justify-center">
      <img
        src={jobDetails.image}
        alt="Uploaded Preview"
        className="w-32 h-32 object-cover rounded-md border border-gray-300"
      />
    </div>
  )}

  <div className="mt-4 flex flex-col items-center">
    <form className="flex flex-col items-center space-y-4">
      <input
        type="file"
        name="jobImage"
        onChange={handleFileChange}
        className="file:border file:border-gray-300 file:rounded file:py-2 file:px-4 file:bg-gray-50 file:text-gray-700 file:cursor-pointer"
      />
      <Button
        type="button"
        onClick={UploadImage}
        disabled={isImageUploaded}
        className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
      >
        {imageUrl ? "Image uploaded" : "Upload Image"}
      </Button>
    </form>
  </div>
</div>

      {/* Form Section */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleJobUpload)}
          className="space-y-4"
        >
          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the job title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a unique slug..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the job location..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the company name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* About Company */}
          <FormField
            control={form.control}
            name="aboutCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">About Company</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description about the company..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Application Link */}
          <FormField
            control={form.control}
            name="applicationLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Application Link
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the application URL..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Salary */}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Salary</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the salary range..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Experience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the required experience..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Skills</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the qualifications required..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Qualification Required */}
          <FormField
            control={form.control}
            name="qualificationRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Qualification Required
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the qualifications required..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Role */}
          <FormField
            control={form.control}
            name="jobRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Role</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the job role..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the job description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            // onClick={handleJobUpload}
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-gray-800" : ""}`}
          >
            {isLoading ? (
              <span className="flex gap-x-2 items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditJobForm;
