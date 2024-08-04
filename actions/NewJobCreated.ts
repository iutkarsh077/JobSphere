"use server";

import { AddJobSchema } from "@/types/AddJobSchema";
import prisma from "../prisma";

export async function NewJobCreated(data: AddJobSchema){
        console.log(data);
        try {
            const saveJob = await prisma.jobs.create({
                data: {
                    ...data
                }
            })
        } catch (error) {
            console.log(error);
            return {message: "Something went wrong", status: false};
        }
}