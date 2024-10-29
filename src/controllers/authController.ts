import { Request, Response } from "express";
import { AdminUser } from "../models/admin/adminUser.model";
import { AdminUserSchemaZodType } from "../validation/admin/adminUserSchemaZod";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils";
import { tokenName } from "../config";
import { cookieOptions } from "../constants";

export const handleAdminRegister = async (
  req: Request<{}, {}, AdminUserSchemaZodType>,
  res: Response
): Promise<void> => {
  const { name, email, password, role } = req.body;
  try {
    const adminUser = new AdminUser({ name, email, password, role });
    await adminUser.save();
    res.customResponse(200, "Admin Successfully Registered");
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      res.status(500).json({
        message: "Error registering admin user",
        error,
      });
    }
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.customResponse(400, "email or password is invalid!");
  }

  const user: any = await AdminUser.findOne({ email }).select("+password");

  if (!user) {
    return res.customResponse(404, "User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.customResponse(400, "Password does not match");
  }
  const token = generateTokens(user._id);

  user.password = undefined;

  return res
    .cookie(tokenName, token, cookieOptions)
    .customResponse(200, "success", user);
};
