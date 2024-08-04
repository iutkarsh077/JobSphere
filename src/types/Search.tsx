import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
const searchBox = z.object({
    text: z.string().min(1, {
        message: "Length of Search is minimum 1",
    })
})

export const searchBoxResolver = zodResolver(searchBox);
export type SearchBoxSchema = z.infer<typeof searchBox>
