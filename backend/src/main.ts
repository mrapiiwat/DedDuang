import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

//Swagger Setup
import { setupSwagger } from "./common/config/swagger";

// Import Router
import newsRoute from "./modules/news/routes/news.route";
import authRoute from "./modules/auth/routes/auth.route";
import userRoute from "./modules/user/routes/user.route";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

// Middleware
app.use(cors());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

// Limit requests per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Too many requests, please try again later.",
});

app.use(limiter); // Apply rate limiting to all requests

//Routes
app.use("/api", newsRoute);
app.use("/api", authRoute);
app.use("/api", userRoute);


app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
