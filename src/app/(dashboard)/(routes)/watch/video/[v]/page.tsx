'use client'

import { Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
import { useParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import MiniVideoCard from '../../../(courses)/components/MiniVideoCard';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import FileCard from '../../../(courses)/components/FileCard';
import TestCard from '../../../(courses)/components/TestCard';
import { ChevronDownCircle } from 'lucide-react';
import CustomVideoPlayer from '../../../(courses)/components/YoutubePlayer';
import api from '@/api';
import AvatarLayout from '@/components/AvatarLayout';
import { SiCashapp } from 'react-icons/si';
import { AiTwotoneEye } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa6';
import CommentCard from '@/components/CommentCard';
import SaveButton from '@/components/SaveButton';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';


function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const { v } = useParams()

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
    _id: '',
    comments: [],
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
        url: '',
      },
    },
    isAuthor: false,
    followersCount: 0,
    isFollowing: false,
    videoFile: '',
    description: '',
    durations: 0,
    comment: [],
    commentCount: 0,
    likeCount: 0,
    isLiked: false,
    likes: [],
    isFree: false,
    views: 0,
    viewers: [],
    uploadedDate: '',

  });
  const [mapVideos, setMapVideos] = useState(true);

  console.log(playingVideoData)




  useEffect(() => {
    if (v) {
      api.get(`/v1/videos/video/get-video-data/${v}`).then((res) => {
        console.log(res?.data?.data)
        setPlayingVideoData(res?.data?.data)
        setVideos(res.data.data.relatedVideo)
      })
    }
  }, [v])









  return (
    <div className=''>
      <div className='md:my-2 w-full gap-4  flex flex-col lg:flex-row '>

        <Card className='grow dark:bg-background p-0 text-card-foreground rounded-lg ' style={{ padding: 0 }}>
          <div className=' aspect-video col-span-8 rounded-xl  max-h-screen max-w-screen'>
            {
              v && <CustomVideoPlayer videoId={v} thumbnailUrl={playingVideoData?.thumbnail?.secure_url} title={playingVideoData?.title} />
            }

          </div>

          <div className='p-4 '>
            <h1 className='text-lg font-semibold'>{playingVideoData?.title}</h1>
            <div className='flex flex-row flex-wrap items-center'>
              <React.Fragment>

                <AvatarLayout className="h-12 w-12 mr-1 text-xl" src={playingVideoData?.author?.avatar?.url} name={playingVideoData?.author.name} username={playingVideoData?.author?.username} />
                <div className="card-content mx-2">
                  <Typography level="title-md" className="line-clamp-1">{playingVideoData?.author?.name}</Typography>
                  <Typography level="body-sm">@{playingVideoData?.author?.username}</Typography>
                </div>
                <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
                  {
                    playingVideoData?.isAuthor ?
                      <HoverBorderGradient
                        as="button"
                        className={`bg-muted text-muted-foreground flex items-center space-x-2 `}
                      >
                        <Chip>{playingVideoData?.followersCount}</Chip>
                        <span>Followers</span>
                      </HoverBorderGradient>
                      :
                      <div className='m-2 '>
                        <FollowButton className="rounded-full" _id={playingVideoData?.author?._id} isFollowing={playingVideoData?.isFollowing} count={playingVideoData?.followersCount} />
                      </div>
                  }
                  
                </div>
              </React.Fragment>
              <React.Fragment>
                <div className='m-2 rounded border p-1'>
                  <LikeButton className="rounded-full text-4xl" liked={playingVideoData?.isLiked} likeCnt={playingVideoData?.likeCount} type="video" _id={playingVideoData?._id} />
                </div>
                <div className='m-2 flex'>
                  <AiTwotoneEye className="rounded-full text-2xl" />
                  <Chip>{playingVideoData?.views}</Chip>
                </div>
                <div className='m-2 flex'>
                  <FaCommentDots className="rounded-full text-2xl" />
                  <Chip>{playingVideoData?.commentCount}</Chip>
                </div>
                {
                  playingVideoData?.isFree &&
                  <div className='m-2 '>
                    <ShareButton className="rounded-full text-4xl" />
                  </div>
                }

                <div className='m-2 '>
                  {
                    playingVideoData?.isFree ?
                      <div className="flex flex-row items-center bg-green-500 text-foreground  p-2 rounded-full " >
                        <SiCashapp className="text-md" />
                      </div>
                      :

                      <div className=" flex flex-row items-center bg-red-500 text-foreground p-2 rounded-full" >
                        <SiCashapp className="text-md" />
                      </div>}
                </div>
                <div className='m-2 '>
                  <SaveButton className="rounded-full text-2xl" type="video" saved={false} _id={playingVideoData?._id} />
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
                    <MiniVideoCard key={video._id} _id={video._id} videoId={video.videoId} thumbnail={video?.thumbnail?.secure_url} title={video?.title} channelName={video?.channelName} uploadedDate={video.uploadedDate} views={video?.views} isFree={video?.isFree} />
                  )
                })
              }
            </div>
          </div>
        }

      </div>
      <div className='md:my-2 w-full gap-4  flex flex-col lg:flex-row '>

        {/* File Test and Description */}
        <Card className='grow dark:bg-background text-card-foreground '>



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

              <div className="mt-2" dangerouslySetInnerHTML={{ __html: playingVideoData?.description }} />
            </Typography>
          </CardContent>

        </Card>
        {/* Right side Relative videos */}
        <div className='max-h-screen w-full flex flex-col lg:flex-none lg:max-h-screen  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          <div className='p-2   sticky top-0 z-10 rounded-t-xl '>
            <h1 className='text-2xl font-bold '>Comments {playingVideoData?.commentCount}:</h1>
            <CommentCard
              _Id={playingVideoData?._id}
              comments={playingVideoData?.comments}
              type="video"
            />
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

export default function Video() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}