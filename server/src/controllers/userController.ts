import { Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import * as userService from "../service/userService";

import { uploadImage } from "../utils/uploadImage";
import { AuthRequest } from "../types/express";

// GET MY PROFILE
export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
    return;
  }

  const user = await userService.getMe(req.user._id.toString());

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

// UPDATE MY PROFILE
export const updateMe = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
    return;
  }

  let avatar: string | undefined;

  if (req.file) {
    const uploadedImage = await uploadImage(
      req.file.buffer,
      "taskduty/profile-images",
    );

    avatar = uploadedImage.secure_url;
  }

  const user = await userService.updateMe(req.user._id.toString(), {
    ...req.body,
    ...(avatar && { avatar }),
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    data: {
      user,
    },
  });
});
