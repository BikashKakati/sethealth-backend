import { Router } from "express";
import { handleAddProfile } from "../controllers/doctor/profile.controller";


export const doctorRouter = Router();

doctorRouter.route("/profile/new").post(handleAddProfile)
doctorRouter.route("/profile/edit").put(handleAddProfile)