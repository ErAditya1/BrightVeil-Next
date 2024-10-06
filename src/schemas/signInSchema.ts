import { z } from 'zod'

export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
export const forgetSchema = z.object({
  identifier: z.string(),
});
export const resetSchema = z.object({
  password: z.string(),
  password1: z.string(),
});

