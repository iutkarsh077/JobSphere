"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export async function GetADedicatedJob(slug: string){
    revalidatePath("/");
    try {
        const getJob = await prisma.jobs.findUnique({
            where: {
                slug: slug
            }
        })

        console.log(getJob);
        return {message: "Latest jobs are retrieved", status: true, getJob}
    } catch (error) {
        return {message: "Something went wrong", status: false};
    }
}