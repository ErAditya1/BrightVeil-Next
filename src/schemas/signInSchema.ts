import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const forgetSchema = z.object({
  identifier: z.string().email("Invalid email address"),
});

export const resetSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  password1: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Confirm password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});
