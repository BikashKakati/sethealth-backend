import express from "express";
import {
  adminUserLoginSchemaZod,
  adminUserSchemaZod,
} from "../../validation/admin/adminUserSchemaZod";
import { validateRequest } from "../../middlewares";
import {
  handleAdminRegister,
  handleLogin,
} from "../../controllers/authController";

export const adminAuthRoutes = express.Router();

adminAuthRoutes
  .route("/register")
  .post(validateRequest(adminUserSchemaZod), handleAdminRegister);

adminAuthRoutes
  .route("/login")
  .post(validateRequest(adminUserLoginSchemaZod), handleLogin);
