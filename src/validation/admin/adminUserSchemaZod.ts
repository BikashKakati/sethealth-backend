import { z } from "zod";

export const adminUserSchemaZod = z.object({
  name: z.string({message:"Name field in not valid string"}).min(1, { message: "Name is required" }),
  email: z
    .string({message:"Email field in not valid string"})
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string({message:"Password field in not valid string"}).min(1, { message: "Password is required" }),
  role: z.string({message:"role field in not valid string"}).min(1, { message: "Role is required" }),
});

export const adminUserLoginSchemaZod = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type AdminUserSchemaZodType = z.infer<typeof adminUserSchemaZod>;
