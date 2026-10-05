import express from "express";
import passport from "../config/passport";

import {
  register,
  verifyEmail,
  login,
  googleLogin,
} from "../controllers/authController";

import { getMe, updateMe } from "../controllers/userController";

import protect from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";
import { validate } from "../middleware/validateMiddleware";

import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  updateMeSchema,
} from "../validation/userValidation";

const router = express.Router();

// ==========================================
// AUTH ROUTES
// ==========================================

router.post("/register", validate(registerSchema), register);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post("/login", validate(loginSchema), login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleLogin,
);

// ==========================================
// PROFILE ROUTES
// ==========================================

router.get("/me", protect, getMe);

router.put(
  "/me",
  protect,
  upload.single("avatar"),
  validate(updateMeSchema),
  updateMe,
);

export default router;
