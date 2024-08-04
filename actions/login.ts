"use server";
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { loginSchema } from "@/types/SchemaLogin";

export async function LoginUser(data: loginSchema) {
    const { email, password } = data;
    revalidatePath("/login");
    try {
        const res  = await prisma.superCarUser.findFirst({
            where: {
                email
            }
        })

        if(!res?.verified){
            return {message: "Only Verified Users can login", status: false};
        }
        // console.log(res);
        if(!res){
            return {message: "User not exist", status: false};
        }

        const comparePassword = await bcryptjs.compare(password, res.password as string)

        if(!comparePassword){
            return {message: "Invalid Credentials", status: false};
        }

        let token = jwt.sign({name: res.name, email: res.email, verified: res.verified, role: res.role, profile: res.profileImage, coverImage: res.coverImage}, process.env.JWT_SECRET!, {expiresIn: '10d'});

        const cookieStore = cookies();
        const cookie = cookieStore.set('mycar', token, {httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)});

        return {message: "Loggedin successful",  status: true};
    } catch (error: any) {
        return { message: "Something went wrong, Please Try again Later", status: false };

    }
}