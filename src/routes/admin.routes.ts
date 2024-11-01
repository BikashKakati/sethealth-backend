import express from "express";
import { handleCreateServices, handleGetAllServices } from "../controllers/admin/services.controller";
import { handleGetAllDoctors, handleGetDoctorById } from "../controllers/admin/doctors.controller";

export const adminRouter = express.Router();


adminRouter.route("/doctors").get(handleGetAllDoctors)
adminRouter.route("/doctors/:id").get(handleGetDoctorById)

adminRouter.route("/patients").get()

adminRouter.route("/services").get(handleGetAllServices)
adminRouter.route("/services/:id").get()//handleGetServiceById
adminRouter.route("/services/create").post(handleCreateServices)
adminRouter.route("/services/edit/:id").put()//handleEditServices