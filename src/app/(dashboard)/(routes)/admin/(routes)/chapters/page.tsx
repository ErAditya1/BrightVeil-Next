'use client'
import api from '@/api'
import BlogPostForm from '@/app/(dashboard)/(routes)/(Post)/components/PostForm'
import PostCard from '@/components/PostCard'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../../(courses)/components/VideoCard'

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
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button'
import { BookMarkedIcon } from 'lucide-react'
import { videoSchema } from '@/schemas/videoSchema';
import ValidatedImage from '@/components/ValidatedImage';
import { toast } from '@/components/ui/use-toast';
import { HoverEffect } from '@/components/ui/card-hover-effect'


function page() {
    const [isForm, setIsForm] = useState(false)
    const [thumbnail, setThumbnail] = useState('')


    const [videos, setVideos] = useState([
        {
            _id: ''
        }
    ])

    useEffect(() => {
        api.get("/v1/videos/video/get-admin-videos")
            .then((response) => {
                const data = response.data.data
                console.log(data)
                setVideos(data)
            })
            .catch((error) => {
                const axiosError = error as AxiosError<AxiosError>
                console.log(axiosError)

            })

    }, [])



    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            videoUrl: '',
            title: '',
            description: '',

        },
    });
    const onSubmit = async (data: z.infer<typeof videoSchema>) => {
        
        try {
            const formData = new FormData();
            formData.append('videoUrl', data.videoUrl)
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('thumbnail', data.thumbnail)
            // Code to be executed
            const response = await api.post("/v1/videos/post", formData)
            const res = response?.data?.data
            setIsForm(false)
            setThumbnail('')
            setVideos((prev) => [{ _id: res._id }, ...prev])
            toast({
                title: "Video Posted",
                description: response?.data?.message,
                variant: "success"
            })

        } catch (error) {
            const axiosError = error as AxiosError<AxiosError>
            console.error(axiosError);
            toast({
                title: "Upload Failed",
                description: axiosError?.response?.data?.message,
                variant: "destructive"
            })

        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-center items-center'>
                <Button onClick={() => setIsForm(!isForm)}>Add Video</Button>
            </div>
            {
                isForm && <div>
                    <div className='w-full flex justify-center items-center'>

                        <div className='w-full my-auto grid md:grid-cols-2 gap-4 p-4  '>

                            <div className="flex flex-col  gap-2  ">
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
                                                <FormField
                                                    name="thumbnail"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className='flex justify-between'><span>Thumbnail:</span></FormLabel>
                                                            <Input type="file"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0] || null;
                                                                    field.onChange(file); // Update field value manually
                                                                    if (file) {

                                                                        setThumbnail(URL.createObjectURL(file))
                                                                    }

                                                                }}
                                                                value={undefined}
                                                                accept="image/*"
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                {thumbnail &&
                                                    <div className="w-56 aspect-video flex justify-center">
                                                        <ValidatedImage
                                                            src={thumbnail}
                                                            height={500}
                                                            width={500}
                                                            alt="Thumbnail"
                                                            className="h-full w-full rounded border"
                                                        />
                                                    </div>
                                                }

                                                <div className="w-full flex justify-center mt-3">
                                                    <Button className='float-right' type="submit">
                                                        <BookMarkedIcon className='h-5 w-5 mr-2' />
                                                        Publish Chapter
                                                    </Button>
                                                </div>
                                            </form>

                                        </Form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="w-full p-4">

                <div className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        videos[0]?._id && videos?.map((video, index) => (
                            <HoverEffect index={index}> 
                            <VideoCard key={video?._id} _id={video?._id} />
                            </HoverEffect>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page