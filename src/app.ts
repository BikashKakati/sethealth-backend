import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { customResponse } from "./middlewares/customRespones.middleware";
import { adminRouter } from "./routes/admin.routes";
import { authRoutes } from "./routes/auth.routes";
import { doctorRouter } from "./routes/doctor.routes";
import { adminClientUrl } from "./config";
import { verifyToken } from "./middlewares/verifyToken.middleware";
import { isAdmin } from "./middlewares/checkRoles.middleware";


export const app = express();
app.use(cors({origin:adminClientUrl, credentials:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customResponse);


// auth routes
app.use("/api/v1/auth", authRoutes);

// admin routes
app.use("/api/v1/admin", verifyToken, isAdmin, adminRouter);

//doctor
app.use("/api/v1/doctor",doctorRouter)
