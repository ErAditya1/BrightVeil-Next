'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import api from '@/api';
import VideoCard from '../../(courses)/components/VideoCard';
import CourseCard from '../../(courses)/components/CourseCard';
import ValidatedImage from '@/components/ValidatedImage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { FaUserCircle } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FollowButton from '@/components/FollowButton';
import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import UserFollowCard from '@/components/UserFollowCard';
import PostCard from '@/components/PostCard';
import { HoverEffect } from '@/components/ui/card-hover-effect';
const UserProfile = () => {
  const [loading, setLoading] = useState(true)


  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    username: '',
    email: '',
    bio: '',
    coverImage: {
      url: '',
    },
    avatar: {
      url: '',
    },
    followers: [],
    followings: [],
    followersCount: 0,
    followingsCount: 0,
    postsCount: 0,
    likesCount: 0,
    commentsCount: 0,
    posts: [],
    likes: [],
    comments: [],
    createdAt: '',
    updatedAt: '',
    isFollowing: false,
    isAdmin: false,
    watchedCourses: [],
    watchedVideos: [],
    watchedPosts: [],
    likedCourses: [],
    likedVideos: [],
    likedPosts: [],
    savedVideos: [],
    savedCourses: [],
    savedPosts: [],



  });
  useEffect(() => {
    api.get('/v1/users/get-user-profile')
      .then(res => {
        const user = res.data.data;
        console.log(user);
        setProfile(res.data.data);
        setLoading(false)
      })
      .catch(err => console.error(err));

  }, [])
  const [isFollowing, setIsFollowing] = useState(false);

  // const handleFallow = (_id: string) => {
  //   if (!isFollowing) return
  //   setIsFollowing(true)
  //   api.post(`/v1/users/user-follow-handler/${_id}`)
  //     .then((res) => {

  //       toast({
  //         title: 'Success!',
  //         description: res.data.message,
  //         variant: 'success'
  //       })
  //     })
  //     .catch((error) => {
  //       const axiosError = error as AxiosError<AxiosError>
  //       toast({
  //         title: 'Follow Failed!',
  //         description: axiosError.response?.data?.message || 'An error occurred',
  //         variant: 'destructive'
  //       })
  //     }).finally(() => setIsFollowing(false))
  // }



  return (
    <div className="w-full sm:p-4">
      <div className=" mx-auto mt-10 p-4  w-full  dark:bg-gray-900 dark:text-white">
        {/* Banner Image */}
        <div className="relative  max-h-48 md:max-h-64 xl:max-h-72 w-full ">
          {
            loading ? <Skeleton className='w-full h-full' /> :
              <>


                {
                  profile?.coverImage?.url ?
                    <ValidatedImage
                      src={profile?.coverImage?.url}
                      alt="Cover Image"
                      height={500}
                      width={1920}
                      className="object-cover bg-cover w-full h-full max-h-48 md:max-h-64 xl:max-h-72 rounded-md"
                    />
                    :
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-full" />
                }
              </>

          }
          {/* Profile Photo */}
          <div className="absolute -bottom-12 left-4">

            {
              loading ? <Skeleton className='rounded-full border-4 border-white w-24 h-24' /> :
                <>
                  {
                    profile?.avatar?.url ?
                      <ValidatedImage
                        src={profile?.avatar?.url}
                        alt="Profile Avatar"
                        className="rounded-full w-24 h-24"
                        height={500}
                        width={500}
                      />
                      :
                      <FaUserCircle className='w-20 h-20 sm:h-24 sm:w-24 bg-background rounded-full' />

                  }
                </>
            }
          </div>
        </div>

        {/* User Info */}
        <div className=" p-4 rounded-lg shadow-md mt-14">
          <div className="flex justify-between items-center">
            {
              loading ?
                <div className='gap-2 flex flex-col'>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-40" />

                </div>
                :
                <div>
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-600">@{profile?.username}</p>
                  <Link href={`/user/profile/${profile?.username}`} className='text-blue-600 underline flex gap-2'>View Account <ChevronRight /></Link>
                </div>
            }


          </div>

          {/* Followers and Following */}
          {
            loading ?
              <div className="flex space-x-6 mt-4">
                <Skeleton className='h-12 w-24' />
                <Skeleton className='h-12 w-24' />
                <Skeleton className='h-12 w-36' />


              </div>
              : <div className="flex space-x-6 mt-4">


                <DropdownMenu >
                  <DropdownMenuTrigger className='border-none  focus-within:border-none '>
                    <div className='cursor-pointer'>
                      <span className="font-bold">{profile?.followersCount}</span>
                      <p className="text-gray-600">Followers</p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='p-2 max-h-[500px] overflow-auto'>
                    <DropdownMenuLabel>Followers</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                      !loading &&

                      <UserFollowCard users={profile?.followers}/>
                    }

                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className='cursor-pointer'>
                      <span className="font-bold">{profile?.followingsCount}</span>
                      <p className="text-gray-600">Following</p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='p-2 max-h-[500px] overflow-auto'>
                    <DropdownMenuLabel>Fallowings</DropdownMenuLabel>
                    {
                      !loading &&
                      <UserFollowCard users={profile?.followings}/>
                     
                    }
                  </DropdownMenuContent>
                </DropdownMenu>



              </div>
          }
        </div>





      </div>
      <div className='w-full '>
        <Tabs defaultValue="history" className=" px-0 w-full ">
          <TabsList className=" overflow-auto  flex  justify-start w-full ">
            <div className=" w-fit  flex">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="saved">saved</TabsTrigger>

            </div>
          </TabsList>
          <TabsContent value="history">
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedVideos?.map((video: any, index) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <HoverEffect index={index}> 
                          <VideoCard _id={video?.video_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedPosts?.map((post: any, index) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <HoverEffect index={index}> 
                          <PostCard _id={post?.post_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedCourses?.map((course: any, index:number) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <HoverEffect index={index}> 
                          <CourseCard _id={course?.course_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
          </TabsContent>
          <TabsContent value="liked" className='gap-4'>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedVideos?.map((video: any, index) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <HoverEffect index={index}> 
                          <VideoCard _id={video?.video_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedPosts?.map((post: any, index) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <HoverEffect index={index}> 
                          <PostCard _id={post?.post_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedCourses?.map((course: any ,index) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <HoverEffect index={index}> 
                          <CourseCard _id={course?.course_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>

          </TabsContent>
          <TabsContent value="saved">
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedVideos?.map((video: any, index) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <HoverEffect index={index}> 
                          <VideoCard _id={video?.video_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedPosts?.map((post: any, index) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <HoverEffect index={index}> 
                          <PostCard _id={post?.post_Id} />
                          </HoverEffect>
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedCourses?.map((course: any, index) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <HoverEffect index={index}> 
                          <CourseCard _id={course?.course_Id} />
                          </HoverEffect>
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
  );
};

export default UserProfile;
