'use client'

import { Card, CardContent, Chip, Divider, Typography } from '@mui/joy';
import { useParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import MiniVideoCard from '../../../(courses)/components/chapter/MiniVideoCard';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import FileCard from '../../../(courses)/components/chapter/FileCard';
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
import { Skeleton } from '@/components/ui/skeleton';


function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [loadingVideo, setLoadingVideo] = useState(true)
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

  type File = {
    _id: string;
    title: string;
    file: {
      url: string
    }
  }

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
    files: [],
    tests: [],

  });
  const [mapVideos, setMapVideos] = useState(true);

 




  useEffect(() => {
    if (v) {
      api.get(`/v1/videos/video/get-video-data/${v}`).then((res) => {
        
        if (res.status === 200) {
          setPlayingVideoData(res?.data?.data)
          console.log(res?.data?.data)
          setVideos(res.data.data.relatedVideo)
          setLoading(false)
          setLoadingVideo(false)
        } else {
          router.push('/not-found')
        }
      }).catch((err) => {
        if (err.response.data.statusCode === 403) {
          router.push('/not-found')
        } else {
          setLoadingVideo(false)
        }
      })
    }
  }, [v])









  return (
    <div className=''>
      <div className='md:mb-2 w-full gap-4  flex flex-col lg:flex-row '>

        <Card className='grow dark:bg-background p-0 text-card-foreground rounded-lg ' style={{ padding: 0 }}>
          <div className=' aspect-video col-span-8 rounded-xl  max-h-dvh max-w-screen'>
            {
              v && !loadingVideo ? <CustomVideoPlayer videoId={v} thumbnailUrl={playingVideoData?.thumbnail?.secure_url} title={playingVideoData?.title} videoQue={videos.map((item)=>(item.videoId))} /> :
                <Skeleton className='h-full w-full' />
            }

          </div>

          <div className='p-4 '>
            {
              loading ? <Skeleton className='w-3/4 h-5' />
                :
                <h1 className='text-sm  font-semibold line-clamp-1 lg:text-md'>{playingVideoData?.title}</h1>
            }
            <div className='flex flex-row flex-wrap items-center'>
              <React.Fragment>
                {
                  loading ? <Skeleton className='h-10 w-10 mr-1  rounded-full' />
                    :
                    <AvatarLayout className="h-10 w-10 mr-1 text-xl" src={playingVideoData?.author?.avatar?.url} name={playingVideoData?.author.name} username={playingVideoData?.author?.username} />
                }

                {
                  loading ? <div className="card-content mx-2 ">
                    <Skeleton className='h-4 w-32 sm:w-52 my-2' />
                    <Skeleton className='h-3 w-16 sm:w-32' />
                  </div>
                    :
                    <div className="card-content mx-2">
                      <p className="line-clamp-1 text-sm lg:text-md">{playingVideoData?.author?.name}</p>
                      <p className='line-clamp-1 text-xs lg:text-md'>@{playingVideoData?.author?.username}</p>
                    </div>
                }
                {
                  loading ?
                    <div className='flex flex-row gap-2 items-center'>
                      <Skeleton className="rounded-full w-24 h-8" />
                    </div>
                    : <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
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
                }
              </React.Fragment>
              {
                loading ?
                  <React.Fragment>
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />
                    <Skeleton className='h-8 w-8 mx-1 rounded-full' />

                  </React.Fragment>
                  : <React.Fragment>
                    <div className='m-2 rounded  p-1'>
                      <LikeButton className="rounded-full text-xl" liked={playingVideoData?.isLiked} likeCnt={playingVideoData?.likeCount} type="video" _id={playingVideoData?._id} />
                    </div>
                    <div className='m-2 flex'>
                      <AiTwotoneEye className="rounded-full text-xl" />
                      <Chip>{playingVideoData?.views}</Chip>
                    </div>
                    <div className='m-2 flex'>
                      <FaCommentDots className="rounded-full text-xl" />
                      <Chip>{playingVideoData?.commentCount}</Chip>
                    </div>
                    {
                      playingVideoData?.isFree &&
                      <div className='m-2 '>
                        <ShareButton className="rounded-full text-xl" textToShare={playingVideoData?.title}/>
                      </div>
                    }

                    <div className='m-2 '>
                      {
                        playingVideoData?.isFree ?
                          <div className="flex flex-row items-center bg-green-500 text-foreground  p-1 rounded-full " >
                            <SiCashapp className="text-md" />
                          </div>
                          :

                          <div className=" flex flex-row items-center bg-red-500 text-foreground p-1 rounded-full" >
                            <SiCashapp className="text-md" />
                          </div>}
                    </div>
                    <div className='m-2 '>
                      <SaveButton className="rounded-full text-xl" type="video" saved={false} _id={playingVideoData?._id} />
                    </div>
                  </React.Fragment>
              }

            </div>
          </div>

        </Card>

        {
          videos &&
          <div className='max-h-dvh w-full flex flex-col lg:flex-none lg:max-h-dvh  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
            <div className='flex flex-row justify-between p-2 bg-muted text-muted-foreground sticky top-0  rounded-t-xl z-10'>
              <div className='z-20'>
                <h1 className='text-2xl font-bold'>Chapters:</h1>
              </div>
              <div className='flex items-center h-full right-2 lg:hidden '>
                <ChevronDownCircle size={30} className={`duration-500 ${mapVideos && 'rotate-180'}`} onClick={() => { setMapVideos(!mapVideos) }} />
              </div>
            </div>
            <div className=' w-full h-fit gap-4 lg:absolute top-20'>

              {
                mapVideos && videos[0]?._id &&
                videos?.map((video) => {
                  return (
                    <MiniVideoCard key={video._id} _id={video._id} videoId={video.videoId} thumbnail={video?.thumbnail?.secure_url} title={video?.title} channelName={video?.channelName} uploadedDate={video.uploadedDate} views={video?.views} isFree={video?.isFree} />
                  )
                })
              }
            </div>
          </div>
        }

      </div>
      <div className='md:mb-2 w-full gap-4  flex flex-col lg:flex-row '>

        {/* Description  and files*/}
        <Card className='grow dark:bg-background text-card-foreground '>


          <CardContent className="">
            <div className='p-2 bg-muted text-muted-foreground sticky top-0  rounded-t-xl m-0 '>
              <h1 className='text-2xl font-bold'>Description :</h1>
            </div>
            <div>

              {
                loading ? <div className='w-full'>
                  <Skeleton className=' h-5 w-full' />
                </div>
                  :
                  <Typography level="title-md" className="line-clamp-2  text-card-foreground p-0 m-0 rounded">

                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: playingVideoData?.description }} />
                  </Typography>
              }
            </div>

          </CardContent>

          { playingVideoData?.files?.length > 0 &&
            <CardContent className="">
            <div className='p-2 bg-muted text-muted-foreground sticky top-0  rounded-t-xl m-0 '>
              <h1 className='text-2xl font-bold'>Notes/Documents :</h1>
            </div>
            <div>

              {
                loading ? <div className='w-full'>
                  <Skeleton className=' h-5 w-full' />
                </div>
                  :
                  <div className='flex flex-col gap-2'>
                    {
                      playingVideoData?.files?.map((item:File) => (
                        <FileCard
                          key={item._id}
                          item={item}
                        />
                      ))
                    }
                  </div>
}
            </div>

          </CardContent>
          }

        </Card>
        {/* Right side Relative videos and comments*/}
        <div className='max-h-dvh w-full flex flex-col lg:flex-none lg:max-h-dvh  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          <div className='p-2   sticky top-0  rounded-t-xl '>
            <h1 className='text-2xl font-bold '>Comments {playingVideoData?.commentCount}:</h1>
            <CommentCard
              _Id={playingVideoData?._id}
              comments={playingVideoData?.comments}
              type="video"
              loading={loading}
            />
          </div>
          <div className=' w-full h-full gap-4'>




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