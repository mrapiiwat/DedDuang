import { categorySchema } from "../models/category.model";
import * as categoryService from "../service/category.service";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { ZodError } from "zod";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const validateData = categorySchema.parse(req.body);
    const category = await categoryService.createCategory(validateData);

    res.status(StatusCodes.CREATED).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors[0].message,
      });
    } else if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getAllCategories();
    res.status(StatusCodes.OK).json({
      message: "Categories fetched successfully",
      data: category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    if (!category) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  }
};
