import { z } from "zod";

export const GroupFormSchema = z.object({
    name: z.string().min(1, {message: "Name is Missing"}),
    description: z.string().max(100, {message: "Description can have only 100 charcters"}),
    theme: z.string().min(1, {message: "Theme is Missing"})
});