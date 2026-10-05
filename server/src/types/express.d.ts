import { Request } from "express";
import { IUser } from "../models/userModel";

export interface AuthRequest extends Request {
  user?: IUser;
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export {};
