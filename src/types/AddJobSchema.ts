import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



const AddJob = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  location: z.string().min(1, "Location is required"),
  companyName: z.string().min(1, "Company name is required"),
  aboutCompany: z.string().min(1, "About company is required"),
  applicationLink: z.string().url("Invalid URL").min(1, "Application link is required"),
  salary: z.string().min(1, "Salary is required"), // You can also use number().min() for specific salary range validation
  experience: z.string().min(1, "Experience is required"), // Can be more specific, e.g., number().min(0)
  skills: z.string().min(1, "Skill is required"),
  qualificationRequired: z.string().min(1, "Qualification required is required"),
  jobRole: z.string().min(1, "Job role is required"),
  image: z.string().optional(),
  jobDescription: z.string().min(1, "Job description is required"),
});

export const AddJobResolver = zodResolver(AddJob);
export type AddJobSchema = z.infer<typeof AddJob>;
