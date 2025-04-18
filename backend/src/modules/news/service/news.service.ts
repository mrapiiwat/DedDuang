import prisma from "../../../common/config/prismaClient";
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

export const getAllNews = async () => {
  return await prisma.news.findMany({
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

export const updateNews = async (id: string, data: News) => {
  return await prisma.news.update({
    where: {
      id,
    },
    data,
  });
};
