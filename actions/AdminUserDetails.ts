"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../prisma";

export async function UserDetails(){
    const cookie = cookies();
    const getObj = cookie.get("mycar");
    if(!getObj){
        return { message: "Cookie is not avilable", status: false };
    }

    const mycar = getObj.value;
    const decodeCookie = jwt.verify(mycar as string, process.env.JWT_SECRET!) as any;

    const findUser = await prisma.superCarUser.findUnique({
        where: {
            email: decodeCookie.email as string
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: false,
            verificationCode: false,
            profileImage: true,
            coverImage: true,
            role: true
          }
    })

    if(!findUser){
        return {message: "User not available", status: false};
    }

    if(findUser.role == "user"){
        return {message: "It is a user", status: false};
    }

    return {message: "Admin loggedin", status: true, findUser}
}