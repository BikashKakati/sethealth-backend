// src/@types/express.d.ts
import * as express from "express";

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
