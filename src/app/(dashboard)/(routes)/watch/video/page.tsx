'use client'

import { Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import MiniVideoCard from '../../(courses)/components/MiniVideoCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import FileCard from '../../(courses)/components/FileCard';
import TestCard from '../../(courses)/components/TestCard';
import { ChevronDownCircle } from 'lucide-react';
import CustomVideoPlayer from '../../(courses)/components/YoutubePlayer';
import api from '@/api';
import { useSession } from 'next-auth/react';
import AvatarLayout from '@/components/AvatarLayout';


function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams();
  const course_id = searchParams.get('course');
  const video = searchParams.get('video');
  const v = searchParams.get('v');
  const [courseData, setCourseData] = useState();

  const [videos, setVideos] = useState([{
    _id: '',
    title: '',
    videoId: '',
    thumbnail: {
      secure_url: '',
    },
    isFree: false,
    isPublished: false,
    channelName: '',
    uploadedDate: "",
    views: 0

  }]);

 
  const [playingVideoData, setPlayingVideoData] = useState({
    videoId: '',
    title: '',
    thumbnail: {
      secure_url: '',
    },
    author: {
      _id: '',
      username: '',
      name: '',
      avatar: {
        secure_url: '',
      },
    },
    isAuthor: false,
    videoFile: '',
    description: '',
    durations: 0,
    comment: [],
    commentCount: 0,
    likeCount: 0,
    isLiked: false,
    likes: [],
    views: 0,
    viewers: [],
    uploadedDate:'',

  });
  const [mapVideos, setMapVideos] = useState(true);

  const user = useSession()?.data?.user

  React.useEffect(() => {
    if (user && user.accessToken && course_id) {
      api.get(`/v1/courses/course/get-course-data/${course_id}`, {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => {
          setLoading(false)
          setCourseData(res.data.data[0])

          setVideos(res.data.data[0]?.chapters)

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [user])
  // console.log(videos)



  useEffect(() => {
    if (user && user.accessToken && video) {
      api.get(`/v1/videos/video/get-video-data/${video}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${user?.accessToken}`
        }
      }).then((res) => {
        console.log(res?.data?.data[0])
        setPlayingVideoData(res?.data?.data[0])
      })
    }
  }, [video,v])
 

  

  


 

  return (
    <div className=''>
      <div className='md:my-2 w-full gap-4  flex flex-col lg:flex-row '>

        <Card className='grow bg-card text-card-foreground rounded-lg'>
          <div className=' aspect-video col-span-8 rounded-xl  max-h-screen max-w-screen'>
            {
               v && <CustomVideoPlayer videoId={v} thumbnailUrl={playingVideoData?.thumbnail?.secure_url} title={playingVideoData?.title} />
            }

          </div>

          <div className='p-4 '>
            <h1 className='text-lg font-semibold'>{playingVideoData?.title}</h1>
            <div className='flex flex-row flex-wrap items-center'>
              <React.Fragment>

                <AvatarLayout className="h-12 w-12 mr-1 text-xl" src={playingVideoData?.author?.avatar?.secure_url} name={playingVideoData?.author.name} />
                <div className="card-content mx-2">
                  <Typography level="title-md" className="line-clamp-1">{playingVideoData?.author?.name}</Typography>
                  <Typography level="body-sm"> {playingVideoData?.author?.username}</Typography>
                </div>
                <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
                  <FollowButton className="rounded-full" />
                </div>
              </React.Fragment>
              <React.Fragment>
                <div className='m-2 rounded border p-1'>
                  <LikeButton className="rounded-full text-4xl" liked='true' likeCnt={playingVideoData?.likeCount} type="v" _id="123" />
                </div>
                <div className='m-2 '>
                  <ShareButton className="rounded-full text-4xl" liked='true' likeCnt='3' type="v" _id="123" />
                </div>
              </React.Fragment>

            </div>
          </div>

        </Card>

        {
          videos &&
          <div className='max-h-screen w-full flex flex-col lg:flex-none lg:max-h-screen  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          <div className='flex flex-row justify-between p-2 bg-muted text-muted-foreground sticky top-0 z-10 rounded-t-xl '>
            <div className=''>
              <h1 className='text-2xl font-bold'>Course Name</h1>
              <p className='aaa'>Course Description</p>
            </div>
            <div className='flex items-center h-full right-2 lg:hidden '>
              <ChevronDownCircle size={30} className={`duration-500 ${mapVideos && 'rotate-180'}`} onClick={() => { setMapVideos(!mapVideos) }} />
            </div>
          </div>
          <div className=' w-full h-full gap-4 lg:absolute top-20'>

            {
              mapVideos &&
              videos.map((video) => {
                return (
                  <MiniVideoCard  key={video._id} _id={video._id} videoId={video.videoId} thumbnail={video?.thumbnail?.secure_url} title={video?.title} channelName={video?.channelName} uploadedDate={video.uploadedDate} views={video?.views} />
                )
              })
            }
          </div>
        </div>
        }

      </div>
      <div className='md:my-2 w-full gap-4  flex flex-col lg:flex-row '>

        {/* File Test and Description */}
        <Card className='grow bg-card text-card-foreground '>



          <div className='p-2 bg-muted text-muted-foreground sticky top-0 z-10 rounded-t-xl m-2'>
            <h1 className='text-2xl font-bold'>File :</h1>
          </div>
          <div className='w-full flex flex-row flex-wrap  gap-4 m-2'>
            <FileCard />
          </div>
          <div className='p-2 bg-muted text-muted-foreground sticky top-0 z-10 rounded-t-xl m-2'>
            <h1 className='text-2xl font-bold'>Test :</h1>
          </div>
          <div className='w-full flex flex-row flex-wrap  gap-4 m-2'>
            <TestCard />
          </div>

          <CardContent className="">
            <div className='p-2 bg-muted text-muted-foreground sticky top-0 z-10 rounded-t-xl m-0 '>
              <h1 className='text-2xl font-bold'>Description :</h1>
            </div>
            <Typography level="title-md" className="line-clamp-2  text-card-foreground p-0 m-0 rounded">
              Video Title Video Totle Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, obcaecati!
            </Typography>
          </CardContent>

        </Card>
        {/* Right side Relative videos */}
        <div className='max-h-screen w-full flex flex-col lg:flex-none lg:max-h-screen  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          <div className='p-2 bg-muted text-muted-foreground sticky top-0 z-10 rounded-t-xl '>
            <h1 className='text-2xl font-bold'>Relative Videos:</h1>
            <p className='aaa'>Course Description</p>
          </div>
          <div className=' w-full h-full gap-4'>



            {/* {
              videos.map(() => {
                return (
                  <MiniVideoCard />

                )
              })
            } */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default function Video(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}