import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { addCustomResponse, validateRequest } from "./middlewares";
import { adminUserSchemaZod } from "./validation/admin/adminUserSchemaZod";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// Add a custom response to the response
app.use(addCustomResponse);

app.post("/user",validateRequest(adminUserSchemaZod),(req,res)=>{
    res.status(201).json({ message: 'User registered successfully!' });
})
