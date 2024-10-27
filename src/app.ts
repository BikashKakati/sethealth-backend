import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { validateRequest } from "./middlewares";
import { adminUserSchemaZod } from "./validation/admin/adminUserSchemaZod";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.post("/user",validateRequest(adminUserSchemaZod),(req,res)=>{
    res.status(201).json({ message: 'User registered successfully!' });
})
