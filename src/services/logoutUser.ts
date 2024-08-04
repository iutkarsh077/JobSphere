"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function LogoutUser(){
    revalidatePath("/");
    try {
        const cookie  = cookies();
    const car = cookie.delete("mycar");
    return {message: "Logout Successful", status: true};
    } catch (error) {
        return {message: "Failed Logout", status: false};
    }
}