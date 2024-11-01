import express from "express";
import { inviteSchemaZod } from "../../validation/admin/inviteSchemaZod";
import { isAdmin } from "../../middlewares/checkRoles.middleware";
import { handleInvite } from "../../controllers/admin/invite.controller";
import { verifyToken } from "../../middlewares/verifyToken.middleware";

export const inviteRoutes = express.Router();


