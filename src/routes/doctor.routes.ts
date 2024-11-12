import { Router } from "express";
import { handleAddProfile } from "../controllers/doctor/profile.controller";
import { handleGetAllDoctors } from "../controllers/admin/doctors.controller";

export const doctorRouter = Router();

doctorRouter.route("/profile/new").post(handleAddProfile);
doctorRouter.route("/profile/edit").put(handleAddProfile);
doctorRouter.route("/profile/edit").put(handleGetAllDoctors);
