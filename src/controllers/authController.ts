import { Request, Response } from "express";
import { AdminUser } from "../models/admin/adminUser.model";
import { AdminUserSchemaZodType } from "../validation/admin/adminUserSchemaZod";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils";
import { tokenName } from "../config";
import { cookieOptions } from "../constants";
import { ObjectId } from "mongoose";

export const handleAdminRegister = async (
  req: Request<{}, {}, AdminUserSchemaZodType>,
  res: Response
): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const adminUser = new AdminUser({ name, email, password, role });
    await adminUser.save();
    res.customResponse(200, "Admin Successfully Registered",adminUser);
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      res.customResponse( 400, "Email already exists");
    } else {
      res.customResponse(500, "Error registering admin user",error);
    }
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email }).select("+password");

  if (!user) {
    return res.customResponse(404, "User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.customResponse(400, "Password does not match");
  }
  const token = generateTokens(user._id as ObjectId);

  user.password = ""; // because it gives type error when assign undefined

  return res
    .cookie(tokenName, token, cookieOptions)
    .customResponse(200, "success", user);
};
