import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
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
});

export interface User {
  name: string;
  dateOfBirth: Date;
  timeOfBirth?: string;
  image?: string;
  sex: "ชาย" | "หญิง";
  status: "มีคู่" | "โสด";
}
