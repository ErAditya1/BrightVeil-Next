'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChapterVisibilitySchema } from '@/schemas/videoSchema';

export default function ChapterVisibility({visibility}:any) {
    const router = useRouter();
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof ChapterVisibilitySchema>>({
        resolver: zodResolver(ChapterVisibilitySchema),
        defaultValues:{
            isFree: visibility
        }
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState

    const [edit, setEdit] = useState(false);
    const {chapter_id} = useParams();

    const onSubmit = async (data: z.infer<typeof ChapterVisibilitySchema>) => {
        // setIsSubmitting(true);
        console.log(data);

        try {
                const response = await api.patch<ApiResponse>(`/v1/videos/video/update-visibility/${chapter_id}`, data,
                    
                );
                console.log(response);
                toast({
                    title: 'Success!',
                    description: response?.data?.message,
                    variant: 'success',
                });
            
            
            setEdit(false)
            
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
                            name="isFree"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Chpter Visibility:</span>{!edit && (<span className='text-sm gap-1 flex flex-row' onClick={() => setEdit(true)}><Edit size={15} />Edit</span>)}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!edit}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select visibility" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value= 'true'>Free</SelectItem>
                                            <SelectItem value="false">Paid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            edit && (
                                <div className="flex items-center gap-x-4">

                                    <Button
                                        type='button'
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </Button>


                                    <Button
                                        type='submit'
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            )
                        }
                    </form>
                </Form>

            </div>
        </div>
    );
}
