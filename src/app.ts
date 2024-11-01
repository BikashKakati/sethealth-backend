import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { customResponse } from "./middlewares/customRespones.middleware";
import { adminRouter } from "./routes/admin.routes";
import { authRoutes } from "./routes/auth.routes";
import { doctorRouter } from "./routes/doctor.routes";
import { inviteRoutes } from "./routes/admin/invite.route";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customResponse);

app.use("/api/v1/auth", authRoutes);
// admin
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin", inviteRoutes);

//doctor
app.use("/api/v1/doctor",doctorRouter)
