import express from "express";
import { adminUserSchemaZod } from "../../validation/admin/adminUserSchemaZod";
import { validateRequest } from "../../middlewares";
import { handleAdminRegister } from "../../controllers/authController";

export const adminAuthRoutes = express.Router();

adminAuthRoutes
  .route("/register")
  .post(validateRequest(adminUserSchemaZod), handleAdminRegister);
