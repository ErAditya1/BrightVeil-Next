import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }), // Title is required
    content: z.string().min(1, { message: 'Content is required' }), // Content is required
    image: z.instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" }), // Image URL is optional but must be a valid URL if provided
  });