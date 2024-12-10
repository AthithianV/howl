import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(1, {message: "UID Missing"}),
    email: z.string().email({message: "Invalid Email"}).min(1, {message: "Email Missing"}),
    password: z.string().min(6, {message: "Password Length must be at least 6"})
})