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
import { Edit} from 'lucide-react';
import api from '@/api';
import { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

import { Editor } from '@tinymce/tinymce-react';

export default function QuizDescriptionForm({description}:any) {
    

   

    const { toast } = useToast();

    const [edit, setEdit] = useState(false);
    const {quiz_id} = useParams();
    const [messageText, setMessageText] = useState(description);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onEditorChange = (newContent: any) => {
        setMessageText(newContent)
    };

    const onSubmit = async (e:any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {

                const response = await api.patch<ApiResponse>(`/v1/quiz/description/${quiz_id}`, {description: messageText }
                   
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


            
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className='flex justify-between'><span>Add Description:</span>{!edit && (<span className='text-sm gap-1 flex flex-row' onClick={() => {
                        setEdit(true)
                        setMessageText(description)
                    }}><Edit size={15} />Edit</span>)}</div>
                    {
                        edit  && (
                            <Editor
                                initialValue={description || ''}
                                apiKey='usz9bgh3l8dhmt1qo78mto3vej9zacwcwzm5yuyx5g6ocr3x'
                                init={{
                                    height: 350,
                                    menubar: true,
                                    plugins: [
                                        "image",
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                        "anchor",
                                    ],
                                    toolbar:
                                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                }}
                                onEditorChange={onEditorChange}
                            />

                        )
                    }


                    {
                        !edit && (<div className="mt-2" dangerouslySetInnerHTML={{ __html: messageText }} />)
                    }

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
                                    disabled={isSubmitting}
                                >
                                    Continue
                                </Button>
                            </div>
                        )
                    }
                </form>
            

        </div>
    </div>
    );
}
