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

import { VideoFileSchema } from '@/schemas/videoSchema';

export default function FileForm({ setChapterData, setAddFile }: any) {
    const router = useRouter();
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const { chapter_id } = useParams()

    const form = useForm<z.infer<typeof VideoFileSchema>>({
        resolver: zodResolver(VideoFileSchema),

    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState



    const onSubmit = async (data: z.infer<typeof VideoFileSchema>) => {
        


        try {
            const formData = new FormData();
            formData.append('file', data.file);
            formData.append('title', data.title);  
           


            const response = await api.post(`/v1/videos/video/file/${chapter_id}`, formData,{
                headers: {
                    'Content-Type':'multipart/form-data'
                }

                //,
                // onUploadProgress: (progressEvent) => {
                //     const { loaded, total } = progressEvent;
                //     const percentage = Math.round((loaded * 100) / total);
                //     console.log(`Percentage: ${percentage}%`);
                // }
            }

            );
            toast({
                title: 'Success!',
                description: response?.data?.message,
                variant: 'success',
            });
            setAddFile(false)
            const file = response.data.data
            console.log(file);
            setChapterData((prev: any) => {
                return { ...prev, files: [...prev?.files, file] }
            })

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
                                    <FormLabel className='flex justify-between'><span>File Title:</span></FormLabel>
                                    <Input type="text" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="file"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>File:</span></FormLabel>
                                    <Input type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            field.onChange(file); // Update field value manually
                                        }}
                                        value={undefined}
                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
                                        />
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
