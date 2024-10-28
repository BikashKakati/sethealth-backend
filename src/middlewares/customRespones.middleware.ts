import { NextFunction, Request, Response } from "express";

export const customResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.customResponse = (statusCode: number, message: string, data = {}) => {
    res.status(statusCode).json({
      message,
      data,
      success: statusCode < 400,
    });
  };
  next();
};
