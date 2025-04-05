import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import * as userService from "../service/user.service";
import { ZodError } from "zod";
import { userSchema } from "../models/user.model";
import fs from "fs";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const validateData = userSchema.parse(req.body);

    if (validateData.dateOfBirth) {
      const dateOfBirth = new Date(validateData.dateOfBirth);
      if (isNaN(dateOfBirth.getTime())) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid date format",
        });
      }
    }

    // Check if an image is uploaded and handle it accordingly
    if (req.file) {
      //Delete old image if a new one is uploaded
      const existingUser = await userService.getUserById(userId);
      if (existingUser && existingUser.image) {
        const oldImagePath = `uploads/${existingUser.image}`;
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Failed to delete old image: ${err.message}`);
          }
        });
      }
    }

    const userData = {
      ...validateData,
      dateOfBirth: new Date(validateData.dateOfBirth),
      image: req.file ? req.file.filename : undefined,
    };

    const updatedUser = await userService.updateUserById(userId, userData);
    if (!updatedUser) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      message: "User updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
    } else if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUserById(userId);
    if (!deletedUser) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }

    // Delete the image from the server if it exists
    const imagePath = `uploads/${deletedUser.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Failed to delete image: ${err.message}`);
      }
    });
    res.status(StatusCodes.OK).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
  }
};
