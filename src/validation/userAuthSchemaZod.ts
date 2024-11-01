import { regExpressions } from "../constants";
import { z } from "zod";

export const userRegisterSchemaZod = z.object({
  name: z
    .string({ message: "Name field in not valid string" }).trim()
    .min(1, { message: "Name is required" }),
  email: z
    .string({ message: "Email field in not valid string" }).trim()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string({ message: "Password field in not valid string" }).trim()
    .min(1, { message: "Password is required" })
    .regex(
      regExpressions.passwordRegExp,
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, , ?, &), and be at least 5 characters long"
    ),
    secretKey:z.string().trim().optional(),
});

export const userLoginSchemaZod = z.object({
  email: z
    .string({required_error:"Email is requried",invalid_type_error:"Email is not a valid string"}).trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({required_error:"Password is requried",invalid_type_error:"Password name is not a valid string"}).trim().min(1, { message: "Password is required" }).regex(
    regExpressions.passwordRegExp,
    "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, , ?, &), and be at least 5 characters long"
  ).trim(),
});

export type UserRegisterSchemaZodType = z.infer<typeof userRegisterSchemaZod>;
export type UserLoginSchemaZodType = z.infer<typeof userLoginSchemaZod>;
