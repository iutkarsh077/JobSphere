import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupValidator = z.object({
  email: z.string().email({
    message: "Invalid Email detail"
  }),
  name: z.string().min(3, {
    message: "Name should have 2 characters"
  }),
  password: z.string().min(6),
  googleId: z.string().optional(),
  verificationCode: z.string().optional(),
  verified: z.boolean().optional(),
});

export const signupResolver = zodResolver(signupValidator);
export type signupSchema = z.infer<typeof signupValidator>