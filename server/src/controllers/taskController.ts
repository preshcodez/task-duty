import { Response } from "express";

import * as taskService from "../service/taskService";

import { AuthRequest } from "../types/express";

import { catchAsync } from "../utils/catchAsync";

// ==========================================
// CREATE TASK
// ==========================================

export const createTask = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
      return;
    }

    const task = await taskService.createTask(
      req.user._id.toString(),
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: {
        task,
      },
    });
  },
);

// ==========================================
// GET ALL TASKS
// ==========================================

export const getAllTasks = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
      return;
    }

    const category = req.query.category as
      | "Work"
      | "Personal"
      | "Urgent"
      | undefined;

    const completed =
      req.query.completed !== undefined
        ? req.query.completed === "true"
        : undefined;

    const search = req.query.search as string | undefined;

    const tasks = await taskService.getAllTasks(req.user._id.toString(), {
      category,
      completed,
      search,
    });

    res.status(200).json({
      success: true,
      data: {
        tasks,
      },
    });
  },
);

// ==========================================
// GET ONE TASK
// ==========================================

export const getTask = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
    return;
  }

  const task = await taskService.getTask(
    req.user._id.toString(),
    req.params.id as string,
  );

  res.status(200).json({
    success: true,
    data: {
      task,
    },
  });
});

// ==========================================
// UPDATE TASK
// ==========================================

export const updateTask = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
      return;
    }

    const task = await taskService.updateTask(
      req.user._id.toString(),
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: {
        task,
      },
    });
  },
);

// ==========================================
// DELETE TASK
// ==========================================

export const deleteTask = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
      return;
    }

    await taskService.deleteTask(
      req.user._id.toString(),
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  },
);
