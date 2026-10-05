import { z } from "zod";

// ==============================
// REGISTER
// ==============================

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, "Username must be at least 4 characters")
      .max(30, "Username cannot exceed 30 characters"),

    emailAddress: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ==============================
// VERIFY EMAIL
// ==============================

export const verifyEmailSchema = z.object({
  emailAddress: z.string().trim().toLowerCase().email("Invalid email address"),

  otp: z.string().length(6, "OTP must be 6 digits"),
});

// ==============================
// LOGIN
// ==============================

export const loginSchema = z.object({
  emailAddress: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

// ==============================
// UPDATE MY PROFILE
// ==============================

export const updateMeSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .max(30, "Username cannot exceed 30 characters")
    .optional(),

  avatar: z.string().nullable().optional(),
});
