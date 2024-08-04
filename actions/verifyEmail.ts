"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function GetVerifyEmail(data: any) {
    const { email, otp } = data;
    revalidatePath("/signup");
    try {
        console.log(email, otp)
        // console.log("In server ", email);
        const getOTPfromdb = await prisma.superCarUser.findFirst({
            where: {
                email: email
            }
        })

        // console.log(otp, getOTPfromdb);
        if (getOTPfromdb?.verificationCode !== otp) {
            return { message: "Invalid Credentials", status: false }
        }

        let verificationCode = Math.round(Math.random() * 10000000).toString();
        const changeVerificationCode = await prisma.superCarUser.update({
            where: {
                email: getOTPfromdb?.email
            },
            data: {
                verificationCode: verificationCode,
                verified: true
            }
        })

        return { message: "OTP verified successfully", status: true }
    } catch (error: any) {
        return { message: "Something went wrong, Please Try again Later", status: false };
    }
}