import { Request, Response } from "express";
import { AdminUser } from "../models/admin/adminUser.model";
import { AdminUserSchemaZodType } from "../validation/admin/adminUserSchemaZod";

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
