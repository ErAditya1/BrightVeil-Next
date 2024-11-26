'use client'

import React, { useRef, useState } from 'react';
import CardContent from '@mui/joy/CardContent';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio, Card, CardOverflow, Divider } from '@mui/joy';
import api from '@/api';
import Image from 'next/image';
import AvatarLayout from '@/components/AvatarLayout';
import ReactPlayer from 'react-player';
import { BsVolumeOff, BsVolumeUp } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';
import ValidatedImage from '@/components/Image';

export default function VideoCard({ _id, key }: any) {

  const [playingVideo, setPlayingVideo] = React.useState(false)
  const [videoData, setVideoData] = React.useState({
    thumbnail: {
      secure_url: '',
    },
    videoId: '',
    title: '',
    author: {
      name: '',
      avatar: {
        url: '',
      },
      username: '',

    },
    chapterCount: 0,
    isFree: false,


  })
  React.useEffect(() => {
    api.get(`/v1/videos/video/get-video/${_id}`)
      .then((res) => {
        setIsLoading(false)
        setVideoData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPlaying(true)
    setIsMuted(false)

  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false)

  };

  const toggleMute = () => {
    setIsMuted((prev: any) => !prev);

  };

  const skipVideo = () => {

  };
  return (
    <Link href={`/watch/video/${videoData?.videoId}`} key={key} >
      <Card className="bg-card   text-card-foreground "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardOverflow>
          <AspectRatio ratio="2">
            {
              isLoading ? (
                <Skeleton className=" w-full rounded" />
              ) : (
                <div className='aspect-video bg-red-800 p-0'>
                  {
                    isHovered ? (<>
                      <ReactPlayer
                        ref={playerRef}
                        className="react-player rounded-lg p-0 hover:scale-110"
                        width="100%"
                        height="100%"
                        url={`https://www.youtube.com/watch?v=${videoData?.videoId}`}
                        playing={isPlaying}
                        controls={false}
                        loop={true}
                        muted={isMuted}
                        onReady={() => {
                          console.log("onReady")
                        }}
                        onStart={() => {
                          console.log("onStart")
                        }}
                        onPlay={() => {
                          setIsPlaying(true)
                        }}
                        onBuffer={() => console.log("onBuffer")}
                        onSeek={(e) => console.log("onSeek", e)}
                        onError={(e) => console.log("onError", e)}
                        // onProgress={handleProgress}
                        // onDuration={handleDuration}
                        onPlaybackQualityChange={(e: any) =>
                          console.log("onPlaybackQualityChange", e)
                        }

                      />
                      <div className='w-full h-full absolute top-0 left-0 p-0 m-0'>
                        <div
                          onClick={toggleMute}
                          className='text-md w-6 h-6 bg-background text-foreground p-1 float-right top-2 right-2 rounded m-2'
                        >
                          {isMuted ? <BsVolumeOff /> : <BsVolumeUp />}
                        </div>
                      </div>
                    </>) :
                      <ValidatedImage
                        src={videoData?.thumbnail?.secure_url}
                        loading="lazy"
                        width={500}
                        height={500}
                        alt=""
                      />
                  }
                </div>

              )
            }
          </AspectRatio>
        </CardOverflow>
        <CardContent className="flex flex-row items-centr" >
          {
            isLoading ? (
              <div className='flex flex-row flrx-nowrap justify-between p-0 w-full'>
                <div><Skeleton className="h-12 w-12 rounded-full" /></div>
                <div className="space-y-2 w-full gap-2 pl-2" >
                  <Skeleton className="h-4 w-full " />
                  <Skeleton className="h-4 w-full " />
                  <Skeleton className="h-4 w-[50%]" />
                </div>
              </div>
            ) :
              (
                <div className='flex flex-row gap-2 h-14 items-center'>
                  <AvatarLayout src={videoData?.author?.avatar?.url} name={videoData?.author?.name} username={videoData?.author?.username} />
                  <div className="card-content h-16 flex justify-center flex-col">
                    <p  className="line-clamp-2 break-words break-all text-xs sm:text-md lg:text-lg">{videoData?.title}</p>
                    <p  className="line-clamp-1 text-xs sm:text-md">@{videoData?.author?.username}</p>
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
                <div className=" flex flex-row  items-center bg-background text-foreground p-1 rounded-lg text-xs" >
                  <span><BookOpen className='mx-2' size={15} /></span> <span>{videoData?.chapterCount} Chapters</span>
                </div>
                {
                  videoData?.isFree && (
                    <div className=" flex flex-row items-center bg-background text-foreground p-1 rounded-lg text-xs" >
                      <span><BiMoney className='mx-2' size={15} /></span><span>Free</span>
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
