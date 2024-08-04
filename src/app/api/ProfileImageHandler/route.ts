"use server";
import jwt from "jsonwebtoken";
import { CloudinaryUploadResult, uploadImageCloudinary } from "@/lib/cloudinaryImageUploader";
import { cookies } from "next/headers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    revalidatePath("/profile");
    const formData = await req.formData();
    const cookieStore = cookies();
    const userCookie1 = cookieStore.get("mycar");
    const image = formData.get("file") as File;
    const text = formData.get("type") as string;
    console.log(formData.get("file"))
    const userCookie = userCookie1?.value;

    try {
        console.log(text);
        const CloudinaryImageLink = await uploadImageCloudinary(image, "posts") as CloudinaryUploadResult;
        // console.log("Image uploaded", CloudinaryImageLink);
        const decoded = jwt.verify(userCookie as string, process.env.JWT_SECRET!) as any;

        console.log("Decoded is: ",decoded);
        const userDetails = await prisma.superCarUser.findUnique({
            where: {
                email: decoded.email as string
            }
        })

        console.log("User Details are: " ,userDetails)
        if (!userDetails) {
            return NextResponse.json({ message: "User not found", status: false }, { status: 404 });
        }

        // console.log(userCookie1);
        // cookieStore.delete(userCookie1!);
        let details;
        if (text == "profile") {
            console.log("In if block of profile");
            const updateUser = await prisma.superCarUser.update({
                where: {
                    email: userDetails.email
                },
                data: {
                    profileImage: CloudinaryImageLink.url as any
                }
            })
            console.log("Updated user is: ", updateUser)
            details = updateUser;
        }

        if (text == "cover") {
            const updateUser = await prisma.superCarUser.update({
                where: {
                    email: userDetails.email
                },
                data: {
                    coverImage: CloudinaryImageLink.url as any
                }
            })
            details = updateUser;
        }

        console.log("The updated user is: ", details);
        let token = jwt.sign({ name: details!.name, email: details!.email, verified: details!.verified, profile: details!.profileImage, coverImage: details!.coverImage, role: details!.role }, process.env.JWT_SECRET!, { expiresIn: '10d' });

        const cookie = cookieStore.set('mycar', token, { httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });
        console.log(details);
        return NextResponse.json({ message: "Image uploaded Successfully", status: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Uploading Failed", status: false }, { status: 401 })
    }
}