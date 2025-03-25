import { Request, Response } from "express";
import * as newsService from "../service/news.service";
import { newsSchema } from "../models/news.model";
import StatusCodes from "http-status-codes";
import { ZodError } from "zod";

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await newsService.getNews();
    res.status(StatusCodes.OK).json(news);
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

export const createNews = async (req: Request, res: Response) => {
  try {
    const news = newsSchema.parse(req.body);
    const newNews = await newsService.createNews(news);
    res.status(StatusCodes.CREATED).json(newNews);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.errors });
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

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await newsService.deleteNews(id);
    res.status(StatusCodes.NO_CONTENT).send();
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