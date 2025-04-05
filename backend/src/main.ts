import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//Swagger Setup
import { setupSwagger } from "./common/config/swagger";

// Import Router
import newsRoute from "./modules/news/routes/news.route";
import authRoute from "./modules/auth/routes/auth.route";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

app.use(cors());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

//Routes
app.use("/api", newsRoute);
app.use("/api", authRoute);

// 404 Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: `Not Found: ${req.originalUrl}`,
    message: "The requested resource was not found.",
    suggestion: `Check the URL or refer to the API documentation at http://localhost:${port}/api-docs.`,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
