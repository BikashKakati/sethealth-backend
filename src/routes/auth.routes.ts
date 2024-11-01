import express from "express";
import {
  handleLogin,
  handleRegister
} from "../controllers/auth.controller";

export const authRoutes = express.Router();

authRoutes
  .route("/register")
  .post(handleRegister);

  authRoutes
  .route("/login")
  .post(handleLogin);
