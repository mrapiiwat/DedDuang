import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
