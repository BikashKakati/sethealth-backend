import express from "express";
import { handleGetAllDoctors, handleGetDoctorById } from "../controllers/admin/doctors.controller";
import { handleInvite } from "../controllers/admin/invite.controller";
import { handleCreateServices, handleEditServices, handleGetAllServices } from "../controllers/admin/services.controller";

export const adminRouter = express.Router();


adminRouter.route("/doctors").get(handleGetAllDoctors)
adminRouter.route("/doctors/:id").get(handleGetDoctorById)
adminRouter
  .route("/invite-doctors")
  .post(handleInvite);

adminRouter.route("/patients").get()

adminRouter.route("/services").get(handleGetAllServices)
adminRouter.route("/services/:id").get()//handleGetServiceById
adminRouter.route("/services/create").post(handleCreateServices)
adminRouter.route("/services/edit/:id").put(handleEditServices)//handleEditServices