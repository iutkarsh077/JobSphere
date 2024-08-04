"use server";
import nodemailer from "nodemailer";
import { render } from '@react-email/render';
import VerificationEmail from './VerificationEmail';
import { revalidatePath } from "next/cache";

export async function sendMail({
  to,
  name,
  subject,
  body,
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    // console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  const emailHtml = render(
    <VerificationEmail username={name} otp={body} />
  );


  try {
    revalidatePath("/login");
    revalidatePath("/forgot-Password");
    revalidatePath("/signup");
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: emailHtml,
    });
    // console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}