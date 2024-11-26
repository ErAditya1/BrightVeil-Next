// schemas/quizSchema.ts

import * as z from "zod";

export const createQuiz = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export const createQuizSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  options: z
    .array(z.string().min(1, { message: "Option is required" }))
    .length(4, { message: "Must have exactly 4 options" }),
  answer: z.string().min(1, { message: "Answer is required" }),
});
