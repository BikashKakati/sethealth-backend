import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodSchema } from "zod";
import { getFormattedValidationErrorList } from "../utils";

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.body);
      if(!result.success){
        const formattedErrorList = getFormattedValidationErrorList(result.error.issues);
       res.customResponse(400,"fields are not valid",formattedErrorList)
      }
      next();
    } catch (error) {
      res.customResponse(500,"Internal server error")
      }
  };




