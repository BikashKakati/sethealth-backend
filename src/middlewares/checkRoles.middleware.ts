import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.customResponse(403, "You are not authorised to access information");
  }
  next();
};

export const isDoctor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "doctor") {
    return res.customResponse(403, "You are not authorised to access information");
  }
  next();
};
