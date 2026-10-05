import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as authService from "../service/authService";

// REGISTER
export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message:
      "Registered successfully. Check your email for a verification code.",
    data: result,
  });
});

// VERIFY EMAIL
export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { emailAddress, otp } = req.body;

  const result = await authService.verifyEmail(emailAddress, otp);

  res.status(200).json({
    success: true,
    message: "Email verified successfully.",
    data: result,
  });
});

// LOGIN
export const login = catchAsync(async (req: Request, res: Response) => {
 const { emailAddress, password } = req.body;

 const result = await authService.loginUser(emailAddress, password);

  res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: result,
  });
});

// GOOGLE LOGIN
export const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const user = (
    req as Request & {
      user?: {
        _id: import("mongoose").Types.ObjectId;
      };
    }
  ).user;

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Google authentication failed.",
    });
    return;
  }

  const result = await authService.googleLogin(user._id.toString());

  res.status(200).json({
    success: true,
    message: "Google login successful.",
    data: result,
  });
});
