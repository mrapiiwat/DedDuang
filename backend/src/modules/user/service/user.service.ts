import prisma from "../../../common/config/prismaClient";
import { User } from "../models/user.model";

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      dateOfBirth: true,
      timeOfBirth: true,
      image: true,
      sex: true,
      status: true,
    },
  });
};

export const updateUserById = async (userId: string, data: User) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

export const deleteUserById = async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
