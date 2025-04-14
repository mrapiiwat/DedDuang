import * as itemService from "../service/item.service";
import { itemsSchema } from "../models/item.model";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { ZodError } from "zod";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems();
    res.status(StatusCodes.OK).json({
      message: "Items fetched successfully",
      data: items,
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

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemById(parseInt(id));
    if (!item) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Item not found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "Item fetched successfully",
      data: item,
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

export const createItem = async (req: Request, res: Response) => {
  try {
    const parsedItem = itemsSchema.parse(req.body);
    const newItem = await itemService.createItem(parsedItem);
    res.status(StatusCodes.CREATED).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors,
      });
    }
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

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedItem = itemsSchema.parse(req.body);
    const updatedItem = await itemService.updateItem(parseInt(id), parsedItem);
    if (!updatedItem) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Item not found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors,
      });
    }
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

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await itemService.deleteItem(parseInt(id));
    if (!deletedItem) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Item not found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "Item deleted successfully",
      data: deletedItem,
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
