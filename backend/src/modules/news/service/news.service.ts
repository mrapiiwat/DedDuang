import prisma from "../../../config/prismaClient";
import { News } from "../models/news.model";

export const getNews = async (skip: number, limit: number) => {
  return await prisma.news.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createNews = async (data: News) => {
  return await prisma.news.create({
    data,
  });
};

export const deleteNews = async (id: string) => {
  return await prisma.news.delete({
    where: {
      id,
    },
  });
};
