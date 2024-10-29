import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminAuthRoutes } from "./routes/admin/auth.route";
import { customResponse } from "./middlewares/customRespones.middleware";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(customResponse);

app.use("/api/admin", adminAuthRoutes);
