'use client'

import React, { useEffect, useState } from 'react';
import Typography from '@mui/joy/Typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import ValidatedImage from '@/components/ValidatedImage';
import api from '@/api';
import { toast } from './ui/use-toast';
import { AxiosError } from 'axios';
import AvatarLayout from './AvatarLayout';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

export default function PostCard({ _id }: any) {


  const [isLoading, setIsLoading] = React.useState(true);
  const [post, setPost] = useState({
    author: {
      avatar: {
        url: '',
      },
      username: '',
      name: '',
    },
    title: '',
    content: '',
    image: {
      url: '',
    },
    likeCount: 0,
    isLiked: false,
    _id:"",
    createdAt: '',
  })

  useEffect(() => {

    api.get(`/v1/posts/get-data/${_id}`)
      .then((response) => {
        const data = response.data.data
        setPost(data)
        setIsLoading(false)
      })
      .catch((error) => {
        const axiosError = error as AxiosError<AxiosError>
        console.log(axiosError)

      })

  }, [_id])

  return (

    <div className="bg-card  text-card-foreground aspect-square p-0 rounded relative h-full">


      <div className='w-full h-full'>
        {
          isLoading ? (
            <Skeleton className=" w-full rounded" />
          ) : (
            <ValidatedImage
              src={post?.image?.url}
              width={500}
              height={500}
              className='rounded w-full aspect-square'
              alt=""
            />
          )
        }


      </div>
      <div className="  bottom-0  absolute   w-full p-1 " >
        <div className='absolute bottom-20 right-2 w-8 p-1 rounded h-full  flex flex-col gap-2 items-center justify-center mx-auto'>
          <div className='bg-blue-50 dark:bg-gray-800 bg-opacity-55 rounded-full flex justify-center items-center p-2 border shadow-xl'>
            <LikeButton liked={post?.isLiked}  type='post' _id ={post?._id}className="h-5 w-5 text-xl"/>
          </div>
          <div className='bg-blue-50 dark:bg-gray-800 bg-opacity-55 rounded-full flex justify-center items-center p-2 border shadow-xl'>
            <ShareButton className="h-5 w-5" textToShare={post?.title}/>
          </div>

        </div>
        <div className='flex flex-row h-fit  items-center w-full '>
          {
            isLoading ? (
              <div className='gap-1 flex flex-row w-full'>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex flex-col w-full">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ) :
              (
                <div className='bg-blue-50 dark:bg-gray-800 bg-opacity-55 flex flex-row gap-2 items-center w-full h-full  p-1 rounded'>
                  <div className='flex flex-row gap-1 w-full'>
                    <AvatarLayout name={post?.author?.name} src={post?.author?.avatar?.url} />
                    <div className="card-content ">
                      <p className="line-clamp-1 text-sm">{post?.title}</p>
                      <p className='text-xs line-clamp-1'>{post?.author?.username}</p>
                    </div>
                  </div>
                  <div>
                    <MoreVertical />
                  </div>
                </div>
              )
          }
        </div>

      </div>
      <div>

      </div>

    </div>

  );
}
