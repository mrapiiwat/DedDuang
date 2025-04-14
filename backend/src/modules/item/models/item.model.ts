import z from "zod";

export const itemsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  categoryId: z.string().min(1, "Category ID is required"),
});

export interface Item {
  name: string;
  description: string;
  image: string;
  categoryId: string;
}

