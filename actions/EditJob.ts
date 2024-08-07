"use server";

import { EditJobSchema } from "@/types/EditJobSchema";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function EditJobsAction(data: EditJobSchema){
    revalidatePath("/editJob");
    console.log(data);
    try {
        const editJob = await prisma.jobs.update({
            where: {
                id: data.Jobid
            },
            data: {
                jobTitle: data.jobTitle,
                slug: data.slug,
                location: data.location,
                companyName: data.companyName,
                aboutCompany: data.aboutCompany,
                applicationLink: data.applicationLink,
                salary: data.salary,
                experience: data.experience,
                skills: data.skills,
                qualificationRequired: data.qualificationRequired,
                jobRole: data.jobRole,
                image: data.image,
                jobDescription: data.jobDescription
            }
        })

        if(!editJob){
            throw new Error("Job update gone wrong!");
        }
        // console.log(editJob)
        return {message: "Job is updated successfully", status: true};
    } catch (error) {
        console.log(error);
        return {message: "Something went wrong", status: false}
    }
}