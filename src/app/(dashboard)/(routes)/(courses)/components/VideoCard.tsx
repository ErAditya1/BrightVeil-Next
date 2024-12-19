'use client'

import React, { useEffect, useRef, useState } from 'react';
import CardContent from '@mui/joy/CardContent';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Edit, PauseCircle, Pen, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { AspectRatio, Card, CardOverflow, Divider } from '@mui/joy';
import api from '@/api';
import Image from 'next/image';
import AvatarLayout from '@/components/AvatarLayout';
import ReactPlayer from 'react-player';
import { BsVolumeOff, BsVolumeUp } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';
import ValidatedImage from '@/components/ValidatedImage';
import { useRouter } from 'next/navigation';
import { SiCashapp } from 'react-icons/si';
import { FaVolumeMute } from 'react-icons/fa';
import { IoVolumeMute } from 'react-icons/io5';

export default function VideoCard({ _id }: any) {

  const router = useRouter()
  const [playingVideo, setPlayingVideo] = React.useState(false)
  const [videoData, setVideoData] = React.useState({
    thumbnail: {
      secure_url: '',
    },
    _id: '',
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
    isAuthor: false,
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
  const playerRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (event: any) => {
   
    if (playerRef.current && !playerRef.current.contains(event.target)) {
      setIsPlaying(false);
      setIsMuted(true)

    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPlaying(true)
    setIsMuted(false)

  };

  const handleMouseLeave = () => {
    setIsPlaying(false)
  };

  const handlePlayPause = () => {
    setIsPlaying((prev: any) => !prev);
    setIsMuted(!isMuted)
  }

  const toggleMute = () => {
    setIsMuted((prev: any) => !prev);

  };

  const playVideo = () => {
    router.push(`/watch/video/${videoData?.videoId}`)
  }

  const editVideo = () => {
    router.push(`/admin/chapters/${videoData?._id}`)
  }

  const skipVideo = () => {

  };
  return (
    <div className='relative h-full'>

      {
        videoData?.isAuthor && <div className='absolute top-1 left-1 text-4xl z-10'>
          <Edit onClick={editVideo} className='cursor-pointer' />
        </div>
      }
      <Card className="bg-card   text-card-foreground py-0 flex items-center h-full"
        style={{ paddingTop: 0 }}
      >
        <div onClick={playVideo} className='w-full h-full'>
          <CardOverflow >
            <AspectRatio ratio="2" className="bg-red-500">
              {
                isLoading ? (
                  <Skeleton className=" w-full rounded" />
                ) : (
                  <div className='aspect-video  p-0 relative flex w-full '>
                    {
                      isPlaying ? (
                        <>
                          <ReactPlayer
                            className="react-player rounded-lg p-0 w-full h-full "
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
                          <div className='h-full w-full absolute top-0 bg-transparent'></div>

                        </>
                      ) :
                        <ValidatedImage
                          src={videoData?.thumbnail?.secure_url}
                          loading="lazy"
                          width={500}
                          height={500}
                          alt=""
                        />
                    }
                    {!isPlaying && <PlayCircle size={30} className='text-4xl  absolute cursor-pointer' />
                    }
                  </div>

                )
              }
            </AspectRatio>
          </CardOverflow>
          <CardContent className="flex flex-row w-full" >
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
                      <p className="line-clamp-2 break-words break-all text-xs sm:text-sm lg:text-md">{videoData?.title}</p>
                      <p className="line-clamp-1 text-xs sm:text-md">@{videoData?.author?.username}</p>
                    </div>
                  </div>
                )
            }

          </CardContent>
        </div>
        <CardOverflow className=" h-10 ">
          <Divider inset="context" />
          <div className='w-full h-full' >
            {
              isLoading ? (
                <CardContent className="">
                  <div className="flex flex-row flrx-nowrap justify-between items-center p-0">
                    <span><Skeleton className="w-16 h-5 rounded" /></span>
                    <span><Skeleton className="w-12 h-5 rounded" /></span>
                  </div>
                </CardContent>
              ) : (
                <CardContent orientation="horizontal" className="flex flex-row items-center   m-0 p-0  h-full w-full"
                >
                  <div className='flex items-center' ref={playerRef}>

                    <button className="text-2xl mx-1 cursor-pointer p-0" onClick={handlePlayPause}>
                      {isPlaying ? <PauseCircle size={25} /> : <PlayCircle size={25} />}
                    </button>


                    <button
                      onClick={toggleMute}
                      className='text-md w-6 h-6 bg-background text-foreground p-1 float-right top-2 right-2 rounded m-2'
                    >
                      {isMuted ? <IoVolumeMute size={22} /> : <BsVolumeUp size={22} />}
                    </button>
                  </div>

                  {
                    videoData?.isFree && (
                      <div className="flex flex-row items-center bg-green-500 text-foreground float-right  p-1 rounded-full absolute right-2 " >
                        <SiCashapp className="text-md" />
                      </div>
                    )
                  }

                </CardContent>
              )
            }
          </div>
        </CardOverflow>
      </Card>
    </div>
  );
}
