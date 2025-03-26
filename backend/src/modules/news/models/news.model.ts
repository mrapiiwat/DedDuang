import z from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "title is required"),
  url: z.string().min(1, "url is required"),
  imageUrl: z.string().min(1, "imageUrl is required"),
});

export interface News {
  title: string;  
  url: string;
  imageUrl: string;
}
