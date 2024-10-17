'use client'

import { Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MiniVideoCard from '../../components/MiniVideoCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import FileCard from '../../components/FileCard';
import TestCard from '../../components/TestCard';
import { ChevronDownCircle } from 'lucide-react';
import CustomVideoPlayer from '../../components/YoutubePlayer';
import api from '@/api';
import { useSession } from 'next-auth/react';
import AvatarLayout from '@/components/AvatarLayout';
import { UserInterface } from '@/interfaces/user';
type playingTyps = {

  author: UserInterface
  videoId: string,
  title: string,
  thumbnail: string,
  _id: string
}
function ExploreCourse() {
  const [loading, setLoading] = useState(true)
  const { course_id} = useParams()
  const [courseData, setCourseData] = useState();
  const [videos, setVideos] = useState([{
    _id:'',
    title: '',
    videoId: '',
    thumbnail: {
      secure_url:'',
    },
    isFree: false,
    isPublished: false,
    channelName: '',
    uploadedDate:"",
    views:0

  }]);
  const [playingVideo, setPlayingVideo] =useState({
   
    videoId: '',
    title: '',
    thumbnail:'',
    _id: ''
  })
  const [playingVideoData, setPlayingVideoData] = useState<playingTyps>();
  const [mapVideos, setMapVideos] = useState(true);
  
  const  user  = useSession()?.data?.user

  React.useEffect( () => {
    if(user && user.accessToken){
    api.get(`/v1/courses/course/get-course-data/${course_id}`,{
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
},[user])
// console.log(videos)

useEffect(() => {
  setPlayingVideo({
   
    videoId: videos[0]?.videoId,
    title: videos[0]?.title,
    thumbnail: videos[0]?.thumbnail?.secure_url,
    _id: videos[0]?._id
  })
},[videos])

useEffect(()=>{
  if(user && user.accessToken){
    api.get(`/v1/videos/video/get-video-data/${playingVideo._id}`,{ 
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${user?.accessToken}`
    }
    }).then((res)=>{
      console.log('video data fetched')
      setPlayingVideoData(res?.data?.data[0])
    })
  }
},[playingVideo])
console.log(playingVideoData)




const onPlaying = (items:{videoId: string, title: string,thumbnail: string, _id: string}) => {
  
  setPlayingVideo(items)
}


  const handleVideoClick = (video:any) => {
    setPlayingVideo(video)
    setMapVideos(false)
  }

  return (
    <div className='sm:p-4'>
      <div className='md:my-2 w-full gap-4  flex flex-col lg:flex-row '>

        <Card className='grow bg-card text-card-foreground rounded-lg'>
          <div className=' aspect-video col-span-8 rounded-xl border'>
          {
            playingVideo?.videoId && <CustomVideoPlayer   videoId = {playingVideo?.videoId} thumbnailUrl = {playingVideo?.thumbnail} title={playingVideo?.title}  />
          }

          </div>

          <div className='p-4 '>
            <h1 className='text-lg font-semibold'>Course title Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, maiores.</h1>
            <div className='flex flex-row flex-wrap items-center'>
              <React.Fragment>
                
                <AvatarLayout className="h-12 w-12 mr-1 text-xl" src={playingVideoData?.author?.avatar?.url} name={playingVideoData?.author.name}/>
                <div className="card-content mx-2">
                  <Typography level="title-md" className="line-clamp-1">Yosemite National Park</Typography>
                  <Typography level="body-sm"> Username</Typography>
                </div>
                <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
                  <FollowButton className="rounded-full" />
                </div>
              </React.Fragment>
              <React.Fragment>
                <div className='m-2 rounded border p-1'>
                  <LikeButton className="rounded-full text-4xl" liked='false' likeCnt='3' type="v" _id="123" />
                </div>
                <div className='m-2 '>
                  <ShareButton className="rounded-full text-4xl" liked='true' likeCnt='3' type="v" _id="123" />
                </div>
              </React.Fragment>

            </div>
          </div>

        </Card>

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
                  <MiniVideoCard   key={video._id} _id = {video._id} videoId={video.videoId} thumbnail={video?.thumbnail?.secure_url} title={video?.title} channelName={video?.channelName} uploadedDate={video.uploadedDate} views={video?.views}/>
                )
              })
            }
          </div>
        </div>

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

export default ExploreCourse