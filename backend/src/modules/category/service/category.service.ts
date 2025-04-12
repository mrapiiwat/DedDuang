import prisma from "../../../common/config/prismaClient";
import { Category } from "../models/category.model";

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    include: { Items: true },
  });
};

export const createCategory = async (data: Category) => {
  return await prisma.category.create({
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};
