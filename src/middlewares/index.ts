import { NextFunction, Request, Response } from "express";
import { tokenKey, tokenName } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    req.user! = { id: decode.id, role: decode.role };
    next();
  } catch (err) {
    if ((err as jwt.JsonWebTokenError).name === "TokenExpiredError") {
      return res.customResponse(401, "Token has expired");
    }
  }
};
