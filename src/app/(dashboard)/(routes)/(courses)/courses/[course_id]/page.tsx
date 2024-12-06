'use client'

import { Card, CardContent, Chip } from '@mui/joy';
import { useParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'
import MiniVideoCard from '../../components/chapter/MiniVideoCard';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import { ChevronDownCircle } from 'lucide-react';
import api from '@/api';
import AvatarLayout from '@/components/AvatarLayout';
import ValidatedImage from '@/components/ValidatedImage';
import { Skeleton } from '@/components/ui/skeleton';
import { FaCommentDots } from 'react-icons/fa6';
import { AiOutlineMessage, AiTwotoneEye } from 'react-icons/ai';
import CommentCard from '@/components/CommentCard';
import SaveButton from '@/components/SaveButton';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Button } from '@/components/ui/button';
import { HiMiniReceiptPercent } from 'react-icons/hi2';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardHeader, CardTitle } from '@/components/ui/card';
import QuizCard from '../../components/quiz/QuizCard';

function ExploreCourse() {
  const [loading, setLoading] = useState(true)
  const { course_id } = useParams()
  const [courseData, setCourseData] = useState(
    {
      _id: '',
      title: '',
      description: '',
      thumbnail: {
        secure_url: '',
      },
      commentCount: '',
      comments: [],
      author: {
        _id: '',
        name: '',
        username: '',
        avatar: {
          url: '',
        },
      },
      isEnrolled: false,
      isFollowing: false,
      followersCount: 0,
      isAuthor: false,
      isLiked: false,
      likeCount: 0,
      isFree: false,
      isPublished: false,
      channelName: '',
      views: 0,
      sellingPrice: 0,
      printPrice: 0,
      discount: 0,
      chat: {
        _id: '',
      },
      quizzes: [{
        _id: '',
        title: '',
        isFree: false,
        isPublished: false,
        thumbnail: {
          url: '',
        }
      }]

    }
  );
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
    views: 0,

  }]);



  const [mapVideos, setMapVideos] = useState(true);


  React.useEffect(() => {

    api.get(`/v1/courses/course/get-course-data/${course_id}`, {

    })
      .then((res) => {
        setLoading(false)
        setCourseData(res.data.data)
        console.log("course data")
        console.log(res.data)

        setVideos(res.data.data?.chapters)

      })
      .catch((error) => {
        console.log(error)
      })

  }, [])
  // console.log(videos)


  const handleEnroll = async () => {
    try {
      const response = await api.post(`/v1/payment/enroll-course/${course_id}`);
      console.log(response);
      setCourseData({ ...courseData, isEnrolled: true });
      toast({
        title: 'Enrolled successfully',
        description: response?.data?.message,
        variant: 'success',
      });

    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<AxiosError>

      toast({
        title: 'Failed to enroll',
        description: axiosError?.response?.data.message,
        variant: 'destructive',
      });
    }
  }









  return (
    <div className='sm:p-2 w-full'>
      <div className='md:mb-2 w-full gap-4  flex flex-col lg:flex-row '>

        <Card className='dark:bg-background w-full dark:bg-backgroun  text-card-foreground rounded-lg p-0 m-0 ' >
          <div className=' aspect-video col-span-8 rounded-xl border p-0'>
            {
              loading ? <Skeleton className='w-full aspect-video' /> :
                <ValidatedImage
                  height={500}
                  width={500}
                  src={courseData?.thumbnail?.secure_url}
                  alt={courseData?.title}
                  className='w-full aspect-video p-0'
                />
            }


          </div>

          <div className='sm:p-4 '>
            {
              loading ? <Skeleton className='w-full h-5' /> : <h1 className='text-sm font-semibold line-clamp-2 sm:text-lg'>{courseData?.title}</h1>
            }
            <div className='flex flex-row flex-wrap items-center py-2'>
              <React.Fragment>
                {

                  loading ? <Skeleton className='w-12 h-12 rounded-full' /> : <AvatarLayout className=" mr-1 text-xl" src={courseData?.author?.avatar?.url} name={courseData?.author.name} username={courseData?.author?.username} />
                }
                <div className="card-content mx-2 ">
                  {
                    loading ?
                      <>
                       <Skeleton className='h-4 w-32 sm:w-52 my-2' />
                       <Skeleton className='h-3 w-16 sm:w-32' />
                      </> :
                      <>
                        <p className="line-clamp-1 text-sm sm:text-md">{courseData?.author.name}</p>
                        <p className="line-clamp-1 text-xs sm:text-sm" >@{courseData?.author?.username}</p>
                      </>

                  }
                </div>

              </React.Fragment>
              {
                loading ? <React.Fragment>
                  <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
                    <Skeleton className="rounded-full w-24 h-10" />
                  </div>
                  <div className='m-2 rounded  p-1'>
                    <Skeleton className="rounded-full text-4xl w-16  h-10" />
                  </div>
                  <div className='m-2 '>
                    <Skeleton className="rounded-full text-4xl w-10  h-10" />
                  </div>
                  <div className='m-2 '>
                    <Skeleton className="rounded-full text-4xl w-10  h-10" />
                  </div>
                  <div className='m-2 '>
                    <Skeleton className="rounded-full text-4xl w-10  h-10" />
                  </div>
                  <div className='m-2 '>
                    <Skeleton className="rounded-full text-4xl w-24  h-10" />
                  </div>
                </React.Fragment>
                  :
                  <React.Fragment>
                    <div className='flex  flex-row items-center fjustify-self-end  ml-4 '>
                      {
                        !courseData?.isAuthor ?
                          <div className='m-2 '>
                            <FollowButton className="rounded-full " _id={courseData?.author?._id} isFollowing={courseData?.isFollowing} count={courseData?.followersCount} />
                          </div>
                          :
                          <HoverBorderGradient
                            as="button"
                            className={`bg-muted text-muted-foreground flex items-center space-x-1  p-1 sm:p-2 sm:h-auto sm:w-auto`}
                          >
                            <Chip className="m-0">{courseData?.followersCount}</Chip>
                            <span>Followers</span>
                          </HoverBorderGradient>
                      }
                    </div>
                    <div className='m-2 rounded  p-1'>
                      <LikeButton className="rounded-full text-xl" liked={courseData?.isLiked} likeCnt={courseData?.likeCount} type="course" _id={course_id} />
                    </div>
                    <div className='m-2 flex'>
                      <AiTwotoneEye className="rounded-full text-xl" />
                      <Chip>{courseData?.views}</Chip>
                    </div>
                    <div className='m-2 flex'>
                      <FaCommentDots className="rounded-full text-xl" />
                      <Chip>{courseData?.commentCount}</Chip>
                    </div>
                    <div className='m-2 '>
                      <ShareButton className="rounded-full text-xl" textToShare={courseData?.title}/>
                    </div>
                    <div className='m-2 '>
                      <SaveButton className="rounded-full text-xl" type="course" saved={false} _id={courseData?._id} />
                    </div>
                    {
                      courseData?.isEnrolled && <div className='m-2 '>
                        <Link href={`/chat?g=${courseData?.chat?._id}`}>
                          <Button className="bg-background text-foreground  rounded-full h-8 w-20 border hover:text-background text-xs">

                            <span>Message</span>
                          </Button>
                        </Link>
                      </div>
                    }
                  </React.Fragment>
              }

            </div>
          </div>

        </Card>

        <div className='max-h-dvh w-full flex flex-col lg:flex-none lg:max-h-dvh  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          <div className='flex flex-row justify-between p-2 bg-muted text-muted-foreground sticky top-0  rounded-t-xl z-10 right-0'>
            
            <div className='flex items-center h-full right-2 lg:hidden '>
              <ChevronDownCircle size={30} className={`duration-500 ${mapVideos && 'rotate-180'}`} onClick={() => { setMapVideos(!mapVideos) }} />
            </div>
          </div>
          <div className=' w-full h-full gap-4 lg:absolute top-4'>
            <Tabs defaultValue="videos" className=" px-0 w-full ">
              <TabsList className=" overflow-auto  flex  justify-start w-full ">
                <div className=" w-fit  flex">
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  {
                    courseData?.quizzes?.length !== 0 && <TabsTrigger value="quizes">Quizes</TabsTrigger>
                  }

                </div>
              </TabsList>

              <TabsContent value="videos" className='p-0'>
                <Card className='max-h-dvh overflow-auto m-0 p-0 w-full border-none dark:bg-background' style={{padding:0}}>
                  
                  <CardContent className="p-0 border-none w-full">
                    {
                      mapVideos && videos.length !== 0 &&
                      videos?.map((video) => {
                        return (
                          <MiniVideoCard key={video._id} _id={video._id} videoId={video.videoId} thumbnail={video?.thumbnail?.secure_url} title={video?.title} channelName={video?.channelName} uploadedDate={video?.uploadedDate} views={video?.views} isFree={video?.isFree} />
                        )
                      })
                    }
                  </CardContent>

                </Card>

              </TabsContent>

              <TabsContent value="quizes" className='' >
                <Card className='max-h-dvh overflow-auto m-0 w-full p-0 dark:bg-background' style={{padding:0}}>
                 
                 
                  <CardContent className="p-0">
                    {
                     mapVideos && courseData?.quizzes?.length !== 0 && courseData?.quizzes?.map((quiz: any) => {
                        if (quiz) {
                          return (
                            <div key={quiz?._id}>
                              <QuizCard _id={quiz._id} title={quiz.title} isFree={quiz?.isFree} uploadedDate={quiz?.uploadedDate} thumbnail={quiz?.thumbnail.url} channelName={quiz?.channelName} views={quiz?.views}/>
                            </div>
                          )
                        }
                      })
                    }
                  </CardContent>

                </Card>

              </TabsContent>

            </Tabs>


          </div>
        </div>

      </div>
      <div className='md:mb-2 w-full gap-4  flex flex-col lg:flex-row '>

        {/* File Test and Description */}
        <Card className='grow dark:bg-background text-card-foreground '>



          <CardContent className="">
            <div className='p-2 bg-muted text-muted-foreground sticky top-0  rounded-t-xl m-0 '>
              <h1 className='text-2xl font-bold'>Description :</h1>
            </div>
            <p className="line-clamp-2  text-card-foreground p-0 m-0 rounded">

              <div className="mt-2" dangerouslySetInnerHTML={{ __html: courseData?.description }} />
            </p>
          </CardContent>

        </Card>
        <div className='max-h-dvh w-full flex flex-col lg:flex-none lg:max-h-dvh  lg:min-w-[300px] lg:w-[35%] rounded-xl border overflow-auto relative '>
          {
            !loading && !courseData?.isEnrolled && <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-clip-text hover:text-transparent duration-300  p-4 relative   border rounded">
              {/* <div className="   absolute h-full w-full top-0 opacity-10"></div> */}
              <div className="flex items-center py-2">
                <h1 className="text-xl font-bold">Ready to start learning?</h1>
              </div>
              <div className="flex items-center justify-center">
                <p className=''>
                  Track your progress, watch with subtitles, change quality & speed, and more.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-4 gap-4">
                {
                  courseData?.sellingPrice === 0 ? (
                    <>
                      <div className="w-full flex flex-row justify-between">
                        <div>
                          <Button className="rounded-2 text-white bg-blue-500 hover:bg-blue-600 w-full" >
                            Free
                          </Button>
                        </div>

                      </div>
                      <Button onClick={handleEnroll} className="rounded-2 text-white bg-blue-500 hover:bg-blue-600 w-full" >
                        Enrolle For Free
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex flex-row justify-between">
                        <div className="flex flex-col">
                          <div className=" flex items-center gap-1 bg-transparent">
                            <span className="font-bold  text-blue-800 test-lg">
                              ₹{courseData?.sellingPrice}
                            </span>
                            <div className=" ">
                              <span
                                style={{ fontSize: "14px" }}
                                className="line-through font-semibold  text-gray-600"
                              >
                                {courseData?.printPrice}
                              </span>
                            </div>
                          </div>
                          <span
                            style={{ fontSize: "13px" }}
                            className=" font-semibold  text-gray-600 "
                          >
                            (For Full Batch)
                          </span>
                        </div>
                        <div
                          id="discount_applied_tag "
                          className="discount-container flex items-center justify-center "
                        >
                          <div className="shape"></div>
                          <div className="flex items-center flex-1 text-green-700 bg-green-200 p-1 pl-4 rounded">
                            <HiMiniReceiptPercent className="text-md m-1" />
                            <span
                              style={{ fontSize: "14px" }}
                              className="font-semibold "
                            >
                              Discount of {courseData?.discount}% applied
                            </span>
                          </div>
                        </div>


                      </div>
                      <Link href={`/payment?course=${courseData?._id}`}>

                        <Button className="rounded-2 text-white bg-blue-500 hover:bg-blue-600 w-full" >
                          Enrolle For More
                        </Button>
                      </Link>
                    </>
                  )
                }


              </div>

            </div>
          }

          <div className='p-2   sticky top-0  rounded-t-xl '>
            <h1 className='text-2xl font-bold '>Comments {courseData?.commentCount}:</h1>
            <CommentCard
              _Id={courseData?._id}
              comments={courseData?.comments}
              type="course"
            />
          </div>
          <div className=' w-full h-full gap-4'>




          </div>
        </div>

      </div>
    </div>
  )
}

// export default ExploreCourse
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreCourse />
    </Suspense>
  )
}
