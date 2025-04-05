import { authSchema, authSchemaLogin } from "../models/auth.model";
import * as authService from "../../auth/service/auth.service";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const validateData = authSchema.parse(req.body);
    const { password, dateOfBirth } = validateData;
    const image = req.file;

    //Check if user already exists
    const existingUser = await authService.findUserByEmail(validateData.email);
    if (existingUser) {
      //Delete image if user already exists
      if (image) {
        fs.unlink(image.path, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }
        });
      }
      res.status(StatusCodes.CONFLICT).json({
        message: "Email already exists",
      });
      return;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const userData = {
      ...validateData,
      password: hashedPassword,
      image: image?.path,
      dateOfBirth: new Date(dateOfBirth),
    };

    await authService.registerService(userData);

    res.status(StatusCodes.CREATED).json({
      message: "User Created Successfully",
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
        .json("Internal server error");
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validateData = authSchemaLogin.parse(req.body);
    const { email, password } = validateData;

    const user = await authService.findUserByEmail(email);

    //Check if user exists
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Invalid email or password",
      });
      return;
    }

    //Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
      });
      return;
    }

    const payloadUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    //Create JWT token
    const token = jwt.sign(payloadUser, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.status(StatusCodes.OK).json({
      message: `Login successful. Welcome back, ${user.email}!`,
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
        .json("Internal server error");
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};
