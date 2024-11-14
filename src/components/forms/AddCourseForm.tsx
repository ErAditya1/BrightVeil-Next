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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

import { createCourseSchema } from '@/schemas/courseSchema';
import { useAppSelector } from '@/store/hooks';

export default function AddCourseForm() {
    const router = useRouter();
    const user = useAppSelector(state=> state.auth.user);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof createCourseSchema>>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: '',

        },
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (data: z.infer<typeof createCourseSchema>) => {
        // setIsSubmitting(true);

        try {
            
                const response = await api.post<ApiResponse>('/v1/courses/course', data,
                    
                );
                console.log(response);
                toast({
                    title: 'Success!',
                    description: response?.data?.message,
                    variant: 'success',
                });
                router.push(`/${user?.role}/courses/edit-course/${response?.data?.data?._id}`);
            
            // setIsSubmitting(false);

        } catch (error) {


            const axiosError = error as AxiosError<ApiResponse>;
            console.log(axiosError)
            // Default error message
            let errorMessage = axiosError.response?.data.message;
            

            toast({
                title: 'Creation Failed',
                description: errorMessage || axiosError.message,
                variant: 'destructive',
            });

            // setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground  rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight lg:text-5xl mb-6">
                        Create Your course
                    </h1>
                    <p className="mb-4">What would name you like for your course?
                        Don&apos;t worry you can change it latter
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
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
