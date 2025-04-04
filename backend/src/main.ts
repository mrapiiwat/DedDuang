import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use("/api", newsRoute);
app.use("/api", authRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
