'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api'; // Assuming you have an API utility for axios requests
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define Zod schema for quiz question validation
const createQuizQuestionSchema = z.object({
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string()).min(2, "At least two options are required"),
    answer: z.string().min(1, "Answer is required"),
    explanation: z.string().optional(),
});

// Type definition for the form data
type QuizFormData = {
    question: string;
    options: string[]; // Array of options
    answer: string;
    explanation?: string;
};

export default function AddQuizQuestionForm({ quizId, setQuizData, setAddQuestion }: any) {
    const { toast } = useToast();

    // Use React Hook Form to manage form state and validation
    const form = useForm<QuizFormData>({
        resolver: zodResolver(createQuizQuestionSchema),
        defaultValues: {
            question: '',
            options: ['', '', '', ''],
            answer: '',
            explanation: '',
        },
    });

    const { control, handleSubmit, setValue, formState: { isSubmitting, isValid } } = form;

    // Use useFieldArray to manage options
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options", // Type is implicitly inferred as string[]
    });

    // Handle form submission
    const onSubmit = async (data: QuizFormData) => {
        try {
            // Make an API request to add the quiz question
            const response = await api.post(`/v1/quiz/question/add/${quizId}`, data);

            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

            setAddQuestion(false); // Close the form after submission
            const newQuestion = response.data.data; // The newly added question
            setQuizData((prev: any) => {
                return { ...prev, questions: [...prev.questions, newQuestion] }; // Update quiz with the new question
            });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Creation Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full bg-card text-card-foreground border rounded shadow-md p-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Question Field */}
                        <FormField name="question" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question</FormLabel>
                                <Textarea placeholder="Enter your question" {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Options Fields */}
                        <FormField name="options" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Options</FormLabel>
                                <div className="space-y-2">
                                    {field.value.map((option, index) => (
                                        <div key={index} className="flex gap-x-2">
                                            <Input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...field.value];
                                                    newOptions[index] = e.target.value;
                                                    field.onChange(newOptions);
                                                }}
                                                placeholder={`Option ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                    <Button type="button" onClick={() => append('Option ' + (field.value.length + 1))}>
                                        Add Option
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Correct Answer Selection */}
                        <FormField name="answer" control={control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correct Answer</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Correct Answer" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <FormMessage />
                                    <SelectContent>
                                        {field.value !== '' && field.value !== null && field.value !== undefined ? (
                                            field?.map((option:any, index:number) => (
                                                <SelectItem key={index} value={option||'nn'}>
                                                    Option {index + 1}: {option}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no">No options available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        {/* Explanation Field */}
                        <FormField name="explanation" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Explanation (optional)</FormLabel>
                                <Textarea placeholder="Explanation of the correct answer" {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Submit Button */}
                        <div className="flex items-center gap-x-4">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Add Question
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
