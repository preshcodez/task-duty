import { z } from "zod";

// ==============================
// DUE DATE VALIDATION
// ==============================

const dueDateSchema = z
  .string()
  .min(1, "Due date is required")
  .transform((value) => new Date(value))
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: "Invalid due date",
  })
  .refine(
    (date) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    },
    {
      message: "Due date cannot be in the past",
    },
  );

// ==============================
// CREATE TASK
// ==============================

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z.string().trim().min(1, "Description is required"),

  dueDate: dueDateSchema,

  category: z.enum(["Work", "Personal", "Urgent"], {
    message: "Invalid task category",
  }),

  completed: z.boolean().optional(),
});

// ==============================
// UPDATE TASK
// ==============================

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .optional(),

  dueDate: dueDateSchema.optional(),

  category: z
    .enum(["Work", "Personal", "Urgent"], {
      message: "Invalid task category",
    })
    .optional(),

  completed: z.boolean().optional(),
});
