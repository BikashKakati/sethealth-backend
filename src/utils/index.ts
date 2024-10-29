import { FormattedListType } from "@/types";
import { tokenKey } from "../config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { ZodIssue } from "zod";



export const generateTokens = (userID: ObjectId) => {
  try {
    const token = jwt.sign({ id: userID }, tokenKey!, { expiresIn: "24h" });
    return token;
  } catch (err) {
    return { token: "", error: "Failed to generate token." };
  }
};


export const getFormattedValidationErrorList = (dataList:ZodIssue[]):FormattedListType[]=> {
    return dataList.map((item)=> {
        return {
            errorField:item.path[0],
            errorMessage:item.message
        }
    })
}



