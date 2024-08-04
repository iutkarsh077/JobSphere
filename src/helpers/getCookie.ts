"use server";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCookie() {
    revalidatePath("/login");
    revalidatePath("/");
    const cookie = cookies();
    const myCarCookie = cookie.get("mycar")?.value as string;
    if(!myCarCookie){
        return;
    }
    // console.log(myCarCookie);
    const getUserDetails = jwt.verify(myCarCookie, process.env.JWT_SECRET!);
    // console.log(getUserDetails);
    return getUserDetails;
}