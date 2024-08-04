"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export async function GetLatestJobs(){
    revalidatePath("/");
    try {
        const getAllLatestJobs = await prisma.jobs.findMany({
            orderBy: {
                createdAt: "desc",
            }
        })

        // console.log(getAllLatestJobs);
        return {message: "Latest jobs are retrieved", status: true, getAllLatestJobs}
    } catch (error) {
        return {message: "Something went wrong", status: false};
    }
}