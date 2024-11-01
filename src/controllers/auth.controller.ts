import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { tokenName } from "../config";
import { cookieOptions } from "../constants";
import { RegisteredUsers } from "../models/register.model";
import { generateTokens, isInviteExpired, validateRequest } from "../utils";
import {
  userLoginSchemaZod,
  UserLoginSchemaZodType,
  userRegisterSchemaZod,
  UserRegisterSchemaZodType
} from "../validation/userAuthSchemaZod";
import { DoctorInvite } from "../models/doctor/doctorInvite.model";

export const handleRegister = async (
  req: Request<{}, {}, UserRegisterSchemaZodType>,
  res: Response
): Promise<void> => {
  try {
    const { success, data } = await validateRequest(
      userRegisterSchemaZod,
      req.body
    );
    if (!success) {
      return res.customResponse(400, "fields are not valid", data);
    }

    const { name, email, password, secretKey} = data;
    
    // handling doctor invite
    const doctorInviteDetails = await DoctorInvite.findOne({email});

    function getRole(){
      if(secretKey === "68"){
        return "admin";
      }
      if(doctorInviteDetails?.status === "pending"){
        return "doctor";
      }
        return "doctor";
    }

    const role = getRole();

    if(role === "doctor"){
      if(isInviteExpired(doctorInviteDetails?.createdAt,2)){
        doctorInviteDetails?.set("status","expired");
        await doctorInviteDetails?.save();
        return res.customResponse(400,"Invitation has expired");
      }
      doctorInviteDetails?.set("status","accepted");
      await doctorInviteDetails?.save();
    }

    const registeredUser = new RegisteredUsers({
      name,
      email,
      password,
      role
    });
    
    
    await registeredUser.save();
    registeredUser.password = "";

    res.customResponse(200, "User Successfully Registered", registeredUser);
  } catch (error: any) {
    if (error.code === 11000) {
      res.customResponse(400, "Email already exists");
    } else {
      res.customResponse(500, "Error on registering user", error);
    }
  }
};

export const handleLogin = async (
  req:  Request<{}, {}, UserLoginSchemaZodType>,
  res: Response
): Promise<void> => {
  try{
    const { success, data } = await validateRequest(
      userLoginSchemaZod,
      req.body
    );
    if (!success) {
      return res.customResponse(400, "fields are not valid", data);
    }
    const { email, password } = data;
  
    const user = await RegisteredUsers.findOne({ email }).select("+password");
    console.log(user);
  
    if (!user) {
      return res.customResponse(404, "User not found/email incorrect");
    }

    console.log(password)
    const passwordMatch = await bcrypt.compare(password,user.password);
    console.log(passwordMatch);
  
    if (!passwordMatch) {
      return res.customResponse(400, "Password does not match");
    }
    
    const token = generateTokens(user._id as ObjectId, user.role);
  
    user.password = ""; // because it gives type error when assign undefined
  
    return res
      .cookie(tokenName, token, cookieOptions)
      .customResponse(200, "Login successfully", user);
  }catch(err){
    res.customResponse(500,"Error on Loging user");
  }
};
