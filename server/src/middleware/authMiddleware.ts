import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { AuthRequest } from "../types/express";

interface DecodedToken extends JwtPayload {
  id: string;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token: string | undefined;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        res.status(500).json({
          message: "Server Configuration Error",
        });
        return;
      }

      // Verify token
      const decoded = jwt.verify(token!, secret) as unknown as DecodedToken;

      // Get user from the token payload
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(404).json({
          message: "User not Found",
        });
        return;
      }

      // Attach authenticated user to request
      req.user = user;

      next();
      return;
    } catch (error) {
      res.status(401).json({
        message: "Not Authorized, token failed",
      });
      return;
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not Authorized, No token",
    });
    return;
  }
};

export default protect;
