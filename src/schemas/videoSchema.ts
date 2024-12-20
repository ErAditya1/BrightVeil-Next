import { z } from "zod";

// Regular expressions for youtube.com/watch?v= and youtu.be/
const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
const youtuBeRegex = /(?:https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const shortsRegex = /^(?:https?:\/\/(?:www\.)?youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})(?:[?&][^#]*)?$/;

// Create the video schema
export const createVideoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required") // Title must not be empty
    .max(100, "Title must be at most 100 characters"), // Optional: Max title length for constraint

  description: z
    .string()
    .min(1, "Description is required") // Description must not be empty
    .max(500, "Description must be at most 500 characters"), // Optional: Max description length for constraint

  videoUrl: z
    .string()
    .refine((url) => youtubeRegex.test(url) || youtuBeRegex.test(url) || shortsRegex.test(url), {
      message: "Invalid YouTube URL", // If it does not match any valid YouTube URL format
    }),
});
export const VideoFileSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "Only PDF files are allowed",
    }),
});

export const ChapterVideoIdSchema = z.object({
  videoUrl: z
    .string()
    .refine((url) => youtubeRegex.test(url) || youtuBeRegex.test(url) || shortsRegex.test(url), {
      message: "Invalid YouTube URL", // If it does not match any valid YouTube URL format
    }),
});

export const ChapterDescriptionSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const ChapterThumbnailSchema = z.object({
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only Image thumbnails are allowed",
    }),
});

export const ChapterVisibilitySchema = z.object({
  isFree: z.enum(["true", "false"], {
    errorMap: () => ({ message: "Invalid visibility value" }),
  }),
});


export const videoSchema = z.object({
  videoUrl: z
  .string()
  .refine((url) => youtubeRegex.test(url) || youtuBeRegex.test(url) || shortsRegex.test(url), {
    message: "Invalid YouTube URL", // If it does not match any valid YouTube URL format
  }),
  
  title: z
  .string()
  .min(1, "Title is required") // Title must not be empty
  .max(100, "Title must be at most 100 characters"), // Optional: Max title length for constraint

description: z
  .string()
  .min(1, "Description is required") // Description must not be empty
  .max(500, "Description must be at most 500 characters"), // Optional: Max description length for constraint

thumbnail: z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "File is required" })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only Image thumbnails are allowed",
  }),
})