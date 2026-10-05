import express from "express";

import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import protect from "../middleware/authMiddleware";
import { validate } from "../middleware/validateMiddleware";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validation/taskValidation";

const router = express.Router();

// ==========================================
// TASK ROUTES
// ==========================================

router
  .route("/")
  .post(protect, validate(createTaskSchema), createTask)
  .get(protect, getAllTasks);

router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, validate(updateTaskSchema), updateTask)
  .delete(protect, deleteTask);

export default router;
