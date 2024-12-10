import { z } from "zod";

export const LogInSchema = z.object({
    email: z.string().email({message: "Invalid Email"}).min(1, {message: "Email Missing"}),
    password: z.string().min(6, {message: "Password Length must be at least 6"})
})