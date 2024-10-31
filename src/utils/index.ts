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

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
