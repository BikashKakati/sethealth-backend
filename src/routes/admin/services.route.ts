import { validateRequest } from "../../middlewares/validate.middleware";
import { handleCreateServices, handleGetAllServices } from "../../controllers/admin/services.controller";
import express from "express";
import { servicesSchemaZod } from "../../validation/admin/servicesSchemaZod";

export const adminServiceRoutes = express.Router();

adminServiceRoutes.route("/create").post(validateRequest(servicesSchemaZod),handleCreateServices)
adminServiceRoutes.route("/get-all").get(handleGetAllServices)