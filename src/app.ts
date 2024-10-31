import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminAuthRoutes } from "./routes/admin/auth.route";
import { customResponse } from "./middlewares/customRespones.middleware";
import { adminServiceRoutes } from "./routes/admin/services.route";
import { inviteRoutes } from "./routes/admin/invite.route";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customResponse);

// admin
app.use("/api/v1/admin", adminAuthRoutes);
app.use("/api/v1/admin/services", adminServiceRoutes);
app.use("/api/v1/admin/", inviteRoutes);
