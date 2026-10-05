import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

import { ApiError } from "../utils/ApiError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0];

      next(new ApiError(400, firstError.message));

      return;
    }

    req.body = result.data;

    next();
  };
