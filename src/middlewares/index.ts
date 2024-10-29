import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { tokenKey, tokenName } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";


export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => {
          console.log(issue);
          const fieldName = issue.path.join(".");
          const errMessages = {
            [fieldName]: issue.message,
          };
          return errMessages;
        });
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const token = req.cookies[tokenName];
    if (!token) {
      return res.customResponse(401, "unauthorized request");
    }
  
    try {
      const decode = jwt.verify(token, tokenKey) as JwtPayload;
  
      if (!decode.id) {
        return res.customResponse(403, "Invalid Token");
      }
  
      req.user!.id = decode.id;
      next();
    } catch (err) {
      if ((err as jwt.JsonWebTokenError).name === "TokenExpiredError") {
        return res.customResponse(401, "Token has expired");
      }
    }
  };
