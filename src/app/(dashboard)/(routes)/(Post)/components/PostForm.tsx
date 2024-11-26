' use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // Zod for schema validation
import { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPostSchema } from '@/schemas/BlogPostSchema';
import api from '@/api';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
// Adjust to match your Post model import

// Define TypeScript types for form data
interface BlogPostFormData {
    title: string;
    content: string;
    imageUrl?: string;
}

// Zod schema for form validation


// Default form values


const BlogPostForm = () => {
    const form = useForm<z.infer<typeof blogPostSchema>>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    
    const { isSubmitting, isValid } = form.formState


    // Handle form submission
    const onSubmit = async (data:z.infer<typeof blogPostSchema> ) => {
        try {
            // Create a new Post document
            const formData = new FormData()
            if(data.image){
                formData.append('image', data.image)
            }
            
            formData.append('title', data.title)
            formData.append('content', data.content)

                const res = await api.post('/v1/posts/add', formData,{
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                })

                if(res){
                    // Redirect to the list of posts
                    console.log('Redirecting to the list of posts...',res.data.data)
                    toast({
                        title: 'Success',
                        description: res?.data?.message,
                        variant:'success',
                    })
                    // router.push('/posts')
                }

            // Save the post

            // Handle success (e.g., show a message, redirect, etc.)
            console.log('Post created successfully:');
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error creating post:', error);
            const errorMessage = error as AxiosError<AxiosError>
            toast({
                title: 'Error',
                description: errorMessage?.response?.data.message,
                variant:'destructive',
            })
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full bg-card text-card-foreground border rounded shadow-md p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title Field */}
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Title:</span></FormLabel>
                                    <Input type="text" {...field}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Content Field */}
                        <FormField
                            name="content"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Content:</span></FormLabel>
                                    <Input type="text" {...field}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image URL Field (optional) */}
                        <FormField
                            name="image"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex justify-between'><span>Upload File:</span></FormLabel>
                                    <Input type="file" onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            field.onChange(file); // Update field value manually
                                        }}
                                        value={undefined}
                                        accept='image/*'
                                        />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="flex items-center gap-x-4">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="btn-primary"
                            >
                                Submit Post
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default BlogPostForm;
