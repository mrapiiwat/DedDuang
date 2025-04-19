import prisma from "../../../common/config/prismaClient";
import { User } from "../models/auth.model";

export const registerService = async (userData: User) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const cuurrentAdmin = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};
