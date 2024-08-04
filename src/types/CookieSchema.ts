import * as z from "zod";

const cookieZod = z.object({
    email: z.string().email(),
      name: z.string().min(3)
})

export type cookieSchema = z.infer<typeof cookieZod>;