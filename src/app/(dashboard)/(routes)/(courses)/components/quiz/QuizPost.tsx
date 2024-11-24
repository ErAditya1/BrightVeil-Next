'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { createQuiz } from '@/schemas/quizSchema';


export default function QuizPost({ setCourseData, setAddQuiz }: any) {
    const router = useRouter();
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const { course_id } = useParams()

    const form = useForm<z.infer<typeof createQuiz>>({
        resolver: zodResolver(createQuiz),
        defaultValues: {
            title: '',
            description: '',

        },
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState

    

    const onSubmit = async (data: z.infer<typeof createQuiz>) => {
        // setIsSubmitting(true);


        try {
           
                const response = await api.post(`/v1/quiz/post/${course_id}`, data,
                   
                );
                toast({
                    title: 'Success!',
                    description: response?.data?.message,
                    variant: 'success',
                });
                setAddQuiz(false)
                const quiz = response.data.data
                setCourseData((prev:any)=>{
                    return {...prev, quizzes:[...prev.quizzes, quiz]}
                } )
               
        
            // setIsSubmitting(false);

        } catch (error) {


            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;


            toast({
                title: 'Creation Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            // setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="w-full bg-card text-card-foreground  border rounded shadow-md p-2">



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Quiz Title:</span></FormLabel>
                                    <Input type="text" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Description:</span></FormLabel>
                                    <Input type="text" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        


                        <div className="flex items-center gap-x-4">




                            <Button
                                type='submit'
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>

                    </form>
                </Form>

            </div>
        </div>
    );
}
