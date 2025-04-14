import prisma from "../../../common/config/prismaClient";
import { Item } from "../models/item.model";

export const getAllItems = async () => {
  return await prisma.item.findMany();
};

export const getItemById = async (id: number) => {
  return await prisma.item.findUnique({
    where: {
      id,
    },
  });
};

export const createItem = async (item: Item) => {
  return await prisma.item.create({
    data: item,
  });
};

export const updateItem = async (id: number, item: Item) => {
  return await prisma.item.update({
    where: {
      id,
    },
    data: item,
  });
};

export const deleteItem = async (id: number) => {
  return await prisma.item.delete({
    where: {
      id,
    },
  });
};
