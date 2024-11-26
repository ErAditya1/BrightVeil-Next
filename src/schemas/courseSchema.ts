
import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const CourseDescriptionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export const CourseThumbnailSchema = z.object({
  thumbnail: z.instanceof(File).optional().refine((val) => val !== null, 'Thumbnail cannot be null'),
});

export const CourseLanguageSchema = z.object({
  language: z.string().min(1, 'Language is required'),
});

export const CoursePriceSchema = z.object({
  printPrice: z.string().transform((v) => Number(v) || 0).refine((val) => val >= 0, 'Price must be a non-negative number'),
  discount: z.string().transform((v) => Number(v) || 0).refine((val) => val >= 0 && val <= 100, 'Discount must be between 0 and 100'),
});

export const CourseAttachmentsSchema = z.object({
  attachments: z.array(z.string()).optional(),
});

