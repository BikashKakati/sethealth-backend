import { validateRequest } from "../../middlewares/validate.middleware";
import { handleCreateServices } from "../../controllers/admin/createServices.controller";
import express from "express";
import { servicesSchemaZod } from "../../validation/admin/servicesSchemaZod";

export const adminServiceRoutes = express.Router();

adminServiceRoutes.route("/create").post(validateRequest(servicesSchemaZod),handleCreateServices)