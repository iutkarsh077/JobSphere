"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export async function DeleteJob(id: string){
    revalidatePath("/allJobs");
    try {
        const deleteme = await prisma.jobs.delete({
            where: {
                id: id
            }
        })

        return {message: "Job deletion successful", status: true};
    } catch (error) {
        return {message: "Job Delete Failed", status: false}
    }
}