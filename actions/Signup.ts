"use server";
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { signupSchema } from "@/types/SchemaSignup";
import Sendit from "@/helpers/Sendit";

export async function SignupUser(data: signupSchema){
    revalidatePath("/signup");
    try {
        const { name, email, password } = data;


        const isuserAlreadyExist  = await prisma.superCarUser.findUnique({
            where: {
                email: email
            }
        })

        if(isuserAlreadyExist){
            return {message: "User Already exist", status: false}
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        let verificationCode = Math.round(Math.random() * 10000000).toString();
        // console.log(verificationCode);
        const res = await prisma.superCarUser.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                verificationCode: verificationCode,
            }
        })

        await Sendit({to: email, name: name || "User", subject: "Verification of Email",  body: verificationCode});

        return {message: "Account created Successfully", status: true}
    } catch (error) {
        console.log(error); 
        return {message: "Something went wrong!", status: false}
    }
}