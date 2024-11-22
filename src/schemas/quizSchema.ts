// schemas/quizSchema.ts

import * as z from 'zod';


export const createQuiz= z.object({
    title: z.string(),
    description: z.string(),
  });
export const createQuizSchema = z.object({
    question: z.string().min(1, { message: 'Question is required' }),
    options: z.array(z.string().min(1, { message: 'Option is required' })).length(4, { message: 'Must have exactly 4 options' }),
    answer: z.string().min(1, { message: 'Answer is required' }),
});
