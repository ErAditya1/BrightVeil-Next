import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  username: usernameValidation,

  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })
  .max(50, { message: 'Password must be no more than 50 characters' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,50}$/, { message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character' }),
});