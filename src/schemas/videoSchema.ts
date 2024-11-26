import { z } from "zod";

export const createVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  videoId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube video ID"),
});
export const VideoFileSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "File is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only Image thumbnail are allowed",
    }),
});

export const ChapterVideoIdSchema = z.object({
  videoId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube video ID"),
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
videoId: z.string().min(5, "Invalid YouTube video ID"),
title: z.string().min(1, "Title is required"),
description: z.string().min(1, "Description is required"),
thumbnail: z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "File is required" })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only Image thumbnails are allowed",
  }),
})