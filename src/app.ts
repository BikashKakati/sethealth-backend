import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { customResponse } from "./middlewares/customRespones.middleware";
import { adminAuthRoutes } from "./routes/admin/auth.route";
import { adminServiceRoutes } from "./routes/admin/services.route";
import { doctorProfileInfoRoutes } from "./routes/doctor/profileInfo.route";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customResponse);

// admin
app.use("/api/v1/admin", adminAuthRoutes);
app.use("/api/v1/admin/services", adminServiceRoutes);

//doctor
app.use("/api/v1/doctor",doctorProfileInfoRoutes)
