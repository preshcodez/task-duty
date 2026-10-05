import bcrypt from "bcryptjs";

import User from "../models/userModel";
import { sendEmail } from "../utils/sendEmail";
import generateToken from "../utils/generateToken";
import { ApiError } from "../utils/ApiError";

interface RegisterInput {
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

// REGISTER
export const registerUser = async (input: RegisterInput) => {
  const username = input.username.trim();
  const emailAddress = input.emailAddress.trim().toLowerCase();

  if (!username || !emailAddress || !input.password || !input.confirmPassword) {
    throw new ApiError(400, "All Fields are Required");
  }

  if (input.password !== input.confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existingUser = await User.findOne({
    $or: [{ emailAddress }, { username }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "An account with this email or username already exists.",
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(input.password, salt);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = new User({
    username,
    emailAddress,
    password: hashedPassword,
    isVerified: false,
    otp,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000),
  });

  await user.save();

  await sendEmail(
    user.emailAddress,
    "Verify your TaskDuty account",
    `
      <div>
        <h2>Welcome to TaskDuty</h2>

        <p>
          Your verification code is:
          <strong>${otp}</strong>
        </p>

        <p>
          This code expires in 10 minutes.
        </p>
      </div>
    `,
  );

  return {
    _id: user._id,
    username: user.username,
    emailAddress: user.emailAddress,
  };
};

// VERIFY EMAIL
export const verifyEmail = async (emailAddress: string, otp: string) => {
  const normalizedEmail = emailAddress.trim().toLowerCase();

  const user = await User.findOne({
    emailAddress: normalizedEmail,
  }).select("+otp +otpExpires");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (
    !user.otp ||
    !user.otpExpires ||
    user.otp !== otp ||
    user.otpExpires.getTime() < Date.now()
  ) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  };
};

// LOGIN
export const loginUser = async (emailAddress: string, password: string) => {
  const normalizedEmail = emailAddress.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new ApiError(400, "All Fields are required.");
  }

  const user = await User.findOne({
    emailAddress: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email/username or password.");
  }

  if (!user.password && user.googleId) {
    throw new ApiError(401, "This account uses Google Login.");
  }

  if (!user.password) {
    throw new ApiError(401, "Invalid email/username or password.");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email/username or password.");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  };
};

// GOOGLE LOGIN
export const googleLogin = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!user.isVerified) {
    user.isVerified = true;
    await user.save();
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      emailAddress: user.emailAddress,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  };
};
