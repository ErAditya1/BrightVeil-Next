import { z } from 'zod'

export const createVideoSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoId: z.string(),
});

export const ChapterVideoIdSchema = z.object({
    videoId: z.string(),
});

export const ChapterDescriptionSchema = z.object({
    description: z.string(),
})

export const ChapterThumbnailSchema = z.object({
    thumbnail: z.instanceof(File).optional(),
})

export const ChapterVisibilitySchema = z.object({
    isFree: z.enum(['true', 'false']),
})
