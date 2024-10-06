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
import { useState } from 'react';
import { Edit } from 'lucide-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { CoursePriceSchema } from '@/schemas/courseSchema';

export default function PriceForm({discount , printPrice}:any) {
   
    const form = useForm<z.infer<typeof CoursePriceSchema>>({
        resolver: zodResolver(CoursePriceSchema),
        defaultValues: {
            printPrice: printPrice,
            discount: discount

        },
    });

    const { toast } = useToast();
    const { isSubmitting, isValid } = form.formState
    const { course_id } = useParams();
    const  user  = useSession()?.data?.user

    const [edit, setEdit] = useState(false);

    const onSubmit = async (data: z.infer<typeof CoursePriceSchema>) => {
        // setIsSubmitting(true);

        try {
           if(user && user.accessToken){
            
                const response = await api.patch<ApiResponse>(`/v1/courses/course/updatePrice/${course_id}`, data,
                    {
                        headers: {
                           
                            "Authorization": `Bearer ${user?.accessToken}`
                        }
                    }
                );
                console.log(response);
                toast({
                    title: 'Success!',
                    description: response?.data?.message,
                    variant: 'success',
                });
                setEdit(false)
           }
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
                            name="printPrice"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Total Price:</span>{!edit && (<span className='text-sm gap-1 flex flex-row' onClick={() => setEdit(true)}><Edit size={15} />Edit</span>)}</FormLabel>
                                    <Input type="number" {...field} disabled={!edit} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="discount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Discount:</span></FormLabel>
                                    <Input type="number"  {...field} disabled={!edit} />
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
