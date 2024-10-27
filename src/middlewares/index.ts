import { NextFunction, Request, RequestHandler, Response } from "express";
import { z, ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
        if (error instanceof z.ZodError) {
        //   const errors = error.errors.map((err) => ({
        //     field: err.path.join("."),
        //     message: err.message,
        //   }));
          res.status(400).json({
            status: "error",
            error,
          });
        }
      }
  };

