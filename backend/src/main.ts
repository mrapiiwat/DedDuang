import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

app.use(cors());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});