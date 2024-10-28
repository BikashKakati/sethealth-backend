// src/@types/express.d.ts
import * as express from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Response {
      customResponse: (
        statusCode: number,
        message: string,
        data?: object
      ) => void;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload & { id: string };
  }
}
