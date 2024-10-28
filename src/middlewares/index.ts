import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => {
          const fieldName = issue.path.join(".");
          const errMessages = {
            [fieldName]: `${fieldName} is ${issue.message}`,
          };
          return errMessages;
        });
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
