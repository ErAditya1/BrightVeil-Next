import { z } from "zod";

export const BlogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    image: z.instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" }),
  });