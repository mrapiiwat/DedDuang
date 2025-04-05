import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { verify } from "jsonwebtoken";

const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }
  const decoded = verify(token, process.env.JWT_SECRET as string) as any;
  if (!decoded) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }
  if (decoded.role !== "ADMIN") {
    res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: Admins only" });
    return;
  }
  req.user = decoded;
  next();
};

export default authorizeAdmin;
