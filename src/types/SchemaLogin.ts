import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginValidator = z.object({
  email: z.string().email({
    message: "Invalid Email detail"
  }),
  password: z.string().min(6),
  googleId: z.string().optional(),
  verificationCode: z.string().optional(),
  verified: z.boolean().optional(),
});

export const loginResolver = zodResolver(loginValidator);
export type loginSchema = z.infer<typeof loginValidator>