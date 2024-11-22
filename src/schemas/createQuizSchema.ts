import * as z from 'zod';

// Zod schema for creating a quiz
export const createQuizSchema = z.object({
  title: z.string().min(1, 'Title is required'), // Title should be a non-empty string
  description: z.string().min(1, 'Description is required'), // Description should be a non-empty string

});

export type CreateQuizType = z.infer<typeof createQuizSchema>;




export const createQuizQuestionSchema = z.object({
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string()).min(2, "At least two options are required"),
    answer: z.string().min(1, "Answer is required"),
    explanation: z.string().optional(),
  });
