'use client'

import * as React from 'react';
import CardContent from '@mui/joy/CardContent';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen} from 'lucide-react';
import Link from 'next/link';
import { IconMoneybag } from '@tabler/icons-react';
import { AspectRatio, Card, CardOverflow, Divider, Typography } from '@mui/joy';
import api from '@/api';
import { useSession } from 'next-auth/react';

export default function CourseCard({_id}:any) {
  const user = useSession()?.data?.user
  // TODO: Add loading state and fetch course data from API
  const [courseData, setCourseData] = React.useState({
    thumbnail:{
      secure_url: '',
    },
    title: '',
    author:{
      name: '',
      avatar: {
        secure_url: '',
      },
      username: '',
      
    },
    chapterCount: 0,
    isFree: false,


  }) 
  React.useEffect( () => {
    if(user && user.accessToken){
        api.get(`/v1/courses/course/getPublishedCourses/${_id}`,{
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res)
        setIsLoading(false)
        setCourseData(res.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  },[user])

  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <Link href={`/courses/${_id}`}>
      <Card  className="bg-card   text-card-foreground">
      <CardOverflow>
        <AspectRatio ratio="2">
          {
            isLoading ? (
              <Skeleton className=" w-full rounded" />
            ) : (
              <img
                src={courseData?.thumbnail?.secure_url}
                srcSet={courseData?.thumbnail?.secure_url}
                loading="lazy"
                alt=""
              />
            )
          }
        </AspectRatio>
      </CardOverflow>
      <CardContent className="flex flex-row items-centr" >
        {
          isLoading ? (
            <div className='flex flex-row flrx-nowrap justify-between p-0'>
              <div><Skeleton className="h-12 w-12 rounded-full" /></div>
              <div className="space-y-2 w-full gap-2 pl-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) :
            (
              <div className='flex flex-row gap-2'>
                <Avatar>
                  <AvatarImage src={courseData?.author?.avatar?.secure_url} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="card-content ">
                  <Typography level="title-md" className="line-clamp-2">{courseData.title}</Typography>
                  <Typography level="body-sm">{courseData?.author?.username}</Typography>
                </div>
              </div>
            )
        }

      </CardContent>
      <CardOverflow className=" h-14">
        <Divider inset="context" />
        {
          isLoading ? (
            <CardContent className="">
             <div className="flex flex-row flrx-nowrap justify-between items-center p-0">
              <span><Skeleton className="w-16 h-5 rounded" /></span>
              <span><Skeleton className="w-12 h-5 rounded" /></span>
            </div>
            </CardContent>
          ) : (

            <CardContent orientation="horizontal" className="flex items-center  justify-between m-0 p-0"
            >
              <div className=" flex flex-row  items-center bg-muted text-muted-foreground p-1 rounded-lg text-xs" >
                <span><BookOpen className='mx-2' size={15}/></span> <span>{courseData?.chapterCount} Chapters</span>
              </div>
              {
                courseData?.isFree && (
                  <div className=" flex flex-row items-center bg-muted text-muted-foreground p-1 rounded-lg text-xs" >
                <span><IconMoneybag className='mx-2' size={15}/></span><span>Free</span>
              </div>
                )
              }
             
             

            </CardContent>
          )
        }
      </CardOverflow>
    </Card>
    </Link>
  );
}
