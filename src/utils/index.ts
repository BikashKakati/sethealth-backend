import { FormattedListType } from "../types";
import { tokenKey } from "../config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { ZodIssue } from "zod";

import { ZodSchema } from "zod";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; data: FormattedListType[] };

export const validateRequest = async <T>(
  schema: ZodSchema<T>,
  reqBody: T
): Promise<ValidationResult<T>> => {
  const result = await schema.safeParseAsync(reqBody);
  if (!result.success) {
    const formattedErrorList = getFormattedValidationErrorList(
      result?.error?.issues
    );
    return { success: false, data: formattedErrorList };
  }
  return { success: true, data: result.data };
};

export const generateTokens = (userID: ObjectId, userRole: string) => {
  try {
    const token = jwt.sign({ id: userID, role: userRole }, tokenKey, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    return { token: "", error: "Failed to generate token." };
  }
};

export const getFormattedValidationErrorList = (
  dataList: ZodIssue[]
): FormattedListType[] => {
  return dataList.map((item) => {
    return {
      errorField: item.path[0],
      errorMessage: item.message,
    };
  });
};
export const isInviteExpired = (
  createdAt: NativeDate | undefined,
  days: number
) => {
  if (createdAt) {
    const expirationTime = days * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    const currentTime = Date.now();
    return currentTime - new Date(createdAt).getTime() > expirationTime;
  }
};
