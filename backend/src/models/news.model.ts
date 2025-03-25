import z from "zod";

export const newsSchema = z.object({
  url: z.string().min(1, "url is required"),
  imageUrl: z.string().min(1, "imageUrl is required"),
});

export interface News {
  url: string;
  imageUrl: string;
}
