import User from "../models/userModel";
import { ApiError } from "../utils/ApiError";

// ==========================================
// GET MY PROFILE
// ==========================================

export const getMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password -otp -otpExpires");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// ==========================================
// UPDATE MY PROFILE
// ==========================================

interface UpdateMeInput {
  username?: string;
  avatar?: string | null;
}

export const updateMe = async (userId: string, input: UpdateMeInput) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // ==========================================
  // UPDATE USERNAME
  // ==========================================

  if (input.username !== undefined) {
    const username = input.username.trim();

    if (!username) {
      throw new ApiError(400, "Username cannot be empty.");
    }

    if (username.length < 4) {
      throw new ApiError(400, "Username must be at least 4 characters.");
    }

    if (username.length > 30) {
      throw new ApiError(400, "Username cannot exceed 30 characters.");
    }

    const existingUser = await User.findOne({
      username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Username is already taken.");
    }

    user.username = username;
  }

  // ==========================================
  // UPDATE AVATAR
  // ==========================================

  if (input.avatar !== undefined) {
    user.avatar = input.avatar;
  }

  await user.save();

  return User.findById(userId).select("-password -otp -otpExpires");
};
