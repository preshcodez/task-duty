import Task from "../models/taskModel";

import { ApiError } from "../utils/ApiError";

// ==========================================
// CREATE TASK
// ==========================================

export const createTask = async (
  userId: string,
  input: {
    title: string;
    description: string;
    dueDate: string;
    category: "Work" | "Personal" | "Urgent";
    completed: boolean;
  },
) => {
  const task = await Task.create({
    title: input.title,
    description: input.description,
    dueDate: input.dueDate,
    category: input.category,
    completed: input.completed,
    user: userId,
  });

  return task;
};

// ==========================================
// GET ALL TASKS
// ==========================================

export const getAllTasks = async (
  userId: string,
  filters?: {
    category?: "Work" | "Personal" | "Urgent";
    completed?: boolean;
  },
) => {
  const query: {
    user: string;
    category?: "Work" | "Personal" | "Urgent";
    completed?: boolean;
  } = {
    user: userId,
  };

  // Filter by category
  if (filters?.category) {
    query.category = filters.category;
  }

  // Filter by completed status
  if (filters?.completed !== undefined) {
    query.completed = filters.completed;
  }

  return Task.find(query).sort({
    createdAt: -1,
  });
};

// ==========================================
// GET ONE TASK
// ==========================================

export const getTask = async (userId: string, taskId: string) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

// ==========================================
// UPDATE TASK
// ==========================================

export const updateTask = async (
  userId: string,
  taskId: string,
  input: {
    title?: string;
    description?: string;
    dueDate?: Date;
    category?: "Work" | "Personal" | "Urgent";
    completed?: boolean;
  },
) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (input.title !== undefined) {
    task.title = input.title;
  }

  if (input.description !== undefined) {
    task.description = input.description;
  }

  if (input.dueDate !== undefined) {
    task.dueDate = input.dueDate;
  }

  if (input.category !== undefined) {
    task.category = input.category;
  }

  if (input.completed !== undefined) {
    task.completed = input.completed;
  }

  return task.save();
};

// ==========================================
// DELETE TASK
// ==========================================

export const deleteTask = async (userId: string, taskId: string) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.deleteOne();
};
