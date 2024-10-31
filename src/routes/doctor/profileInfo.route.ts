import { handleAddProfile } from "../../controllers/doctor/profile.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { doctorProfileSchemaZod } from "../../validation/doctor/doctorProfileSchemaZod";
import express from "express";

export const doctorProfileInfoRoutes = express.Router();

doctorProfileInfoRoutes
  .route("/add-profile")
  .post(validateRequest(doctorProfileSchemaZod), handleAddProfile);
