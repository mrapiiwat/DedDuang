import z from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().optional(),
  dateOfBirth: z.string().refine((date) => {
    return !isNaN(Date.parse(date)) && new Date(date) < new Date();
  }, "Invalid date format").refine((date) => {
    const parsedDate = new Date(date);
    return parsedDate.getFullYear() >= 1900 && parsedDate.getFullYear() <= new Date().getFullYear();
  }, "Invalid date of birth"),
  timeOfBirth: z.string().min(1, "Time of Birth is required").optional(),
  image: z.string().optional(),
  sex: z.enum(["ชาย", "หญิง"]),
  status: z.enum(["มีคู่", "โสด"]),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export const authSchemaLogin = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export interface User {
  email: string;
  password: string;
  name?: string;
  dateOfBirth: Date;
  timeOfBirth?: string;
  image?: string;
  sex: "ชาย" | "หญิง";
  status: "มีคู่" | "โสด";
  role?: "ADMIN" | "USER";
}
