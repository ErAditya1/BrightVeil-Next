
import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string(),
});
export const CourseDescriptionSchema = z.object({
  description: z.string(),
});
export const CourseThumbnailSchema = z.object({
  thumbnail: z.instanceof(File).optional(),
});
 export const CourseLanguageSchema = z.object({
  language: z.string(),
});
 
export const CoursePriceSchema = z.object({
  printPrice: z.string().transform((v) => Number(v)||0),
  discount:z.string().transform((v) => Number(v)||0)
});
export const CourseAttechmentsSchema = z.object({
  attetchments: z.string(),
});

