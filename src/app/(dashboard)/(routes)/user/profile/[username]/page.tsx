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
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import VideoCard from '../../../(courses)/components/VideoCard';
import CourseCard from '../../../(courses)/components/CourseCard';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import FollowButton from '@/components/FollowButton';

const UserProfile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true)


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


  return (
    <>
    <div className="w-full sm:p-4">

      <div className=" mx-auto mt-10 p-4  w-full  dark:bg-gray-900 dark:text-white">
        {/* Banner Image */}
        <div className="relative max-h-56 ">
          {
            loading ? <Skeleton className='w-full h-full' /> :
              <Image
                src={profile?.coverImage?.url}
                alt="Banner"
                height={5000}
                width={5000}
                className="object-cover w-full h-full"
              />
          }
          {/* Profile Photo */}
          <div className="absolute -bottom-12 left-4">

            {
              loading ? <Skeleton className='rounded-full border-4 border-white w-24 h-24' /> :
                <Image
                  src={profile?.avatar?.url}
                  alt="Profile"
                  height={500}
                  width={500}
                  className="rounded-full border-4 border-white w-24 h-24"
                />
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
              : <div className="flex space-x-6 mt-4 items-center ">
                <div>
                  <span className="font-bold">{profile?.followersCount}</span>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div>
                  <span className="font-bold">{profile?.followingsCount}</span>
                  <p className="text-gray-600">Following</p>
                </div>

                {/* Send Message Button */}
                <div>
                  {
                    !profile.isAuthor && <div>
                      <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                        Message
                      </button>
                    </div>
                  }

                </div>
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
                  profile?.posts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard _id={post?.post_Id} />
                        </div>
                      )
                    }
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
                  profile?.courses?.map((course: any) => {
                    return (
                      <div key={course?._id}>
                        <CourseCard _id={course?._id} />
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
             profile?.videos?.length &&  <Card className='max-h-dvh overflow-auto my-2 w-full'>
             <CardHeader>
               <CardTitle>Videos:</CardTitle>

             </CardHeader>
             <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
               {
                 profile?.videos?.map((video: any) => {

                   return (
                     <div key={video?._id}>
                       <VideoCard _id={video?._id} />
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
