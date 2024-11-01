import { FormattedListType } from "../types";
import { smtpHost, smtpPass, smtpPort, smtpUser, tokenKey } from "../config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { ZodIssue } from "zod";
import nodemailer from "nodemailer";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

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

export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  templatePath: string,
  templateData: object
): Promise<void> => {
  try {
    const emailHtml = await ejs.renderFile(templatePath, templateData);

    await transporter.sendMail({
      from,
      to,
      subject,
      html: emailHtml,
    });

  } catch (error) {
    throw new Error("Failed to send email");
  }
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
