"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import Sendit from "@/helpers/Sendit";

export async function sentOtp(myEmail: string) {
    revalidatePath("/login");
    try {
        if (!myEmail) {
            return { message: "Email ID forbidden, Try again", status: false }
        }

        const isAlreadyVerified = await prisma.superCarUser.findFirst({
            where: {
                email: myEmail
            }
        })

        if (!isAlreadyVerified) {
            return { message: "Invalid Credentials", status: false }
        }

        if (isAlreadyVerified.verified === true) {
            return { message: "Your are already verified", status: true };
        }


        await Sendit({ to: isAlreadyVerified.email, name: isAlreadyVerified.name || "User", subject: "Verification of Email", body: isAlreadyVerified.verificationCode });

        return { message: "Email sent successfully", status: true }
    } catch (error) {
        return { message: "Something went wrong", status: false }
    }
}