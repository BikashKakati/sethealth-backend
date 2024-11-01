import { z } from "zod";

export const inviteSchemaZod = z.object({
  name: z
    .string({ invalid_type_error: "Name field in not valid string" })
    .trim()
    .min(1, { message: "Name is required" }),
  email: z
    .string({ invalid_type_error: "Email field in not valid string" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});
