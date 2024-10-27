import express, { Request, Response } from "express";
import { adminUserSchemaZod } from "../../validation/admin/adminUserSchemaZod";
import { validateRequest } from "../../middlewares";

const Routes = express.Router();

// Routes.post("/user",,(req:Request,res:Response)=>{
//     res.status(201).json({ message: 'User registered successfully!' });
// })