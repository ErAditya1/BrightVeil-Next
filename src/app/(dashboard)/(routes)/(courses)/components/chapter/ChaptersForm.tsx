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

import { createVideoSchema } from '@/schemas/videoSchema';

export default function ChapterForm({ setCourseData, setAddChapter }: any) {
    const router = useRouter();
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const { course_id } = useParams()

    const form = useForm<z.infer<typeof createVideoSchema>>({
        resolver: zodResolver(createVideoSchema),
        defaultValues: {
            videoUrl: '',
            title: '',
            description: '',



        },
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState

    

    const onSubmit = async (data: z.infer<typeof createVideoSchema>) => {
        // setIsSubmitting(true);


        try {
           
                const response = await api.post(`/v1/courses/course/addChapter/${course_id}`, data,
                   
                );
                toast({
                    title: 'Success!',
                    description: response?.data?.message,
                    variant: 'success',
                });
                setAddChapter(false)
                const chapter = response.data.data
                console.log(chapter);
                setCourseData((prev:any)=>{
                    return {...prev, chapters:[...prev.chapters, chapter]}
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
                            name="videoUrl"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Youtube Video Url:</span></FormLabel>
                                    <Input type="text" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Title:</span></FormLabel>
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
