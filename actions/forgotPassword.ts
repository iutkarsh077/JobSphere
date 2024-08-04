"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import prisma from "../prisma";
import bcryptjs from "bcryptjs";
export async function ServerForgotPassword(data: any) {
    const { email, password } = data;
    revalidatePath("/forgot-Password");
    try {
        const cookieStore = cookies();
        cookieStore.delete("mycar");

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const updatePassword = await prisma.superCarUser.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        })

        return {message: "Password Updated Successfully!", status: true};
    } catch (error) {
        return { message: "Server is not responding", status: false };
    }
}