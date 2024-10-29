import { tokenKey } from "../config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const secretKey: string = tokenKey!;

export const generateTokens = (userID: ObjectId, userRole: string) => {
  try {
    const token = jwt.sign({ id: userID, role: userRole }, secretKey, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    return { token: "", error: "Failed to generate token." };
  }
};
