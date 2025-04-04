import prisma from "../../../config/prismaClient";
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
