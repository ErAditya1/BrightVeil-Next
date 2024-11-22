'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';

import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

import { createQuizSchema } from '@/schemas/quizSchema';

export default function QuizQuestionForm({ setQuizData, setAddQuestion }: any) {
    
    const { quiz_id } = useParams();

    const form = useForm<z.infer<typeof createQuizSchema>>({
        resolver: zodResolver(createQuizSchema),
        defaultValues: {
            question: '',
            options: ['', '', '', ''],
            answer: '',
        },
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof createQuizSchema>) => {
        try {
            const response = await api.post(`/v1/quiz/add-question/${quiz_id}`, data);

            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });

            setAddQuestion(false);
            const question = response.data.data;

            setQuizData((prev: any) => {
                return { ...prev, questions: [...prev?.questions, question] };
            });
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            console.log(error)
            
            setAddQuestion(false);
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
                        <FormField
                            name="question"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex justify-between">
                                        <span>Question:</span>
                                    </FormLabel>
                                    <Textarea {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Options Fields */}
                        {form.watch('options').map((option, index) => (
                            <Controller
                                key={index}
                                name={`options.${index}`}  // Corrected here: using dot notation to access array index
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Option {index + 1}:</span>
                                        </FormLabel>
                                        <Input type="text" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Correct Answer Selector */}
                        <FormField
                            name="answer"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex justify-between">
                                        <span>Correct Answer:</span>
                                    </FormLabel>
                                    <select {...field} className="w-full p-2 border rounded">
                                        <option value="" disabled>Select Correct Answer</option>
                                        {form.watch('options').map((option, index) => (
                                            <option key={index} value={option}>
                                                Option {index + 1}: <p className='text-green-500'>{option}</p>
                                            </option>
                                        ))}
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-4">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
