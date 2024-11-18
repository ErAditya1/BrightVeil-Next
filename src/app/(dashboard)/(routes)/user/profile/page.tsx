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
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AvatarLayout from '@/components/AvatarLayout';
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
const UserProfile = () => {
  const [loading, setLoading] = useState(true)

  const User = {
    author: {
      _id: '',
      name: '',
      username: '',
      avatar: {
        url: '',
      }

    },
    isFollowingToMe: false,
    isIamFollowing:true
  }

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
    followers: [User],
    followings: [User],
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

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };


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
                    <Image
                      src={profile?.coverImage?.url}
                      alt="Cover Image"
                      height={500}
                      width={1920}
                      className="object-cover w-full h-full"
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
                      <Image
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
                  <DropdownMenuContent className='p-2 '>
                    <DropdownMenuLabel>Followers</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                      !loading &&

                      <div className="flex flex-col gap-2 w-dvw xs:w-72 p-2">
                        {
                          profile?.followers.map(user => (
                            <div className='flex flex-row items-center justify-evenly w-full '>
                              <div className='flex flex-row items-center w-full'>
                                <AvatarLayout className="h-10 w-10 mr-1 text-xl" src={user?.author?.avatar?.url} name={user?.author?.name} username={user?.author?.username} />
                                <div className="card-content mx-2">
                                  <p className="line-clamp-1 text-sm lg:text-md">{user?.author?.name}</p>
                                  <p className='line-clamp-1 text-xs lg:text-md'>@{user?.author?.username}</p>
                                </div>
                              </div>
                              <Button className="">
                                {user?.isIamFollowing ? 'Unfallow' :<>{
                                  user?.isFollowingToMe ? 'Fallow Back' :"Fallow"
                                }</>}
                              </Button>
                              

                            </div>
                          )
                          )
                        }
                      </div>
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
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Fallowings</DropdownMenuLabel>
                    {
                      !loading &&

                      <div className="flex flex-col gap-2 w-dvw xs:w-72 p-2">
                        {
                          profile?.followings.map(user => (
                            <div className='flex flex-row items-center justify-evenly w-full '>
                              <div className='flex flex-row items-center w-full'>
                                <AvatarLayout className="h-10 w-10 mr-1 text-xl" src={user?.author?.avatar?.url} name={user?.author?.name} username={user?.author?.username} />
                                <div className="card-content mx-2">
                                  <p className="line-clamp-1 text-sm lg:text-md">{user?.author?.name}</p>
                                  <p className='line-clamp-1 text-xs lg:text-md'>@{user?.author?.username}</p>
                                </div>
                              </div>
                              <Button className="">
                                {user?.isIamFollowing ? 'Unfallow' :<>{
                                  user?.isFollowingToMe ? 'Fallow Back' :"Fallow"
                                }</>}
                              </Button>
                              

                            </div>
                          )
                          )
                        }
                      </div>
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
                  profile?.watchedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
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
                  profile?.watchedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
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
                  profile?.watchedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
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
                  profile?.likedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
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
                  profile?.likedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
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
                  profile?.likedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
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
                  profile?.savedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
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
                  profile?.savedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
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
                  profile?.savedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
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
