import { Request } from "express";
import { DecodedToken } from "../../interface/user.interface";

declare module "express" {
    interface Request {
        user?: DecodedToken;
    }
}
