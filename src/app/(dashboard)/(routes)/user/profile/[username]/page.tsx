'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import api from '@/api';
import ValidatedImage from '@/components/ValidatedImage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import VideoCard from '../../../(courses)/components/VideoCard';
import CourseCard from '../../../(courses)/components/CourseCard';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import FollowButton from '@/components/FollowButton';
import { useAppDispatch } from '@/store/hooks';
import { GrUser } from 'react-icons/gr';
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
import UserFollowCard from '@/components/UserFollowCard';
import PostCard from '@/components/PostCard';
import { HoverEffect } from '@/components/ui/card-hover-effect';


const UserProfile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const User = {
    author: {
      _id: '',
      name: '',
      username: '',
      avatar: {
        url: '',
      }

    },
  }
  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    username: '',
    email: '',
    about: '',
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
    createdAt: '',
    updatedAt: '',
    isFollowing: false,
    isAdmin: false,
    isAuthor: false,
    courses: [],
    videos: [],
    posts: [],



  });
  useEffect(() => {
    api.get(`/v1/users/get-user-profile/${username}`)
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


  const handleMessage = () => {
    // TODO: Implement sending a message to the user

    router.push(`/chat?u=${profile?.username}`)
  }


  return (
    <>
      <div className="w-full sm:p-4">

        <div className=" mx-auto mt-10 p-4  w-full  dark:bg-gray-900 dark:text-white">
          {/* Banner Image */}
          <div className="relative  ">
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
                        className="object-cover bg-cover  max-h-48 md:max-h-64 xl:max-h-72 h-full w-full rounded-md"
                      />
                      :
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-full" />
                  }
                </>
            }
            {/* Profile Photo */}
            <div className="absolute -bottom-12 left-4 ">

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
                    <h1 className="text-lg sm:text-2xl font-bold">{profile?.name}</h1>
                    <p className="text-gray-400">@{profile?.username}</p>
                    <p className="text-sm text-gray-600 sm:text-lg">{profile?.about}</p>
                    <Link href={`/user/profile/${profile?.username}`} className='text-blue-600 underline flex gap-2'>View Account <ChevronRight /></Link>
                  </div>
              }


              {/* Follow / Unfollow Button */}


              {
                loading ? <Skeleton className='w-32 h-12' /> : <>
                  {

                    !profile?.isAuthor && <FollowButton count={profile?.followersCount} _id={profile._id} isFollowing={profile?.isFollowing} />
                  }
                </>

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


                      <UserFollowCard users={profile?.followers} />


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

                        <UserFollowCard users={profile?.followings} />
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>



                </div>
            }
          </div>





        </div>
        <div className='w-full '>
          <Tabs defaultValue="posts" className=" px-0 w-full ">
            <TabsList className=" overflow-auto  flex  justify-start w-full ">
              <div className=" w-fit  flex">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>

              </div>
            </TabsList>

            <TabsContent value="posts">

              {
                profile?.posts?.length && <Card className='max-h-dvh overflow-auto my-2 w-full'>
                  <CardHeader>
                    <CardTitle>Post:</CardTitle>

                  </CardHeader>
                  <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                      profile?.posts?.map((post: any, index) => {

                        return (
                          <div key={post?._id}>
                            <HoverEffect index={index}> 
                            <PostCard _id={post?._id} />
                            </HoverEffect>
                          </div>
                        )

                      })
                    }
                  </CardContent>

                </Card>
              }

            </TabsContent>
            <TabsContent value="courses">

              {
                profile?.courses?.length && <Card className='max-h-dvh overflow-auto my-2 w-full'>
                  <CardHeader>
                    <CardTitle>Courses:</CardTitle>

                  </CardHeader>
                  <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                      profile?.courses?.map((course: any, index) => {
                        return (
                          <div key={course?._id}>
                            <HoverEffect index={index}>
                              <CourseCard _id={course?._id} />
                            </HoverEffect>
                          </div>
                        )
                      })
                    }
                  </CardContent>

                </Card>
              }

            </TabsContent>
            <TabsContent value="videos">

              {
                profile?.videos?.length && <Card className='max-h-dvh overflow-auto my-2 w-full'>
                  <CardHeader>
                    <CardTitle>Videos:</CardTitle>

                  </CardHeader>
                  <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                      profile?.videos?.map((video: any, index) => {

                        return (
                          <div key={video?._id}>
                            <HoverEffect index={index}> 
                            <VideoCard _id={video?._id} />
                            </HoverEffect>
                          </div>
                        )

                      })
                    }
                  </CardContent>

                </Card>
              }

            </TabsContent>
          </Tabs>
        </div>
      </div>

    </>
  );
};

export default UserProfile;
