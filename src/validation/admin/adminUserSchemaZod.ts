import { z } from "zod";

export const adminUserSchemaZod = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export type AdminUserSchemaZodType = z.infer<typeof adminUserSchemaZod>;
