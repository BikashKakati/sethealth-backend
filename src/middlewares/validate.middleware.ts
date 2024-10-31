import { getFormattedValidationErrorList } from "../utils";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.body);
      if(!result.success){
        const formattedErrorList = getFormattedValidationErrorList(result?.error?.issues);
        return res.customResponse(400,"fields are not valid",formattedErrorList)
      }
      req.body = {...result.data};
      next();
    } catch (error) {
      return res.customResponse(500,"Internal server error")
      }
  };
