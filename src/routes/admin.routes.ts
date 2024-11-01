import express from "express";
import { handleCreateServices, handleGetAllServices } from "../controllers/admin/services.controller";
import { handleGetAllDoctors, handleGetDoctorById } from "../controllers/admin/doctors.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/checkRoles.middleware";
import { handleInvite } from "../controllers/admin/invite.controller";

export const adminRouter = express.Router();


adminRouter.route("/doctors").get(handleGetAllDoctors)
adminRouter.route("/doctors/:id").get(handleGetDoctorById)
adminRouter
  .route("/invite-doctors")
  .post(verifyToken, isAdmin, handleInvite);

adminRouter.route("/patients").get()

adminRouter.route("/services").get(handleGetAllServices)
adminRouter.route("/services/:id").get()//handleGetServiceById
adminRouter.route("/services/create").post(handleCreateServices)
adminRouter.route("/services/edit/:id").put()//handleEditServices