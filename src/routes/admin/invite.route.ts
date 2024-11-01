import express from "express";
import { validateRequest } from "../../middlewares/validate.middleware";
import { inviteSchemaZod } from "../../validation/admin/inviteSchemaZod";
import { isAdmin } from "../../middlewares/checkRoles.middleware";
import { handleInvite } from "../../controllers/invite.controller";
import { verifyToken } from "../../middlewares/verifyToken.middleware";

export const inviteRoutes = express.Router();

inviteRoutes
  .route("/inviteDoctors")
  .post(verifyToken, validateRequest(inviteSchemaZod), isAdmin, handleInvite);
