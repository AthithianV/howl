import { z } from "zod";

export const ProfileFormSchema = z.object({
    fullName: z.string({message: "Invalid Full Name"}),
    gender: z.enum(["MALE", "FEMALE", "OTHERS", "DO NOT WANT TO SHARE"]).nullable(),
    age: z.number().min(13).nullable(),
    occupation: z.string().nullable(),
    picture: z.string().nullable(),
    hobbies: z.string().nullable(),
    movies: z.string().nullable(),
    books: z.string().nullable(),
    animes: z.string().nullable(),
    foods: z.string().nullable(),
    pictureUrl: z.string(),
})