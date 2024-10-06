import { z } from 'zod';
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];
export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const updateProfileSchema = z.object({
    
  name: z.string(),
  username: usernameValidation,
  about: z.string().max(200, "About content should not exceed 200 characters").optional(),
  mobileNumber:z.string().min(10, "Please enter valid mobile number").max(10, "Please enter valid mobile number"),
  avatar: z.instanceof(File).optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, 'File size must be less than 3MB')
  
  
});
